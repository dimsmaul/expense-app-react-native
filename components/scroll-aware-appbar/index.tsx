// TODO: Need to Fix UI

import React, { useRef } from 'react';
import { Animated, ScrollView, View, StatusBar } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
// import { cn } from '@/lib/utils';
import { toCapitalize } from '@/utils/to-capitalize';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScrollAwareAppBarProps {
  user?: { name?: string };
  children?: React.ReactNode;
}

export default function ScrollAwareAppBar({ user, children }: ScrollAwareAppBarProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView edges={['top']} />
      {/* AppBar */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            zIndex: 10,
            backgroundColor: backgroundOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            }),
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.05)',
          },
        ]}>
        <View className="flex flex-row items-center gap-3 px-4 py-3">
          <Avatar alt={user?.name || ''}>
            <AvatarFallback>
              <Text>{user?.name?.charAt(0).toUpperCase() ?? 'U'}</Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text className="text-sm font-semibold">Good {getGreeting()}</Text>
            <Text className="text-[12px]">{toCapitalize(user?.name || '')}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 60 }} // agar konten tidak ketiban AppBar
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
}
