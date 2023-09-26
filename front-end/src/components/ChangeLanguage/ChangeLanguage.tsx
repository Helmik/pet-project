import { useState, useEffect }  from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CountryLanguage from '../../interfaces/CountryLanguage.interface';
import './ChangeLanguage.scss';


function ChangeLanguage() {
  // TODO: Remove this consts and pass it to the server side
  const countries : CountryLanguage[] = [
    { languageCode: 'ES', flagCode: 'MX', i18nCode: 'spanish' },
    { languageCode: 'EN', flagCode: 'US', i18nCode: 'english' }
  ];

  const defaultLanguage = 'EN';
  const buildFlagIcon20 = (country: CountryLanguage) => {
    return `https://flagcdn.com/w20/${country.flagCode.toLowerCase()}.png`;
  };

  const buildFlagIcon40 = (country: CountryLanguage) => {
    return `https://flagcdn.com/w40/${country.flagCode.toLowerCase()}.png 2x`;
  };

  const getLocalStorageLanguage = (): CountryLanguage | undefined => {
    let lng;
    try {
      const l = JSON.parse(localStorage.getItem('lng') || '');
      lng = l;
    } catch(e) {}

    return lng;
  };

  const getDefaultLanguage = () : CountryLanguage => {
    const lng = getLocalStorageLanguage();

    if (lng) {
      return lng;
    }

    let language = navigator.language || defaultLanguage;
    language = language.split('-')[0];
    const selection = countries.find(country => country.languageCode.toLowerCase() === language);

    return selection ? selection : { languageCode: defaultLanguage, flagCode: 'GB', i18nCode: 'english' };
  }

  // const [open, setOpen] = useState(false);
  const [countrySelected, setCountrySelected] = useState<CountryLanguage>(getDefaultLanguage());
  const [flagIcon20, setFlagIcon20] = useState<string>(buildFlagIcon20(countrySelected));
  const [flagIcon40, setFlagIcon40] = useState<string>(buildFlagIcon40(countrySelected));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [t, i18n] = useTranslation('global');
  const open = Boolean(anchorEl);
  
  const changeLanguage = (country: CountryLanguage | null | undefined): void => {
    if (country) {
      i18n.changeLanguage(country.languageCode.toLowerCase());
      setFlagIcon20(buildFlagIcon20(country));
      setFlagIcon40(buildFlagIcon40(country));
      setCountrySelected(country);
      localStorage.setItem('lng', JSON.stringify(country));
    }
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, country: CountryLanguage): void => {
    changeLanguage(country)
  };

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string): void => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => { changeLanguage(countrySelected) }, 0);
    
    return () => {
      clearTimeout(timer)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countrySelected]);

  return (
    <>
      <IconButton
        id="language-icon"
        color="primary"
        aria-label="language"
        component="span"
        onClick={handleClickOpen}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
        <img
          loading="lazy"
          width="20"
          src={flagIcon20}
          srcSet={flagIcon40}
          alt=""
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          {countries.map(country => {
            return (
              <MenuItem
                key={country.languageCode}
                selected={countrySelected.languageCode === country.languageCode}
                onClick={(event) => handleMenuItemClick(event, country)}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${country.flagCode.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${country.flagCode.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {t(`components.changeLanguage.${country.i18nCode}`)} ({country.languageCode})

              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
}

export default ChangeLanguage;
