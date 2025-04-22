import { Field } from "../../../language/generated/ast.js";
import { FilePathData } from '../../cli-util.js';
import create from "./create.js";
import destroy from "./delete.js";
import edit from "./edit.js";

export default function generatePublic(name: string, fields: Array<Field>, data: FilePathData): void {
  create(name, fields, data);
  edit(name, fields, data);
  destroy(name, data);
}
