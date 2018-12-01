import { mount, shallow } from 'enzyme';
import Autocomplete from '../../../components/autocomplete/Autocomplete';
import * as React from 'react';
import IAutocompleteDataSource from '../../../components/autocomplete/IAutocompleteDataSource';
import * as TypeMoq from 'typemoq';
import AutoCompleteEntry from '../../../components/autocomplete/AutoCompleteEntry';

describe('Test if autocomplete renders correctly', () => {
  let props: any;
  let autocomplete: any;

  const getAutocomplete = () => {
    if (!autocomplete) {
      const mock = TypeMoq.Mock.ofType<IAutocompleteDataSource>();
      mock.setup(o => o.GetEntries(null)).returns(() => []);
      mock.setup(o => o.GetEntries('test')).returns(() => [new AutoCompleteEntry('1', 'test')]);
      autocomplete = shallow(<Autocomplete dataSource={mock.object} />);
    }

    return autocomplete;
  };

  it('When no text is given, no entries are shown', () => {
    const ac = getAutocomplete();
    const countOfListEntries = ac.find('ul > li').length;
    expect(countOfListEntries).toBe(0);
  });

  it('When a text is given, entries are shown', () => {
    const ac = getAutocomplete();

    const simulateEventArgs = { currentTarget: { value: 'test' } };
    ac.find('input').simulate('input', simulateEventArgs);

    const countOfListEntries = ac.find('ul > li').length;
    expect(countOfListEntries).toBe(1);
  });

  it('When a text is given then removed, no entries are shown', () => {
    const ac = getAutocomplete();
    const simulateEventArgs = { currentTarget: { value: 'test' } };
    ac.find('input').simulate('input', simulateEventArgs);

    simulateEventArgs.currentTarget.value = '';
    ac.find('input').simulate('input', simulateEventArgs);

    const countOfListEntries = ac.find('ul > li').length;
    expect(countOfListEntries).toBe(0);
  });

});
