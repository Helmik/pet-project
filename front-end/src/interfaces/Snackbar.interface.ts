import { SnackbarOrigin } from "@mui/material";
import AlertInterface from "./Alert.interface";

interface SnackbarInterface {
  alert: AlertInterface;
  vertical: SnackbarOrigin['vertical'];
  horizontal: SnackbarOrigin['horizontal'];
  isOpen?: boolean;
  duration?: number
}

export default SnackbarInterface;
