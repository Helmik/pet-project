import { Alert, Snackbar } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import SnackbarInterface from '../../interfaces/Snackbar.interface';

import './SnackBar.scss';

function SnackBar({alert, duration, isOpen, vertical, horizontal}: SnackbarInterface) {
  const [t] = useTranslation('global');
  const [open, setOpen] = useState(isOpen);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={duration || 6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <Alert
        key={alert.id}
        variant="outlined"
        severity={alert.type}
        className="alert"
        onClose={handleClose}>
          <>{t(alert.message, alert.args)}</>
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
