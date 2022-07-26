import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const testShow = {
  name: 'Stranger Danger',
  summary: 'Dangerous strangers',
  seasons: [
    {id: 0, name: 's1', episodes: []},
    {id: 1, name: 's2', episodes: []}
  ]
}


test('renders without errors', () => {
  render(<Show show={testShow} selectedSeason="none" />)
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} />)

    const loading = screen.queryByTestId('loading-container');

    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
  render(<Show show={testShow} selectedSeason="none" />)

  const options = screen.queryAllByTestId('season-option')

  expect(options).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => {
  const mockHandleSelect = jest.fn()
  render(<Show show={testShow} selectedSeason="none" handleSelect={mockHandleSelect} />)
  
  const select = screen.getByLabelText(/select a season/i)
  userEvent.selectOptions(select, ['1'])

  expect(mockHandleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={testShow} selectedSeason="none" />)
  let episodes = screen.queryByTestId("episodes-container");
  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={testShow} selectedSeason={1} />)
  episodes = screen.queryByTestId("episodes-container");
  expect(episodes).toBeInTheDocument()
}); 
