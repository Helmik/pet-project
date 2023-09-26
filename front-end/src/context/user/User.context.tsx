import { useState, createContext, useMemo, useContext, useEffect } from 'react';

import UserInterface from '../../../../common/interfaces/User.interface';
import DataBase from '../../utils/DataBase';

const UserContext = createContext(null);
const dataBase = new DataBase();

export function UserProvider(props: any) {
  const [user, setUserLogged] = useState<UserInterface | undefined>(undefined);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const user = dataBase.getLocal('user');
    setUser(user);
  }, [])

  function setUser(user: UserInterface): void {
    if (user && user.token) {
      setUserLogged(user);
      setIsLogged(true);
      dataBase.setLocal('user', user);
    }
  }

  function removeUser(): void {
    setUserLogged(undefined);
    setIsLogged(false);
    localStorage.removeItem('user');
  }

  const userValue = useMemo(() => {
    return ({
      user,
      isLogged,
      setUser,
      removeUser
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <UserContext.Provider value={userValue} {...props} />
}

export function useUser(): any {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Error on create User context');
  }

  return context;
}
