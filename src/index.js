import React from "react";
import ReactDOM from "react-dom";
import { BookProvider } from "./context/books";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/cart";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <BookProvider>
      <CartProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartProvider>
    </BookProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
