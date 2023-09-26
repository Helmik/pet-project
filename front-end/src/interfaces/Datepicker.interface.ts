import { DateView } from '@mui/x-date-pickers'

export default interface DatepickerInterface {
  label?: string;
  views?: DateView[];
  date?: Date | null;
  onDateChange?: any;
  openTo?: DateView;
}
