import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Auth0ProviderWrapper from "./Components/Auth0ProviderWrapper/Auth0ProviderWrapper.tsx";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/index.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderWrapper>
          <App />
        </Auth0ProviderWrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
