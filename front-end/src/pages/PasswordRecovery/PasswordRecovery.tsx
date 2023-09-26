import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useAlert } from '../../context/alerts/Alert.context';
import { isEmailValid } from '../../utils/Validations';
import AlertInterface from '../../interfaces/Alert.interface';
import { ALERT_TYPES } from '../../utils/const';
import { usersApi } from '../../api';

import './PasswordRecovery.scss';

function PasswordRecovery() {
  const [t] = useTranslation('global');
  const [emailError, setEmailError] = useState<boolean>(false);
  const { addAlert, cleanAlerts } = useAlert();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
    cleanAlerts();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email')).replace(/ /g,'');

    let alert: AlertInterface = {
      message: '',
      type: ALERT_TYPES.error,
      args: { email },
      canClose: true
    }

    if (isEmailValid(email)) { 
      setEmailError(false)
    } else {
      setEmailError(true);
      alert.message = 'server.user.invalidEmail';
      addAlert(alert);
      return false;
    }

    const { error, string, success } = await usersApi.passwordRecovery(email);

    if (error) {
      alert.message = error.translationKey ? error.translationKey : 'server.error';
      addAlert(alert);
    }
    
    if (string && success) {
      alert.message = success.translationKey;
      alert.type = ALERT_TYPES.info;
      addAlert(alert);
    }
    return true;
  }

  return (
    <Container component="main" maxWidth="xs" className="password-recovery">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" className="title">
          {t('pages.login.passwordRecoveryMessage')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('pages.login.email')}
            name="email"
            error={emailError}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('Search').toUpperCase()}
          </Button>
          <Grid container>
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

export default PasswordRecovery;
