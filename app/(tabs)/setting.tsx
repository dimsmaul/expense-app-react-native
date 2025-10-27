import React from 'react';
import { View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AppBar from '@/components/appbar';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSettingsStore } from '@/store/settings';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const logout = useAuthStore((state) => state.clearAuthData);
  const user = useAuthStore((state) => state.user);
  const { language, setLanguage } = useSettingsStore();

  const handleLogout = () => {
    Alert.alert(t('settings.sign-out-alert.title'), t('settings.sign-out-alert.message'), [
      { text: t('settings.sign-out-alert.cancel'), style: 'cancel' },
      {
        text: t('settings.sign-out-alert.confirm'),
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)' as any);
        },
      },
    ]);
  };

  const handleChangeLanguage = (lang: 'en' | 'id') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <AppBar title={t('settings.settings')} />
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
        <Text className="text-base font-semibold">{t('settings.settings')}</Text>
        <View className="rounded-md border border-border p-3">
          <View className="flex flex-row items-center justify-between gap-4">
            {/* <View className="flex-1"></View> */}
            <Text className="text-base font-semibold">{t('settings.language')}</Text>
            <Select
              value={{
                value: language,
                label: language === 'en' ? t('settings.english') : t('settings.indonesian'),
              }}
              onValueChange={(e) => {
                handleChangeLanguage(e?.value as 'en' | 'id');
              }}>
              <SelectTrigger className="h-10 w-fit">
                <SelectValue placeholder={t('settings.language')} />
              </SelectTrigger>
              <SelectContent className="w-[180px]">
                <SelectItem value="en" label={t('settings.english')} />
                <SelectItem value="id" label={t('settings.indonesian')} />
              </SelectContent>
            </Select>
          </View>
        </View>
        {/* Logout */}
        <View className="gap-3">
          <Button onPress={handleLogout} variant="destructive">
            <Text>{t('settings.sign-out')}</Text>
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
