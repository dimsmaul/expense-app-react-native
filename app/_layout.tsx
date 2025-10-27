import '@/global.css';
import '@/lib/i18n';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useSettingsStore } from '@/store/settings';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const queryClient = new QueryClient();

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { i18n } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { theme, language } = useSettingsStore();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme || theme]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        <Stack screenOptions={{ headerBackTitle: 'Back' }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
