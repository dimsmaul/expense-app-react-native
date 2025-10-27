import auth from '@/config/auth';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export interface IWalletDetail {
  id: string;
}

export const useWalletDetail = ({ id }: IWalletDetail) => {
  // format YYYY-MM
  const [filter, setFilter] = useState<string>(dayjs().format('YYYY-MM'));

  const data = useQuery({
    queryKey: ['wallet-detail'],
    queryFn: () => handleRequest(id),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const list = useInfiniteQuery({
    queryKey: ['wallet-transaction-list', id, filter],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await handleRequestListTransaction({
        page: pageParam,
        walletId: id,
        limit: 10,
        monthYear: filter,
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
    refetchOnWindowFocus: true,
  });

  const handleEditTransaction = async ({ wId, tId }: { wId: string; tId: string }) => {
    router.push(`/wallet/${wId}/add?tId=${tId}`);
  };

  const deleteMutation = useMutation({
    mutationFn: ({ tId }: { tId: string }) => handleDeleteTransactionMutate({ transactionId: tId }),
    onSuccess: () => {
      // refetch list transaction
      list.refetch();
      data.refetch();
    },
    onError: (error) => {
      console.error('Error:', error);
    }
  });

  const handleDeleteTransaction = async ({ tId }: { tId: string }) => {
    Alert.alert('Confirm Delete', `Are you sure you want to delete this transaction?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteMutation.mutate({ tId });
        },
      },
    ]);
  };

  return {
    data,
    list,
    filter,
    setFilter,
    handleEditTransaction,
    handleDeleteTransaction,
  };
};

const handleRequest = async (id: string) => {
  const response = await auth.get(`/v1/wallet/${id}`);
  return response.data.data;
};

/**
 * Handle fetch list transaction by wallet id
 * @param {
 *   walletId=70002086-595a-4852-a35e-68d87a0df17e
 *   page=1
 *   limit=10
 *   monthYear=2025-10
 * }
 */

const handleRequestListTransaction = async (params: {
  walletId: string;
  page: number;
  limit: number;
  monthYear?: string;
}) => {
  const response = await auth.get(`/v1/transaction`, {
    params: params,
  });
  return response.data;
};

/**
 * Handle delete transaction by id
 * @param {
 *   transactionId=string
 * }
 */
const handleDeleteTransactionMutate = async ({ transactionId }: { transactionId: string }) => {
  return await auth.delete(`/v1/transaction/${transactionId}`);
};
