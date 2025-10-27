import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'id';

interface SettingsState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (language: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),

      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
