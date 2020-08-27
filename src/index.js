import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n";
import "./index.css";
import "./scss/core.scss";

import App from "./App";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV !== "production") {
  import("react-axe").then((axe) => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
