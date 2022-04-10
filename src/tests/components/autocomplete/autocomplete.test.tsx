import { AutoComplete, AutocompleteEntry } from '../../../components/autocomplete/Autcomplete';
import * as TypeMoq from 'typemoq';
import { AutocompleteSource } from '../../../components/autocomplete/autocompleteSource';
import React from 'react';
import {render, fireEvent, screen, cleanup,} from '@testing-library/react';

describe('Tests wether the autocomplete works correclty or not', () => {
  let autoCompleteSourceMock;

  beforeEach(()  => {
    autoCompleteSourceMock = TypeMoq.Mock.ofType<AutocompleteSource>();
  });

  test('Basic rendering with label works', () => {
    // Arrange
    const sut = <AutoComplete name='test-name' label='test-label' autocompleteSource={autoCompleteSourceMock.target}/>;

    // Act
    const renderedSut = render(sut);
    
    // Assert
    const input = renderedSut.getByTestId('autocomplete-input');
    const label = renderedSut.getByTestId('autocomplete-label');

    expect(input).toBeTruthy();
    expect(input.getAttribute('value')).toBe('');

    expect(label).toBeTruthy();
    expect(label.textContent).toBe('test-label');
  });

  test('Basic rendering without label works', () => {
    // Arrange
    const sut = <AutoComplete name='test-name' label='' autocompleteSource={autoCompleteSourceMock.target}/>;

    // Act
    const renderedSut = render(sut);

    // Assert
    const input = renderedSut.getByTestId('autocomplete-input');
    const label = renderedSut.queryByTestId('autocomplete-label');

    expect(input.getAttribute('value')).toBe('');
    expect(label).toBeNull();
  });

  test('When entering a text and an entry is found, a list is rendered', () => {
    // Arrange
    autoCompleteSourceMock
      .setup(autocompleteSource => autocompleteSource.search(TypeMoq.It.isAnyString()))
      .returns(() => new Array<AutocompleteEntry>({ name: '123'}));

    const sut = <AutoComplete name='test-name' label='123' autocompleteSource={autoCompleteSourceMock.object}/>;   
    const renderedSut = render(sut);
    const input = renderedSut.getByTestId('autocomplete-input');

    // Act
    fireEvent.change(input, {target: {value: 123}});

    // Assert
    const listitems = screen.queryAllByRole('listitem');
    expect(listitems.length).toBe(1);
  });
  
  test('When entering a text and no entry is found, no list is rendered', () => {
    // Arrange
    autoCompleteSourceMock
      .setup(autocompleteSource => autocompleteSource.search(TypeMoq.It.isAnyString()))
      .returns(() => new Array<AutocompleteEntry>());

    const sut = <AutoComplete name='test-name' label='' autocompleteSource={autoCompleteSourceMock.object}/>;   
    const renderedSut = render(sut);
    const input = renderedSut.getByTestId('autocomplete-input');

    // Act
    fireEvent.change(input, {target: {value: 123}});
    
    // Assert
    expect(input.getAttribute('value')).toBe('123');
    autoCompleteSourceMock.verify(o=>o.search('123'), TypeMoq.Times.once());

    const listitems =  renderedSut.queryAllByRole('listitem');
    expect(listitems.length).toBe(0);
  });
});