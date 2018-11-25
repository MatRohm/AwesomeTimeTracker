import { ArgumentNullError } from './ArgumentNullError';

export class ArgumentUtility {
  public static CheckNotNullAndNotUndefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw new ArgumentNullError(argumentName);
    }
  }
}
