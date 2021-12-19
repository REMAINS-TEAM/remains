import React, { useEffect, useState } from "react";
import * as styles from "./styles";
import Container from "../../components/Container";
import CategoriesTree from "../../components/CategoriesTree";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button } from "@mui/material";
// import api from "../../api";
// import { Category } from "../../api/rest/categories";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { useGetCategoryByIdQuery } from "../../store/api/categories";

// TODO linter
// TODO: избавиться от точек в импорте

function MainPage() {
  const { data: data1 } = useGetCategoryByIdQuery(3);
  // const { data, error, isLoading } = useGetCategoryByIdQuery(data1?.parentId);

  console.log("categories", data1);

  return (
    <MainLayout>
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
