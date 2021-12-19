import React, { useEffect, useState } from "react";
import * as styles from "./styles";
import Container from "../../components/Container";
import CategoriesTree from "../../components/CategoriesTree";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button } from "@mui/material";

import categoriesApi from "../../store/api/categories";

// TODO linter
// TODO: избавиться от точек в импорте

function MainPage() {
  const {
    data: categories,
    isLoading,
  } = categoriesApi.useGetAllCategoriesQuery();

  return (
    <MainLayout>
      <Box sx={styles.mainContainer}>
        <Container sx={styles.menuContainer}>
          <CategoriesTree categories={categories} isLoading={isLoading} />
        </Container>
        <Container sx={styles.contentContainer}>
          <p>Тут сразу карточки товара (не категорий) как в днс</p>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default React.memo(MainPage);
