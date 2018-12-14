import { mount, shallow, ShallowWrapper, render } from 'enzyme';
import Autocomplete from '../../../components/autocomplete/Autocomplete';
import * as React from 'react';
import IAutocompleteDataSource from '../../../components/autocomplete/IAutocompleteDataSource';
import * as TypeMoq from 'typemoq';
import AutoCompleteEntry from '../../../components/autocomplete/AutoCompleteEntry';

describe('Test if autocomplete renders correctly', () => {
  let _autocomplete: any;

  const getOrCreateAutocomplete = () => {
    if (!_autocomplete) {
      const mock = TypeMoq.Mock.ofType<IAutocompleteDataSource>();
      mock.setup(o => o.GetEntries('test')).returns(() => {
        return [new AutoCompleteEntry('1', 'test')];
      });

      const div = document.createElement('div');
      _autocomplete = mount(<Autocomplete dataSource={mock.object} />);
      _autocomplete.setProps(mock);
    }

    return _autocomplete;
  };

  it('When no text is given no entries are shown', () => {
    const ac = getOrCreateAutocomplete();
    const countOfListEntries = ac.find('ul > li').length;
    expect(countOfListEntries).toBe(0);
  });

  it('When a text is given entries are shown', () => {
    const autocomplete = getOrCreateAutocomplete();

    const simulateEventArgs = { target: { value: 'test' } };
    const inputField = autocomplete.find('input');
    inputField.value = 'IRGENDWAS!!!';
    inputField.simulate('change', simulateEventArgs);

    const countOfListEntries = autocomplete.find('ul > li').length;
    expect(countOfListEntries).toBe(1);
  });

  it('When a text is given then removed, no entries are shown', () => {
    const ac = getOrCreateAutocomplete();
    const simulateEventArgs = { currentTarget: { value: 'test' } };

    simulateEventArgs.currentTarget.value = '';
    ac.find('input').simulate('change', simulateEventArgs);

    const countOfListEntries = ac.find('ul > li').length;
    expect(countOfListEntries).toBe(0);
  });
});
