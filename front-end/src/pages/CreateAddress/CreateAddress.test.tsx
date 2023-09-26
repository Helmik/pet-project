// import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateAddress from './CreateAddress';

test('renders learn react link', () => {
  render(<CreateAddress />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
