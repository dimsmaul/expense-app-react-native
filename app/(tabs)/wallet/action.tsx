import React from 'react';
import { View, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppBar from '@/components/appbar';
import { useCreateWallet } from '@/hooks/wallets/useCreateWallet';
import { useLocalSearchParams } from 'expo-router';

export default function CreateWalletScreen() {
  const { id } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    onSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useCreateWallet({
    id: id as string | undefined,
  });

  const walletTypes = ['Cash', 'Bank', 'Credit', 'Savings', 'Investment'] as const;
  const selectedType = watch('type');

  return (
    <>
      <AppBar title={id ? 'Edit Wallet' : 'Create Wallet'} leftContent="back" />

      <View className="flex-1 gap-8 p-4">
        <View className="gap-4">
          {/* Wallet Name */}
          <View>
            <Label htmlFor="name">Wallet Name</Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="Enter wallet name"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.name && <Text className="text-sm text-red-600">{errors.name.message}</Text>}
          </View>

          {/* Wallet Type */}
          <View>
            <Text className="text-sm font-semibold">Wallet Type</Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
              {walletTypes.map((type) => (
                <Button
                  variant={selectedType === type ? 'default' : 'outline'}
                  key={type}
                  onPress={() => setValue('type', type)}>
                  <Text>{type}</Text>
                </Button>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <Button onPress={handleSubmit(onSubmit)} className="mt-6">
            <Text>Save</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

// // screens/CreateWalletScreen.tsx
// import React, { useState } from 'react';
// import { View, ScrollView, Pressable, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Text } from '@/components/ui/text';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useCreateWallet, WalletType } from '@/hooks/wallets/useCreateWallet';
// import AppBar from '@/components/appbar';

// export default function CreateWalletScreen() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [type, setType] = useState<WalletType>('Cash');
//   const { mutateAsync } = useCreateWallet();

//   const walletTypes: { label: string; value: WalletType }[] = [
//     { label: 'Cash', value: 'Cash' },
//     { label: 'Bank', value: 'Bank' },
//     { label: 'Credit', value: 'Credit' },
//     { label: 'Savings', value: 'Savings' },
//     { label: 'Investment', value: 'Investment' },
//   ];

//   const handleSubmit = async () => {
//     if (!name) return Alert.alert('Error', 'Please enter wallet name');
//     try {
//       await mutateAsync({ name, type });
//       Alert.alert('Success', 'Wallet created successfully');
//       router.back();
//     } catch (error: any) {
//       console.error(error);
//       Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <>
//       <AppBar title="Create Wallet" leftContent="back" />

//       <View className="flex-1 gap-8 p-4">
//         <View className="gap-4">
//           <Text className="text-base font-semibold">Wallet Name</Text>
//           <Input placeholder="Enter wallet name" value={name} onChangeText={setName} />

//           <Text className="mt-4 text-base font-semibold">Wallet Type</Text>
//           <View className="mt-2 flex-row flex-wrap gap-2">
//             {walletTypes.map((item) => (
//               <Pressable
//                 key={item.value}
//                 className={`rounded-lg border px-4 py-2 ${
//                   type === item.value ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
//                 }`}
//                 onPress={() => setType(item.value)}>
//                 <Text className={`${type === item.value ? 'text-white' : ''}`}>{item.label}</Text>
//               </Pressable>
//             ))}
//           </View>

//           <Button onPress={handleSubmit} className="mt-6">
//             <Text>Create Wallet</Text>
//           </Button>
//         </View>
//       </View>
//     </>
//   );
// }
