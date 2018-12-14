import { ArgumentNullError } from './ArgumentNullError';

export class ArgumentUtility {
  public static CheckDefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw new ArgumentNullError(argumentName);
    }
  }
}
