import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Category } from 'store/slices/categories';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { SxProps } from '@mui/system';

export default function BreadCrumbs({
  data,
  sx,
}: {
  data?: Category[];
  sx?: SxProps;
}) {
  const navigate = useNavigate();
  if (!data) return null;

  const goToCategoryPage =
    (categoryId: number) =>
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      if (categoryId === 0) return navigate(routes.main);
      navigate(
        generatePath(routes.category, { categoryId: String(categoryId) }),
      );
    };

  const breadcrumbs = [{ id: 0, title: 'Все' }, ...data].map((category) => (
    <Link
      underline="hover"
      key={category.id}
      color="inherit"
      href="#"
      onClick={goToCategoryPage(category.id)}
    >
      {category.title}
    </Link>
  ));

  return (
    <Stack spacing={2} sx={sx}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
