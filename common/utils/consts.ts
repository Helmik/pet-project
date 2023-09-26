export const RESPONSE_CODES = {
  success: 200,
  error: 500,
  unautorized: 401,
  notFound: 404,
  conflict: 409,
  badRequest: 400
}

export const USER_ROLES = {
  websiteMaster: 1,
  admin: 2,
  businesOwner: 3,
  normalUser: 4,
}

export const ALLOWED_COINTRIES = {
  mexico: 156
}

export const MX_ALLOWED_STATES = {
  quintanaRoo: 23
}

export const MX_ALLOWED_MUNICIPALITIES = {
  tulum: 23009
}

export const MX_ALLOWED = {
  id: 156,
  es: 'México',
  en: 'Mexico',
  states: [
    {
      id: 23,
      name: 'Quintana Roo',
      municipalities: [
        {
          id: 23009,
          name: 'Tulum'
        }
      ]
    }
  ]
};

export const LANGUAGES = {
  spanish: 'es',
  english: 'en',
  default: 'en'
}

export const SERVICES = {
  categoryTag: {
    version: 2,
    name: 'categoryTag',
    endpoints: {
      allCategoryTag: 'allCategoryTag',
      allCategories: 'allCategories',
      allTags: 'allTags'
    }
  },
  geography: {
    version: 1,
    name: 'geography',
    endpoints: {
      allCountries: 'allCountries',
      fullAllowedStructure: 'fullAllowedStructure',
    }
  },
  // address: {
  //   version: 1,
  //   name: 'address',
  //   endpoints: {
  //     getAddressByUserId: 'getAddressByUserId',
  //     createNewAddress: 'createNewAddress',
  //     deleteAddress: 'deleteAddress'
  //   }
  // }
}
