import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/index.ts";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-4qxio4kiocs8hwft.us.auth0.com"
          clientId="LZDbLPvupEHp1gkpcZXqqJBaapPZLPOO"
          authorizationParams={{
            redirect_uri: "http://localhost:5173/home",
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
