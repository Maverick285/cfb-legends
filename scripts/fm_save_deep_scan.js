#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const WORKSPACE = path.resolve(__dirname, '..');
const DEFAULT_SAVE = 'C:\\Users\\joshu\\Downloads\\ULTIMATE25SEASONSTART1.fm';
const DEFAULT_DECOMPRESSED = path.join(
  process.env.TEMP || process.env.TMP || path.join(WORKSPACE, 'tmp'),
  'ULTIMATE25SEASONSTART1_decompressed_stream.bin'
);
const OUT_DIR = path.join(WORKSPACE, 'tmp', 'fm-save-scan');
const DOC_PATH = path.join(WORKSPACE, 'docs', 'FM_SAVE_DEEP_SCAN_REPORT.md');

const args = parseArgs(process.argv.slice(2));
const inputPath = path.resolve(args.input || DEFAULT_DECOMPRESSED);
const savePath = path.resolve(args.save || DEFAULT_SAVE);
const maxStrings = Number(args.maxStrings || 250000);
const contextRadius = Number(args.contextRadius || 96);

const TARGETS = [
  'PERSON_HISTORY',
  'PLAYING_HISTORY',
  'NON_PLAYING_HISTORY',
  'PLAYER_STATS_HISTORY',
  'INJURY_HISTORY',
  'PERSON_YEAR_AWARD_HISTORY',
  'COMP_HISTORY',
  'FIXTURE_RECORD',
  'FIXTURE_RESULT',
  'FIXTURE_RULES',
  'FIXTURE_TO_PLAY_FULL',
  'FIXTURE_TO_PLAY_QUICK',
  'TEAM_FUTURE_FIXTURE',
  'SQUAD_SELECTION_RULES',
  'TRANSFER_WINDOW',
  'TRANSFER_DEADLINE_DAY',
  'FULL_TRANSFER_OFFER',
  'PAST_TRANSFER',
  'STARTING_FUTURE_TRANSFER',
  'FULL_CONTRACT',
  'CONTRACT_OFFER',
  'LOAN_CONTRACT',
  'TRIAL_CONTRACT',
  'FAILED_CONTRACT_NEGOTIATION_INFO',
  'SCOUTED_PERSON',
  'SCOUTED_TEAM_INFO',
  'INTERACTION_CONVERSATION_HISTORY',
  'INTERACTION_PROMISE',
  'PRESS_CONFERENCE_HISTORY',
  'NEWS_ITEM',
  'MAIL',
  'INBOX',
  'CALENDAR',
  'EVENT',
  'WORLD',
  'RETIREMENT',
  'REGEN',
  'NEWGEN',
  'STAFFING_POLICY',
  'CLUB_FINANCE',
  'NON_PLAYER_ATTRIBUTE_SNAPSHOT',
  'NON_PLAYER_TENDENCY_ARRAY',
  'PLAYER_ATTRIBUTE_SNAPSHOT',
  'PLAYER_PROGRESS_OBSERVATION',
  'INDIVIDUAL_TRAINING_INFO',
  'TACTICAL_TRAINING_DATA',
  'POSITION_TRAINING',
  'DYNAMICS',
  'PROMISE',
  'RELATIONSHIP',
  'RIVALRY',
  'MIGRATION',
  'PATCH',
  'VERSION',
];

const CATEGORY_RULES = {
  history: [/HISTORY/, /AWARD/, /RECORD/],
  calendar_fixture: [/FIXTURE/, /CALENDAR/, /SCHEDULE/, /DATE/, /DEADLINE_DAY/],
  transaction: [/TRANSFER/, /CONTRACT/, /LOAN/, /TRIAL/, /OFFER/, /CLAUSE/, /NEGOTIATION/],
  scouting_recruiting: [/SCOUT/, /RECRUIT/, /YOUTH/, /KNOWLEDGE/, /FOCUS/],
  people_staff: [/PERSON/, /PLAYER/, /NON_PLAYER/, /STAFF/, /MANAGER/, /COACH/],
  relationships_interactions: [/INTERACTION/, /PROMISE/, /RELATION/, /DYNAMICS/, /CONVERSATION/],
  world_rules: [/RULE/, /RULE_GROUP/, /COMP/, /LEAGUE/, /CUP/, /NATION/, /WORLD/],
  finance: [/FINANCE/, /WAGE/, /BUDGET/, /FEE/, /MONEY/, /SALARY/, /VALUE/],
  training_development: [/TRAINING/, /PROGRESS/, /ATTRIBUTE/, /DEVELOPMENT/, /MENTOR/],
  media_news: [/NEWS/, /PRESS/, /MEDIA/, /INBOX/, /MAIL/],
  lifecycle_stability: [/PATCH/, /MIGRATION/, /VERSION/, /RETIRE/, /REGEN/, /NEWGEN/, /CLEANUP/],
};

main();

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let scanPath = inputPath;
  if (!fs.existsSync(scanPath)) {
    scanPath = ensureDecompressed(savePath, inputPath);
  }
  if (!fs.existsSync(scanPath)) {
    throw new Error(`No decompressed save found at ${scanPath}. Pass --input <path> or ensure zstd can decode ${savePath}.`);
  }

  const stat = fs.statSync(scanPath);
  const buffer = fs.readFileSync(scanPath);

  const sectionMarkers = findAll(buffer, Buffer.from('tad.'));
  const sections = summarizeSections(buffer, sectionMarkers);
  const targetHits = collectTargetHits(buffer, TARGETS, contextRadius);
  const asciiStrings = extractAsciiStrings(buffer, maxStrings);
  const tokenCounts = collectTokenCounts(asciiStrings);
  const categorized = categorizeTokens(tokenCounts);
  const clusters = buildClusters(targetHits, 4096);
  const pairings = buildPairings(targetHits, 16384);
  const report = {
    generatedAt: new Date().toISOString(),
    source: scanPath,
    sourceBytes: stat.size,
    sectionMarkers: {
      count: sectionMarkers.length,
      firstOffsets: sectionMarkers.slice(0, 25),
      roughAverageSpacing: sectionMarkers.length > 1 ? Math.round(stat.size / sectionMarkers.length) : null,
    },
    sections,
    targetHits,
    clusters,
    pairings,
    topTokens: tokenCounts.slice(0, 500),
    categorized,
  };

  const jsonPath = path.join(OUT_DIR, 'fm_save_deep_scan.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(DOC_PATH, renderMarkdown(report, jsonPath));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${DOC_PATH}`);
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i++;
    }
  }
  return parsed;
}

function ensureDecompressed(savePath, preferredOutput) {
  if (!fs.existsSync(savePath)) return preferredOutput;
  fs.mkdirSync(path.dirname(preferredOutput), { recursive: true });
  const slicePath = path.join(path.dirname(preferredOutput), 'ULTIMATE25SEASONSTART1_payload_from26.zst');
  const fd = fs.openSync(savePath, 'r');
  const out = fs.openSync(slicePath, 'w');
  const chunk = Buffer.allocUnsafe(16 * 1024 * 1024);
  let position = 26;
  try {
    while (true) {
      const read = fs.readSync(fd, chunk, 0, chunk.length, position);
      if (!read) break;
      fs.writeSync(out, chunk, 0, read);
      position += read;
    }
  } finally {
    fs.closeSync(fd);
    fs.closeSync(out);
  }
  const result = spawnSync('zstd', ['-dc', slicePath], {
    encoding: null,
    maxBuffer: 1024 * 1024,
  });
  if (result.stdout && result.stdout.length > 0) {
    fs.writeFileSync(preferredOutput, result.stdout);
  }
  return preferredOutput;
}

function findAll(buffer, needle) {
  const offsets = [];
  let index = 0;
  while ((index = buffer.indexOf(needle, index)) !== -1) {
    offsets.push(index);
    index += needle.length;
  }
  return offsets;
}

function collectTargetHits(buffer, targets, radius) {
  const hits = {};
  for (const target of targets) {
    const offsets = findAll(buffer, Buffer.from(target, 'ascii'));
    if (!offsets.length) continue;
    hits[target] = {
      count: offsets.length,
      firstOffsets: offsets.slice(0, 30),
      contexts: offsets.slice(0, 8).map((offset) => context(buffer, offset, target.length, radius)),
    };
  }
  return hits;
}

function summarizeSections(buffer, markers) {
  const sections = [];
  for (let i = 0; i < markers.length; i++) {
    const start = markers[i];
    const end = i + 1 < markers.length ? markers[i + 1] : buffer.length;
    const size = end - start;
    const sampleStart = Math.min(buffer.length, start + 4);
    const sampleEnd = Math.min(buffer.length, sampleStart + Math.min(size, 8192));
    const sample = buffer.subarray(sampleStart, sampleEnd);
    let printable = 0;
    let zero = 0;
    let high = 0;
    for (const byte of sample) {
      if (byte >= 32 && byte <= 126) printable++;
      if (byte === 0) zero++;
      if (byte >= 128) high++;
    }
    const text = sanitize(sample.toString('latin1'));
    sections.push({
      index: i,
      start,
      end,
      size,
      printableRatio: sample.length ? round(printable / sample.length, 3) : 0,
      zeroRatio: sample.length ? round(zero / sample.length, 3) : 0,
      highByteRatio: sample.length ? round(high / sample.length, 3) : 0,
      label: inferSectionLabel(text, sample, size),
      sample: text.slice(0, 180),
    });
  }
  return {
    count: sections.length,
    largest: sections.slice().sort((a, b) => b.size - a.size).slice(0, 30),
    byLabel: summarizeByLabel(sections),
    early: sections.slice(0, 40),
  };
}

function round(value, places) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function inferSectionLabel(text, sample, size) {
  if (/SMALL_OBJECT_POOL/.test(text)) return 'object-pool-dictionary';
  if (/MALE|FEMALE/.test(text) && text.includes(',')) return 'person-name-or-demographic-table';
  if (/^[\\x20-\\x7E\\s,.'-]{80,}$/.test(text) && /[A-Za-z]/.test(text)) return 'string-table';
  if (size > 50 * 1024 * 1024) return 'large-packed-record-block';
  const zeroes = sample.filter ? 0 : null;
  if (sample.length) {
    let printable = 0;
    let zero = 0;
    for (const byte of sample) {
      if (byte >= 32 && byte <= 126) printable++;
      if (byte === 0) zero++;
    }
    if (printable / sample.length > 0.5) return 'readable-metadata';
    if (zero / sample.length > 0.25) return 'sparse-binary-records';
  }
  return 'binary-records';
}

function summarizeByLabel(sections) {
  const grouped = new Map();
  for (const section of sections) {
    const current = grouped.get(section.label) || { label: section.label, count: 0, bytes: 0, examples: [] };
    current.count++;
    current.bytes += section.size;
    if (current.examples.length < 5) {
      current.examples.push({ index: section.index, start: section.start, size: section.size });
    }
    grouped.set(section.label, current);
  }
  return [...grouped.values()].sort((a, b) => b.bytes - a.bytes || b.count - a.count);
}

function context(buffer, offset, length, radius) {
  const start = Math.max(0, offset - radius);
  const end = Math.min(buffer.length, offset + length + radius);
  return sanitize(buffer.subarray(start, end).toString('latin1'));
}

function sanitize(value) {
  return value
    .replace(/[^\x20-\x7E]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 260);
}

function extractAsciiStrings(buffer, limit) {
  const strings = [];
  let start = -1;
  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    const printable = byte >= 32 && byte <= 126;
    if (printable && start === -1) start = i;
    if ((!printable || i === buffer.length - 1) && start !== -1) {
      const end = printable && i === buffer.length - 1 ? i + 1 : i;
      if (end - start >= 4) {
        strings.push(buffer.subarray(start, end).toString('ascii'));
        if (strings.length >= limit) break;
      }
      start = -1;
    }
  }
  return strings;
}

function collectTokenCounts(strings) {
  const counts = new Map();
  const tokenRegex = /[A-Z][A-Z0-9_]{3,}/g;
  for (const value of strings) {
    const matches = value.match(tokenRegex);
    if (!matches) continue;
    for (const match of matches) {
      if (/^[0-9_]+$/.test(match)) continue;
      counts.set(match, (counts.get(match) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([token, count]) => ({ token, count }))
    .sort((a, b) => b.count - a.count || a.token.localeCompare(b.token));
}

function categorizeTokens(tokenCounts) {
  const categorized = {};
  for (const category of Object.keys(CATEGORY_RULES)) categorized[category] = [];
  for (const entry of tokenCounts) {
    for (const [category, rules] of Object.entries(CATEGORY_RULES)) {
      if (rules.some((rule) => rule.test(entry.token))) {
        categorized[category].push(entry);
      }
    }
  }
  for (const category of Object.keys(categorized)) {
    categorized[category] = categorized[category].slice(0, 80);
  }
  return categorized;
}

function buildClusters(targetHits, windowSize) {
  const points = [];
  for (const [target, hit] of Object.entries(targetHits)) {
    for (const offset of hit.firstOffsets) points.push({ target, offset });
  }
  points.sort((a, b) => a.offset - b.offset);
  const clusters = [];
  for (const point of points) {
    const last = clusters[clusters.length - 1];
    if (!last || point.offset - last.end > windowSize) {
      clusters.push({ start: point.offset, end: point.offset, targets: { [point.target]: 1 } });
    } else {
      last.end = point.offset;
      last.targets[point.target] = (last.targets[point.target] || 0) + 1;
    }
  }
  return clusters
    .map((cluster) => ({
      start: cluster.start,
      end: cluster.end,
      span: cluster.end - cluster.start,
      targets: Object.entries(cluster.targets)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([target, count]) => ({ target, count })),
    }))
    .filter((cluster) => cluster.targets.length > 1)
    .slice(0, 80);
}

function buildPairings(targetHits, windowSize) {
  const targets = Object.entries(targetHits).map(([target, hit]) => ({
    target,
    offsets: hit.firstOffsets,
  }));
  const pairs = [];
  for (let i = 0; i < targets.length; i++) {
    for (let j = i + 1; j < targets.length; j++) {
      let count = 0;
      for (const a of targets[i].offsets) {
        for (const b of targets[j].offsets) {
          if (Math.abs(a - b) <= windowSize) count++;
        }
      }
      if (count) pairs.push({ a: targets[i].target, b: targets[j].target, count });
    }
  }
  return pairs.sort((a, b) => b.count - a.count || a.a.localeCompare(b.a)).slice(0, 120);
}

function renderMarkdown(report, jsonPath) {
  const categorySections = Object.entries(report.categorized)
    .map(([category, tokens]) => {
      const rows = tokens.slice(0, 35).map((entry) => `- \`${entry.token}\` (${entry.count})`).join('\n');
      return `### ${title(category)}\n\n${rows || '- No high-frequency tokens found.'}`;
    })
    .join('\n\n');

  const targetRows = Object.entries(report.targetHits)
    .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
    .map(([target, hit]) => `| \`${target}\` | ${hit.count} | ${hit.firstOffsets.slice(0, 5).join(', ')} |`)
    .join('\n');

  const labelRows = report.sections.byLabel
    .map((item) => {
      const examples = item.examples.map((example) => `#${example.index}@${example.start}`).join(', ');
      return `| ${item.label} | ${item.count} | ${item.bytes.toLocaleString('en-US')} | ${examples} |`;
    })
    .join('\n');

  const largeSectionRows = report.sections.largest
    .slice(0, 20)
    .map((section) => `| ${section.index} | ${section.start} | ${section.size.toLocaleString('en-US')} | ${section.label} | ${section.printableRatio} | ${section.zeroRatio} | ${section.sample.replaceAll('|', '\\|')} |`)
    .join('\n');

  const clusterRows = report.clusters
    .slice(0, 25)
    .map((cluster) => {
      const labels = cluster.targets.map((item) => `${item.target} (${item.count})`).join(', ');
      return `| ${cluster.start} | ${cluster.end} | ${cluster.span} | ${labels} |`;
    })
    .join('\n');

  const pairRows = report.pairings
    .slice(0, 40)
    .map((pair) => `| \`${pair.a}\` | \`${pair.b}\` | ${pair.count} |`)
    .join('\n');

  return `# FM Save Deep Scan Report

Date: ${report.generatedAt.slice(0, 10)}

Purpose: extract architecture-level reference from the decompressed FM save without copying proprietary content. This report inventories structural tokens, subsystem clusters, and table/store co-occurrences that can guide Campus Gridiron Manager.

Source:

- \`${report.source}\`
- bytes scanned: \`${report.sourceBytes.toLocaleString('en-US')}\`
- full JSON report: \`${jsonPath}\`

## Container Structure

- \`tad.\` section markers found: \`${report.sectionMarkers.count.toLocaleString('en-US')}\`
- rough average marker spacing: \`${report.sectionMarkers.roughAverageSpacing ? report.sectionMarkers.roughAverageSpacing.toLocaleString('en-US') : 'n/a'}\` bytes
- first marker offsets: \`${report.sectionMarkers.firstOffsets.join(', ')}\`

## Section Shape

| Inferred section type | Sections | Bytes | Examples |
| --- | ---: | ---: | --- |
${labelRows}

## Largest Sections

| Index | Offset | Size | Inferred type | Printable ratio | Zero ratio | Sample |
| ---: | ---: | ---: | --- | ---: | ---: | --- |
${largeSectionRows}

## Target Store Hits

| Store or subsystem token | Hits | First offsets |
| --- | ---: | --- |
${targetRows}

## Nearby Subsystem Clusters

These clusters are not schema proof by themselves. They show which named stores/subsystems appear near each other in the binary and are useful leads for our architecture.

| Start | End | Span | Targets |
| ---: | ---: | ---: | --- |
${clusterRows || '| n/a | n/a | n/a | n/a |'}

## Frequent Target Pairings

| Token A | Token B | Near hits |
| --- | --- | ---: |
${pairRows || '| n/a | n/a | 0 |'}

## Token Inventory By Domain

${categorySections}

## Implementation Implications For CGM

- Treat save data as subsystem-owned records: person history, playing history, non-playing history, awards, injuries, competition history, fixtures, transfers, contracts, scouting, training, finance, and interactions should not be collapsed into one large entity blob.
- Keep append-only history separate from current state. The FM save exposes distinct history families rather than deriving everything from current player/team values.
- Model world stability as explicit migration and repair systems. The save exposes many patch/migration terms, which points to versioned fixups as a normal part of long-running saves.
- Make transactions first-class records. Contracts, transfer offers, past transfers, future transfers, loans, trials, and failed negotiations are durable objects, not temporary UI state.
- Separate calendar queues from completed history. Future fixtures, fixtures to play, fixture results, deadlines, and windows appear as different records.
- Keep staff/non-player data parallel to player data. Non-player snapshots and tendency arrays are distinct enough to deserve their own stores.
`;
}

function title(value) {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
