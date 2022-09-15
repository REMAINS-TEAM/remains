import React, { forwardRef, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import userApi from 'store/api/user';
import { AuthLayoutProps } from 'layouts/AuthLayout/types';

const AuthLayout = forwardRef<HTMLDivElement, AuthLayoutProps>(
  ({ children, onScroll }, ref) => {
    const { isLoading, data: user } = userApi.useMeQuery();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !user) {
        navigate('/', { replace: true });
      }
    }, [isLoading, user, navigate]);

    return (
      <MainLayout onScroll={onScroll} ref={ref}>
        {isLoading && !user ? 'Загрузка...' : children}
      </MainLayout>
    );
  },
);

export default AuthLayout;
