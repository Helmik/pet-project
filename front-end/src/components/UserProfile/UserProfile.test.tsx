// import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders learn react link', () => {
  render(<UserProfile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
