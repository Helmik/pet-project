// import React from 'react';
import { render, screen } from '@testing-library/react';
import CountrySelector from './CountrySelector';

test('renders learn react link', () => {
  render(<CountrySelector />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
