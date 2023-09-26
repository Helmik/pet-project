// import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangeLanguage from './ChangeLanguage';

test('renders learn react link', () => {
  render(<ChangeLanguage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
