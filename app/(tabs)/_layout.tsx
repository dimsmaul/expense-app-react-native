import { Stack, Tabs } from 'expo-router';
import { LayoutDashboard, Settings, Settings2, Wallet } from 'lucide-react-native';
import React from 'react';

function Layout() {
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
