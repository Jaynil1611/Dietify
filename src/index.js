import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { setupMockServer } from "./server";

import App from "./App";
import { ProductProvider } from "./contexts";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </StrictMode>,
  rootElement
);
