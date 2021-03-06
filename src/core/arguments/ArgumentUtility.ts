import { ArgumentError } from './ArgumentError';

export class ArgumentUtility {
  /**
   * Checks if the given argumentValue is defined (not null and not undefined)
   * if not an ArgumentError is thrown
   */
  // tslint:disable-next-line:no-any
  public static checkDefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw ArgumentError.getNotDefinedError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and it is an object literal
   * if not an ArgumentError is thrown
   */
  // tslint:disable-next-line:no-any
  public static checkDefinedAndObjectLiteral(argumentName: string, argumentValue: any): void {
    ArgumentUtility.checkDefined(argumentName, argumentValue);

    if (!ArgumentUtility.isObjectLiteral(argumentValue)) {
      throw ArgumentError.getNotAnObjectLiteralError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and it is an object literal.
   * It also checks wether the object has at least one property
   * if not an ArgumentError is thrown
   */
  public static checkObjectHasContent(argumentName: string, argumentValue: object): void {
    ArgumentUtility.checkDefinedAndObjectLiteral(argumentName, argumentValue);

    if (this.isEmptyObject(argumentValue)) {
      throw ArgumentError.getObjectHasNoProperties(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and it is a function
   * if not an ArgumentError is thrown
   */
  // tslint:disable-next-line:no-any
  public static checkDefinedAndFunction(argumentName: string, argumentValue: any): void {
    ArgumentUtility.checkDefined(argumentName, argumentValue);

    if (!(ArgumentUtility.isFunction(argumentValue))) {
      throw ArgumentError.getNotAFunctionError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and the string is not empty or all whitespace
   * if not an ArgumentError is thrown
   */
  public static checkHasContent(argumentName: string, argumentValue: string) {
    ArgumentUtility.checkDefined(argumentName, argumentValue);

    const checkValue = argumentValue.trim();
    if (checkValue === '') {
      throw ArgumentError.getNoContentError(argumentName);
    }
  }

  /**
   * Checks if the given argumentValue is defined (not null and not undefined) and has elements (length > 0)
   * if not an ArgumentError is thrown
   */
  public static checkHasElements(argumentName: string, argumentValue: any[]) {
    ArgumentUtility.checkDefined(argumentName, argumentValue);

    if (argumentValue.length < 1) {
      throw ArgumentError.getNoElementsError(argumentName);
    }
  }

  // from: https://stackoverflow.com/a/1482209
  // tslint:disable-next-line:no-any
  private static isObjectLiteral(value: any) {
    let _test = value;
    return typeof value !== 'object' || value === null ?
      false :
      (
        ((() => {
          while (Object.getPrototypeOf(_test) !== null) {
            _test = Object.getPrototypeOf(_test);
          }
          return Object.getPrototypeOf(value) === _test;
        }))()
      );
  }

  // from https://stackoverflow.com/a/7356528
  // tslint:disable-next-line:no-any
  private static isFunction(value: any) {
    return value && {}.toString.call(value) === '[object Function]';
  }

  // from: https://stackoverflow.com/a/2673229
  private static isEmptyObject(obj: object): boolean {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
}
