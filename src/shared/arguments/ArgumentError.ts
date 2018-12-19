export class ArgumentError extends Error {
  public static getNotDefinedError(argumentName: string): ArgumentError {
    return new ArgumentError(`Argument '${argumentName}' is null or undefined`);
  }

  public static getNotAnObjectLiteralError(argumentName: string): ArgumentError {
    return new ArgumentError(`Argument '${argumentName}' is not an object literal`);
  }

  public static getNotAFunctionError(argumentName: string): ArgumentError {
    return new ArgumentError(`Argument '${argumentName}' is not an function`);
  }

  public static getNoContentError(argumentName: string): ArgumentError {
    return new ArgumentError(`The string argument '${argumentName}' does not have a content`);
  }

  public static getNoElementsError(argumentName: string): ArgumentError {
    return new ArgumentError(`The given array argument '${argumentName}' does not have an element`);
  }

  private constructor(errormessage: string) {
    super(errormessage);
  }
}
