import * as React from "react";

import Container from "./components/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import AppHeader from "./components/AppHeader";
import MainLayout from "./components/MainLayout";
import { useEffect } from "react";
import { categories } from "./api";

const theme = createTheme();

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
          <Container>Some content</Container>
          <Container>Some content2</Container>
          <Container>Some content3</Container>
          <Container>Some content4</Container>
          <Container>Some content4</Container>
          <Container>Some content4</Container>
          <Container>Some content4</Container>
          <Container>Some content4</Container>
          <Container>Some content4</Container>
          <Container>Some content4</Container>
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;
