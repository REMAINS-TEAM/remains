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
  const { data: allCategories } = categoriesApi.useGetAllCategoriesQuery();

  const { data: data1 } = categoriesApi.useGetCategoryByIdQuery(3);
  const {
    data,
    error,
    isLoading,
    refetch,
  } = categoriesApi.useGetCategoryByIdQuery(data1?.parentId as number, {
    skip: !data1,
  });

  console.log("allCategories", allCategories);

  return (
    <MainLayout>
      <Button onClick={() => refetch()}>Update</Button>
      <Box sx={styles.mainContainer}>
        <Container>
          <CategoriesTree categories={[]} />
        </Container>
        <Container sx={styles.contentContainer}>
          <p>Тут сразу карточки товара (не категорий) как в днс</p>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default React.memo(MainPage);
