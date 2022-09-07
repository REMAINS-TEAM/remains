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
import useInfinityScroll from 'hooks/useInfinityScroll';
import userApi from 'store/api/user';
import Spinner from 'components/Spinner';

const CompanyPage = () => {
  const { companyId } = useParams();

  const { isSuccess: isUserSuccess, isError: isUserError } =
    userApi.useMeQuery();
  const isGetUserFinished = isUserSuccess || isUserError;

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  const { data: company, isFetching: isCompanyFetching } =
    companiesApi.useGetCompanyByIdQuery(+(companyId || 0), {
      skip: !companyId,
    });

  const {
    handleScroll,
    items: companyItems,
    isSuccess,
    isFetchingCur,
    isFetchingNext,
  } = useInfinityScroll(
    itemsApi.useGetItemsQuery,
    { companyId },
    { skip: !companyId || (!isPaid && !isAdmin) },
  );

  const rows = company
    ? [
        { title: 'Название:', value: company.name },
        { title: 'Описание', value: company.description },
        {
          title: 'Дата регистрации на сайте',
          value: standardFormat(company.createdAt),
        },
      ]
    : [];

  return (
    <MainLayout onScroll={handleScroll}>
      <Box width="100%">
        <Header title="Информация о компании" withBackButton />
        <Paper sx={{ p: 2, mb: 6 }}>
          {isCompanyFetching && <Spinner />}
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

        {isGetUserFinished && (isPaid || isAdmin) && (
          <>
            <ItemCards items={companyItems} />

            {isSuccess &&
              !isFetchingCur &&
              !isFetchingNext &&
              !companyItems.length && (
                <Typography variant="inherit" color={'secondary'}>
                  <p>Компания пока ничего не выкладывала.</p>
                  <p>Следите за обновлениями.</p>
                </Typography>
              )}
          </>
        )}
        {isGetUserFinished && !isPaid && !isAdmin && (
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
