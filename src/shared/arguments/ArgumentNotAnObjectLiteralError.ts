export class ArgumentNotAnObjectLiteralError extends Error {
  constructor(argumentName: string) {
    super(`Argument '${argumentName}' is not an object literal`);
  }
}
