import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

