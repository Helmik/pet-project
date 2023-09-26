// import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkNav from './LinkNav';

test('renders learn react link', () => {
  render(<LinkNav href="asd"/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
