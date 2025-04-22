import * as path from 'node:path';
import * as fs from 'node:fs';
import { expandToNode, toString } from 'langium/generate';
import { FilePathData } from '../cli-util.js';

export default function generatePhpIni(data: FilePathData): void {
  const dest = data.destination;
  const generatedFilePath = `${path.join(dest, 'php')}.ini`;

  const fileNode = expandToNode`
    extension=pdo_sqlite
    extension=sqlite3
    `.appendNewLineIfNotEmpty();

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.writeFileSync(generatedFilePath, toString(fileNode));
}
