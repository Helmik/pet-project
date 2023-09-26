// import React from 'react';
import { render, screen } from '@testing-library/react';
import Classes from './Classes';

test('renders learn react link', () => {
  render(<Classes />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
