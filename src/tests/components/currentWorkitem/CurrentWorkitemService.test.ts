import { CurrentWorkitemService } from '../../../components/currentWorkitem/CurrentWorkitemService';

describe('Checks whether the CurrentWorkItemService works correctly',
  () => {
    test('Test if getWorkItems returns expected result', () => {
      const result = CurrentWorkitemService.getInstance().getWorkItems('Sample');
      expect(result).toBeNull();
    });
  }
);
