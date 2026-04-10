import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import {
  CANONICAL_DATA_ROOT,
  DATA_FILES,
  validateDataRoot,
} from "./validate-tire-pressure-data.mjs";

const __filename = fileURLToPath(import.meta.url);

function parseArgs(argv) {
  const args = {
    source: path.join(CANONICAL_DATA_ROOT, "incoming"),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--source" && argv[index + 1]) {
      args.source = path.resolve(argv[index + 1]);
      index += 1;
    }
  }

  return args;
}

async function ensureDirectory(directory) {
  await fs.mkdir(directory, { recursive: true });
}

if (process.argv[1] === __filename) {
  const { source } = parseArgs(process.argv.slice(2));
  const report = await validateDataRoot(source);

  if (!report.valid) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(CANONICAL_DATA_ROOT, "archive", timestamp);

  await ensureDirectory(backupDir);

  for (const fileName of DATA_FILES) {
    const canonicalPath = path.join(CANONICAL_DATA_ROOT, fileName);
    const sourcePath = path.join(source, fileName);

    await fs.copyFile(canonicalPath, path.join(backupDir, fileName));
    await fs.copyFile(sourcePath, canonicalPath);
  }

  console.log(
    JSON.stringify(
      {
        published: true,
        source,
        destination: CANONICAL_DATA_ROOT,
        backupDir,
        files: DATA_FILES,
      },
      null,
      2,
    ),
  );
}
