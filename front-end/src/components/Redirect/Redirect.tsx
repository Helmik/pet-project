import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useUser } from '../../context/user/User.context';

import './Redirect.scss';

function Redirect({ children }: { children: JSX.Element }) {
  const { isLogged } = useUser();
  const [redirectToHome, setRedirectToHome] = useState<boolean>(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      if (!isLogged) {
        setRedirectToHome(true);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isLogged]);

  function renderElement() {
    if (isLogged) {
      return children;
    }

    if (redirectToHome) {
      return <Navigate to="/" replace />
    }


    return  <Box sx={{ display: 'table' }} mt={20} mx={'auto'}>
              <CircularProgress />
            </Box>
  }

  return renderElement();
}

export default Redirect;
