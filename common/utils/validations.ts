export function isEmailValid(email: string) {
  let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let match = String(email).toLowerCase().match(regExp);
  return match ? match.length > 0 : false;
}

export function isPasswordValid(pwd: String) {
  // Regex to validate at least one upper case letter, at least one lower case letter and at least one number.
  // also between 7 anf 14 caracters
  let regExp =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,14}$/;
  let match = String(pwd).match(regExp);
  return match ? match.length > 0 : false;
}
