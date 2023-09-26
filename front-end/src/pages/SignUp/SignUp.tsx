import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { isEmailValid, isPasswordValid } from '../../utils/Validations';
import UserInterface from '../../../../common/interfaces/User.interface';
import { usersApi } from '../../api';
import { useAlert } from '../../context/alerts/Alert.context';
import AlertInterface from '../../interfaces/Alert.interface';
import { ALERT_TYPES, USER_ROLES } from '../../utils/const';

import './SignUp.scss';

function SignUp() {
  const [t] = useTranslation('global');
  const { addAlert, cleanAlerts } = useAlert();
  const navigate = useNavigate();


  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>();

  function isFormValid(user: UserInterface, passwordConfirmation: string | undefined): boolean {
    let alert: AlertInterface = {
      message: '',
      type: ALERT_TYPES.error,
      args: { email: user.email },
      canClose: true
    }
    
    if (user.firstName === '') { 
      alert.message = 'server.user.create.firstNameRequired';
      addAlert(alert);
      setFirstNameError(true)
      return false;
    } else {
      setFirstNameError(false);
    }
    if (user.lastName === '') { 
      alert.message = 'server.user.create.lastNameRequired';
      addAlert(alert);
      setLastNameError(true)
      return false;
    } else {
      setLastNameError(false);
    }
    if (isEmailValid(user.email)) { 
      setEmailError(false)
    } else {
      setEmailError(true);
      alert.message = 'server.user.invalidEmail';
      addAlert(alert);
      return false;
    }

    if (isPasswordValid(user.password)) { 
      setPasswordError(false)
    } else {
      alert.message = 'server.user.userInvalidFormatPassword';
      addAlert(alert);
      setPasswordError(true);
      return false;
    }

    if (user.password === passwordConfirmation) {
      setPasswordConfirmationError(false);
    } else {
      setPasswordConfirmationError(true);
      alert.message = 'server.user.wrongPasswordConfirmation';
      addAlert(alert);
      return false;
    }

    return !firstNameError && !lastNameError && !emailError && !passwordError && !passwordConfirmationError;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
    cleanAlerts();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData: UserInterface = {
      firstName: String(formData.get('firstName')),
      lastName: String(formData.get('lastName')),
      email: String(formData.get('email')).replace(/ /g,''),
      password: password,
      userRoleId: USER_ROLES.normalUser
    };

    if (isFormValid(userData, passwordConfirmation)) {
      const { error, user } = await usersApi.signup(userData);
      
      if (error) {
        let alert: AlertInterface = {
          message: error.translationKey ? error.translationKey : 'server.error',
          type: ALERT_TYPES.error,
          args: { email: userData.email },
          canClose: false
        }
        addAlert(alert);
      }
  
      if (user) {
        navigate('/login', { state: { user }});
      }
    }
  };

  function goToSignIn(): void{
    cleanAlerts();
    navigate('/login');
  }

  const handleClickShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('pages.login.signUp')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label={t('pages.login.firstName')}
                autoFocus
                error={firstNameError}/>
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={t('pages.login.lastName')}
                name="lastName"
                autoComplete="family-name"
                error={lastNameError}/>
            </Grid>
            <Grid xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={t('pages.login.email')}
                name="email"
                error={emailError}/>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="outlined" error={passwordError || passwordConfirmationError} fullWidth={true}>
                <InputLabel htmlFor="password">{t('pages.login.password')}</InputLabel>
                <OutlinedInput
                  id="password"
                  type={isPasswordShown ? 'text' : 'password'}
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={t('pages.login.password')}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="outlined" error={passwordError || passwordConfirmationError} fullWidth={true}>
                <InputLabel htmlFor="password-confirmation">{t('pages.login.passwordConfirmation')}</InputLabel>
                <OutlinedInput
                  id="password-confirmation"
                  type={isPasswordShown ? 'text' : 'password'}
                  value={passwordConfirmation}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={t('pages.login.passwordConfirmation')}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {t('pages.login.signUp')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link href="#" variant="body2" onClick={goToSignIn}>
                {t('pages.login.alreadyHasAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
