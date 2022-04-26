import { AutoComplete, AutocompleteEntry } from '../../../components/autocomplete/Autcomplete';
import * as TypeMoq from 'typemoq';
import { AutocompleteSource } from '../../../components/autocomplete/autocompleteSource';
import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Tests wether the autocomplete works correclty or not', () => {
  let autoCompleteSourceMock: TypeMoq.IMock<AutocompleteSource>;
  let setStateMock: jest.Mock;

  beforeEach(() => {
    autoCompleteSourceMock = TypeMoq.Mock.ofType<AutocompleteSource>();
    
    setStateMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => ['', setStateMock]);
  });

  test('Basic rendering with label works', () => {
    // Arrange
    const sut = <AutoComplete name='test-name' label='test-label' autocompleteSource={autoCompleteSourceMock.target} />;

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
    const sut = <AutoComplete name='test-name' label='' autocompleteSource={autoCompleteSourceMock.target} />;

    // Act
    const renderedSut = render(sut);

    // Assert
    const input = renderedSut.getByTestId('autocomplete-input');
    const label = renderedSut.queryByTestId('autocomplete-label');

    expect(input.getAttribute('value')).toBe('');
    expect(label).toBeNull();
  });

  test('When entering a text and no entry is found, search is called', () => {
    // Arrange
    autoCompleteSourceMock
      .setup(autocompleteSource => autocompleteSource.search(TypeMoq.It.isAnyString()))
      .returns(() => new Array<AutocompleteEntry>());


    const sut = <AutoComplete name='test-name' label='' autocompleteSource={autoCompleteSourceMock.object} />;
    const renderedSut = render(sut);
    const input = renderedSut.getByTestId('autocomplete-input');

    // Act
    fireEvent.change(input, { target: { value: 123 } });

    // Assert
    expect(input.getAttribute('value')).toBe('123');
    autoCompleteSourceMock.verify(autoCompleteSource => autoCompleteSource.search('123'), TypeMoq.Times.once());
    expect(setStateMock).toBeCalledTimes(1);
  });

  test('When clearing the text, search is not called', () => {
    // Arrange
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: jest.fn(),
    }));

    const sut = <AutoComplete name='test-name' label='' autocompleteSource={autoCompleteSourceMock.object} />;
    const renderedSut = render(sut);
    const input = renderedSut.getByTestId('autocomplete-input');

    // Act
    fireEvent.change(input, { target: { value: '' } });

    // Assert
    expect(input.getAttribute('value')).toBe('');
    autoCompleteSourceMock.verify(autoCompleteSource => autoCompleteSource.search(TypeMoq.It.isAnyString()), TypeMoq.Times.never());
  });
});