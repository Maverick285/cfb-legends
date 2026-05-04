// SCRAPBOOK-1 deeper tests: importance scoring + season compose.
(function registerScrapbookTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const S = global.CGM_SCRAPBOOK;
  if (!RUNNER || !S) return;

  function ev(over) {
    return Object.assign({
      id: "e", category: "game_played", severity: "minor",
      summary: "thing happened", reasonCodes: [], season: 2026, week: 5,
    }, over);
  }

  RUNNER.suite("SCRAPBOOK-1 scoreEvent", (t) => {
    t.test("trivia floor for low-severity ordinary event", (a) => {
      const r = S.scoreEvent(ev({ severity: "trivial" }), {});
      a.equal(r.tier, S.TIER.TRIVIA);
      a.equal(r.tierName, "trivia");
    });
    t.test("HISTORIC reason code auto-tier overrides score floor", (a) => {
      const r = S.scoreEvent(ev({ severity: "minor", reasonCodes: ["national_title_won"] }), {});
      a.equal(r.tier, S.TIER.HISTORIC);
    });
    t.test("rivalry context lifts tier", (a) => {
      const plain = S.scoreEvent(ev({ severity: "notable", reasonCodes: ["rivalry_win"] }), {});
      const ranked = S.scoreEvent(ev({ severity: "notable", reasonCodes: ["rivalry_win"] }), { isRivalry: true, opponentRanked: true });
      a.ok(ranked.score > plain.score);
    });
    t.test("postseason bumps score", (a) => {
      const reg = S.scoreEvent(ev({ severity: "notable" }), {});
      const post = S.scoreEvent(ev({ severity: "notable" }), { isPostseason: true });
      a.ok(post.score > reg.score + 10);
    });
    t.test("blowout margin lifts score", (a) => {
      const close = S.scoreEvent(ev({ severity: "notable" }), { scoreMargin: 7 });
      const blow = S.scoreEvent(ev({ severity: "notable" }), { scoreMargin: 35 });
      a.ok(blow.score > close.score);
    });
    t.test("program-firsts bump auto-major", (a) => {
      const firsts = new Set(["bowl_appearance"]);
      const r = S.scoreEvent(ev({ category: "bowl_appearance", severity: "minor" }), { programFirsts: firsts });
      a.ok(r.tier >= S.TIER.MAJOR);
    });
  });

  RUNNER.suite("SCRAPBOOK-1 season compose", (t) => {
    t.test("topMomentsForSeason filters by minTier and limits", (a) => {
      const events = [
        ev({ id: "1", category: "practice", severity: "trivial" }),
        ev({ id: "2", category: "rivalry_game", severity: "notable", reasonCodes: ["rivalry_win"] }),
        ev({ id: "3", category: "championship", severity: "major", reasonCodes: ["conference_title_won"] }),
        ev({ id: "4", category: "national_title", severity: "historic", reasonCodes: ["national_title_won"] }),
        ev({ id: "5", category: "weekly_game", severity: "minor" }),
      ];
      const top = S.topMomentsForSeason({ events, limit: 3, minTier: S.TIER.NOTABLE });
      a.equal(top.length, 3);
      a.equal(top[0].event.id, "4", "historic ranks first");
      a.ok(top.every((m) => m.tier >= S.TIER.NOTABLE));
    });
    t.test("dedupes by category + actor", (a) => {
      const events = [
        ev({ id: "a", category: "rivalry_game", actorId: "T1", severity: "major", reasonCodes: ["rivalry_win"] }),
        ev({ id: "b", category: "rivalry_game", actorId: "T1", severity: "notable", reasonCodes: ["rivalry_win"] }),
      ];
      const top = S.topMomentsForSeason({ events, limit: 5, minTier: S.TIER.NOTABLE });
      a.equal(top.length, 1, "duplicate category|actor collapsed");
    });
    t.test("composeSeasonPage produces structured page", (a) => {
      const events = [
        ev({ id: "x", severity: "major", reasonCodes: ["conference_title_won"], summary: "Conf champs" }),
        ev({ id: "y", severity: "notable", reasonCodes: ["rivalry_win"], summary: "Rivalry W" }),
      ];
      const moments = S.topMomentsForSeason({ events, limit: 5, minTier: S.TIER.NOTABLE });
      const page = S.composeSeasonPage({ season: 2030, moments, programName: "Lakeview", finalRecord: "11-2" });
      a.equal(page.season, 2030);
      a.equal(page.programName, "Lakeview");
      a.ok(page.pageTitle.includes("2030"));
      a.equal(page.headlines.length, Math.min(3, moments.length));
      a.equal(page.momentCount, moments.length);
    });
  });

  RUNNER.suite("SCRAPBOOK-1 archive compose", (t) => {
    t.test("composeMemoryArchive sorts seasons newest-first + totals", (a) => {
      const pages = [
        { season: 2027, momentCount: 5, historicCount: 0 },
        { season: 2030, momentCount: 8, historicCount: 1 },
        { season: 2028, momentCount: 6, historicCount: 1 },
      ];
      const archive = S.composeMemoryArchive({ pages });
      a.equal(archive.pages[0].season, 2030);
      a.equal(archive.pages[2].season, 2027);
      a.equal(archive.totals.seasons, 3);
      a.equal(archive.totals.moments, 19);
      a.equal(archive.totals.historic, 2);
    });
  });
})(window);
