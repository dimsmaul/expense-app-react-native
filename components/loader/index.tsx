import React from 'react';
import { View } from 'react-native';

const Loader = () => {
  return (
    <View className="flex animate-pulse flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} className="h-24 rounded-md bg-muted" />
      ))}
    </View>
  );
};

export default Loader;
