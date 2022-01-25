import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";

const mdTheme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mdTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
