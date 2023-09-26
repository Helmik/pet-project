// import React from 'react';
import { render, screen } from '@testing-library/react';
import AddressProfile from './AddressProfile';

test('renders learn react link', () => {
  render(<AddressProfile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
