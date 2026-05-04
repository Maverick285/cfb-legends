// MEDIA-1 tests: sentiment bands, voice generation, clippings, radio digest.
(function registerVoicesTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const V = global.CGM_VOICES;
  if (!RUNNER || !V) return;

  RUNNER.suite("MEDIA-1 sentiment bands", (t) => {
    t.test("pulseScore maps to sentiment", (a) => {
      a.equal(V.sentimentBandFromPulse(95), "euphoric");
      a.equal(V.sentimentBandFromPulse(70), "positive");
      a.equal(V.sentimentBandFromPulse(50), "neutral");
      a.equal(V.sentimentBandFromPulse(30), "negative");
      a.equal(V.sentimentBandFromPulse(10), "angry");
    });
  });

  RUNNER.suite("MEDIA-1 voices generator", (t) => {
    t.test("returns one line per requested perspective", (a) => {
      const r = V.generateVoices({
        pulseScore: 70,
        recentEvents: [{ category: "game_played", reasonCodes: ["red_zone_efficient"], summary: "Big win" }],
        random: () => 0.5,
      });
      a.equal(r.voices.length, V.PERSPECTIVES.length);
      a.ok(r.voices.every((v) => typeof v.line === "string" && v.line.length > 5));
      a.equal(r.sentiment, "positive");
    });
    t.test("respects perspectives subset", (a) => {
      const r = V.generateVoices({
        pulseScore: 50,
        recentEvents: [],
        perspectives: ["staff", "fans"],
        random: () => 0.0,
      });
      a.equal(r.voices.length, 2);
      a.equal(r.voices[0].perspective, "staff");
      a.equal(r.voices[1].perspective, "fans");
    });
    t.test("substitutes phrase from event reason code", (a) => {
      const r = V.generateVoices({
        pulseScore: 25,
        recentEvents: [{ reasonCodes: ["fourth_quarter_collapse"] }],
        perspectives: ["fans"],
        random: () => 0.0,
      });
      a.ok(r.voices[0].line.includes("fourth quarter collapse"), "reason code rendered");
      a.equal(r.voices[0].sourceCode, "fourth_quarter_collapse");
    });
    t.test("euphoric sentiment yields different line than angry for same perspective", (a) => {
      const happy = V.generateVoices({ pulseScore: 95, recentEvents: [], perspectives: ["fans"], random: () => 0.0 });
      const sad = V.generateVoices({ pulseScore: 5, recentEvents: [], perspectives: ["fans"], random: () => 0.0 });
      a.ok(happy.voices[0].line !== sad.voices[0].line);
      a.equal(happy.voices[0].sentiment, "euphoric");
      a.equal(sad.voices[0].sentiment, "angry");
    });
  });

  RUNNER.suite("MEDIA-1 clippings", (t) => {
    t.test("clipping has source label, headline, body", (a) => {
      const c = V.generateClipping({
        pulseScore: 65,
        recentEvents: [{ category: "game_played", reasonCodes: ["explosive_pass_play"], week: 7 }],
        random: () => 0.3,
      });
      a.ok(c.sourceLabel.length > 0);
      a.ok(c.headline.length > 0);
      a.ok(c.body.length > 10);
      a.equal(c.sentiment, "positive");
    });
    t.test("angry sentiment produces tougher headline language", (a) => {
      const ang = V.generateClipping({ pulseScore: 5, recentEvents: [{ reasonCodes: ["red_zone_failures"] }], random: () => 0.5 });
      a.ok(/Crisis|How Did|Patience/i.test(ang.headline) || /pulls no punches|patience window/i.test(ang.body), "angry tone present");
    });
  });

  RUNNER.suite("MEDIA-1 radio digest", (t) => {
    t.test("returns up to 3 caller bullets", (a) => {
      const d = V.generateRadioDigest({
        pulseScore: 60,
        recentEvents: [
          { reasonCodes: ["dl_run_stop_win"] },
          { reasonCodes: ["red_zone_efficient"] },
          { reasonCodes: ["fourth_down_conversion"] },
        ],
        random: () => 0.0,
      });
      a.equal(d.lines.length, 3);
      a.ok(d.lines.every((l) => l.endsWith(".")));
    });
    t.test("empty events still produces a fallback line", (a) => {
      const d = V.generateRadioDigest({ pulseScore: 50, recentEvents: [], random: () => 0.0 });
      a.equal(d.lines.length, 1);
      a.ok(d.lines[0].length > 5);
    });
    t.test("angry sentiment uses demand language", (a) => {
      const d = V.generateRadioDigest({
        pulseScore: 5,
        recentEvents: [{ reasonCodes: ["fourth_quarter_collapse"] }],
        random: () => 0.0,
      });
      a.ok(/demanded|furious|called out/i.test(d.lines[0]), "angry caller opener present");
    });
  });
})(window);
