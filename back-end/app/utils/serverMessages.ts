export const SUCCESS = {
  userCreation: {
    translationKey: 'server.user.create.success',
    message: 'User created successfully.'
  },
  userChangePassword: {
    translationKey: 'server.user.changePassword.success',
    message: 'Password has changed successfully.'
  },
  userLoggedIn: {
    translationKey: 'server.user.userLoggedIn',
    message: 'User autenticated.'
  },
  userLoggedOut: {
    translationKey: 'server.user.userLoggedOut',
    message: 'User has logedout'
  },
  passwordRecoveryMailSent: {
    translationKey: 'server.user.passwordRecovery.sent',
    message: 'Email was sent.'
  },
  getSuccess: {
    translationKey: 'server.getRequest.success',
    message: 'Get request executed successfully.'
  }
};

export const ERRORS = {
  badRequest: {
    translationKey: 'server.badRequest',
    message: 'Bad request.'
  },
  userCreation: {
    translationKey: 'server.user.create.error',
    message: 'Errror on create instance.'
  },
  userUnautorized: {
    translationKey: 'server.user.unautorized',
    message: 'Unautorized user.'
  },
  userFirstNameRequired: {
    translationKey: 'server.user.create.firstNameRequired',
    message: 'First name is required.'
  },
  userLastNameRequired: {
    translationKey: 'server.user.create.lastNameRequired',
    message: 'Last name is required.'
  },
  userEmailRequired: {
    translationKey: 'server.user.create.emailRequired',
    message: 'Email is required.'
  },
  userPasswordRequired: {
    translationKey: 'server.user.create.passwordRequired',
    message: 'Password is required.'
  },
  userInvalidEmail: {
    translationKey: 'server.user.invalidEmail',
    message: 'Invalid email.'
  },
  userInvalidFormatPassword: {
    translationKey: 'server.user.userInvalidFormatPassword',
    message: 'Invalid password.'
  },
  userInvalidPassword: {
    translationKey: 'server.user.invalidPassword',
    message: 'Password is not valid.'
  },
  userEmailAlreadyUsed: {
    translationKey: 'server.user.emailAlreadyUsed',
    message: 'Error on create user, email used already.'
  },
  userNotFoundByEmail: {
    translationKey: 'server.user.userNotFoundByEmail',
    message: 'Email not registerd.'
  },
  userErrorOnSaveToken: {
    translationKey: 'server.user.userErrorOnSaveToken',
    message: 'Error in database.'
  },
  userErrorOnLogout: {
    translationKey: 'server.user.userErrorOnLogout',
    message: 'Error on logout.'
  },
  userErrorOnTryToGetToken: {
    translationKey: 'server.user.invalidToken',
    message: 'Error on try to get token'
  },
  userTokenDoesNotExist: {
    translationKey: 'server.user.invalidToken',
    message: 'Token does not exist'
  },
  mailErrorOnSendMail: {
    translationKey: 'server.mail.erorrOnSendMail',
    message: 'There was an error on send email.'
  },
  noDataError: {
    translationKey: 'server.noDataError',
    message: 'No data error.'
  },
  addressCreationError: {
    translationKey: 'server.address.addressCreationError',
    message: 'Error on save address.'
  },
  addressBuildError: {
    translationKey: 'server.address.addressBuildError',
    message: 'Error on build address.'
  },
  getAddressError: {
    translationKey: 'server.address.getAddressError',
    message: 'Error on get address.'
  },
  areaNotSupported: {
    translationKey: 'server.areaNotSupported',
    message: 'This area is not suported yet.'
  }
};
