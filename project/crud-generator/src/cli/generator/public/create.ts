import * as path from 'node:path';
import * as fs from 'node:fs';
import { Field } from "../../../language/generated/ast.js";
import { expandToNode, toString } from 'langium/generate';
import { FilePathData } from '../../cli-util.js';
import { capitalizeFirstLetter, dataTypes } from '../../generator.js';

export default function create(name: string, fields: Array<Field>, data: FilePathData): void {
  const dest = data.destination + `/public/${name.toLowerCase()}/create`;
  const generatedFilePath = `${path.join(dest, 'index')}.php`;

  let params = '';
  let ifParams = '';
  let funcParams = '';
  let formInputs = '';

  fields.forEach((field) => {
    const label = capitalizeFirstLetter(field.name);
    const type = dataTypes[field.type];

    params += `$${field.name} = ${field.type === 'INT' ? '(int)' : ''} $_POST['${field.name}'] ?? ${field.type === 'INT' ? '0' : '""'};\n\t`;
    ifParams += `$${field.name} && `;
    funcParams += `$${field.name}, `;

    formInputs += `<tr>
      <td><label for="${field.name}">${label}:</label></td>
      <td><input type="${type}" id="${field.name}" name="${field.name}" placeholder="${label}" required></td>
    </tr>\n\t\t`;
  });

  ifParams = ifParams.trim().replace(/(\s*&&\s*)$/, '');
  funcParams = funcParams.trim().replace(/(\s*,\s*)$/, '');

  const fileNode = expandToNode`
    <?php

    require '../../../vendor/autoload.php';

    use App\\${name};

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      ${params}

      if (${ifParams}) {
        ${name}::create(${funcParams});

        echo "<p>Success!</p>";
      }
    }
    ?>

    <link href="../../assets/style.css" rel="stylesheet">

    <div class="center">
      <form method="POST">
        <table>
          ${formInputs}
        </table>
        <button type="submit">Enviar</button>
      </form>
    </div>
  `.appendNewLineIfNotEmpty();

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.writeFileSync(generatedFilePath, toString(fileNode));
}
