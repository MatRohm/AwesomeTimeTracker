import { ArgumentNullError } from './ArgumentNullError';

export class ArgumentUtility {

  /**
   * Checks if argument is defined (not null and not undefined), if not an error is thrown
   */
  // tslint:disable-next-line:no-any
  public static CheckDefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw new ArgumentNullError(argumentName);
    }
  }
}
