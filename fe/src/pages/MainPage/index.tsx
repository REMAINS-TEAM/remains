import React from "react";
import * as styles from "./styles";
import Container from "../../components/Container";
import CategoriesTree from "../../components/CategoriesTree";
import MainLayout from "../../layouts/MainLayout";
import { Box } from "@mui/material";

// TODO linter

function MainPage() {
  // const navigate = useNavigate();

  return (
    <MainLayout>
      <Box sx={styles.mainContainer}>
        <Container>
          <CategoriesTree />
        </Container>
        <Container sx={styles.contentContainer}>
          <p>Content</p>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default React.memo(MainPage);
