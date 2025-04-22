import * as path from 'node:path';
import * as fs from 'node:fs';
import { expandToNode, toString } from 'langium/generate';
import { FilePathData } from '../../cli-util.js';

export default function generateDatabase(data: FilePathData): void {
  const dest = data.destination + `/src`;
  const generatedFilePath = `${path.join(dest, 'Database')}.php`;

  const fileNode = expandToNode`
    <?php

    namespace App;

    use PDO;

    class Database
    {
      public static function connect(): PDO
      {
        return new PDO('sqlite:' . __DIR__ . '/../database/database.sqlite');
      }
    }
    `.appendNewLineIfNotEmpty();

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.writeFileSync(generatedFilePath, toString(fileNode));
}
