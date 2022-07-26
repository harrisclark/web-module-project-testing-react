import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testData = {
  id: 1,
  name: "",
  image: "http://static.tvmaze.com.uploads/images/medium_landscape/67/168918.jpg",
  season: 1,
  number: 1,
  summary: "This episode is a test",
  runtime: 1
}

const testDataNullImg = {
  id: 1,
  name: "",
  image: null,
  season: 1,
  number: 1,
  summary: "This episode is a test",
  runtime: 1
}

test("renders without error", () => {
  render(<Episode episode={testData} />)
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={testData} />)

  const summary = screen.queryByText(/this episode is a test/i);

  expect(summary).toBeInTheDocument();
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={testDataNullImg} />)

  const image = screen.queryByRole('img');
  expect(image.src).toEqual('https://i.ibb.co/2FsfXqM/stranger-things.png')
});
