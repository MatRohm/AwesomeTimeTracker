import { ArgumentUtility } from '../../../shared/Arguments/ArgumentUtility';

describe('Test whether ArgumentUtility.IsDefined() works correctly', () => {

  it('When given null, it throws an error', () => {
    const isNull: string = null;
    expect(() => ArgumentUtility.checkDefined('isNull', isNull)).toThrow();
  });

  it('When given undefined, it throws an error', () => {
    let notDefined: string;
    expect(() => ArgumentUtility.checkDefined('notDefined', notDefined)).toThrow();
  });

  it('When given a value, it does not throw an error', () => {
    const value = 'a value';
    expect(() => ArgumentUtility.checkDefined('value', value)).not.toThrow();
  });
});
