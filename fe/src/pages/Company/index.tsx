import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Header from 'components/Header';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getIsAdmin, getPaidStatus } from 'store/selectors/user';
import userApi from 'store/api/user';
import CompanyItems from './CompanyItems';
import CompanyInfo from './CompanyInfo';

const CompanyPage = () => {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const { companyId } = useParams();

  const { isSuccess: isUserSuccess, isError: isUserError } =
    userApi.useMeQuery();
  const isGetUserFinished = isUserSuccess || isUserError;

  const isPaid = useSelector(getPaidStatus);
  const isAdmin = useSelector(getIsAdmin);

  return (
    <MainLayout ref={layoutRef}>
      <Box width="100%">
        <Header title="Информация о компании" withBackButton />
        {companyId && <CompanyInfo companyId={+companyId} />}

        <Header title="Предложения компании" />
        {isGetUserFinished && (isPaid || isAdmin) && companyId && (
          <CompanyItems companyId={+companyId} layoutRef={layoutRef} />
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
