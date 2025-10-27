import React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import { cn } from '@/lib/utils';

export interface PreviewProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

const Preview: React.FC<PreviewProps> = ({ label, value, className }) => {
  return (
    <View className={cn('mb-2', className)}>
      <Text className="text-sm opacity-50">{label}</Text>
      {value instanceof Object ? value : <Text>{value}</Text>}
    </View>
  );
};

export default Preview;
