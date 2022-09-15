import React from 'react';
import Spinner from 'components/Spinner';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import companiesApi from 'store/api/companies';
import { standardFormat } from 'utils';

const CompanyInfo = ({ companyId }: { companyId?: number }) => {
  if (!companyId) return null;

  const { data: company, isFetching: isCompanyFetching } =
    companiesApi.useGetCompanyByIdQuery(+(companyId || 0), {
      skip: !companyId,
    });

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
    <Paper sx={{ p: 2, mb: 6 }}>
      {isCompanyFetching && <Spinner />}
      <Table sx={{ maxWidth: 500 }}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
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
  );
};

export default CompanyInfo;
