import { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import UserProfile from '../../components/UserProfile/UserProfile';
import AddressProfile from '../../components/AddressProfile/AddressProfile';

import './Profile.scss';

function Profile() {
  
  const [t] = useTranslation('global');
  const [expanded, setExpanded] = useState<string | false>(false);
  const options = {
    profile: 'profile',
    address: 'address'
  };

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (
    <>
      <Accordion expanded={expanded === options.profile} onChange={handleChange(options.profile)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={options.profile}
          id={options.profile}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {t('pages.profile.profile')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>

          <UserProfile />
          
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === options.address} onChange={handleChange(options.address)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={options.address}
          id={options.address}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{t('pages.profile.addresses')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <AddressProfile />

        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Profile;
