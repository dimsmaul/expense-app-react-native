import { useAuthStore } from '@/store/auth';
import { Redirect } from 'expo-router';

export default function Index() {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { user, token } = useAuthStore();

  if (token && user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)" />;
}
