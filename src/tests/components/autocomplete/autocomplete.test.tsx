import { AutoComplete, AutocompleteEntry } from '../../../components/autocomplete/autcomplete';
import * as TypeMoq from 'typemoq';
import { AutocompleteSource } from '../../../components/autocomplete/autocompleteSource';
import React from 'react';
import {render, fireEvent} from '@testing-library/react';

const autoCompleteSourceMock = TypeMoq.Mock.ofType<AutocompleteSource<AutocompleteEntry>>();

describe('Tests wether the autocomplete works correclty or not', () => {
  it('Basic rendering wit label works', () => {
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

  it('Basic rendering without label works', () => {
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

  it('When entering a text, search is called', () => {
    // Arrange
    autoCompleteSourceMock
      .setup(x=>x.search(TypeMoq.It.isAnyString()))
      .returns(() => new Array<AutocompleteEntry>());

    const sut = <AutoComplete name='test-name' label='' autocompleteSource={autoCompleteSourceMock.object}/>;   
    const renderedSut = render(sut);

    // Act
    const input = renderedSut.getByTestId('autocomplete-input');
    fireEvent.change(input, {target: {value: 123}});
    
    // Assert
    expect(input.getAttribute('value')).toBe('123');
    autoCompleteSourceMock.verify(o=>o.search('123'), TypeMoq.Times.once());
  });
});