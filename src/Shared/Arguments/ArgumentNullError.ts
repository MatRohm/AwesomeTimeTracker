export class ArgumentNullError extends Error {
  constructor(argumentName: string) {
    super(`Argument '${argumentName}' is NULL or UNDEFINED`);
  }
}
