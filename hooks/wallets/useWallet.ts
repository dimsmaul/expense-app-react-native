import auth from '@/config/auth';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

export const useWallet = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const list = useInfiniteQuery({
    queryKey: ['wallet-list', search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await listWallet({
        page: pageParam,
        limit: 10,
        search,
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWallet(id),
    onSuccess: () => {
      list.refetch();
    },
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      // 'Delete Wallet', 'Are you sure you want to delete this wallet?'
      t('wallets.delete.title'),
      t('wallets.delete.message'),
      [
        {
          text: t('wallets.delete.cancel'),
          style: 'cancel',
        },
        {
          text: t('wallets.delete.confirm'),
          style: 'destructive',
          onPress: () => deleteMutation.mutate(id),
        },
      ]
    );
  };

  return {
    list,
    search,
    setSearch,
    handleDelete,
  };
};

const listWallet = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = await auth.get('/v1/wallet', {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};

const deleteWallet = async (id: string) => {
  return await auth.delete(`/v1/wallet/${id}`);
};
