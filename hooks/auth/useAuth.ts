import { unauth } from '@/config/unauth';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useAuth = () => {
  // const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { setAuthData, token, user } = useAuthStore();
  const [value, setValue] = useState<'sign-in' | 'sign-up'>('sign-in');

  useEffect(() => {
    if (token && user) {
      router.replace('/(tabs)/home');
    }
  }, [token, user]);

  const currentSchema = value === 'sign-in' ? formSchema : formSignUpSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema> | z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: 'user@gmail.com',
      password: 'password',
      ...(value === 'sign-up' && { name: '' }),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema> | z.infer<typeof formSignUpSchema>) =>
      handleSendApi(data, value),
    onSuccess: (data) => {
      router.navigate('/(tabs)/home');
      setAuthData(data.token, data.user);
    },
    onError: (error: any) => {
      console.error('Error:', error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema> | z.infer<typeof formSignUpSchema>) => {
    mutation.mutate(data);
  };

  return {
    control,
    handleSubmit,
    errors,
    value,
    setValue,
    onSubmit,
    mutation,
  };
};

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const formSignUpSchema = formSchema.extend({
  name: z.string().min(2),
});

const handleSendApi = async (
  data: z.infer<typeof formSchema> | z.infer<typeof formSignUpSchema>,
  type: 'sign-in' | 'sign-up'
) => {
  const response = await unauth.post(`/auth/${type}`, data);
  return response.data;
};
