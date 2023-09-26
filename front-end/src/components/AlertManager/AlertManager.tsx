import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

import { useAlert } from '../../context/alerts/Alert.context';
import AlertInterface from '../../interfaces/Alert.interface';

import './AlertManager.scss';

function AlertManager() {
  const { alerts, removeAlertById } =  useAlert();
  const [t] = useTranslation('global');

  const renderAlerts = alerts.map((alert: AlertInterface) => {
    let close = alert.canClose ? () => {removeAlertById(alert.id)} : undefined;
    return <Alert
              key={alert.id}
              variant="outlined"
              severity={alert.type}
              className="alert"
              onClose={close}>
                <>{t(alert.message, alert.args)}</>
            </Alert>;
  });

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {renderAlerts}
    </Stack>
  );
}

export default AlertManager;
