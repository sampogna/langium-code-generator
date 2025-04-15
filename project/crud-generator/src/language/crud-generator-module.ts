import { type Module, inject } from 'langium';
import { createDefaultModule, createDefaultSharedModule, type DefaultSharedModuleContext, type LangiumServices, type LangiumSharedServices, type PartialLangiumServices } from 'langium/lsp';
import { CrudGeneratorGeneratedModule, CrudGeneratorGeneratedSharedModule } from './generated/module.js';
import { CrudGeneratorValidator, registerValidationChecks } from './crud-generator-validator.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type CrudGeneratorAddedServices = {
    validation: {
        CrudGeneratorValidator: CrudGeneratorValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type CrudGeneratorServices = LangiumServices & CrudGeneratorAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const CrudGeneratorModule: Module<CrudGeneratorServices, PartialLangiumServices & CrudGeneratorAddedServices> = {
    validation: {
        CrudGeneratorValidator: () => new CrudGeneratorValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createCrudGeneratorServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    CrudGenerator: CrudGeneratorServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        CrudGeneratorGeneratedSharedModule
    );
    const CrudGenerator = inject(
        createDefaultModule({ shared }),
        CrudGeneratorGeneratedModule,
        CrudGeneratorModule
    );
    shared.ServiceRegistry.register(CrudGenerator);
    registerValidationChecks(CrudGenerator);
    if (!context.connection) {
        // We don't run inside a language server
        // Therefore, initialize the configuration provider instantly
        shared.workspace.ConfigurationProvider.initialized({});
    }
    return { shared, CrudGenerator };
}
