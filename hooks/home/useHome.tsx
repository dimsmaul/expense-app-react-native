import auth from '@/config/auth';
import { DashboardResponse, DashboardResponseData } from '@/types/dashboard.types';
import { useQuery } from '@tanstack/react-query';

export const useHome = () => {
  const data = useQuery({
    queryKey: ['dashboard'],
    queryFn: request,
  });
  return { data };
};

const request = async () => {
  const response = await auth.get<DashboardResponse>('/v1/dashboard');
  return response.data;
};
