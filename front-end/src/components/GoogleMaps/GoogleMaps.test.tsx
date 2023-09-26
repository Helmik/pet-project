// import React from 'react';
import { render, screen } from '@testing-library/react';
import GoogleMaps from './GoogleMaps';

test('renders learn react link', () => {
  render(<GoogleMaps />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
