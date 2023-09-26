import { useState, createContext, useMemo, useContext } from 'react';

import AlertInterface from '../../interfaces/Alert.interface';

const AlertContext = createContext(null);

export function AlertProvider(props: any) {
  const [alerts, setAlerts] = useState<AlertInterface[]>([]);

  function generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  function addAlert(alert: AlertInterface): void {
    alert.id = generateId();
    if (alerts.length>-1){
      setAlerts([...alerts, alert]);
    }
  }

  function removeAlertById(id: number): void {
    let _alerts = alerts.filter(a => {
      if (a.id === id) {
        return false;
      }
      return true;
    });
    setAlerts(_alerts);
  }

  function cleanAlerts(): void {
    alerts.length = 0;
    setAlerts([]);
  }

  const alertValue = useMemo(() => {
    return ({
      alerts,
      addAlert,
      cleanAlerts,
      removeAlertById
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts]);

  return <AlertContext.Provider value={alertValue} {...props} />
}

export function useAlert(): any {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('Error on create Alert context');
  }

  return context;
}
