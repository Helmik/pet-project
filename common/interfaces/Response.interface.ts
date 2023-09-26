import CategoryInterface from './Category.interface';
import UserInterface from './User.interface';
import { CountryInterface, MxLocalityInterface, MxMunicipalityInterface, MxStateInterface } from './MxGeography.interface';
import TagInterface from './Tag.interface';
import AddressInterface from './Address.interface';

type ResponseInterfaces = ResponseUserInterface | ResponseStringInterface | ResponseCountryInterface | ResponseMxStateInterface
  | ResponseMxMunicipalityInterface | ResponseMxLocalityInterface | ResponseAnyInterface | ResponseCategoryInterface | ResponseStringInterface;

export interface ErrorMessageInterface {
  translationKey: string;
  message: string;
}

export interface SuccessMessageInterface {
  translationKey: string;
  message: string;
  servicesVersion?: any;
}

export interface ResponseAnyInterface {
  data?: any;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}
export default ErrorMessageInterface;
export interface ResponseInterface {
  data?: ResponseInterfaces;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseUserInterface{
  user?: UserInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseStringInterface {
  string?: string;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCountryInterface {
  country?: CountryInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCountriesInterface {
  countries?: CountryInterface[];
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseMxStateInterface {
  state?: MxStateInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseMxMunicipalityInterface {
  mxMunicipality?: MxMunicipalityInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseMxLocalityInterface {
  mxLocality?: MxLocalityInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCategoryInterface {
  category?: CategoryInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCategoriesInterface {
  categories?: CategoryInterface[];
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseTagInterface {
  tag?: TagInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseTagsInterface {
  tags?: TagInterface[];
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseAddressInterface {
  address?: AddressInterface;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseAddressesInterface {
  addresses?: AddressInterface[];
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}
