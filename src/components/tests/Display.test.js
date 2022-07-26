import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow')

const testShow = {
  name: 'Stranger Danger',
  summary: 'Dangerous strangers',
  seasons: [
    {id: 0, name: 's1', episodes: []},
    {id: 1, name: 's2', episodes: []}
  ]
}

test('renders without errors with no props', () => {
  render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
  render(<Display />)
  mockFetchShow.mockResolvedValueOnce(testShow)
  const button = screen.getByRole("button");
  userEvent.click(button)
  const show = await screen.findByTestId('show-container')

  expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
  render(<Display />)
  mockFetchShow.mockResolvedValueOnce(testShow)
  const button = screen.getByRole("button");
  userEvent.click(button)

  await waitFor(() => {
    const options = screen.queryAllByTestId("season-option")
    expect(options).toHaveLength(2)
  })
});
