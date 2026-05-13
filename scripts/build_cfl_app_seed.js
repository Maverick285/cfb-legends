const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PACK_ROOT = path.join(ROOT, "cfl_full_scale_seed_data_v0_1", "cfl_seed_data_pack");
const JSON_ROOT = path.join(PACK_ROOT, "json");
const REPORT_DIR = path.join(ROOT, "cfl-app", "reports");
const PUBLIC_SEED_DIR = path.join(ROOT, "cfl-app", "public", "seed");
const TARGET_SCHOOL_NAME = "Vanderbilt";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(PACK_ROOT, relativePath), "utf8"));
}

function by(rows, key) {
  const map = new Map();
  for (const row of rows) map.set(row[key], row);
  return map;
}

function groupBy(rows, key) {
  const map = new Map();
  for (const row of rows) {
    const value = row[key];
    if (!map.has(value)) map.set(value, []);
    map.get(value).push(row);
  }
  return map;
}

function uniqueColumns(rows) {
  const columns = new Set();
  for (const row of rows.slice(0, 50)) {
    Object.keys(row).forEach((column) => columns.add(column));
  }
  return [...columns];
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function fail(report, message, detail = {}) {
  report.validationErrors.push({ message, ...detail });
}

function main() {
  ensureDir(REPORT_DIR);
  ensureDir(PUBLIC_SEED_DIR);

  const manifest = readJson("manifest.json");
  const report = {
    generatedAt: new Date().toISOString(),
    packRoot: PACK_ROOT,
    targetProgramId: null,
    tables: [],
    validationErrors: [],
    validationWarnings: [],
    qualityGates: {},
    demoBundle: {},
  };

  const tables = {};
  for (const entry of manifest) {
    const jsonPath = path.join(PACK_ROOT, entry.json);
    if (!fs.existsSync(jsonPath)) {
      fail(report, "Manifest JSON file is missing", { table: entry.table, json: entry.json });
      tables[entry.table] = [];
      continue;
    }
    const rows = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    tables[entry.table] = rows;
    const columns = uniqueColumns(rows);
    report.tables.push({
      table: entry.table,
      expectedRows: entry.rows,
      actualRows: rows.length,
      expectedColumns: entry.columns,
      observedColumns: columns.length,
      columns,
      status: rows.length === entry.rows ? "pass" : "fail",
    });
    if (rows.length !== entry.rows) {
      fail(report, "Table row count does not match manifest", {
        table: entry.table,
        expectedRows: entry.rows,
        actualRows: rows.length,
      });
    }
  }

  const programsById = by(tables.programs, "programId");
  const schoolsById = by(tables.schools, "schoolId");
  const peopleById = by(tables.people, "personId");
  const athleteProfilesByPersonId = by(tables.athlete_profiles, "personId");
  const ratingsByPersonId = by(tables.player_ratings, "personId");
  const programNilByProgramId = by(tables.program_nil, "programId");
  const stadiumsBySchoolId = by(tables.stadiums, "schoolId");
  const brandsBySchoolId = by(tables.team_brands, "schoolId");
  const uniformsBySchoolId = groupBy(tables.uniforms, "schoolId");
  const rosterByProgramId = groupBy(tables.roster_memberships, "programId");
  const traitsByPersonId = groupBy(tables.player_traits, "personId");
  const nilByPersonId = by(tables.athlete_nil, "personId");
  const scheduleByProgramId = groupBy(tables.schedules, "programId");
  const gamesById = by(tables.games, "gameId");
  const staffByProgramId = groupBy(tables.staff_assignments, "programId");
  const coachesByPersonId = by(tables.coach_profiles, "personId");

  report.qualityGates.programCount = tables.programs.length === 138 ? "pass" : "fail";
  if (tables.programs.length !== 138) {
    fail(report, "Expected 138 programs", { actualPrograms: tables.programs.length });
  }

  for (const program of tables.programs) {
    const roster = rosterByProgramId.get(program.programId) || [];
    if (roster.length !== 105) {
      fail(report, "Program does not have exactly 105 roster memberships", {
        programId: program.programId,
        actualRosterCount: roster.length,
      });
    }
    if (!programNilByProgramId.has(program.programId)) {
      fail(report, "Program is missing NIL row", { programId: program.programId });
    }
    const school = schoolsById.get(program.schoolId);
    if (!school) {
      fail(report, "Program references missing school", { programId: program.programId, schoolId: program.schoolId });
      continue;
    }
    if (!stadiumsBySchoolId.has(school.schoolId)) {
      fail(report, "Program school is missing stadium row", { programId: program.programId, schoolId: school.schoolId });
    }
    if (!brandsBySchoolId.has(school.schoolId)) {
      fail(report, "Program school is missing team brand row", { programId: program.programId, schoolId: school.schoolId });
    }
    if ((uniformsBySchoolId.get(school.schoolId) || []).length === 0) {
      fail(report, "Program school is missing uniform rows", { programId: program.programId, schoolId: school.schoolId });
    }
  }

  for (const membership of tables.roster_memberships) {
    if (!programsById.has(membership.programId)) {
      fail(report, "Roster membership references missing program", membership);
    }
    if (!peopleById.has(membership.personId)) {
      fail(report, "Roster membership references missing person", membership);
    }
    if (!athleteProfilesByPersonId.has(membership.personId)) {
      fail(report, "Rostered athlete is missing athlete profile", membership);
    }
    if (!ratingsByPersonId.has(membership.personId)) {
      fail(report, "Rostered athlete is missing ratings row", membership);
    }
  }

  for (const schedule of tables.schedules) {
    if (!programsById.has(schedule.programId)) fail(report, "Schedule references missing program", schedule);
    if (!programsById.has(schedule.opponentProgramId)) fail(report, "Schedule references missing opponent program", schedule);
    if (!gamesById.has(schedule.gameId)) fail(report, "Schedule references missing game", schedule);
  }

  const targetSchool = tables.schools.find((school) => school.schoolName === TARGET_SCHOOL_NAME) || tables.schools[0];
  const targetProgram = tables.programs.find((program) => program.schoolId === targetSchool.schoolId);
  if (!targetProgram) {
    throw new Error(`Could not find target program for ${targetSchool.schoolName}`);
  }
  report.targetProgramId = targetProgram.programId;

  const conferencesById = by(tables.conferences, "conferenceId");
  const programIndex = tables.programs.map((program) => {
    const school = schoolsById.get(program.schoolId);
    const brand = brandsBySchoolId.get(program.schoolId);
    return {
      programId: program.programId,
      schoolId: program.schoolId,
      schoolName: school ? school.schoolName : program.programId,
      nickname: school ? school.nickname : "",
      abbreviation: school ? school.abbreviation : "",
      conferenceId: program.conferenceId,
      conferenceName: conferencesById.get(program.conferenceId)?.conferenceName || program.conferenceId,
      prestige: program.programPrestige,
      primaryColor: brand?.primaryColor || "#0b2f2a",
      secondaryColor: brand?.secondaryColor || "#d7b56d",
    };
  }).sort((a, b) => a.schoolName.localeCompare(b.schoolName));

  const roster = (rosterByProgramId.get(targetProgram.programId) || [])
    .slice()
    .sort((a, b) => a.rosterSlot - b.rosterSlot)
    .map((membership) => {
      const person = peopleById.get(membership.personId);
      return {
        membership,
        person,
        athlete: athleteProfilesByPersonId.get(membership.personId),
        ratings: ratingsByPersonId.get(membership.personId),
        traits: traitsByPersonId.get(membership.personId) || [],
        nil: nilByPersonId.get(membership.personId) || null,
      };
    });

  const staff = (staffByProgramId.get(targetProgram.programId) || []).map((assignment) => ({
    assignment,
    person: peopleById.get(assignment.personId),
    coach: coachesByPersonId.get(assignment.personId) || null,
  }));

  const schedules = (scheduleByProgramId.get(targetProgram.programId) || []).map((schedule) => {
    const game = gamesById.get(schedule.gameId);
    const opponentProgram = programsById.get(schedule.opponentProgramId);
    const opponentSchool = opponentProgram ? schoolsById.get(opponentProgram.schoolId) : null;
    return {
      schedule,
      game,
      opponent: opponentSchool,
    };
  });

  const demoBundle = {
    generatedAt: report.generatedAt,
    sourcePack: "cfl_full_scale_seed_data_v0_1/cfl_seed_data_pack",
    defaultProgramId: targetProgram.programId,
    programIndex,
    selectedProgram: {
      program: targetProgram,
      school: targetSchool,
      conference: conferencesById.get(targetProgram.conferenceId),
      brand: brandsBySchoolId.get(targetProgram.schoolId),
      stadium: stadiumsBySchoolId.get(targetProgram.schoolId),
      nil: programNilByProgramId.get(targetProgram.programId),
      uniforms: uniformsBySchoolId.get(targetProgram.schoolId) || [],
      roster,
      staff,
      schedules,
    },
  };

  report.demoBundle = {
    file: "cfl-app/public/seed/seed-v0.1-demo.json",
    programId: targetProgram.programId,
    programName: targetSchool.schoolName,
    rosterRows: roster.length,
    staffRows: staff.length,
    scheduleRows: schedules.length,
    programIndexRows: programIndex.length,
  };
  report.qualityGates.everyRosteredProgramHas105Players = report.validationErrors.some((error) => error.message === "Program does not have exactly 105 roster memberships") ? "fail" : "pass";
  report.qualityGates.everyRosteredAthleteHasPeopleProfileRatings = report.validationErrors.some((error) => /Rostered athlete|Roster membership references missing person/.test(error.message)) ? "fail" : "pass";
  report.qualityGates.everyProgramHasNilStadiumBrandUniform = report.validationErrors.some((error) => /NIL|stadium|brand|uniform/.test(error.message)) ? "fail" : "pass";
  report.status = report.validationErrors.length === 0 ? "pass" : "fail";

  fs.writeFileSync(path.join(PUBLIC_SEED_DIR, "seed-v0.1-demo.json"), JSON.stringify(demoBundle, null, 2));
  fs.writeFileSync(path.join(REPORT_DIR, "seed-import-report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(PUBLIC_SEED_DIR, "seed-import-report.json"), JSON.stringify(report, null, 2));

  if (report.status !== "pass") {
    console.error(`FAIL seed import validation: ${report.validationErrors.length} errors`);
    process.exit(1);
  }
  console.log(`PASS seed import validation: ${manifest.length} tables, ${programIndex.length} programs, ${roster.length} ${targetSchool.schoolName} roster rows`);
}

main();
