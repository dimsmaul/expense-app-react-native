// // services/wallet.service.ts
// import auth from '@/config/auth';

// export type WalletType = 'Cash' | 'Bank' | 'Credit' | 'Savings' | 'Investment';

// export interface CreateWalletPayload {
//   name: string;
//   type: WalletType;
//   balance?: number;
// }

// export const createWallet = async (payload: CreateWalletPayload) => {
//   const response = await auth.post('/v1/wallet', {
//     ...payload,
//     balance: 0, // balance otomatis 0
//   });
//   return response.data;
// };

// // hooks/useWallet.ts
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// export const useCreateWallet = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: CreateWalletPayload) => createWallet(payload),
//     onSuccess: () => {
//       // refetch wallets list setelah create berhasil
//       queryClient.invalidateQueries({ queryKey: ['wallets'] });
//     },
//   });
// };

import auth from '@/config/auth';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface CreateWalletProps {
  id?: string;
}

export const useCreateWallet = ({ id }: CreateWalletProps) => {
  const queryClient = useQueryClient();

  const form = useForm<CreateWalletForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'Cash',
    },
  });

  const detail = useQuery({
    queryKey: ['wallet-detail', id],
    queryFn: () => handleGetOneWallet(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (detail.data) {
      form.setValue('name', detail.data?.data?.name);
      form.setValue('type', detail.data?.data?.type);
    }
  }, [detail.data]);

  const mutation = useMutation({
    mutationFn: async (data: CreateWalletForm) => handleSubmit(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-list'] });
      router.back();
    },
    onError: (error: any) => {
      console.error(error);
      Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
    },
  });

  const onSubmit = (data: CreateWalletForm) => {
    Alert.alert('Confirm', `Create new wallet "${data.name}" (${data.type})?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Create', onPress: () => mutation.mutate(data) },
    ]);
  };

  return {
    ...form,
    onSubmit,
  };
};

const handleGetOneWallet = async (id: string) => {
  const response = await auth.get(`/v1/wallet/${id}`);
  return response.data;
};

const handleSubmit = async (data: CreateWalletForm, id?: string) => {
  if (id) {
    const res = await auth.put(`/v1/wallet/${id}`, data);
    return res.data;
  }
  const res = await auth.post('/v1/wallet', { ...data, balance: 0 });
  return res.data;
};

export type WalletType = 'Cash' | 'Bank' | 'Credit' | 'Savings' | 'Investment';

const formSchema = z.object({
  name: z.string().min(1, 'Wallet name is required'),
  type: z.enum(['Cash', 'Bank', 'Credit', 'Savings', 'Investment']),
});

export type CreateWalletForm = z.infer<typeof formSchema>;
