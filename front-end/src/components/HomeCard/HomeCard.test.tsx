// import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeCard from './HomeCard';

test('renders learn react link', () => {
  render(<HomeCard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
