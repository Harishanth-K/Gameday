import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { loginSchema } from '../constants/validation';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const result = await login(formData);
      
      if (result.error) {
        Alert.alert('Login Failed', result.payload || 'Invalid credentials');
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6A11CB',
    },
    scrollView: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 25,
    },
    header: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logo: {
      fontSize: 36,
      color: '#FFFFFF',
    },
    title: {
      fontSize: 36,
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '500',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      paddingHorizontal: 16,
    },
    inputWrapperError: {
      borderColor: '#FF6B6B',
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    iconButton: {
      padding: 8,
    },
    errorText: {
      color: '#FF6B6B',
      fontSize: 12,
      marginTop: 8,
      fontWeight: '500',
    },
    loginButton: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 18,
      borderRadius: 15,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    loginButtonDisabled: {
      opacity: 0.7,
    },
    loginButtonText: {
      color: '#6A11CB',
      fontSize: 18,
      fontWeight: '700',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 25,
    },
    registerText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 15,
      fontWeight: '500',
    },
    registerLink: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '700',
      marginLeft: 8,
      textDecorationLine: 'underline',
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>⚽</Text>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <View style={[styles.inputWrapper, errors.username && styles.inputWrapperError]}>
              <Feather name="user" size={20} color="rgba(255, 255, 255, 0.8)" />
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={formData.username}
                onChangeText={(value) => handleChange('username', value)}
                autoCapitalize="none"
              />
            </View>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrapper, errors.password && styles.inputWrapperError]}>
              <Feather name="lock" size={20} color="rgba(255, 255, 255, 0.8)" />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;