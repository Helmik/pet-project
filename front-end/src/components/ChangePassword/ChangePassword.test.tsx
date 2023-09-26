// import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangePassword from './ChangePassword';

test('renders learn react link', () => {
  render(<ChangePassword />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
