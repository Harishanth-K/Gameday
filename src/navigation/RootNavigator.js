import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSession } from '../store/authSlice';
import { loadFavorites } from '../store/favoritesSlice';
import { loadThemePreference } from '../store/themeSlice'; // Add this import
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useTheme } from '../hooks/useTheme';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { token, isInitialized } = useSelector((state) => state.auth);
  const { colors } = useTheme();

  useEffect(() => {
    // Restore session and preferences on app start
    dispatch(restoreSession());
    dispatch(loadThemePreference()); // Add this line
    dispatch(loadFavorites());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return token ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;