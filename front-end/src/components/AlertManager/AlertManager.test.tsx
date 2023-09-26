// import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertManager from './AlertManager';

test('renders learn react link', () => {
  render(<AlertManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
