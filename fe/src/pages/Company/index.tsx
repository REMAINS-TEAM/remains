import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Header from 'components/Header';
import { standardFormat } from 'utils';
import companiesApi from 'store/api/companies';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import ItemCards from 'pages/Categories/units/ItemCards';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import itemsApi from 'store/api/items';

const CompanyPage = () => {
  const { companyId } = useParams();

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { data: company } = companiesApi.useGetCompanyByIdQuery(
    +(companyId || 0),
    {
      skip: !companyId,
    },
  );

  const {
    data: companyItems,
    isFetching,
    isSuccess,
  } = itemsApi.useGetItemsQuery(
    {
      companyId,
      limit: 100, // TODO: lazy loading
      offset: 0,
    },
    { skip: !companyId || (!isPaid && !isAdmin) },
  );

  const rows = company
    ? [
        { title: 'Название', value: company.name },
        { title: 'Описание', value: company.description },
        {
          title: 'Дата регистрации на сайте',
          value: standardFormat(company.createdAt),
        },
      ]
    : [];

  return (
    <MainLayout>
      <Box width="100%">
        <Header title="Информация о компании" withBackButton />
        <Paper sx={{ p: 2, mb: 6 }}>
          <Table sx={{ maxWidth: 500 }}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.title}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: 600 }}
                  >
                    {row.title}:
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="inherit" color={'secondary'}>
                      {row.value || 'Не указано'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              <br />
            </TableBody>
          </Table>
        </Paper>

        <Header title="Предложения компании" />
        <ItemCards items={companyItems} isLoading={isFetching} />
        {isSuccess && (isPaid || isAdmin) && !companyItems?.length && (
          <Typography variant="inherit" color={'secondary'}>
            <p>Пока компания ничего не выкладывала.</p>
            <p>Следите за обновлениями.</p>
          </Typography>
        )}
        {!isPaid && !isAdmin && (
          <Typography variant="inherit" color={'secondary'}>
            <p>Не доступно.</p>
            <p>Оплатите сервис, чтобы видеть товары компании.</p>
          </Typography>
        )}
      </Box>
    </MainLayout>
  );
};

export default CompanyPage;
