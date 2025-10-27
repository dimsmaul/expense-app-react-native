import { Box, LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import { Icon } from '../ui/icon';

export interface EmptyProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

const Empty: React.FC<EmptyProps> = ({ icon, title, description }) => {
  return (
    <View className="items-center justify-center gap-3 py-20">
      {/* <WalletIcon color="#9ca3af" size={64} /> */}
      <Icon as={icon || Box} size={64} />
      <Text className="text-lg font-semibold text-foreground">{title || 'Data Not Found'}</Text>
      <Text className="text-sm text-muted-foreground">
        {description || 'No additional information available.'}
      </Text>
    </View>
  );
};

export default Empty;
