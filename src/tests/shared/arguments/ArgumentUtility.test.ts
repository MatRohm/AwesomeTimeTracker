import { ArgumentUtility } from '../../../shared/Arguments/ArgumentUtility';

describe('Test whether ArgumentUtility.checkDefined() works correctly', () => {

  it('When given null it throws an error', () => {
    const isNull: string = null;
    expect(() => ArgumentUtility.checkDefined('isNull', isNull)).toThrow();
  });

  it('When given undefined it throws an error', () => {
    let notDefined: string;
    expect(() => ArgumentUtility.checkDefined('notDefined', notDefined)).toThrow();
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
