import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import AppLayout from "./layouts/AppLayout";

const theme = createTheme();

function App() {
  // useEffect(() => {
  //   const fetch = async () => {
  //     const { data } = await categories.getAll();
  //     console.log("res", data);
  //   };
  //
  //   fetch();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
