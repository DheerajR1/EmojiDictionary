import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { decode, encode } from "base-64";

import "./styles.css";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
