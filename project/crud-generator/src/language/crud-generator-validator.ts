import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { CrudGeneratorAstType, Person } from './generated/ast.js';
import type { CrudGeneratorServices } from './crud-generator-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: CrudGeneratorServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.CrudGeneratorValidator;
    const checks: ValidationChecks<CrudGeneratorAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class CrudGeneratorValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
