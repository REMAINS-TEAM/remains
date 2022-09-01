import React, { ReactNode, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import userApi from 'store/api/user';

function AuthLayout({
  children,
  onScroll,
}: {
  children: ReactNode;
  onScroll?: (e: React.SyntheticEvent) => void;
}) {
  const { isLoading, data: user } = userApi.useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/', { replace: true });
    }
  }, [isLoading, user, navigate]);

  return (
    <MainLayout onScroll={onScroll}>
      {isLoading && !user ? 'Загрузка...' : children}
    </MainLayout>
  );
}

export default React.memo(AuthLayout);
