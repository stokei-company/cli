import { exit } from 'process';
import { Toolbox } from '../interfaces/toolbox.interface';

module.exports = (toolbox: Toolbox) => {
  toolbox.convertString = (singular: string, plural?: string) => {
    const { strings, print } = toolbox;

    try {
      if (!singular) {
        print.error('Singular string not found!');
        return exit(0);
      }
      if (singular) {
        singular = strings.isSingular(singular)
          ? singular
          : strings.singular(singular);
      }
      if (!plural) {
        plural = strings.isPlural(singular)
          ? singular
          : strings.plural(singular);
      }
      return {
        pascalCaseSingularName: strings.pascalCase(singular),
        kebabCaseSingularName: strings.kebabCase(singular),
        camelCaseSingularName: strings.camelCase(singular),
        snakeCaseSingularName: strings.snakeCase(singular),
        snakeUpperCaseSingularName: strings.snakeCase(singular)?.toUpperCase(),
        pascalCasePluralName: strings.pascalCase(plural),
        kebabCasePluralName: strings.kebabCase(plural),
        camelCasePluralName: strings.camelCase(plural),
        snakeCasePluralName: strings.snakeCase(plural),
        snakeUpperCasePluralName: strings.snakeCase(plural)?.toUpperCase()
      };
    } catch (error) {
      return exit(0);
    }
  };
};
