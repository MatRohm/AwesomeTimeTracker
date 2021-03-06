import { ArgumentUtility } from '../../../core/Arguments/ArgumentUtility';

describe('Test whether ArgumentUtility.checkDefined() works correctly', () => {

  it('When given null it throws an error', () => {
    const isNull: string = null;
    expect(() => ArgumentUtility.checkDefined('isNull', isNull)).toThrow();
  });

  it('When given undefined it throws an error', () => {
    expect(() => ArgumentUtility.checkDefined('notDefined', undefined)).toThrow();
  });

  it('When given a value it does not throw an error', () => {
    const value = 'a value';
    expect(() => ArgumentUtility.checkDefined('value', value)).not.toThrow();
  });
});

describe('Test whether ArgumentUtility.checkDefinedAndObjectLiteral works correctly', () => {
  it('When given null it throws an error', () => {
    const isNull: string = null;
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('isNull', isNull)).toThrow();
  });

  it('When given undefined it throws an error', () => {
    const notDefined = 'sample';
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('notDefined', notDefined)).toThrow();
  });

  it('When given a function it throws an error', () => {
    // tslint:disable-next-line:only-arrow-functions no-empty
    const value = function() { };
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).toThrow();
  });

  it('When given a number it throws an error', () => {
    const value = 1;
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).toThrow();
  });

  it('When given a string it throws an error', () => {
    const value = 'sample';
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).toThrow();
  });

  it('When given an object created by object literal it does not throw an error', () => {
    const value = { sample: 'test' };
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).not.toThrow();
  });

  it('When given an object created with new it does not throw an error', () => {
    const value = new Object();
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).not.toThrow();
  });

  it('When given an class it throws an eror (because it is a function)', () => {
    const value = class Sample { public get sample() { return 'sample'; } };
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).toThrow();
  });

  it('When given an instance of class it does not throws an eror', () => {
    // tslint:disable-next-line:max-classes-per-file
    const sampleClass = class Sample { public get sample() { return 'sample'; } };
    const value = new sampleClass();
    expect(() => ArgumentUtility.checkDefinedAndObjectLiteral('value', value)).toThrow();
  });
});

describe('Tests whether ArgumentUtility.checkHasContent() works correctly', () => {
  it('When given null it throws an error', () => {
    const value: string = null;
    expect(() => ArgumentUtility.checkHasContent('value', value)).toThrow();
  });

  it('When given undefined it throws an error', () => {
    expect(() => ArgumentUtility.checkHasContent('value', undefined)).toThrow();
  });

  it('When given a string with whitespace only it throws an error', () => {
    const value = ' ';
    expect(() => ArgumentUtility.checkHasContent('value', value)).toThrow();
  });

  it('When given a string value it does not throw an error', () => {
    const value = 'this is a string';
    expect(() => ArgumentUtility.checkHasContent('value', value)).not.toThrow();
  });
});

describe('Tests whether ArgumentUtility.checkHasElements() works correctly', () => {
  it('When given an empty array it throws an error', () => {
    const value = new Array<number>();
    expect(() => ArgumentUtility.checkHasElements('value', value)).toThrow();
  });

  it('When given null it throws an error', () => {
    const value: [] = null;
    expect(() => ArgumentUtility.checkHasElements('value', value)).toThrow();
  });

  it('When given undefined it throws an error', () => {
    expect(() => ArgumentUtility.checkHasElements('value', undefined)).toThrow();
  });

  it('When given an array with one member it does not throw an error', () => {
    const value = [1];
    expect(() => ArgumentUtility.checkHasElements('value', value)).not.toThrow();
  });

  it('When given an array with two strings it does not throw an error', () => {
    const value = ['Wall', 'Mart'];
    expect(() => ArgumentUtility.checkHasElements('value', value)).not.toThrow();
  });
});

describe('Checks wether if ArgumentUtility.checkObjectHasContent works correctly', () => {
  it('When given null it throws an error', () => {
    expect(() => ArgumentUtility.checkObjectHasContent('value', null)).toThrow();
  });

  it('When given undefined it throws an error', () => {
    expect(() => ArgumentUtility.checkObjectHasContent('value', undefined)).toThrow();
  });

  it('When given an empty object itt throws an error', () => {
    expect(() => ArgumentUtility.checkObjectHasContent('value', {})).toThrow();
  });

  it('When given an object with values (object literal) it does not throw an error', () => {
    const value = { sample: 'sample' };
    expect(() => ArgumentUtility.checkObjectHasContent('value', value)).not.toThrow();
  });

  it('When given an object with values (object constructor) it does not throw an error', () => {
    // tslint:disable-next-line:no-any
    const value: any = new Object();
    value.sample = 'sample';
    expect(() => ArgumentUtility.checkObjectHasContent('value', value)).not.toThrow();
  });

  it('When given an object with values (class constructor) it throws an error', () => {
    // tslint:disable-next-line:max-classes-per-file
    const sampleClass = class Sample { public field: number; };

    // tslint:disable-next-line:no-any
    const value: any = new sampleClass();
    value.field = 10;

    expect(() => ArgumentUtility.checkObjectHasContent('value', value)).toThrow();
  });
});
