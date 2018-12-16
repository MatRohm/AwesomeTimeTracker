import { ArgumentNullError } from './ArgumentNullError';
import { ArgumentNotAnObjectLiteralError } from './ArgumentNotAnObjectLiteralError';

export class ArgumentUtility {
  /**
   * Checks if the given argumentValue is defined (not null and not undefined) if not an error is thrown
   */
  // tslint:disable-next-line:no-any
  public static CheckDefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw new ArgumentNullError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and if its an object literal
   * if not an error is thrown
   */
  // tslint:disable-next-line:no-any
  public static CheckDefinedAndIsObjectLiteral(argumentName: string, argumentValue: any): void {
    ArgumentUtility.CheckDefined(argumentName, argumentValue);

    if (!ArgumentUtility.isObjectLiteral(argumentValue)) {
      throw new ArgumentNotAnObjectLiteralError(argumentName);
    }
  }

  // tslint:disable-next-line:no-any
  // from: https://stackoverflow.com/a/1482209
  private static isObjectLiteral(value: any) {
    let _test = value;
    return typeof value !== 'object' || value === null ?
      false :
      (
        ((() => {
          while (!false) {
            if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
              break;
            }
          }
          return Object.getPrototypeOf(value) === _test;
        }))()
      );
  }
}
