import * as fs from 'node:fs';
import * as path from 'node:path';
import { Model } from "../../../language/generated/ast.js";
import { expandToNode, toString } from 'langium/generate';
import { FilePathData } from '../../cli-util.js';
// @ts-ignore
import pluralize from 'pluralize';

export default function generateSchema(model: Model, data: FilePathData): void {
  const dest = data.destination + '/database';
  const generatedFilePath = `${path.join(dest, 'schema')}.sql`;

  const dataTypes = {
    'STRING': 'TEXT',
    'INT': 'INTERGER'
  }

  let tables = '';

  model.entities.forEach((entity) => {
    const tablename = pluralize(entity.name.toLowerCase());

    tables += `CREATE TABLE ${tablename} (\n\tid INTEGER PRIMARY KEY AUTOINCREMENT`;

    entity.fields.forEach((field) => {
      const type = dataTypes[field.type]

      tables += `,\n\t${field.name} ${type} NOT NULL`;
    });

    tables += '\n);\n\n';
  });

  const fileNode = expandToNode`
    -- schema.sql
    ${tables}
  `.appendNewLineIfNotEmpty();

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.writeFileSync(generatedFilePath, toString(fileNode));
}
