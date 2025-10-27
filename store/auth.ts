// import Storage from '@/utils/storage';
// import { Storage } from '@/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IAuthStoreState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface IAuthStore extends IAuthStoreState {
  setAuthData: (token: string, user: { id: string; name: string; email: string }) => void;
  clearAuthData: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuthData: (token, user) => set({ token, user }),
      clearAuthData: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // storage: createJSONStorage(() => Storage),
    }
  )
);
