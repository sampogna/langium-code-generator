import * as path from 'node:path';
import * as fs from 'node:fs';
import { expandToNode, toString } from 'langium/generate';
import { FilePathData } from '../../cli-util.js';

export default function destroy(name: string, data: FilePathData): void {
  const dest = data.destination + `/public/${name.toLowerCase()}/delete`;
  const generatedFilePath = `${path.join(dest, 'index')}.php`;

  const fileNode = expandToNode`
    <?php

    require '../../../vendor/autoload.php';

    use App\\${name};

    $id = $_GET['id'] ?? null;

    if (!$id) {
      echo "<p>ID null!</p>";
      die();
    }

    $result = ${name}::find($id);

    if (!$result) {
      echo "<p>ID invalid!</p>";
      die();
    }

    ${name}::delete($id);

    echo "<p>Success!</p>";
  `.appendNewLineIfNotEmpty();

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.writeFileSync(generatedFilePath, toString(fileNode));
}
