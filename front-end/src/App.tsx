// import { Routes, Route } from 'react-router';
import { StrictMode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecovery';
import Profile from './pages/Profile/Profile';
import CreateAddress from './pages/CreateAddress/CreateAddress';

import Redirect from './components/Redirect/Redirect';
import Header from './components/Header/Header';
import Activities from './components/Activities/Activities';
import Classes from './components/Classes/Classes';
import JobBank from './components/JobBank/JobBank';
import HealtCare from './components/HealtCare/HealtCare';
import AlertManager from './components/AlertManager/AlertManager';
import ChangePassword from './components/ChangePassword/ChangePassword';

import { useUser } from './context/user/User.context';

import './App.scss';  

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { isLogged } = useUser();

  function redirectUserLogged(element: any) {
    if (isLogged) {
      return <Navigate to="/"/>;
    }
    return element;
  }

  return (
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container fixed id='main-container'>
          <Header />
          <Paper elevation={6} className="page-container">
            <AlertManager />
            <Routes>
              <Route path="/" element={ <Home /> }/>
              <Route path="/login" element={ redirectUserLogged(<SignIn />) }/>
              <Route path="/signup" element={ redirectUserLogged(<SignUp />) }/>
              <Route path="/password-recovery" element={ redirectUserLogged(<PasswordRecovery />) }/>
              <Route path="/change-password" element={ redirectUserLogged(<ChangePassword />) }/>
              <Route path="/profile" element={<Redirect >
                                                <Profile /> 
                                              </Redirect>} />
              <Route path="/new-address" element={<Redirect >
                                                    <CreateAddress /> 
                                                  </Redirect>} />

              <Route path="/activities" element={ <Activities /> }/>
              <Route path="/classes" element={ <Classes /> }/>
              <Route path="/job-bank" element={ <JobBank /> }/>
              <Route path="/healt-care" element={ <HealtCare /> }/>
              <Route path="/healt-care" element={ <HealtCare /> }/>
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
