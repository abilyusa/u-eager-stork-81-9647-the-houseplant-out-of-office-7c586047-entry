// The Houseplant Out-of-Office — one line, written to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output). Gate: UTF-8 text, 1-120 characters, not whitespace-only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office. The human who waters me is out of office too. We are both dying, slowly, in different ways.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-120 characters,
// not whitespace-only. Count code points (not UTF-16 units) and fail loudly.
const len = [...LINE].length;
if (len < 1 || len > 120 || LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error(`entry violates gate: ${len} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
