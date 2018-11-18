export class ArgumentUtility {
  public static CheckNotNullAndNotUndefined(valueName: string, value: object): void {
    if (value == null || value === undefined) {
      throw new Error(`Argument '${valueName}' is NULL or UNDEFINEd`);
    }
  }
}
