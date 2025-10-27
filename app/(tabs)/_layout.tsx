import { useSettingsStore } from '@/store/settings';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Settings, Wallet } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Layout() {
  const { i18n } = useTranslation();
  const { language } = useSettingsStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          //   headerShown: false,
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'wallet',
          tabBarIcon: ({ color, size }) => <Wallet color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'setting',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default Layout;
