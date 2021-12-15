import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import AppLayout from "./layouts/AppLayout";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";

const theme = createTheme();

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <AppLayout />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
