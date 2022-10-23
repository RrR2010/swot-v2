const ERROR_DOCS_PATH = './src/routes/errors-docs.yaml'

import yaml from "js-yaml";
import fs from "fs";

import { ERRORS } from "../types/errors";

function resetErrorSchemas() {
  fs.writeFileSync(ERROR_DOCS_PATH, yaml.dump({
    "components": {
      "errors": {}
    }
  }))
}

function writeErrorExampleSchema(error: any) {
  try {
    let doc = yaml.load(fs.readFileSync(ERROR_DOCS_PATH, 'utf-8'), { json: true }) as any;
    doc.components.errors[error.type] = {
      value: {
        code: error.code,
        type: error.type,
        message: error.exampleMessage,
      }
    };
    fs.writeFileSync(ERROR_DOCS_PATH, yaml.dump(doc));
  } catch (e) {
    console.log(e)
  }
}

export function prepareErrorDocs() {
  resetErrorSchemas();
  for (const [key, value] of Object.entries(ERRORS)) {
    writeErrorExampleSchema(value)
  }
}