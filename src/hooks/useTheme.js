import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { lightColors, darkColors } from '../constants/colors';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const themeOverride = useSelector((state) => state.theme.themeOverride);
  
  // Use override if set, otherwise use system preference
  const activeScheme = themeOverride || systemColorScheme || 'light';
  const isDark = activeScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;
  
  return { colors, isDark, colorScheme: activeScheme };
};
