import auth from '@/config/auth';
import { money } from '@/utils/format-money';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import z from 'zod';

export interface CreateTransactionInput {
  id: string;
  tId?: string;
}

export const useCreateTransaction = ({ id, tId }: CreateTransactionInput) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const [value, setValue] = useState<'income' | 'outcome'>('income');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletId: id,
      title: '',
      amount: '',
      date: dayjs().format('YYYY-MM-DD'),
      note: '',
      type: 'income',
      discount: '',
    },
  });

  useEffect(() => {
    setFormValue('type', value);
  }, [value]);

  const detail = useQuery({
    queryKey: ['transaction-detail', tId],
    queryFn: () => getDetailTransaction(tId as string),
    enabled: !!tId,
  });

  useEffect(() => {
    if (detail.data) {
      setFormValue('title', detail.data.title);
      setFormValue('amount', detail.data.amount.toString());
      setFormValue('date', dayjs(detail.data.date).format('YYYY-MM-DD'));
      setFormValue('note', detail.data.note || '');
      setFormValue('type', detail.data.type);
      setValue(detail.data.type);
    }
  }, [detail.data]);

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => handleSendRequest(data, tId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-transaction-list'] });
      router.back();
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    Alert.alert(
      // 'Confirm Transaction',
      // `Are you sure you want to ${tId ? 'edit' : 'add'} this ${data.type} of amount ${money(data.amount)}?`,
      t('wallets.transaction-action.alert.title'),
      t('wallets.transaction-action.alert.message', {
        action: tId ? t('wallets.transaction-action.edit') : t('wallets.transaction-action.add'),
        type:
          data.type === 'income'
            ? t('wallets.transaction-action.income')
            : t('wallets.transaction-action.expense'),
        amount: money(data.amount),
      }),
      [
        {
          text: t('global.cancel'),
          style: 'cancel',
        },
        {
          text: t('global.confirm'),
          onPress: () => mutation.mutate(data),
        },
      ]
    );
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    value,
    setValue,
  };
};

const formSchema = z.object({
  walletId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  amount: z.string().min(1, 'Amount is required'),
  date: z.string().min(1, 'Date is required'),
  note: z.string().optional(),
  type: z.enum(['income', 'outcome'], 'Type must be either income or expense'),
  discount: z.string().optional(),
});

const handleSendRequest = async (data: z.infer<typeof formSchema>, tId?: string) => {
  const newdata = {
    ...data,
    amount: parseInt(data.amount),
    date: new Date(data.date).toISOString(),
  };
  if (tId) {
    const response = await auth.put(`/v1/transaction/${tId}`, newdata);
    return response.data;
  }
  const response = await auth.post(`/v1/transaction`, newdata);
  return response.data;
};

const getDetailTransaction = async (tId: string) => {
  const response = await auth.get(`/v1/transaction/${tId}`);
  return response.data.data;
};
