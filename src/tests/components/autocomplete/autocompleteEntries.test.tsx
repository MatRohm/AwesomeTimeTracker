import { render } from '@testing-library/react';
import React from 'react';
import { AutoCompleteEntries } from '../../../components/autocomplete/autocompleteEntries';

describe('Tests whether <AutCompleteEntries> works or not', () => {
  test('When rendered without entries, nothing is shown', () => {
    // Act
    const { container } = render(<AutoCompleteEntries entries={[]}/>);

    // Assert
    expect(container.firstChild).toBeNull();
  });

  test('When rendered with entries, the entries are shown', async () => {
    // Act
    const renderedSut = render(<AutoCompleteEntries entries={[{name: 'Swag'}]}/>);

    // Assert
    const listitems = await renderedSut.findAllByRole('listitem');
    expect(listitems).toHaveLength(1);
    expect(listitems[0].innerHTML).toBe('Swag');
  });
});