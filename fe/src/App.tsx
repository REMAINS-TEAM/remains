import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu as MenuIcon } from "@mui/icons-material";

import Container from "./components/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import AppHeader from "./components/AppHeader";
import MainLayout from "./components/MainLayout";

const theme = createTheme();

function App() {
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
