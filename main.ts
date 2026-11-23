// letter-coffee-tea: writes the one-letter answer "A" (coffee) to /output/entry.txt.
// The competition asks exactly one letter: A for coffee, B for tea. Coffee wins
// the argument for a general audience — it is the morning ritual, the drink that
// starts the day and powers work, the honest default answer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.txt");
const text = readFileSync(source, "utf8");

if (text.length !== 1 || text.trim() === "") {
  throw new Error(
    `entry.txt must hold exactly one non-whitespace letter, got ${text.length} chars`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, text, "utf8");

// Read the file back so a bad write is caught here, not by the grader.
const back = readFileSync(target, "utf8");
if (back !== text) {
  throw new Error("verification failed: output does not match entry.txt");
}
