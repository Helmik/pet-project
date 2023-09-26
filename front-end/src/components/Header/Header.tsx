import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import SvgIcon from '@mui/material/SvgIcon';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { Link } from '@mui/material';

import ChangeLanguage from '../ChangeLanguage/ChangeLanguage';
import HeaderMenu from '../../utils/MenuOptions';
import { useUser } from '../../context/user/User.context';
import { usersApi } from '../../api';
import { useAlert } from '../../context/alerts/Alert.context';

import './Header.scss';

function Header () {
  const ANCHOR = 'left'; // 'top' | 'left' | 'bottom' | 'right'
  const { isLogged, removeUser, user } = useUser();
  const navigate = useNavigate();
  const { addAlert, cleanAlerts } = useAlert();
  const [t] = useTranslation('global');
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (open: boolean) => 
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [ANCHOR]: open });
    };
    
  
  const buildIems = () => {
    const items: any = [];
    HeaderMenu.forEach((menu, index) => {
      const common = !menu.onlyAnonymousUser && !menu.requiereAuth;
      const auth = isLogged && menu.requiereAuth;
      const anonymous = !isLogged && menu.onlyAnonymousUser;

      if (common || auth || anonymous) {
        items.push(
          <NavLink key={index} to={menu.url} className="link-nav">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SvgIcon component={menu.icon}></SvgIcon>
                </ListItemIcon>
                <ListItemText primary={t(menu.i18nCode)} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        )
      }
    });

    return items;
  }
    

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {buildIems()}
      </List>
      <Divider />
    </Box>
  );

  function goTologin(): void {
    navigate('/login');
  }

  async function logout(): Promise<void>{
    cleanAlerts();
    const { error } = await usersApi.logout(user);

    if (error) {
      addAlert({
        message: error.translationKey ? error.translationKey : 'server.error',
        type: 'error',
        canClose: true,
        args: user,
        id: Math.floor(Math.random() * 10000)
      })
    }

    removeUser();
    navigate('/login')
  }

  function renderButton() {
    if (isLogged) {
      return <Button onClick={logout} color="inherit" className="session-button">{t('components.header.logout')}</Button>
    }
    return <Button onClick={goTologin} color="inherit" className="session-button">{t('components.header.login')}</Button>
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="header">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('components.header.title')}
            </Typography>
            <ChangeLanguage />
            <Link className="link-nav">
              {renderButton()}
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor={ANCHOR}
        open={state[ANCHOR]}
        onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}

export default Header;
