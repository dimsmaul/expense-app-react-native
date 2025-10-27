import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useSettingsStore } from '@/store/settings';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { setTheme } = useSettingsStore();

  const handleToggle = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    toggleColorScheme();
    setTheme(newScheme);
  };

  return (
    <Button
      onPressIn={handleToggle}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}

export default ThemeToggle;
