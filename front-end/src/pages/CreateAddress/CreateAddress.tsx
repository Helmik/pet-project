import { ReactElement, ReactNode, useEffect, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import CountrySelector from '../../components/CountrySelector/CountrySelector';
import { geographyApi } from '../../api';
import { MX_ALLOWED, MX_ALLOWED_MUNICIPALITIES, MX_ALLOWED_STATES } from '../../../../common/utils/consts';
import { MxLocalityInterface, MxMunicipalityInterface, MxStateInterface, MxSuburbInterface } from '../../../../common/interfaces/MxGeography.interface';
import Geolocation from '../../../src/utils/Geolocation';
import useForm from './UseForm.reducer';
import { useAlert } from '../../context/alerts/Alert.context';
import { ResponseCountriesInterface } from '../../../../common/interfaces/Response.interface';
import { ALERT_TYPES } from '../../utils/const';
import { DataFormInterface } from './UseForm.reducer';
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';


import './CreateAddress.scss';

const initialData: DataFormInterface = {
  countries: [],
  states: [],
  municipalities: [],
  localities: [],
  countrySelected: null,
  stateSelected: null,
  municipalitySelected: null,
  localitySelected: null,
  street: '',
  streetNumber: '',
  apartmentNumber: '',
  moreDetails: '',
  step: 0,
  steps: ['pages.createAddress.address', 'pages.createAddress.map'],
  hasStreetInputError: false,
  hasStreetNumberInputError: false,
  geopoint: null
};

function CreateAddress(): ReactElement {
  const theme = useTheme();
  const isBiggerThanMd = useMediaQuery(theme.breakpoints.up('md'));
  const [t] = useTranslation('global');
  const { addAlert, cleanAlerts } = useAlert();

  const {
    // countries,
    states,
    municipalities,
    localities,
    // countrySelected,
    stateSelected,
    municipalitySelected,
    localitySelected,
    street,
    streetNumber,
    apartmentNumber,
    moreDetails,
    step,
    steps,
    hasStreetInputError,
    hasStreetNumberInputError,
    geopoint,
    // updateCountries,
    updateStates,
    updateMunicipalities,
    updateLocalities,
    updateCountrySelected,
    updateStateSelected,
    updateMunicipalitySelected,
    updateLocalitySelected,
    updatSetreet,
    updatSetreetNumber,
    updateApartmentNumber,
    updateMoreDetails,
    // updateStep,
    // updateHasStreetInputError,
    // updateHasStreetNumberInputError,
    updateGeopoint,
    nextStep,
    previousStep,
  } = useForm(initialData);

  useEffect(() => {
    cleanAlerts();
    let message;

    if (hasStreetNumberInputError) { message = 'pages.createAddress.error.streetNumberRequred' }
    if (hasStreetInputError) { message = 'pages.createAddress.error.streetRequired' }
    if (hasStreetInputError && hasStreetNumberInputError) { message = 'pages.createAddress.error.streetAndStreetNumberRequired' }
    if (message) {
      addAlert({
        message,
        type: 'error',
        canClose: true,
        id: Math.floor(Math.random() * 10000)
      })
    }
    // eslint-disable-next-line
  },[hasStreetInputError, hasStreetNumberInputError]);

  useEffect(() => {
    geographyApi
      .getFullAllowedStructure(MX_ALLOWED_STATES.quintanaRoo, MX_ALLOWED_MUNICIPALITIES.tulum)
      .then((data: ResponseCountriesInterface) => {
        if (data.error) {
          addAlert({
            message: data.error.translationKey,
            type: ALERT_TYPES.error,
            canClose: true
          })
        }

        if (data.countries === undefined) { return; }
        const country = data.countries.find(d => d.id === MX_ALLOWED.id);

        if (country && country.states) {
          updateCountrySelected(country);
          updateStates(country.states);

          const stateAllowed = country.states.find((state: MxStateInterface) => state.id === MX_ALLOWED_STATES.quintanaRoo);
          updateMunicipalities(stateAllowed?.municipalities); 
          updateStateSelected(stateAllowed);

          const municipalityAllowed = stateAllowed?.municipalities.find((municipality: MxMunicipalityInterface) => municipality.id === MX_ALLOWED_MUNICIPALITIES.tulum);
          updateMunicipalitySelected(municipalityAllowed);
          updateGeopoint({ lat: municipalityAllowed?.lat || 20.210777, lng: municipalityAllowed?.lng || -87.463205 });

          const localities = municipalityAllowed?.localities;
          const geo =  new Geolocation(localities || []);
          geo.sort().then(data => updateLocalities(data));
        }
      })
    // eslint-disable-next-line
  }, []);

  function renderDesktopStepper(): ReactElement {
    return (
      <Stepper activeStep={step} className="desktop-stepper">
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{t(label)}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  }

  function nextStepEvent() {
    nextStep();
    console.log(step);
  }

  function renderMobileStepper(): ReactElement {
    return (
      <MobileStepper
        steps={steps.length}
        position="static"
        activeStep={step}
        nextButton={
          <Button
            size="small"
            onClick={nextStepEvent}
            disabled={step === steps.length - 1}
          >
            {t('general.next')}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={previousStep} disabled={step === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {t('general.back')}
          </Button>
        }
      />
    );
  }

  function renderStepper(): ReactElement {
    if (isBiggerThanMd) {
      return renderDesktopStepper();
    }
    return renderMobileStepper();
  }

  function renderStepperFooter(): ReactElement | null {
    function renderPreviousButton(): ReactElement | null {
      if (step === 0) { return null;}

      return (
        <Button
          color="inherit"
          disabled={step === 0}
          onClick={previousStep}
          sx={{ mr: 1 }}
        >
          {t('general.back')}
        </Button>
      );
    }

    return (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {renderPreviousButton()}
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={nextStepEvent}>
            {step === steps.length - 1 ? t('general.finish') : t('general.next')}
          </Button>
        </Box>
      </>
    );
  }

  function onLocalityChange(event: SyntheticEvent, newLocality: MxLocalityInterface | null): void {
    if (newLocality) {
      updateLocalitySelected(newLocality);
      updateGeopoint({ lat: newLocality.lat, lng: newLocality.lng })
    }
  }

  function renderBody() {
    if (step === 0) {
      return (
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
            {t('pages.login.signUp')}
          </Typography>
          <Box component="form" onSubmit={() => {}} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <CountrySelector showIso3={true} defaultValueId={MX_ALLOWED.id} disabled={true} isRequired={true}/>
              </Grid>

              <Grid xs={12}>
                <Autocomplete
                  id="combo-states"
                  options={states}
                  value={stateSelected}
                  disableClearable={states.length < 2}
                  disabled={states.length < 2}
                  getOptionLabel={state => state.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label={t('general.state') + ' *'} />}
                />
              </Grid>

              <Grid xs={12}>
                <Autocomplete
                  id="combo-municipalities"
                  options={municipalities}
                  value={municipalitySelected}
                  disableClearable={municipalities.length < 2}
                  disabled={municipalities.length < 2}
                  getOptionLabel={municipality => municipality.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label={t('general.municipality') + ' *'} />}
                />
              </Grid>

              <Grid xs={12}>
                <Autocomplete
                  id="combo-suburbs"
                  options={localities}
                  value={localitySelected}
                  disableClearable={localities.length < 2}
                  disabled={localities.length < 2}
                  autoComplete={true}
                  autoHighlight
                  onChange={onLocalityChange}
                  renderOption={(props, suburb: MxSuburbInterface) => <li {...props} className="li-option" key={suburb.id}>{suburb.name} </li>}
                  getOptionLabel={suburb => suburb.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label={t('general.locality')} />}
                />
              </Grid>

              <Grid xs={12}>
                <TextField
                  name="street"
                  required
                  fullWidth
                  id="firstreeystName"
                  label={t('general.street')}
                  value={street}
                  onChange={updatSetreet}
                  error={hasStreetInputError}/>
              </Grid>

              <Grid xs={6}>
                <TextField
                  required
                  fullWidth
                  id="street-number"
                  label={t('general.streetNumber')}
                  name="street-number"
                  value={streetNumber}
                  onChange={updatSetreetNumber}
                  error={hasStreetNumberInputError}/>
              </Grid>

              <Grid xs={6}>
                <TextField
                  fullWidth
                  id="apartment-number"
                  label={t('general.apartmentlNumber')}
                  name="apartment-number"
                  onChange={updateApartmentNumber}
                  value={apartmentNumber}
                  error={false}/>
              </Grid>

              <Grid xs={12}>
                <TextField
                  id="more-details"
                  label={t('pages.createAddress.moreDetails')}
                  multiline
                  rows={3}
                  value={moreDetails}
                  onChange={updateMoreDetails}
                  fullWidth
                />
              </Grid>
              
            </Grid>
          </Box>
        </Box>
      )
    } else if (step === 1) {
      return (
        <div className='google-maps-container'>
          <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
            {t('pages.createAddress.pickLocationInMap')}
          </Typography>
          <div className="map">
            <GoogleMaps center={geopoint} zoom={15} updateGeopoint={updateGeopoint} />        
          </div>
        </div>
      );
    }
  }

  return (
    <Container maxWidth="md">
      { renderStepper() }
      { renderBody() }
      { renderStepperFooter() }
    </Container>
  );
}

export default CreateAddress;
