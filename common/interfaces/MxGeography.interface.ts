export interface MxZoneInterface {
  id: number;
  name: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  mxMunicipalityId: number;
}

export interface MxSuburbInterface {
  id: number;
  name: string;
  zipCode: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  mxMunicipalityId: number;
}

export interface MxLocalityInterface {
  id: number;
  name: string;
  localityType?: string;
  lat: number;
  lng: number;
  geoPoint?: any;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  mxMunicipalityId: number;
}

export interface MxMunicipalityInterface {
  id: number;
  name: string;
  inegiCode?: string;
  lat?: number;
  lng?: number;
  geoPoint: any;
  isActive?: string;
  createdAt?: Date;
  updatedAt?: Date;
  mxStateId: number;
  localities?: MxLocalityInterface[];
  // suburbs: MxSuburbInterface[];
  // zones: MxZoneInterface[]
}

export interface MxStateInterface {
  id: number;
  name: string;
  municipalities: MxMunicipalityInterface[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  countryId: number;
}

export interface CountryInterface {
  id: number;
  en: string;
  es: string;
  iso2: string;
  iso3: string;
  currencyCode: string;
  phoneCode: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  states?: MxStateInterface[];
  name?: string;
}
