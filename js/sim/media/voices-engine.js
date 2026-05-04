// MEDIA-1: Voices Around the Program + Curated Clippings
// Spec: ai-pack/CFB_FM_UI_NARRATIVE_VIBE_PACK/07_MEDIA_CLIPPINGS_RADIO_AND_VOICES_AROUND_PROGRAM.md
//
// Generates grounded perspective strings tied to event-log entries + pulse
// state. NOT a social media firehose — instead returns one curated string per
// perspective bucket per request, citing the underlying reason codes.
//
// All output is deterministic given the same inputs + random function. No DOM.

(function initVoicesEngine(global) {
  const PERSPECTIVES = ["staff", "players", "recruits", "fans", "media", "boosters", "campus"];

  // Phrase templates per perspective × sentiment band. Each template can use
  // {team}, {opp}, {phrase} substitutions where {phrase} is the underlying
  // reason summary.
  const TEMPLATES = {
    staff: {
      euphoric:    ["The defensive staff believes the young front has turned a corner.", "Coordinators feel the {phrase} is finally clicking."],
      positive:    ["Staff notebook: {phrase} was the difference today.", "Coaches are quietly pleased with how {phrase} held up."],
      neutral:     ["Internally the staff isn't ready to call this anything yet.", "Position coaches keep stressing process over result."],
      negative:    ["The staff is frustrated by {phrase} — third week in a row.", "Coordinators are asking pointed questions about {phrase}."],
      angry:       ["Behind closed doors, the staff is furious about {phrase}.", "An assistant called {phrase} \"unacceptable\" off the record."],
    },
    players: {
      euphoric:    ["The locker room is fully bought in after the comeback.", "Veterans are saying {phrase} proved everyone wrong."],
      positive:    ["Captains pointed to {phrase} as a building block.", "Locker room mood is up: {phrase} earned respect."],
      neutral:     ["The locker room is quiet — focused on next week.", "Players are heads-down, not interested in praise yet."],
      negative:    ["Several players visibly frustrated with {phrase}.", "Whispers in the locker room about {phrase}."],
      angry:       ["Multiple sources describe a fractured locker room over {phrase}.", "Veteran players openly questioned {phrase}."],
    },
    recruits: {
      euphoric:    ["Several visitors mentioned the fourth-quarter atmosphere.", "Recruits are buzzing about {phrase} on group chats."],
      positive:    ["Two visiting prospects asked about {phrase} after the game.", "Class chemistry is rising — recruits noticed {phrase}."],
      neutral:     ["Recruit visit pace is steady, no major shifts.", "Visiting prospects gave nondescript reviews."],
      negative:    ["Recruiting analysts whispered about {phrase} in calls today.", "A committed prospect's father reportedly asked about {phrase}."],
      angry:       ["A top commit is rumored to be reconsidering after {phrase}.", "Class instability picking up — {phrase} is the catalyst."],
    },
    fans: {
      euphoric:    ["Local reaction is euphoric. Expectations are rising fast.", "Talk radio cannot stop replaying {phrase}."],
      positive:    ["Fan forums are positive — {phrase} won them over.", "Crowd noise was top-tier; everyone's talking about {phrase}."],
      neutral:     ["Fan forums are oddly quiet this week.", "Reactions are split; no consensus has formed."],
      negative:    ["Boards lit up with frustration about {phrase}.", "Talk radio dominated by callers angry about {phrase}."],
      angry:       ["Ticket-holders are openly demanding answers about {phrase}.", "Hashtag campaigns starting over {phrase}."],
    },
    media: {
      euphoric:    ["The conference notebook calls this the best win of the year.", "National writers are putting {phrase} on the year-in-review highlight."],
      positive:    ["Local beat writer leads with {phrase} — measured praise.", "Beat writers framed today around {phrase}."],
      neutral:     ["Beat writers wrote it down as a transition week.", "Notebook columns are short — nobody is reading much into it."],
      negative:    ["The beat writer led with {phrase}, asked hard questions.", "Local columnist questioned {phrase} in the lead."],
      angry:       ["A national columnist used the word \"crisis\" — citing {phrase}.", "Beat writer's lead: \"How long can {phrase} continue?\""],
    },
    boosters: {
      euphoric:    ["A facility donor wants to reopen stadium expansion talks.", "Major donors are calling about {phrase} — in a good way."],
      positive:    ["Boosters approved a fresh NIL push citing {phrase}.", "A board member sent a note praising {phrase}."],
      neutral:     ["Donor outreach is quiet — they want to see more.", "Booster events this week were underplayed."],
      negative:    ["A booster meeting reportedly raised {phrase} as a concern.", "A major donor wants a quiet conversation about {phrase}."],
      angry:       ["A board member is asking who's accountable for {phrase}.", "A six-figure donor publicly questioned {phrase}."],
    },
    campus: {
      euphoric:    ["Student paper led with the win; campus is buzzing.", "Across campus, {phrase} is the only conversation."],
      positive:    ["Student section morale is up after {phrase}.", "Campus paper coverage is warm."],
      neutral:     ["Student paper coverage was perfunctory.", "Campus is more focused on midterms than the team."],
      negative:    ["Student paper opinion section turned negative on {phrase}.", "On campus, there's frustration about {phrase}."],
      angry:       ["A student-government letter cited {phrase}.", "Campus mood: tired of explaining {phrase}."],
    },
  };

  // Curated clipping templates by source × sentiment.
  const CLIPPING_SOURCES = [
    { id: "local_paper",  label: "City Beat",        sentiment: "neutral" },
    { id: "regional_rec", label: "Regional Recruit Notebook", sentiment: "neutral" },
    { id: "national",     label: "National CFB Wire", sentiment: "neutral" },
    { id: "campus_paper", label: "Campus Paper",     sentiment: "neutral" },
    { id: "radio",        label: "Local Radio Show", sentiment: "neutral" },
    { id: "conference",   label: "Conference Notebook", sentiment: "neutral" },
    { id: "draft_buzz",   label: "Draft Insider",    sentiment: "neutral" },
  ];

  function sentimentBandFromPulse(pulseScore) {
    if (pulseScore >= 80) return "euphoric";
    if (pulseScore >= 60) return "positive";
    if (pulseScore >= 40) return "neutral";
    if (pulseScore >= 20) return "negative";
    return "angry";
  }

  function summarizeReasonCode(code) {
    if (!code) return "the team";
    return code
      .replace(/_/g, " ")
      .replace(/^(rb|ol|dl|lb|cb|wr|qb|te|edge)\b/, (m) => m.toUpperCase());
  }

  function pickFrom(arr, random) {
    if (!arr || !arr.length) return null;
    return arr[Math.floor(random() * arr.length)];
  }

  /**
   * Generate a Voices bundle (one string per perspective).
   * @param {object} args
   *   - pulseScore: 0-100 program temperature
   *   - recentEvents: [{category, severity, summary, reasonCodes}] — used for {phrase}
   *   - perspectives?: subset of PERSPECTIVES (default: all)
   *   - random?: fn
   *   - team?: short name for {team}
   *   - opp?: opponent short name
   * @returns {object} { voices: [{perspective, line, sentiment, sourceCode}] }
   */
  function generateVoices(args) {
    const random = args.random || Math.random;
    const requested = (args.perspectives && args.perspectives.length) ? args.perspectives : PERSPECTIVES;
    const sentiment = sentimentBandFromPulse(args.pulseScore);
    const recent = (args.recentEvents || []).slice(-6);
    const team = args.team || "the program";
    const opp = args.opp || "the opponent";

    const voices = requested.map((perspective) => {
      const tplBucket = TEMPLATES[perspective] || TEMPLATES.fans;
      const tpls = tplBucket[sentiment] || tplBucket.neutral;
      const tpl = pickFrom(tpls, random);
      let phrase = "the team's recent results";
      let sourceCode = null;
      const sourceEvent = pickFrom(recent, random);
      if (sourceEvent) {
        const code = pickFrom(sourceEvent.reasonCodes || [], random);
        if (code) {
          phrase = summarizeReasonCode(code);
          sourceCode = code;
        } else if (sourceEvent.summary) {
          phrase = sourceEvent.summary;
          sourceCode = sourceEvent.category || null;
        }
      }
      const line = tpl
        .replace(/\{phrase\}/g, phrase)
        .replace(/\{team\}/g, team)
        .replace(/\{opp\}/g, opp);
      return { perspective, sentiment, line, sourceCode };
    });

    return { voices, sentiment };
  }

  /**
   * Generate one curated clipping (newspaper-style headline + blurb).
   */
  function generateClipping(args) {
    const random = args.random || Math.random;
    const source = args.source || pickFrom(CLIPPING_SOURCES, random);
    const sentiment = sentimentBandFromPulse(args.pulseScore || 50);
    const event = (args.recentEvents || []).slice(-1)[0];
    const phrase = event && event.reasonCodes && event.reasonCodes.length
      ? summarizeReasonCode(event.reasonCodes[0])
      : (event && event.summary) || "the program";
    const week = event && event.week ? `Week ${event.week}` : "";

    const headlines = {
      euphoric: [
        `Statement Win Reframes the Season`,
        `The Program Suddenly Looks Different`,
        `${phrase}: A Turning Point`,
      ],
      positive: [
        `Quiet Confidence Builds Around the Program`,
        `${phrase} Powers a Step Forward`,
        `Notebook: Why This Week Mattered`,
      ],
      neutral: [
        `Holding Pattern: ${phrase}`,
        `Steady Week, Bigger Questions Loom`,
        `Notebook: ${phrase}`,
      ],
      negative: [
        `Frustration Grows: ${phrase} Under Scrutiny`,
        `Hard Questions Ahead After ${phrase}`,
        `${phrase} Becomes the Story`,
      ],
      angry: [
        `Crisis or Correction? ${phrase} Demands Answers`,
        `${phrase}: How Did We Get Here?`,
        `Patience Running Out Over ${phrase}`,
      ],
    };
    const headline = pickFrom(headlines[sentiment] || headlines.neutral, random);

    const bodies = {
      euphoric: `${source.label} leads coverage on ${phrase}. The mood is unmistakable: this changes the conversation.`,
      positive: `${source.label} highlights ${phrase} as the lead detail. Cautious optimism returns.`,
      neutral: `${source.label} files a measured notebook focused on ${phrase}. No major sentiment shift.`,
      negative: `${source.label} is direct about ${phrase}. Tough questions pile up.`,
      angry:    `${source.label} pulls no punches on ${phrase}. The patience window is closing.`,
    };
    const body = bodies[sentiment] || bodies.neutral;

    return {
      sourceLabel: source.label,
      sourceId: source.id,
      week,
      headline,
      body,
      sentiment,
      sourceCode: event && event.category ? event.category : null,
    };
  }

  /**
   * Generate a Radio Digest — 3 short bullets summarizing fan callers.
   */
  function generateRadioDigest(args) {
    const random = args.random || Math.random;
    const sentiment = sentimentBandFromPulse(args.pulseScore || 50);
    const events = (args.recentEvents || []).slice(-5);
    const phrases = events.map((e) =>
      (e.reasonCodes && e.reasonCodes.length) ? summarizeReasonCode(e.reasonCodes[0]) : (e.summary || "this week")
    );
    const callerOpenings = {
      euphoric: ["Callers praised", "Callers can't stop replaying", "Hosts agreed about"],
      positive: ["Callers liked", "Several praised", "Hosts pointed to"],
      neutral:  ["Callers wondered about", "A few asked about", "Hosts circled"],
      negative: ["Callers questioned", "Several were frustrated by", "Hosts pressed on"],
      angry:    ["Callers demanded answers about", "Multiple were furious about", "Hosts called out"],
    };
    const lines = [];
    const usedOpenings = new Set();
    const opens = callerOpenings[sentiment] || callerOpenings.neutral;
    for (let i = 0; i < Math.min(3, phrases.length); i++) {
      let open;
      let safety = 0;
      do { open = pickFrom(opens, random); safety++; } while (usedOpenings.has(open) && safety < 5);
      usedOpenings.add(open);
      lines.push(`${open} ${phrases[i]}.`);
    }
    if (!lines.length) {
      lines.push("Callers were measured; no major theme emerged.");
    }
    return { sentiment, lines };
  }

  global.CGM_VOICES = {
    PERSPECTIVES,
    sentimentBandFromPulse,
    generateVoices,
    generateClipping,
    generateRadioDigest,
    summarizeReasonCode,
  };
})(window);
