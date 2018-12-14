import { mount } from 'enzyme';
import Autocomplete from '../../../components/autocomplete/Autocomplete';
import * as React from 'react';
import IAutocompleteDataSource from '../../../components/autocomplete/IAutocompleteDataSource';
import * as TypeMoq from 'typemoq';
import AutoCompleteEntry from '../../../components/autocomplete/AutoCompleteEntry';

describe('Test if autocomplete renders correctly', () => {
  let _autocomplete: any;
  const _entrySelector = '.autocompleteEntry';
  const _inputSelector = '.autocompleteInput';
  const _entryContainerSelector = '.autocompleteEntryContainer';

  function enterTextIntoInput(ac: any, value: string) {
    const simulatedEventArgs = { target: { value } };
    ac.find(_inputSelector).simulate('change', simulatedEventArgs);
  }

  function createDataSourceMock() {
    const mock = TypeMoq.Mock.ofType<IAutocompleteDataSource>();

    mock.setup(o => o.GetEntries('test')).returns(() => {
      return [
        new AutoCompleteEntry('1', 'test'),
        new AutoCompleteEntry('2', 'second test')
      ];
    });

    mock.setup(o => o.GetEntries('t')).returns(() => {
      return [new AutoCompleteEntry('1', 'test')];
    });

    return mock;
  }

  function assertEntryContainerDisplayProperty(_autocomplete: any, value: string) {
    // This is a workaround: the problem is when style is set over React Ref the value
    // doesnt show up the enzyme react wrapper. Which is unfortunate but cant be changed at the moment

    const displayOfEntryContainer = _autocomplete.find(_entryContainerSelector).html();
    expect(displayOfEntryContainer).toContain('display: ' + value);
  }

  beforeEach(() => {
    const dataSourceMock = createDataSourceMock();

    _autocomplete = mount(<Autocomplete dataSource={dataSourceMock.object} />);
    _autocomplete.setProps(dataSourceMock);
  });

  afterEach(() => {
    if (this._autocomplete) {
      this._autocomplete.unMount();
    }
  });

  it('When no text is given no entries are shown', () => {
    // Act
    const countOfListEntries = _autocomplete.find(_entrySelector).length;

    // Assert
    expect(countOfListEntries).toBe(0);
  });

  it('When a text is given entries are shown', () => {
    // Act
    enterTextIntoInput(_autocomplete, 'test');

    // Assert
    const countOfListEntries = _autocomplete.find(_entrySelector).length;
    expect(countOfListEntries).toBe(2);
  });

  it('When a text is given then removed, no entries are shown', () => {
    // Act
    enterTextIntoInput(_autocomplete, 'test');
    enterTextIntoInput(_autocomplete, '');

    // Assert
    const countOfListEntries = _autocomplete.find(_entrySelector).length;
    expect(countOfListEntries).toBe(0);
  });

  it('When an entry is clicked its text is written to the input box and the entries are removed', () => {
    // Act
    enterTextIntoInput(_autocomplete, 't');
    _autocomplete.find(_entrySelector).simulate('click');

    // Assert
    const textOfInput = _autocomplete.find(_inputSelector).props().value;
    expect(textOfInput).toBe('test');

    const numberOfEntries = _autocomplete.find(_entrySelector).length;
    expect(numberOfEntries).toBe(0);
  });

  it('At the beginning entryContainer is not shown', () => {
    // Assert
    assertEntryContainerDisplayProperty(_autocomplete, 'none');
  });

  it('When a text is entered but no entry is found no entryContainer is shown', () => {
    // Act
    enterTextIntoInput(_autocomplete, 'nonFound');

    // Assert
    assertEntryContainerDisplayProperty(_autocomplete, 'none');
  });

  it('When a text is entered and an entry is found the entryContainer is shown', () => {
    // Act
    enterTextIntoInput(_autocomplete, 'test');

    // Assert
    assertEntryContainerDisplayProperty(_autocomplete, 'block');
  });

});
