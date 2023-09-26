import { AlertColor } from "@mui/material";
interface AlertInterface {
  id?: number;
  type: AlertColor;
  message: string;
  args?: any;
  canClose: boolean
}

export default AlertInterface;
