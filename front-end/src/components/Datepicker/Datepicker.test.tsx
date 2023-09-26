// import React from 'react';
import { render, screen } from '@testing-library/react';
import Datepicker from './Datepicker';

test('renders learn react link', () => {
  render(<Datepicker />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
