export default interface AddressInterface {
  id?: number;
  street: String;
  streetNumber: String
  apartmentNumber?: String;
  details?: String;
  lat: number;
  lng: number;
  geoPoint?: any;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  countryId: number;
  mxStateId: number;
  mxMunicipalityId: number;
  mxLocalityId?: number;
  userId: number;
}
