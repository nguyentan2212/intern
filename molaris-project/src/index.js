import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const mdTheme = createTheme();
const serverUrl = process.env.REACT_APP_SERVER_URL;
const appId = process.env.REACT_APP_ID;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ThemeProvider theme={mdTheme}>
        <App />
      </ThemeProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
