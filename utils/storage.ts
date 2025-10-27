import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  setItem: async ({ key, value }: { key: string; value: any }) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  getItem: async ({ key }: { key: string }) => {
    const value = await AsyncStorage.getItem(key);
    return value;
  },
  removeItem: async ({ key }: { key: string }) => {
    await AsyncStorage.removeItem(key);
  },
  // getAllKeys: async () => {
  //   const keys = await AsyncStorage.getAllKeys();
  //   return keys;
  // },
};
