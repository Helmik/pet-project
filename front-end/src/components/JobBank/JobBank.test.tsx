// import React from 'react';
import { render, screen } from '@testing-library/react';
import JobBank from './JobBank';

test('renders learn react link', () => {
  render(<JobBank />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
