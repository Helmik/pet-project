// import React from 'react';
import { render, screen } from '@testing-library/react';
import PasswordRecovery from './PasswordRecovery';

test('renders learn react link', () => {
  render(<PasswordRecovery />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
