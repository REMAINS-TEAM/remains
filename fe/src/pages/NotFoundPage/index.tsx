import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function NotFoundPage() {
  return (
    <MainLayout>
      <h1>404</h1>
      <h2>Такой страницы нет</h2>
      <br />
      <Link to="/">Вернуться на главную</Link>
    </MainLayout>
  );
}

export default React.memo(NotFoundPage);
