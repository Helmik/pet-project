import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useAlert } from '../../context/alerts/Alert.context';
import AlertInterface from '../../interfaces/Alert.interface';
import { ALERT_TYPES } from '../../utils/const';
import { usersApi } from '../../api';
import { isPasswordValid } from '../../utils/Validations';

import './ChangePassword.scss';

function ChangePassword() {
  const [t] = useTranslation('global');
  const { addAlert, cleanAlerts } = useAlert();
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
    cleanAlerts();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password'));
    const passwordConfirmation = String(formData.get('passwordConfirmation'));

    let alert: AlertInterface = {
      message: '',
      type: ALERT_TYPES.error,
      canClose: true
    }

    if (isPasswordValid(password)) { 
      setPasswordError(false)
    } else {
      alert.message = 'server.user.userInvalidFormatPassword';
      addAlert(alert);
      setPasswordError(true);
      return false;
    }

    if (password === passwordConfirmation) {
      setPasswordConfirmationError(false);
    } else {
      setPasswordConfirmationError(true);
      alert.message = 'server.user.wrongPasswordConfirmation';
      addAlert(alert);
      return false;
    }

    const url = new URL(window.location.toString());
    const token = url.searchParams.get('token') || '';
    const { error, user, success } = await usersApi.changePassword(password, token);

    if (error) {
      // alert.message = error.translationKey ? error.translationKey : 'server.error';
      alert.message = error.translationKey;
      addAlert(alert);
    }
    
    if (user && success) {
      alert.message = success.translationKey;
      alert.type = ALERT_TYPES.success;
      addAlert(alert);
      navigate('/login');
    }
    return true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          {t('pages.login.changePassword')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={t('pages.login.password')}
                type="password"
                id="password"
                error={passwordError || passwordConfirmationError}/>
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirmation"
                label={t('pages.login.passwordConfirmation')}
                type="password"
                id="password-confirmation"
                error={passwordConfirmationError}/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {t('pages.login.changePassword')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid xs>
            </Grid>
            <Grid>
              <NavLink to="/login" className="material-link">
                {t('pages.login.signIn')}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ChangePassword;
