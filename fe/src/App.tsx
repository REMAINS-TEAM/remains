import * as React from "react";

import Container from "./components/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import AppHeader from "./components/AppHeader";
import MainLayout from "./components/MainLayout";
import { useEffect } from "react";
import { categories } from "./api";
import CategoriesTree from "./components/CategoriesTree";

const theme = createTheme();

// TODO: routes

function App() {
  useEffect(() => {
    const fetch = async () => {
      const { data } = await categories.getAll();
      console.log("res", data);
    };

    fetch();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppHeader />
        <MainLayout>
          <Container>
            <CategoriesTree />
          </Container>
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;
