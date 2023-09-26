import UserModel from '../db/models/User.model';
import CategoryCatModel from '../db/models/CategoryCat.model';
import CountryCatModel from '../db/models/CountryCat.model';
import MxStateCatModel from '../db/models/MxStateCat.model';
import MxMunicipalityCatModel from '../db/models/MxMunicipalityCat.model';
import MxLocalityCatModel from '../db/models/MxLocalityCat.model';
import AddressModel from '../db/models/Address.model';
import { ErrorMessageInterface , SuccessMessageInterface } from '../../../common/interfaces/Response.interface';

export interface ResponseUserModelInterface {
  userModel?: UserModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCategoryModelInterface {
  categoryModel?: CategoryCatModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCountryModelInterface {
  countryModel?: CountryCatModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseCountriesModelInterface {
  countriesModel?: CountryCatModel[];
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseMxStateModelInterface {
  mxStateModel?: MxStateCatModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseMxMunicipalityModelInterface {
  mxMunicipalityModel?: MxMunicipalityCatModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseLocalityModelInterface {
  mxLocalityModel?: MxLocalityCatModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseAddressesModelInterface {
  addressesModel?: AddressModel[];
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}

export interface ResponseAddressModelInterface {
  addressModel?: AddressModel;
  error?: ErrorMessageInterface;
  success?: SuccessMessageInterface;
}
