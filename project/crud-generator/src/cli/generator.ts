import type { Model } from '../language/generated/ast.js';
import { extractDestinationAndName } from './cli-util.js';
import generatePublic from './generator/public/generate.js';
import generateSchema from './generator/database/schema.js';
import generateStyle from './generator/public/style.js';
import generateDatabase from './generator/src/database.js';
import generateSrc from './generator/src/generate.js';
import generateComposer from './generator/composer.js';
import generatePhpIni from './generator/php.js';

export const dataTypes = {
  'STRING': 'text',
  'INT': 'number'
}

export function capitalizeFirstLetter(text: string) {
  if (!text) return '';

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function generatePhp(model: Model, filePath: string, destination: string | undefined): string {
  const data = extractDestinationAndName(filePath, destination);

  model.entities.map((entity) => {
    generatePublic(entity.name, entity.fields, data);
    generateSrc(entity.name, entity.fields, data);
  });

  generateSchema(model, data);
  generateStyle(data);
  generateDatabase(data);
  generateComposer(data);
  generatePhpIni(data);

  return '';
}
