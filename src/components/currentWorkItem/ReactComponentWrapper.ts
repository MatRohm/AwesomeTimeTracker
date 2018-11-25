export class ReactComponentWrapper<T> {
  public static Wrap<T>(instance: T) {
    return new ReactComponentWrapper<T>(instance);
  }

  public wrappedObject: T;
  public constructor(wrappedObject: T) {
    this.wrappedObject = wrappedObject;
  }
}
