import { ArgumentNullError } from './ArgumentNullError';

export class ArgumentUtility {
  // tslint:disable-next-line:no-any
  public static CheckDefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw new ArgumentNullError(argumentName);
    }
  }
}
