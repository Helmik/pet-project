export type language = 'es' | 'en';
export type temp = 'recoverPassword'

interface EmailInterface {
  lng: language;
  template: temp;
  data: any;
}

export default EmailInterface;
