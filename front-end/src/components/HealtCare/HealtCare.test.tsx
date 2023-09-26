// import React from 'react';
import { render, screen } from '@testing-library/react';
import HealtCare from './HealtCare';

test('renders learn react link', () => {
  render(<HealtCare />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
