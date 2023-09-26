import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import UserInterface from '../../../../common/interfaces/User.interface';

import SnackBar from '../../components/SnackBar/SnackBar';
import AlertInterface from '../../interfaces/Alert.interface';
import { useAlert } from '../../context/alerts/Alert.context';
import { useUser } from '../../context/user/User.context';
import { ALERT_TYPES } from '../../utils/const';
import { isEmailValid } from '../../utils/Validations';
import { usersApi } from '../../api';

import './SignIn.scss';

function SignIn() {

  const [t] = useTranslation('global');
  const location: any = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { addAlert, cleanAlerts } = useAlert();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const user: UserInterface = location && location.state ? location.state.user : undefined;
  const alert: AlertInterface = {
    message: 'pages.login.welcomeMessage',
    type: 'success',
    canClose: true,
    args: user,
    id: Math.floor(Math.random() * 10000)
  };

  const snackBar = user ? <SnackBar alert={Object.assign({}, alert)} isOpen={true} duration={10000} vertical="bottom" horizontal="left"/> : undefined;

  function isFormValid(email: string, password: string): boolean {
    let _alert = Object.assign({}, alert);
    _alert.type = ALERT_TYPES.error;
    if (isEmailValid(email)) { 
      setEmailError(false)
    } else {
      setEmailError(true);
      _alert.message = 'server.user.invalidEmail';
      addAlert(_alert);
      return false;
    }

    if (password === '') {
      setPasswordError(true);
      _alert.message = 'server.user.create.passwordRequired';
      addAlert(_alert);
      return false;
    } else {
      setPasswordError(false);
    }

    return !emailError && !passwordError;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    let _alert = Object.assign({}, alert);
    cleanAlerts();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email'));
    const password = String(data.get('password'));
    _alert.args = { email };

    if (isFormValid(email, password)) {
      const { error, user } = await usersApi.login(email, password);

      if (error) {
        _alert.type = ALERT_TYPES.error;
        _alert.message = error.translationKey ? error.translationKey : 'server.error';
        addAlert(_alert);
      }

      if (user) {
        setUser(user);
        navigate('/');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {snackBar}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('pages.login.signIn')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('pages.login.email')}
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('pages.login.password')}
            type="password"
            id="password"
            error={passwordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('pages.login.signIn').toUpperCase()}
          </Button>
          <Grid container>
            <Grid xs>
              <NavLink to="/password-recovery" className="material-link">
                  {t('pages.login.forgotPassword')}
              </NavLink>
            </Grid>
            <Grid>
              <NavLink to="/signup" className="material-link">
                {t('pages.login.createAccount')}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
