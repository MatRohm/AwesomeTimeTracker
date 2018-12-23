import { NedbService } from '../core/NedbService';
import { NedbServiceTestHelper } from './NedbServiceTestHelper';
import { ArgumentError } from '../core/Arguments/ArgumentError';

describe('Checks wether NedbService.find() works correctly', () => {
  let db: NedbService;

  beforeAll(() => {
    db = NedbServiceTestHelper.getTestInstance();
  });

  afterAll(() => {
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
    const result = await db.find(obj);
    expect(result).toHaveLength(0);
  });
});

describe('Checks wether NedbService.insert() works correctly', () => {
  let db: NedbService;

  beforeAll(() => {
    db = NedbServiceTestHelper.getTestInstance();
  });

  afterAll(() => {
    NedbServiceTestHelper.clearDatabase();
  });

  it('When insert() is called with null, it throws an error', async () => {
    expect(db.insert(null)).rejects.toEqual(ArgumentError.getNotDefinedError('itemToInsert'));
  });

  it('When insert() is called with undefined, it throws an error', async () => {
    expect(db.insert(undefined)).rejects.toEqual(ArgumentError.getNotDefinedError('itemToInsert'));
  });

  it('When insert() is called with empty object, it throws an error', async () => {
    expect(db.insert({})).rejects.toEqual(ArgumentError.getObjectHasNoProperties('itemToInsert'));
  });

  it('When insert() is called with an object which has properties it insert it into database', async () => {
    // Arrange
    const sample = { sample: 'value' };

    // Act
    await db.insert(sample);

    // Assert
    const actual = await db.find(sample);
    actual.forEach(o => delete o._id);
    expect(actual).toEqual(new Array<object>(sample));
  });
});
