import { useReducer, ChangeEvent } from 'react';

import { CountryInterface, MxLocalityInterface, MxMunicipalityInterface, MxStateInterface } from '../../../../common/interfaces/MxGeography.interface';
import ActionReducerInterface from '../../interfaces/ActionReducer.interface';
import GeopointInterface from '../../../../common/interfaces/Geopoint.interface';

export interface DataFormInterface {
  countries: CountryInterface[];
  states: MxStateInterface[];
  municipalities: MxMunicipalityInterface[];
  localities: MxLocalityInterface[];
  countrySelected: CountryInterface | null;
  stateSelected: MxStateInterface | null;
  municipalitySelected: MxMunicipalityInterface | null;
  localitySelected: MxLocalityInterface | null;
  street: string | null;
  streetNumber: string | null;
  apartmentNumber: string | null;
  moreDetails: string | null;
  step: number;
  steps: string[];
  hasStreetInputError: boolean;
  hasStreetNumberInputError: boolean;
  geopoint: GeopointInterface | null;
}

const ACTIONS = {
  UPDATE_COUNTRIES: 'updateCountries',
  UPDATE_STATES: 'updateStates',
  UPDATE_MUNICIPALITIES: 'updateMunicipalities',
  UPDATE_LOCALITIES: 'updateLocalities',
  UPDATE_COUNTRY_SELECTED: 'updateCountrySelected',
  UPDATE_STATE_SELECTED: 'updateStateSelected',
  UPDATE_MUNICIPALITY_SELECTED: 'updateMunicipalitySelected',
  UPDATE_LOCALITY_SELECTED: 'updateLocalitySelected',
  UPDATE_STREET: 'updateStreet',
  UPDATE_STREET_NUMBER: 'updateStreetNumber',
  UPDATE_APARTMENT_NUMBER: 'updateApartmentNumber',
  UPDATE_MORE_DETAILS: 'updateMoreDetails',
  UPDATE_STEP: 'updateStep',
  UPDATE_HAS_STREET_INPUT_ERROR: 'updateHasStreetInputError',
  UPDATE_HAS_STREET_NUMBER_INPUT_ERROR: 'updateHasStreetNumberInputError',
  UPDATE_GEOPOINT: 'updateGeopoint',
  NEXT_STEP: 'nextStep',
  PREVIOUS_STEP: 'previousStep',
};

const ACTIONS_REDUCERS = {
  [ACTIONS.UPDATE_COUNTRIES]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    countries: action.payload
  }),
  [ACTIONS.UPDATE_STATES]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    states: action.payload
  }),
  [ACTIONS.UPDATE_MUNICIPALITIES]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    municipalities: action.payload
  }),
  [ACTIONS.UPDATE_LOCALITIES]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    localities: action.payload
  }),
  [ACTIONS.UPDATE_COUNTRY_SELECTED]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    countrySelected: action.payload
  }),
  [ACTIONS.UPDATE_STATE_SELECTED]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    stateSelected: action.payload
  }),
  [ACTIONS.UPDATE_MUNICIPALITY_SELECTED]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    municipalitySelected: action.payload
  }),
  [ACTIONS.UPDATE_LOCALITY_SELECTED]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    localitySelected: action.payload
  }),
  [ACTIONS.UPDATE_STREET]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    street: action.payload
  }),
  [ACTIONS.UPDATE_STREET_NUMBER]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    streetNumber: action.payload
  }),
  [ACTIONS.UPDATE_APARTMENT_NUMBER]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    apartmentNumber: action.payload
  }),
  [ACTIONS.UPDATE_MORE_DETAILS]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    moreDetails: action.payload
  }),
  [ACTIONS.UPDATE_STEP]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    lat: action.payload
  }),
  [ACTIONS.UPDATE_HAS_STREET_INPUT_ERROR]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    hasStreetInputError: action.payload
  }),
  [ACTIONS.UPDATE_HAS_STREET_NUMBER_INPUT_ERROR]: (state: DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    hasStreetNumberInputError: action.payload
  }),
  [ACTIONS.UPDATE_GEOPOINT]: (state:DataFormInterface, action: ActionReducerInterface) => ({
    ...state,
    geopoint: action.payload
  }),
  [ACTIONS.NEXT_STEP]: (state: DataFormInterface, action: ActionReducerInterface) => {
    let currentStep = state.step;

    if (currentStep === 0) {
      const isStreetValid = !Boolean(state.street);
      const isStreetNumberValid = !Boolean(state.streetNumber);

      if (isStreetValid || isStreetNumberValid) {
        return {
          ...state,
          hasStreetInputError: isStreetValid,
          hasStreetNumberInputError: isStreetNumberValid
        }
      }
    }

    if (currentStep + 1 < state.steps.length) {
      ++currentStep;
    }

    return {
      ...state,
      step: currentStep,
      hasStreetInputError: false,
      hasStreetNumberInputError: false
    }
  },
  [ACTIONS.PREVIOUS_STEP]: (state: DataFormInterface, action: ActionReducerInterface) => {
    let currentStep = state.step;

    if (currentStep - 1 <= 0) {
      --currentStep;
    }
    return {
      ...state,
      step: currentStep
    }
  }
};

const REDUCER = (state: DataFormInterface, action: ActionReducerInterface) => {
  const actionReducer = ACTIONS_REDUCERS[action.type];
  return actionReducer ? actionReducer(state, action) : state;
}

export default function useForm(initialDataForm: DataFormInterface) {
  const [state, dispatch] = useReducer(REDUCER, initialDataForm);

  const {
    countries,
    states,
    municipalities,
    localities,
    countrySelected,
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
    geopoint
  } = state;

  return {
    countries,
    states,
    municipalities,
    localities,
    countrySelected,
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
    updateCountries: (countries: CountryInterface[] = []) => dispatch({ type: ACTIONS.UPDATE_COUNTRIES, payload: countries}),
    updateStates: (states: MxStateInterface[] = []) => dispatch({ type: ACTIONS.UPDATE_STATES, payload: states || []}),
    updateMunicipalities: (municipalities: MxMunicipalityInterface[] = []) => dispatch({ type: ACTIONS.UPDATE_MUNICIPALITIES, payload: municipalities}),
    updateLocalities: (suburbs: MxLocalityInterface[] = []) => dispatch({ type: ACTIONS.UPDATE_LOCALITIES, payload: suburbs}),
    updateCountrySelected: (country: CountryInterface | null) => dispatch({ type: ACTIONS.UPDATE_COUNTRY_SELECTED, payload: country}),
    updateStateSelected: (state: MxStateInterface | null = null) => dispatch({ type: ACTIONS.UPDATE_STATE_SELECTED, payload: state}),
    updateMunicipalitySelected: (municipality: MxMunicipalityInterface | null = null) => dispatch({ type: ACTIONS.UPDATE_MUNICIPALITY_SELECTED, payload: municipality}),
    updateLocalitySelected: (suburb: MxLocalityInterface | null = null) => dispatch({ type: ACTIONS.UPDATE_LOCALITY_SELECTED, payload: suburb}),
    updatSetreet: (event: ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.UPDATE_STREET, payload: event.target.value }),
    updatSetreetNumber: (event: ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.UPDATE_STREET_NUMBER, payload: event.target.value }),
    updateApartmentNumber: (event: ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.UPDATE_APARTMENT_NUMBER, payload: event.target.value }),
    updateMoreDetails: (event: ChangeEvent<HTMLInputElement>) => dispatch({ type: ACTIONS.UPDATE_MORE_DETAILS, payload: event.target.value }),
    updateStep: (step: number) => dispatch({ type: ACTIONS.UPDATE_STEP, payload: step }),
    updateHasStreetInputError: (hasStreetInputError: boolean) => dispatch({ type: ACTIONS.UPDATE_HAS_STREET_INPUT_ERROR, payload: hasStreetInputError }),
    updateHasStreetNumberInputError: (hasStreetNumberInputError: boolean) => dispatch({ type: ACTIONS.UPDATE_HAS_STREET_NUMBER_INPUT_ERROR, payload: hasStreetNumberInputError }),
    updateGeopoint: (geopoint: GeopointInterface) => dispatch({ type: ACTIONS.UPDATE_GEOPOINT , payload: geopoint }),
    nextStep: ()=> dispatch({ type: ACTIONS.NEXT_STEP, payload: null }),
    previousStep: () => dispatch({ type: ACTIONS.PREVIOUS_STEP, payload: null }),
  }
}
