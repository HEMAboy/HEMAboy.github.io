import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

export const CANONICAL_DATA_ROOT = path.join(projectRoot, "data", "tire-pressure");
export const DATA_FILES = [
  "overview.json",
  "reports.json",
  "dashboard.json",
  "technology.json",
];

const FILE_TO_SCHEMA = {
  "overview.json": "overview.schema.json",
  "reports.json": "reports.schema.json",
  "dashboard.json": "dashboard.schema.json",
  "technology.json": "technology.schema.json",
};

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidUri(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateValue(value, schema, currentPath, errors) {
  if (!schema) {
    return;
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({
      path: currentPath,
      message: `Expected one of ${schema.enum.join(", ")}`,
    });
    return;
  }

  if (schema.type === "string") {
    if (typeof value !== "string") {
      errors.push({ path: currentPath, message: "Expected string" });
      return;
    }

    if (schema.minLength && value.length < schema.minLength) {
      errors.push({
        path: currentPath,
        message: `Expected at least ${schema.minLength} characters`,
      });
    }

    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push({ path: currentPath, message: `Pattern mismatch: ${schema.pattern}` });
    }

    if (schema.format === "date" && !isValidDate(value)) {
      errors.push({ path: currentPath, message: "Expected YYYY-MM-DD date" });
    }

    if (schema.format === "uri" && !isValidUri(value)) {
      errors.push({ path: currentPath, message: "Expected valid http/https URL" });
    }

    return;
  }

  if (schema.type === "number") {
    if (typeof value !== "number" || Number.isNaN(value)) {
      errors.push({ path: currentPath, message: "Expected number" });
    }
    return;
  }

  if (schema.type === "integer") {
    if (!Number.isInteger(value)) {
      errors.push({ path: currentPath, message: "Expected integer" });
    }
    return;
  }

  if (schema.type === "boolean") {
    if (typeof value !== "boolean") {
      errors.push({ path: currentPath, message: "Expected boolean" });
    }
    return;
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      errors.push({ path: currentPath, message: "Expected array" });
      return;
    }

    if (schema.minItems && value.length < schema.minItems) {
      errors.push({
        path: currentPath,
        message: `Expected at least ${schema.minItems} items`,
      });
    }

    value.forEach((item, index) => {
      validateValue(item, schema.items, `${currentPath}[${index}]`, errors);
    });
    return;
  }

  if (schema.type === "object") {
    if (!isPlainObject(value)) {
      errors.push({ path: currentPath, message: "Expected object" });
      return;
    }

    for (const key of schema.required ?? []) {
      if (!(key in value)) {
        errors.push({
          path: currentPath === "$" ? `$.${key}` : `${currentPath}.${key}`,
          message: "Missing required property",
        });
      }
    }

    const properties = schema.properties ?? {};
    for (const [key, childSchema] of Object.entries(properties)) {
      if (key in value) {
        validateValue(
          value[key],
          childSchema,
          currentPath === "$" ? `$.${key}` : `${currentPath}.${key}`,
          errors,
        );
      }
    }

    for (const key of Object.keys(value)) {
      if (key in properties) {
        continue;
      }

      if (schema.additionalProperties === false) {
        errors.push({
          path: currentPath === "$" ? `$.${key}` : `${currentPath}.${key}`,
          message: "Unexpected property",
        });
        continue;
      }

      if (isPlainObject(schema.additionalProperties)) {
        validateValue(
          value[key],
          schema.additionalProperties,
          currentPath === "$" ? `$.${key}` : `${currentPath}.${key}`,
          errors,
        );
      }
    }
  }
}

async function loadJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function validateFile(dataRoot, fileName) {
  const dataPath = path.join(dataRoot, fileName);
  const schemaPath = path.join(CANONICAL_DATA_ROOT, "schemas", FILE_TO_SCHEMA[fileName]);
  const errors = [];

  try {
    const [data, schema] = await Promise.all([loadJson(dataPath), loadJson(schemaPath)]);
    validateValue(data, schema, "$", errors);
  } catch (error) {
    errors.push({
      path: "$",
      message: error instanceof Error ? error.message : "Unknown validation error",
    });
  }

  return {
    file: fileName,
    valid: errors.length === 0,
    errors,
  };
}

export async function validateDataRoot(dataRoot = CANONICAL_DATA_ROOT) {
  const results = [];

  for (const fileName of DATA_FILES) {
    results.push(await validateFile(dataRoot, fileName));
  }

  return {
    dataRoot,
    valid: results.every((result) => result.valid),
    results,
  };
}

function parseArgs(argv) {
  const args = {
    dataRoot: CANONICAL_DATA_ROOT,
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--data-root" && argv[index + 1]) {
      args.dataRoot = path.resolve(argv[index + 1]);
      index += 1;
    } else if (token === "--json") {
      args.json = true;
    }
  }

  return args;
}

if (process.argv[1] === __filename) {
  const options = parseArgs(process.argv.slice(2));
  const report = await validateDataRoot(options.dataRoot);

  if (options.json || !report.valid) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`Validated ${report.results.length} files in ${report.dataRoot}`);
  }

  process.exit(report.valid ? 0 : 1);
}
