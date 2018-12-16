import { ArgumentError } from './ArgumentError';

export class ArgumentUtility {
  /**
   * Checks if the given argumentValue is defined (not null and not undefined)
   * if not an ArgumentError is thrown
   */
  // tslint:disable-next-line:no-any
  public static CheckDefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw ArgumentError.getNotDefinedError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and it is an object literal
   * if not an ArgumentError is thrown
   */
  // tslint:disable-next-line:no-any
  public static CheckDefinedAndObjectLiteral(argumentName: string, argumentValue: any): void {
    ArgumentUtility.CheckDefined(argumentName, argumentValue);

    if (!ArgumentUtility.isObjectLiteral(argumentValue)) {
      throw ArgumentError.getNotAnObjectLiteralError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and it is a function
   * if not an ArgumentError is thrown
   */
  // tslint:disable-next-line:no-any
  public static CheckDefinedAndFunction(argumentName: string, argumentValue: any): void {
    ArgumentUtility.CheckDefined(argumentName, argumentValue);

    if (!(ArgumentUtility.isFunction(argumentValue))) {
      throw ArgumentError.getNotAFunctionError(argumentName);
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

  // from https://stackoverflow.com/a/7356528
  private static isFunction(value: any) {
    return value && {}.toString.call(value) === '[object Function]';
  }
}
