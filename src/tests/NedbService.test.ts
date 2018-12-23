import { NedbService } from '../shared/NedbService';
import { NedbServiceTestHelper } from './NedbServiceTestHelper';
import { ArgumentError } from '../shared/Arguments/ArgumentError';

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

  it('When insert() called with null, it throws an error', async () => {
    expect(() => db.insert(null)).rejects.toEqual(ArgumentError.getNotDefinedError('itemToInsert'));
  });

  it('When insert() called with undefined, it throws an error', async () => {
    expect(() => db.insert(undefined)).rejects.toEqual(ArgumentError.getNotDefinedError('itemToInsert'));
  });

  it('When insert() called with empty object, it throws an error', async () => {
    expect(() => db.insert({})).rejects.toEqual(ArgumentError.getObjectHasNoProperties('itemToInsert'));
  });
});
