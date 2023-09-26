import React from 'react';
import { render, screen } from '@testing-library/react';
import Redirect from './Redirect';

test('renders learn react link', () => {
  render(<Redirect>
            <h1>Hello</h1>
        </Redirect>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
