import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DatepickerInterface from '../../interfaces/Datepicker.interface';

import 'dayjs/locale/en-au';
import 'dayjs/locale/en-ca';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/en';
import 'dayjs/locale/es-mx';
import 'dayjs/locale/es-us';
import 'dayjs/locale/es';

import './Datepicker.scss';

function Datepicker({ label, views, date, onDateChange, openTo }: DatepickerInterface) {
  const [value, setValue] = useState<Dayjs | null>(null);

  const lng: string = navigator.language.toLocaleLowerCase();
  const lngStored = localStorage.getItem('lng')
  let lngConfig: string = '';
  
  switch(lng) {
    case 'en-au':
      lngConfig = 'en-au';
      break;
    case 'en-ca':
      lngConfig = 'en-ca';
      break;
    case 'en-gb':
      lngConfig = 'en-gb';
      break;
    case 'en-us':
      lngConfig = 'en';
      break;
    case 'es-mx':
      lngConfig = 'es-mx';
      break;
    case 'es-us':
      lngConfig = 'es-us';
      break;
  }

  if (lngConfig === '' && lngStored && lngStored.length > 0) {
    if (lngConfig.toLowerCase().indexOf('es') >= 0) {
      lngConfig = 'es';
    } else {
      lngConfig = 'en';
    }
  }

  dayjs.locale(lngConfig);
  let dateFormat = dayjs.Ls[lngConfig].formats.L || 'MM/DD/YYY';

  if (lngConfig.indexOf('es') >= 0) {
    dateFormat = dateFormat.replace(/Y/g, 'A');
  }

  // function buildParams(params: any): any {
  //   params.inputProps.placeholder = dateFormat;
  //   return params;
  // }
  
  if (!date) {
    date = null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} mt={2}>
        <DatePicker
          disableFuture
          label={label}
          openTo={openTo}
          views={views}
          value={value}
          onChange={(newDate) => {
            if (onDateChange && typeof onDateChange === 'function') {
              onDateChange(newDate);
            }
            setValue(newDate);
          }}
          // renderInput={(params) => <TextField {...buildParams(params)} />}
          slotProps={{ textField: { variant: 'outlined' } }}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default Datepicker;
