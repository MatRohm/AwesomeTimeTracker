export class ArgumentUtility {
  public static CheckNotNullAndNotUndefined(argumentName: string, argumentValue: any): void {
    if (argumentValue == null || argumentValue === undefined) {
      throw new ArgumentNullError(argumentName);
    }
  }
}

export class ArgumentNullError extends Error {
  constructor(argumentName: string) {
    super(`Argument '${argumentName}' is NULL or UNDEFINED`);
  }
}
