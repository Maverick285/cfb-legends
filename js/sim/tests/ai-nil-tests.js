// AI-NIL-1 tests: bidding math + interest bumps + weekly tick.
(function registerAiNilTests(global) {
  const RUNNER = global.CGM_TEST_RUNNER;
  const N = global.CGM_AI_NIL;
  if (!RUNNER || !N) return;

  RUNNER.suite("AI-NIL-1 computeBid", (t) => {
    t.test("dry pool → no bid", (a) => {
      const r = N.computeBid({
        school: { id: "s", nilStateMillions: 0.01 },
        prospect: { id: "p", ovr: 88, stars: 4, preferences: { nil: 0.7 } },
        existingInterest: 80, random: () => 0.5,
      });
      a.equal(r, null);
    });
    t.test("low interest → no bid", (a) => {
      const r = N.computeBid({
        school: { id: "s", nilStateMillions: 5 },
        prospect: { id: "p", ovr: 88, stars: 4, preferences: { nil: 0.7 } },
        existingInterest: 20, random: () => 0.5,
      });
      a.equal(r, null);
    });
    t.test("walk-on profile → no bid", (a) => {
      const r = N.computeBid({
        school: { id: "s", nilStateMillions: 5 },
        prospect: { id: "p", ovr: 65, stars: 2, preferences: { nil: 0.5 } },
        existingInterest: 60, random: () => 0.5,
      });
      a.equal(r, null);
    });
    t.test("high-interest 5* → meaningful bid", (a) => {
      const r = N.computeBid({
        school: { id: "s", nilStateMillions: 8 },
        prospect: { id: "p", ovr: 92, stars: 5, preferences: { nil: 0.8 } },
        existingInterest: 85, random: () => 0.5,
      });
      a.ok(r != null, "produces a bid");
      a.ok(r.amountM >= 0.3, `amount ${r.amountM} ≥ 0.3M`);
      a.ok(r.reasonCodes.includes("ai_priority_target"));
    });
    t.test("bid never exceeds 40% of pool", (a) => {
      let s = 1;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      let max = 0;
      for (let i = 0; i < 50; i++) {
        const r = N.computeBid({
          school: { id: "s", nilStateMillions: 4 },
          prospect: { id: "p", ovr: 95, stars: 5, preferences: { nil: 0.9 } },
          existingInterest: 90, random: rand,
        });
        if (r) max = Math.max(max, r.amountM);
      }
      a.ok(max <= 4 * 0.4 + 0.001, `max ${max} ≤ 1.6 (40% of pool)`);
    });
  });

  RUNNER.suite("AI-NIL-1 interest bump", (t) => {
    t.test("matching expected → moderate bump", (a) => {
      const exp = N.expectedNilForOvrStars(85, 4);
      const bump = N.interestBumpFromBid(exp, { ovr: 85, stars: 4, preferences: { nil: 0.7 } });
      a.ok(bump >= 4 && bump <= 9, `expected bump ${bump} in [4,9]`);
    });
    t.test("overpay → bigger bump", (a) => {
      const exp = N.expectedNilForOvrStars(85, 4);
      const small = N.interestBumpFromBid(exp * 0.5, { ovr: 85, stars: 4, preferences: { nil: 0.7 } });
      const big = N.interestBumpFromBid(exp * 1.5, { ovr: 85, stars: 4, preferences: { nil: 0.7 } });
      a.ok(big > small + 2);
    });
    t.test("nil-motivated prospect amplifies bump", (a) => {
      const amount = N.expectedNilForOvrStars(85, 4);
      const lowPref = N.interestBumpFromBid(amount, { ovr: 85, stars: 4, preferences: { nil: 0.2 } });
      const highPref = N.interestBumpFromBid(amount, { ovr: 85, stars: 4, preferences: { nil: 0.95 } });
      a.ok(highPref > lowPref);
    });
  });

  RUNNER.suite("AI-NIL-1 bidding round", (t) => {
    t.test("multiple bidders sort desc by amount", (a) => {
      let s = 7;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const round = N.runBiddingRound({
        prospect: { id: "p1", ovr: 90, stars: 5, preferences: { nil: 0.8 } },
        bidders: [
          { school: { id: "rich", nilStateMillions: 12 }, existingInterest: 80 },
          { school: { id: "mid",  nilStateMillions: 5 },  existingInterest: 70 },
          { school: { id: "poor", nilStateMillions: 1 },  existingInterest: 65 },
        ],
        random: rand,
      });
      a.ok(round.bids.length >= 2);
      for (let i = 0; i < round.bids.length - 1; i++) {
        a.ok(round.bids[i].amountM >= round.bids[i + 1].amountM, "sorted desc");
      }
      a.equal(round.summary.topSchoolId, "rich", "biggest pool wins");
    });
    t.test("low-interest bidders excluded from bids", (a) => {
      const round = N.runBiddingRound({
        prospect: { id: "p1", ovr: 88, stars: 4, preferences: { nil: 0.7 } },
        bidders: [
          { school: { id: "real", nilStateMillions: 6 }, existingInterest: 80 },
          { school: { id: "weak", nilStateMillions: 6 }, existingInterest: 20 },
        ],
        random: () => 0.5,
      });
      const ids = round.bids.map((b) => b.schoolId);
      a.ok(ids.includes("real"));
      a.ok(!ids.includes("weak"));
    });
  });

  RUNNER.suite("AI-NIL-1 weekly tick", (t) => {
    t.test("aggregates bids across prospects + reports total", (a) => {
      let s = 11;
      const rand = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      const result = N.runWeeklyBiddingTick({
        prospects: [
          { id: "p1", ovr: 92, stars: 5, preferences: { nil: 0.8 }, suitors: [
            { schoolId: "A", interest: 80 }, { schoolId: "B", interest: 70 },
          ]},
          { id: "p2", ovr: 80, stars: 3, preferences: { nil: 0.4 }, suitors: [
            { schoolId: "A", interest: 65 },
          ]},
        ],
        schoolIndex: {
          A: { id: "A", nilStateMillions: 8 },
          B: { id: "B", nilStateMillions: 4 },
        },
        random: rand,
      });
      a.ok(result.totalBids >= 2);
      a.ok(result.totalSpentM > 0);
      a.equal(result.rounds.length, 2);
    });
  });
})(window);
