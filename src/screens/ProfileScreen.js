import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { setThemeOverride, clearThemeOverride } from '../store/themeSlice';
import { logoutUser } from '../store/authSlice';

const ProfileScreen = () => {
  const { colors, isDark, colorScheme } = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const themeOverride = useSelector((state) => state.theme.themeOverride);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      dispatch(logoutUser());
    }
  };

  const toggleTheme = () => {
    if (themeOverride === null) {
      dispatch(setThemeOverride(isDark ? 'light' : 'dark'));
    } else if (themeOverride === 'dark') {
      dispatch(setThemeOverride('light'));
    } else {
      dispatch(setThemeOverride('dark'));
    }
  };

  const resetTheme = () => {
    dispatch(clearThemeOverride());
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: 70,
      paddingBottom: 40,
      paddingHorizontal: 25,
      backgroundColor: '#6A11CB',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 4,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    avatarText: {
      fontSize: 42,
      color: '#FFFFFF',
    },
    userName: {
      fontSize: 28,
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    userEmail: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
    },
    section: {
      marginTop: 25,
      backgroundColor: colors.surface,
      borderRadius: 20,
      marginHorizontal: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textSecondary,
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 12,
      letterSpacing: 0.5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 18,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    menuItemLast: {
      borderBottomWidth: 0,
    },
    menuIcon: {
      marginRight: 18,
      width: 24,
      alignItems: 'center',
    },
    menuText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    menuValue: {
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: 12,
      fontWeight: '500',
    },
    logoutButton: {
      margin: 25,
      backgroundColor: '#FF6B6B',
      padding: 18,
      borderRadius: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '700',
    },
    themeInfo: {
      fontSize: 12,
      color: colors.textSecondary,
      paddingHorizontal: 20,
      paddingBottom: 15,
      fontStyle: 'italic',
    },
    switchTrack: {
      false: colors.border,
      true: '#4CAF50',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
          </Text>
        </View>
        <Text style={styles.userName}>
          {user?.firstName || user?.username || 'User'}
        </Text>
        <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT INFORMATION</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Feather name="user" size={20} color="#6A11CB" />
          </View>
          <Text style={styles.menuText}>Username</Text>
          <Text style={styles.menuValue}>{user?.username || 'N/A'}</Text>
        </View>

        <View style={[styles.menuItem, styles.menuItemLast]}>
          <View style={styles.menuIcon}>
            <Feather name="mail" size={20} color="#6A11CB" />
          </View>
          <Text style={styles.menuText}>Email</Text>
          <Text style={styles.menuValue}>{user?.email || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>APPEARANCE SETTINGS</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Feather name="moon" size={20} color="#6A11CB" />
          </View>
          <Text style={styles.menuText}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={styles.switchTrack}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity
          style={[styles.menuItem, styles.menuItemLast]}
          onPress={resetTheme}
        >
          <View style={styles.menuIcon}>
            <Feather name="smartphone" size={20} color="#6A11CB" />
          </View>
          <Text style={styles.menuText}>Use System Setting</Text>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <Text style={styles.themeInfo}>
          Current theme: {themeOverride || 'System'} ({colorScheme})
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT APPLICATION</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Feather name="info" size={20} color="#6A11CB" />
          </View>
          <Text style={styles.menuText}>Version</Text>
          <Text style={styles.menuValue}>1.0.0</Text>
        </View>

        <View style={[styles.menuItem, styles.menuItemLast]}>
          <View style={styles.menuIcon}>
            <Feather name="code" size={20} color="#6A11CB" />
          </View>
          <Text style={styles.menuText}>Built with</Text>
          <Text style={styles.menuValue}>React Native</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;