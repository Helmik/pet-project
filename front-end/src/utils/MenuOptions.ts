import Home from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import MenuItem from '../interfaces/MenuItem.interface';

const HeaderMenu : MenuItem[] = [
  {
    i18nCode: 'components.header.menu.home',
    url: '/',
    icon: Home,
    requiereAuth: false,
    onlyAnonymousUser: false
  },
  {
    i18nCode: 'components.header.menu.profile',
    url: '/profile',
    icon: AccountCircleIcon,
    requiereAuth: true,
    onlyAnonymousUser: false
  },
  {
    i18nCode: 'components.header.menu.business',
    url: '/profile/business',
    icon: MonetizationOnIcon,
    requiereAuth: true,
    onlyAnonymousUser: false
  },
  {
    i18nCode: 'components.header.menu.login',
    url: '/profile',
    icon: LoginIcon,
    requiereAuth: false,
    onlyAnonymousUser: true
  },
  {
    i18nCode: 'components.header.menu.logout',
    url: '/profile/business',
    icon: LogoutIcon,
    requiereAuth: true,
    onlyAnonymousUser: false
  }
];

export default HeaderMenu;
