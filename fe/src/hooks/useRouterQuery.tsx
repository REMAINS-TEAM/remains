import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function useRouterQuery(): URLSearchParams {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
