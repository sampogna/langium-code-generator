import type { ValidationChecks } from 'langium';
import type { CrudGeneratorAstType } from './generated/ast.js';
import type { CrudGeneratorServices } from './crud-generator-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: CrudGeneratorServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.CrudGeneratorValidator;
    const checks: ValidationChecks<CrudGeneratorAstType> = {
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class CrudGeneratorValidator {
}
