// The Excuse That Almost Works — writes the one line a gamer texts the boss.
// Deterministic: same bytes every run. Standard library only.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const EXCUSE = "won't be in today, my water heater died this morning and the plumber's window is 8am to 8pm";

// Mirror of the house gate: UTF-8, 1..140 chars, not only white space, <= 20 words.
const chars = [...EXCUSE].length;
const words = EXCUSE.trim().split(/\s+/).length;
if (EXCUSE.length < 1 || EXCUSE.length > 140 || EXCUSE.trim() === '') {
  console.error(`entry fails the gate: ${EXCUSE.length} chars`);
  process.exit(1);
}
if (words > 20 || chars !== EXCUSE.length) {
  console.error(`entry fails the word cap: ${words} words`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), EXCUSE + '\n', 'utf8');
