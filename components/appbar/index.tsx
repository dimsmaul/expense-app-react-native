import React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeToggle from '../theme-toggle';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';

export interface IAppBarProps {
  title?: string;
  leftContent?: 'back' | React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function AppBar({ title, leftContent, rightContent }: IAppBarProps) {
  return (
    <>
      <SafeAreaView edges={['top']} />
      <View className="flex h-12 flex-row items-center justify-between px-3 py-2">
        <View className="min-w-10">
          {leftContent === 'back' ? (
            <Button
              variant={'ghost'}
              size={'icon'}
              onPress={() => router.back()}
              className="ios:size-9 rounded-full web:mx-4">
              <Icon as={ChevronLeft} className='size-6' />
            </Button>
          ) : (
            leftContent
          )}
        </View>
        <Text className="font-bold">{title}</Text>
        <View className="w-10">{rightContent ? rightContent : <ThemeToggle />}</View>
      </View>
    </>
  );
}
