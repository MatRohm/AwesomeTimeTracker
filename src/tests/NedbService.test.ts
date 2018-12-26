import { NedbService } from '../core/NedbService';
import { NedbServiceTestHelper } from './NedbServiceTestHelper';
import { ArgumentError } from '../core/Arguments/ArgumentError';

describe('Checks wether NedbService.find() works correctly', () => {
  let db: NedbService;

  beforeEach(() => {
    db = NedbServiceTestHelper.getTestInstance();
  });

  afterEach(() => {
    NedbServiceTestHelper.clearDatabase();
  });

  it('When find() called with null, it throws an an exception', async () => {
    expect(db.find(null)).rejects.toEqual(ArgumentError.getNotDefinedError('query'));
  });

  it('When find() called with undefined, it throws an an exception', async () => {
    expect(db.find(null)).rejects.toEqual(ArgumentError.getNotDefinedError('query'));
  });

  it('When find() called with an empty object, it returns an empty array', async () => {
    const obj = {};
    const result = db.find(obj);
    expect(result).resolves.toHaveLength(0);
  });

  it('When find() is called with an erronous query, the promise is rejected', async () => {
    const obj = { $a: '$a' }; // "$" at the beginning is not allowed in Nedb
    const result = db.find(obj);
    expect(db.find(null)).rejects.toHaveBeenCalled();
  });
});

describe('Checks wether NedbService.insert() works correctly', () => {
  let db: NedbService;

  beforeEach(() => {
    db = NedbServiceTestHelper.getTestInstance();
  });

  afterEach(() => {
    NedbServiceTestHelper.clearDatabase();
  });

  it('When insert() is called with null, it throws an error', async () => {
    await expect(db.insert(null)).rejects.toEqual(ArgumentError.getNotDefinedError('itemToInsert'));
  });

  it('When insert() is called with undefined, it throws an error', async () => {
    await expect(db.insert(undefined)).rejects.toEqual(ArgumentError.getNotDefinedError('itemToInsert'));
  });

  it('When insert() is called with empty object, it throws an error', async () => {
    await expect(db.insert({})).rejects.toEqual(ArgumentError.getObjectHasNoProperties('itemToInsert'));
  });

  it('When insert() is called with an object which has properties it insert it into database', async () => {
    // Arrange
    const sampleObject = { sampleValue: 'value' };

    // Act
    await db.insert(sampleObject);

    // Assert
    const promise = db.find(sampleObject);
    expect(promise).resolves.toBe((actual: Array<{ sampleValue: any, _id: string; }>) => {
      expect(actual).toHaveLength(1);
      actual.forEach(o => delete o._id);
      expect(actual[0].sampleValue).toEqual(sampleObject.sampleValue);
    });
  });
});

describe('Checks if NedbService.getDefault() works correctly', () => {
  it('Whenn getDefault() is called it does not throw an exception', () => {
    expect(() => NedbService.getDefault()).not.toThrow();
  });

  it('When getDefault() is called twice it returns the same instance', () => {
    const firstInstance = NedbService.getDefault();
    const secondInstance = NedbService.getDefault();
    expect(firstInstance).toEqual(secondInstance);
  });
});
