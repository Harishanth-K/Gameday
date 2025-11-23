# GameDay - Quick Reference Guide

## 🚀 Quick Commands

```bash
# Install dependencies
npm install
npx expo install @react-native-async-storage/async-storage

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android  
npm run android

# Clear cache
expo start -c

# Full reset
rm -rf node_modules
npm install
npm start
```

## 🔑 Demo Credentials

```
Username: emilys
Password: emilyspass
```

## 📱 App Structure Quick Map

```
Authentication Flow (RootNavigator)
├── Not Logged In → AuthNavigator
│   ├── LoginScreen
│   └── RegisterScreen
└── Logged In → AppNavigator (Bottom Tabs)
    ├── Home Tab → HomeStack
    │   ├── HomeScreen (list of matches)
    │   └── MatchDetailScreen
    ├── Favorites Tab → FavoritesStack
    │   ├── FavoritesScreen (list of saved matches)
    │   └── MatchDetailScreen
    └── Profile Tab → ProfileStack
        └── ProfileScreen (user info, settings, logout)
```

## 🎨 Theming

### Get Current Theme
```javascript
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { colors, isDark } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
};
```

### Available Colors
```javascript
colors.primary       // Main brand color (Orange)
colors.secondary     // Accent color (Blue)
colors.background    // Screen background
colors.surface       // Card/surface background
colors.text          // Primary text
colors.textSecondary // Secondary/muted text
colors.border        // Border color
colors.error         // Error red
colors.success       // Success green
```

## 🔄 Redux Quick Reference

### Dispatch Actions
```javascript
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };
};
```

### Access State
```javascript
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const user = useSelector(state => state.auth.user);
  const matches = useSelector(state => state.matches.upcomingMatches);
  const favorites = useSelector(state => state.favorites.items);
};
```

### Available Slices

**authSlice:**
- `loginUser(credentials)` - Login
- `registerUser(userData)` - Register
- `logoutUser()` - Logout
- `restoreSession()` - Restore from storage

**matchesSlice:**
- `fetchUpcomingMatches(leagueId)` - Get upcoming matches
- `fetchPastMatches(leagueId)` - Get past matches
- `fetchMatchDetails(matchId)` - Get match details

**favoritesSlice:**
- `addFavorite(match)` - Add to favorites
- `removeFavorite(matchId)` - Remove from favorites
- `loadFavorites()` - Load from storage
- `saveFavorites(favorites)` - Save to storage

**themeSlice:**
- `setThemeOverride('light'|'dark')` - Set theme
- `clearThemeOverride()` - Use system theme

## 🧭 Navigation

### Navigate to Screen
```javascript
const MyComponent = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate('MatchDetail', { match: matchData });
  };
};
```

### Go Back
```javascript
navigation.goBack();
```

### Access Route Params
```javascript
const MyScreen = ({ route }) => {
  const { match } = route.params;
};
```

## 🎣 Custom Hooks

### useAuth
```javascript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { 
    user,           // Current user object
    token,          // Auth token
    isAuthenticated, // Boolean
    login,          // Login function
    logout,         // Logout function
    loading,        // Loading state
    error           // Error message
  } = useAuth();
};
```

### useTheme
```javascript
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const {
    colors,      // Color palette object
    isDark,      // Boolean - is dark mode?
    colorScheme  // 'light' or 'dark'
  } = useTheme();
};
```

## ✅ Form Validation

### Login Form
```javascript
import { loginSchema } from '../constants/validation';

try {
  await loginSchema.validate(formData, { abortEarly: false });
  // Form is valid
} catch (error) {
  // Handle validation errors
  error.inner.forEach(err => {
    console.log(err.path, err.message);
  });
}
```

### Register Form
```javascript
import { registerSchema } from '../constants/validation';

try {
  await registerSchema.validate(formData, { abortEarly: false });
  // Form is valid
} catch (error) {
  // Handle validation errors
}
```

## 🎨 Common UI Patterns

### Loading State
```javascript
{loading && <LoadingSpinner message="Loading matches..." />}
```

### Empty State
```javascript
{items.length === 0 && (
  <EmptyState
    icon="inbox"
    title="No Items"
    message="Add some items to get started"
  />
)}
```

### Pull to Refresh
```javascript
<FlatList
  data={data}
  refreshControl={
    <RefreshControl
      refreshing={loading}
      onRefresh={loadData}
      colors={[colors.primary]}
    />
  }
/>
```

## 🐛 Debugging Tips

### Console Logging Redux State
```javascript
// In any component
import { useSelector } from 'react-redux';

const state = useSelector(state => state);
console.log('Full Redux State:', state);
```

### Check Navigation State
```javascript
// In any screen
console.log('Navigation State:', navigation.getState());
console.log('Route Params:', route.params);
```

### View API Responses
```javascript
// In Redux thunks (authSlice, matchesSlice)
console.log('API Response:', data);
```

### Check Async Storage
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// View all keys
AsyncStorage.getAllKeys().then(keys => console.log(keys));

// View specific item
AsyncStorage.getItem('favorites').then(data => console.log(data));
```

### Check Secure Storage
```javascript
import * as SecureStore from 'expo-secure-store';

SecureStore.getItemAsync('auth_token').then(token => console.log(token));
```

## 📦 Adding New Features

### Add New Screen
1. Create file in `src/screens/NewScreen.js`
2. Import in navigator
3. Add to stack/tab navigator
4. Style with theme colors

### Add New Redux Slice
1. Create file in `src/store/newSlice.js`
2. Import in `store.js`
3. Add to `configureStore` reducer object
4. Use with `useSelector` and `dispatch`

### Add New Component
1. Create file in `src/components/NewComponent.js`
2. Import `useTheme` for colors
3. Export component
4. Use in screens

## 🔧 Common Fixes

### "Module not found" Error
```bash
npm install
npx expo install @react-native-async-storage/async-storage
expo start -c
```

### App Not Updating
```bash
expo start -c
# or shake device → Reload
```

### "Can't find variable: __fbBatchedBridge"
```bash
rm -rf node_modules
npm install
expo start -c
```

### Dark Mode Not Working
1. Check `app.json` has `"userInterfaceStyle": "automatic"`
2. Verify `useTheme` hook is used
3. Check Redux themeSlice state

### Favorites Not Persisting
1. Verify AsyncStorage is installed
2. Check `saveFavorites` is called after add/remove
3. Check `loadFavorites` is called in RootNavigator

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `App.js` | Entry point, wraps app with Redux Provider |
| `src/navigation/RootNavigator.js` | Handles auth flow switching |
| `src/store/store.js` | Redux store configuration |
| `src/constants/colors.js` | Theme color palettes |
| `src/hooks/useTheme.js` | Theme management |
| `src/hooks/useAuth.js` | Auth abstraction |

## 🎓 Learn More

- **React Native**: https://reactnative.dev/docs/getting-started
- **Expo**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/docs/getting-started
- **Redux Toolkit**: https://redux-toolkit.js.org/introduction/getting-started
- **Yup**: https://github.com/jquense/yup

---

**Pro Tip:** Keep this file open while developing for quick reference! 🚀
