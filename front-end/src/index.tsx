import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { UserProvider } from './context/user/User.context';
import { AlertProvider } from './context/alerts/Alert.context';

import global_es from './translations/spanish/global.json';
import global_en from './translations/english/global.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      es: { global: global_es },
      en: { global: global_en}
    },
    lng: "es", // if you're using a language detector, do not define the lng option
    fallbackLng: "es",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </UserProvider>
    </I18nextProvider>
  </BrowserRouter>
);
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <I18nextProvider i18n={i18n}>
//         <App />
//       </I18nextProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
