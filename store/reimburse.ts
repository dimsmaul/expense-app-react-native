import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LampiranBukti {
  nominal: string;
  keterangan: string;
  uri: string[];
}

interface ReimburseState {
  tanggal: string;
  jenisKlaim: string;
  detail: string;
  lampiranBukti: LampiranBukti[];

  setReimburseData: (data: Partial<ReimburseState>) => void;
}

export const useReimburseStore = create<ReimburseState>()(
  persist(
    (set, get) => ({
      tanggal: '',
      jenisKlaim: '',
      detail: '',
      lampiranBukti: [],

      setReimburseData: (data) => set({ ...get(), ...data }),
    }),
    {
      name: 'reimburse-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
