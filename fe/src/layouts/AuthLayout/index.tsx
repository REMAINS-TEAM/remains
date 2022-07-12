import React, { ReactNode, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import userApi from 'store/api/user';

function AuthLayout({ children }: { children: ReactNode }) {
  const { isLoading, data: user } = userApi.useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/', { replace: true });
    }
  }, [isLoading, user, navigate]);

  return (
    <MainLayout>{isLoading && !user ? 'Загрузка...' : children}</MainLayout>
  );
}

export default React.memo(AuthLayout);
