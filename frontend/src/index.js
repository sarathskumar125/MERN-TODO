import React from "react";
import { BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./Store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StoreProvider>
      <HelmetProvider> 
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </HelmetProvider>
    </StoreProvider>
);
