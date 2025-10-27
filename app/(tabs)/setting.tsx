import React from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AppBar from '@/components/appbar';

export default function SettingsScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.clearAuthData);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)' as any);
        },
      },
    ]);
  };

  return (
    <>
      <AppBar title="Settings" />
      <View className="flex-1 gap-3 px-3 py-0">
        <View className="rounded-md border border-border p-3">
          <View className="flex-row items-center gap-4">
            <Avatar alt={''} className="size-12">
              <AvatarFallback>
                <Text>{user?.name?.charAt(0).toUpperCase()}</Text>
              </AvatarFallback>
            </Avatar>

            <View className="flex-1">
              <Text className="text-lg font-semibold">{user?.name}</Text>
              <Text className="text-sm">{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* TODO: Need to add i18n  */}
        {/* <View className="rounded-md border border-border p-3">
          <View className="flex-row items-center gap-4">
            <View className="flex-1">
              <Text className="text-lg font-semibold">{user?.name}</Text>
              <Text className="text-sm">{user?.email}</Text>
            </View>
          </View>
        </View> */}
        {/* Logout */}
        <View className="gap-3">
          <Button onPress={handleLogout} variant="destructive">
            <Text>Sign Out</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

// const SettingFeature = [
//   {
//     title: 'Language',
//     description: 'Select your preferred language',
//   },
// ];
