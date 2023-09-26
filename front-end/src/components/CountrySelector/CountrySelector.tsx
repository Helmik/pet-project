
import { useEffect, useState, ReactElement, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { geographyApi } from '../../api/index';
import { CountryInterface } from '../../../../common/interfaces/MxGeography.interface';
import { ResponseCountriesInterface } from '../../../../common/interfaces/Response.interface';

import './CountrySelector.scss';

interface CountrySelectorOptionsInterface {
  showPhone?: boolean;
  showCurrency?: boolean;
  showIso2?: boolean;
  showIso3?: boolean;
  defaultValueId?: number;
  disabled?: boolean;
  isRequired?: boolean;
  id?: string;
  onChange?: (
    value: CountryInterface | null,
    event: SyntheticEvent,
  ) => void
}

function CountrySelector({ showPhone, showCurrency, showIso2, showIso3, disabled = false, defaultValueId, isRequired, id, onChange }: CountrySelectorOptionsInterface) {
  const [t] = useTranslation('global');

  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [countrySelected, setCountrySelected] = useState<CountryInterface | null>(null);

  useEffect(() => {
    geographyApi
      .getAllCountries()
      .then((response: ResponseCountriesInterface) => {
        const countries = response.countries || [];
        const country = countries.find(c => c.id === defaultValueId);
        setCountries(countries);
        setCountrySelected(country || null)
      })
  }, [t]);

  function renderOption(props: any, option: CountryInterface): ReactElement {
    let labels = [<span key='name' className='name'>{option.name}</span>];

    if (showIso3) {
      labels.unshift(<span key='iso3' className='country-selector-phone'>{option.iso3}</span>);
    }

    if (showIso2) {
      labels.unshift(<span key='iso2' className='country-selector-phone'>{option.iso2}</span>);
    }

    if (showCurrency) {
      labels.unshift(<span key='currency' className='country-selector-phone'>{option.currencyCode}</span>);
    }

    if (showPhone) {
      labels.unshift(<span key='phone' className='country-selector-phone'>{option.phoneCode}</span>);
    }

    return (
      <Box component='li' sx={{ '& > img': { mx: 2, flexShrink: 0 }}} {...props}>
        <img
          loading='lazy'
          width='20'
          height='10'
          src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w40/${option.iso2.toLowerCase()}.png 2x`}
          alt={option.name + '-flag'}
        />
          {labels}
      </Box>
    );
  }

  function buildLabel(option: CountryInterface): string {
    const phone = showPhone ? `(${option.phoneCode})` : '';
    const currency = showCurrency ? `(${option.currencyCode})` : '';
    const iso2 = showIso2 ? `(${option.iso2})` : '';
    const iso3 = showIso3 ? `(${option.iso3})` : '';

    return `${phone} ${currency} ${option.name} ${iso2} ${iso3}`;
  }

  function buildTextFieldLabel(): string {
    let label = showPhone ? 'components.countrySelector.inputTextLabel.phone' : 'components.countrySelector.inputTextLabel.country';
    label = showCurrency ? 'components.countrySelector.inputTextLabel.currency' : label;
    label = showPhone && showCurrency ? 'components.countrySelector.inputTextLabel.country' : label;
    return `${t(label)} ${isRequired ? '*' : ''}`;
  }

  function onChangeEvent(event: SyntheticEvent, newValue: CountryInterface | null): void {
    setCountrySelected(newValue);
    if (typeof onChange === 'function') {
      onChange(newValue, event);
    }
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option: CountryInterface) => buildLabel(option),
  });

  return (
    <Autocomplete
      id={id ? id : 'country-select' }
      autoComplete={true}
      options={countries}
      autoHighlight
      disableClearable={disabled}
      disabled={disabled}
      value={countrySelected}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChangeEvent}
      getOptionLabel={buildLabel}
      renderOption={renderOption}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label={buildTextFieldLabel()}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default CountrySelector;
