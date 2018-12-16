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

  private constructor(errormessage: string) {
    super(errormessage);
  }
}
