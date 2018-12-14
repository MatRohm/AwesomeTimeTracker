import { mount } from 'enzyme';
import Autocomplete from '../../../components/autocomplete/Autocomplete';
import * as React from 'react';
import IAutocompleteDataSource from '../../../components/autocomplete/IAutocompleteDataSource';
import * as TypeMoq from 'typemoq';
import AutoCompleteEntry from '../../../components/autocomplete/AutoCompleteEntry';

describe('Test if autocomplete renders correctly', () => {
  let _autocomplete: any;

  function getOrCreateAutocomplete() {
    if (!_autocomplete) {
      const dataSourceMock = createDataSourceMock();

      _autocomplete = mount(<Autocomplete dataSource={dataSourceMock.object} />);
      _autocomplete.setProps(dataSourceMock);
    }

    return _autocomplete;
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
  it('When no text is given no entries are shown', () => {
    // Arrange
    const ac = getOrCreateAutocomplete();

    // Act
    const countOfListEntries = ac.find('ul > li').length;

    // Assert
    expect(countOfListEntries).toBe(0);
  });

  it('When a text is given entries are shown', () => {
    // Arrange
    const autocomplete = getOrCreateAutocomplete();
    const inputField = autocomplete.find('input');

    // Act
    const simulateEventArgs = { target: { value: 'test' } };
    inputField.simulate('change', simulateEventArgs);

    // Assert
    const countOfListEntries = autocomplete.find('ul > li').length;
    expect(countOfListEntries).toBe(2);
  });

  it('When a text is given then removed, no entries are shown', () => {
    // Arrange
    const ac = getOrCreateAutocomplete();

    // Act
    const simulateEventArgs = { target: { value: 'test' } };
    ac.find('input').simulate('change', simulateEventArgs);

    simulateEventArgs.target.value = '';
    ac.find('input').simulate('change', simulateEventArgs);

    // Assert
    const countOfListEntries = ac.find('ul > li').length;
    expect(countOfListEntries).toBe(0);
  });

  it('When an entry is clicked its text is written to the input box and the entries are removed', () => {
    // Arrange
    const ac = getOrCreateAutocomplete();
    const simulateEventArgs = { target: { value: 't' } };
    ac.find('input').simulate('change', simulateEventArgs);

    // Act
    ac.find('ul > li').simulate('click');

    // Assert
    const textOfInput = ac.find('input').props().value;
    expect(textOfInput).toBe('test');

    const numberOfEntries = ac.find('ul > li').length;
    expect(numberOfEntries).toBe(0);
  });
});
