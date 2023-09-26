// import React from 'react';
import { render, screen } from '@testing-library/react';

import AlertInterface from '../../interfaces/Alert.interface';
import SnackBar from './SnackBar';

test('renders learn react link', () => {
  const alert: AlertInterface = {
    message: 'Welcome',
    type: 'success',
    canClose: true,
  };
  
  render(<SnackBar alert={alert} vertical="top" horizontal="right"/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
