// import React from 'react';
import { render, screen } from '@testing-library/react';
import Activities from './Activities';

test('renders learn react link', () => {
  render(<Activities />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
