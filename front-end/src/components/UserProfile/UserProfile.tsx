import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import { stringAvatar } from '../../utils/utils';
import Datepicker from '../Datepicker/Datepicker';
import DataBase from '../../utils/DataBase';
import UserInterface from '../../../../common/interfaces/User.interface';

import './UserProfile.scss';

function UserProfile() {

  const [t] = useTranslation('global');
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const db = new DataBase();
  const user: UserInterface = db.getLocal('user');

  function getAvatar() {
    const options = stringAvatar(`${user.firstName} ${user.lastName}`)
    options.sx.margin = 'auto';

    return <Avatar {...options} />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<any> {
  }

  return (
    <>
      {getAvatar()}
      {/* <Typography mt={2}>
        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
        Aliquam eget maximus est, id dignissim quam.
      </Typography> */}
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
              defaultValue={user.firstName}
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
              defaultValue={user.lastName}
              error={lastNameError}/>
          </Grid>
          <Grid xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label={t('pages.login.email')}
              name="email"
              defaultValue={user.email}
              error={emailError}/>
          </Grid>
        </Grid>
        <Datepicker
          openTo={'year'}
          views={['year', 'month', 'day']}/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          {t('pages.login.save')}
        </Button>
      </Box>
    </>
  );
}

export default UserProfile;
