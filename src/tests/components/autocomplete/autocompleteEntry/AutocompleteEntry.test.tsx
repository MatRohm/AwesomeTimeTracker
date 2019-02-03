import { AutoCompleteEntryControlTestHelper } from './AutocompleteEntryTestHelper';
import { IAutoCompleteEntryParent } from '../../../../components/autocomplete/IAutoCompleteEntryParent';
import AutoCompleteEntry from '../../../../components/autocomplete/autocompleteEntry/AutocompleteEntry';
import { Mock, It, Times } from 'moq.ts';
import IAutocompleteDatasource from '../../../../components/autocomplete/IAutocompleteDataSource';

describe('Test if autocompleteEntry renders correctly', () => {
  let _autocompleteEntryControl: AutoCompleteEntryControlTestHelper;
  let _mock: Mock<IAutoCompleteEntryParent>;

  beforeEach(() => {
    _mock = createParentMock();
    const entry = new AutoCompleteEntry('Sample', 'This is a sample entry.');
    _autocompleteEntryControl = new AutoCompleteEntryControlTestHelper(entry, _mock.object());
  });

  afterEach(() => {
    _autocompleteEntryControl.tryUnmount();
    _autocompleteEntryControl = null;
  });

  test('When an AutocompleteEntry is clicked, it calls parent.onEntrySelected()', () => {
    _autocompleteEntryControl.click();
    _mock.verify(o => o.onEntrySelected, Times.Once());
  });
});

function createParentMock() {
  const mock = new Mock<IAutoCompleteEntryParent>();
  mock.setup(o => o.onEntrySelected(null)).returns({});
  return mock;
}
