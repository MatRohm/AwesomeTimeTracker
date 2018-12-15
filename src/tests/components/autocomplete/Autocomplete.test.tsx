import { AutoCompleteTestsWrapper } from './AutocompleteteTestWrapper';

describe('Test if autocomplete renders correctly', () => {
  let _autocomplete: AutoCompleteTestsWrapper;

  beforeEach(() => {
    _autocomplete = new AutoCompleteTestsWrapper();
  });

  afterEach(() => {
    _autocomplete.tryUnmount();
    _autocomplete = null;
  });

  it('When no text is given no entries are shown', () => {
    // Assert
    const count = _autocomplete.getFoundEntriesCount();
    expect(count).toBe(0);
  });

  it('When a text is given entries are shown', () => {
    // Act
    _autocomplete.enterTextIntoInput('test');

    // Assert
    const count = _autocomplete.getFoundEntriesCount();
    expect(count).toBe(2);
  });

  it('When a text is given then removed, no entries are shown', () => {
    // Act
    _autocomplete.enterTextIntoInput('test');
    _autocomplete.enterTextIntoInput('');

    // Assert
    const count = _autocomplete.getFoundEntriesCount();
    expect(count).toBe(0);
  });

  it('When an entry is clicked its text is written to the input box and the entries are removed', () => {
    // Act
    _autocomplete.enterTextIntoInput('t');
    _autocomplete.clickFirstSerchResult();

    // Assert
    const textOfInput = _autocomplete.getTextOfTextBox();
    expect(textOfInput).toBe('test');

    const numberOfEntries = _autocomplete.getFoundEntriesCount();
    expect(numberOfEntries).toBe(0);
  });

  it('At the beginning entryContainer is not shown', () => {
    // Assert
    _autocomplete.assertEntryContainerDisplayProperty('none');
  });

  it('When a text is entered but no entry is found no entryContainer is shown', () => {
    // Act
    _autocomplete.enterTextIntoInput('nonFound');

    // Assert
    _autocomplete.assertEntryContainerDisplayProperty('none');
  });

  it('When a text is entered and an entry is found the entryContainer is shown', () => {
    // Act
    _autocomplete.enterTextIntoInput('test');

    // Assert
    _autocomplete.assertEntryContainerDisplayProperty('block');
  });
});
