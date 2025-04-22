import * as path from 'node:path';
import * as fs from 'node:fs';
import { Field } from "../../../language/generated/ast.js";
import { expandToNode, toString } from 'langium/generate';
import { FilePathData } from '../../cli-util.js';
// @ts-ignore
import pluralize from 'pluralize';

const dataTypes = {
  'STRING': 'string',
  'INT': 'int'
}

export default function generateSrc(name: string, fields: Array<Field>, data: FilePathData): void {
  const dest = data.destination + `/src`;
  const generatedFilePath = `${path.join(dest, name)}.php`;

  const tablename = pluralize(name.toLowerCase());

  const funcParams = fields.map(field => `${dataTypes[field.type]} $${field.name}`).join(', ');
  const execParams = fields.map(field => `$${field.name}`).join(', ');
  const insertParams = fields.map(field => `${field.name}`).join(', ');
  const insertValues = fields.map(_ => '?').join(', ');
  const updateParams = fields.map(field => `${field.name} = ?`).join(', ');

  const fileNode = expandToNode`
    <?php

    namespace App;

    use PDO;

    class ${name}
    {
      public static function find(int $id)
      {
        $pdo = Database::connect();
        $stmt = $pdo->prepare("SELECT * FROM ${tablename} WHERE id = ?");
        $stmt->execute([$id]);

        return $stmt->fetch(PDO::FETCH_OBJ);
      }

      public static function create(${funcParams}): void
      {
        $pdo = Database::connect();
        $stmt = $pdo->prepare("INSERT INTO ${tablename} (${insertParams}) VALUES (${insertValues})");
        $stmt->execute([${execParams}]);
      }

      public static function edit(int $id, ${funcParams}): void
      {
        $pdo = Database::connect();
        $stmt = $pdo->prepare("UPDATE ${tablename} SET ${updateParams} WHERE id = ?");
        $stmt->execute([${execParams}, $id]);
      }

      public static function delete(int $id)
      {
        $pdo = Database::connect();
        $stmt = $pdo->prepare("DELETE FROM ${tablename} WHERE id = ?");
        $stmt->execute([$id]);
      }
    }
    `.appendNewLineIfNotEmpty();

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.writeFileSync(generatedFilePath, toString(fileNode));
}
