import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./app/store";
import { Home } from "./app/home";
import { Header } from "./app/components/header/header";
import { createTheme, ThemeProvider } from "@mui/material";

const container = document.getElementById("root")!;
const root = createRoot(container);

const theme = createTheme({
  palette: {
    primary: {
      main: "#EF5742",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Header />
        <Home />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
