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

// TODO linter
// TODO RTK query
// TODO: избавиться от точек в импорте

function MainPage() {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  // const [categories, setCategories] = useState<Category[]>([]);
  //
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await api.categories.getAll();
  //     if (data.length > 0) {
  //       setCategories(data);
  //     }
  //   })();
  // }, []);

  return (
    <MainLayout>
      <Box sx={styles.mainContainer}>
        <Container>
          <CategoriesTree categories={categories} />
        </Container>
        <Container sx={styles.contentContainer}>
          <p>Тут сразу карточки товара (не категорий) как в днс</p>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default React.memo(MainPage);
