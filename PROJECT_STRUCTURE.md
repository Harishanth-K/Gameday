# GameDay - Project Structure

This document describes the complete folder structure of the GameDay React Native application.

## 📁 Root Level Structure

```
GameDay/
├── app.json                # Expo configuration (includes userInterfaceStyle for dark mode)
├── eas.json               # EAS Build configuration for building APK/IPA
├── .gitignore             # Git ignore file
├── package.json           # Dependencies (react-navigation, redux, expo-secure-store, etc.)
├── babel.config.js        # Babel configuration
├── App.js                 # Main application entry point
├── README.md              # Main project documentation
├── SETUP_GUIDE.md         # Detailed setup and installation guide
├── SUBMISSION_CHECKLIST.md # Assignment submission checklist
├── GRADING_ALIGNMENT.md   # How project meets grading criteria
├── QUICK_REFERENCE.md     # Quick command and API reference
└── src/                   # Source code directory
```

## 📂 src/ Directory Structure

```
src/
├── assets/                     # Images, logos, icons, custom fonts
│   └── README.md              # Instructions for adding assets
│
├── components/                 # Reusable UI components
│   ├── MatchCard.js           # Card component for displaying match info
│   ├── LoadingSpinner.js      # Loading indicator component
│   └── EmptyState.js          # Empty state component with icon and message
│
├── constants/                  # Application constants
│   ├── colors.js              # Light and dark theme color palettes
│   └── validation.js          # Yup validation schemas for forms
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.js             # Authentication hook (login, logout, user state)
│   └── useTheme.js            # Theme hook (colors, isDark, colorScheme)
│
├── navigation/                 # Navigation configuration
│   ├── RootNavigator.js       # Main navigator, handles auth flow switching
│   ├── AuthNavigator.js       # Stack navigator for auth screens (Login, Register)
│   └── AppNavigator.js        # Bottom tab navigator for main app (Home, Favorites, Profile)
│
├── screens/                    # Application screens
│   ├── LoginScreen.js         # User login screen with form validation
│   ├── RegisterScreen.js      # User registration screen
│   ├── HomeScreen.js          # Main screen displaying list of matches
│   ├── MatchDetailScreen.js   # Detailed view of a single match
│   ├── FavoritesScreen.js     # Screen showing user's favorited matches
│   └── ProfileScreen.js       # User profile and settings screen
│
├── services/                   # API service layer (using fetch)
│   ├── authAPI.js             # Authentication API calls (login, register)
│   ├── matchesAPI.js          # Sports matches API calls (TheSportsDB)
│   └── storageAPI.js          # Storage operations (SecureStore, AsyncStorage)
│
└── store/                      # Redux Toolkit state management
    ├── store.js               # Redux store configuration
    ├── authSlice.js           # Authentication state (user, token, login/logout)
    ├── matchesSlice.js        # Matches data state (upcoming, past, details)
    ├── favoritesSlice.js      # Favorites management state
    └── themeSlice.js          # Theme preference state (dark/light mode)
```

## 🎯 Key Files Description

### Root Files

- **app.json**: Expo configuration including app name, icon paths, and dark mode support
- **eas.json**: Configuration for building production APK/IPA files
- **package.json**: Lists all dependencies including React Navigation, Redux Toolkit, Expo SecureStore
- **babel.config.js**: Babel preset configuration for Expo
- **App.js**: Main entry point that wraps app with Redux Provider and Navigation Container

### Components (src/components/)

- **MatchCard.js**: Reusable card component displaying match information with favorite toggle
- **LoadingSpinner.js**: Generic loading spinner with optional message
- **EmptyState.js**: Generic empty state component with icon, title, and message

### Constants (src/constants/)

- **colors.js**: 
  - `lightColors`: Color palette for light theme
  - `darkColors`: Color palette for dark theme
  - `commonColors`: Shared colors (white, black, transparent)

- **validation.js**:
  - `loginSchema`: Yup validation for login form
  - `registerSchema`: Yup validation for registration form

### Hooks (src/hooks/)

- **useAuth.js**: 
  - Provides: `user`, `token`, `isAuthenticated`, `login()`, `register()`, `logout()`
  - Abstracts Redux auth state and actions

- **useTheme.js**:
  - Provides: `colors`, `isDark`, `colorScheme`
  - Handles system preference detection and manual override

### Navigation (src/navigation/)

- **RootNavigator.js**: 
  - Checks auth state
  - Shows AuthNavigator if not logged in
  - Shows AppNavigator if logged in
  - Handles session restoration on app start

- **AuthNavigator.js**:
  - Stack navigator with Login and Register screens
  - No header shown

- **AppNavigator.js**:
  - Bottom tab navigator with 3 tabs: Home, Favorites, Profile
  - Each tab has nested stack navigator for proper navigation
  - Custom Feather icons for each tab

### Screens (src/screens/)

- **LoginScreen.js**: 
  - Login form with username and password
  - Form validation using Yup
  - Shows demo credentials
  - Handles login errors

- **RegisterScreen.js**:
  - Registration form with username, email, password, confirm password
  - Form validation
  - Password visibility toggle

- **HomeScreen.js**:
  - Lists upcoming matches from TheSportsDB API
  - Pull-to-refresh functionality
  - Loading states
  - Empty state when no matches

- **MatchDetailScreen.js**:
  - Displays detailed match information
  - Team names, venue, date, time, status
  - Favorite toggle button
  - Score display (if available)

- **FavoritesScreen.js**:
  - Lists all favorited matches
  - Persistent across app restarts
  - Empty state when no favorites

- **ProfileScreen.js**:
  - User information display
  - Dark mode toggle switch
  - App settings
  - Logout button

### Services (src/services/)

- **authAPI.js**:
  - `loginUser(credentials)`: Authenticate user with DummyJSON
  - `registerUser(userData)`: Register new user (mock)
  - `fetchUserProfile(token)`: Get user profile
  - `refreshAuthToken(refreshToken)`: Refresh auth token

- **matchesAPI.js**:
  - `fetchUpcomingMatches(leagueId)`: Get upcoming matches
  - `fetchPastMatches(leagueId)`: Get past matches
  - `fetchMatchDetails(matchId)`: Get match details
  - `searchTeams(teamName)`: Search for teams
  - `fetchTeamDetails(teamId)`: Get team information

- **storageAPI.js**:
  - `saveAuthToken(token)`: Store token in SecureStore
  - `getAuthToken()`: Retrieve token from SecureStore
  - `deleteAuthToken()`: Remove token from SecureStore
  - `saveUserData(user)`: Store user data in SecureStore
  - `getUserData()`: Retrieve user data from SecureStore
  - `saveFavorites(favorites)`: Store favorites in AsyncStorage
  - `getFavorites()`: Retrieve favorites from AsyncStorage
  - `clearAllData()`: Clear all stored data on logout

### Store (src/store/)

- **store.js**:
  - Configures Redux store
  - Combines all reducers (auth, matches, favorites, theme)
  - Sets up middleware

- **authSlice.js**:
  - State: `user`, `token`, `loading`, `error`, `isInitialized`
  - Thunks: `loginUser`, `registerUser`, `logoutUser`, `restoreSession`
  - Uses SecureStore for sensitive data

- **matchesSlice.js**:
  - State: `upcomingMatches`, `pastMatches`, `selectedMatch`, `loading`, `error`
  - Thunks: `fetchUpcomingMatches`, `fetchPastMatches`, `fetchMatchDetails`
  - Fetches from TheSportsDB API via matchesAPI service

- **favoritesSlice.js**:
  - State: `items[]`, `loading`, `error`
  - Actions: `addFavorite`, `removeFavorite`, `clearFavorites`
  - Thunks: `loadFavorites`, `saveFavorites`
  - Uses AsyncStorage for persistence

- **themeSlice.js**:
  - State: `themeOverride` (null, 'light', or 'dark')
  - Actions: `setThemeOverride`, `clearThemeOverride`
  - null = use system preference

## 🔄 Data Flow

### Authentication Flow
```
LoginScreen → useAuth() → dispatch(loginUser) 
  → authSlice → authAPI.loginUser() → DummyJSON API
  → storageAPI.saveAuthToken() → SecureStore
  → RootNavigator detects auth state → AppNavigator
```

### Matches Data Flow
```
HomeScreen → useEffect → dispatch(fetchUpcomingMatches)
  → matchesSlice → matchesAPI.fetchUpcomingMatches() → TheSportsDB API
  → Redux state updated → HomeScreen re-renders with matches
```

### Favorites Flow
```
MatchCard → Toggle Heart Icon → dispatch(addFavorite)
  → favoritesSlice → dispatch(saveFavorites)
  → storageAPI.saveFavorites() → AsyncStorage
  → On app restart: RootNavigator → dispatch(loadFavorites)
  → storageAPI.getFavorites() → Redux state restored
```

### Theme Flow
```
ProfileScreen → Toggle Switch → dispatch(setThemeOverride)
  → themeSlice → state.themeOverride = 'dark'
  → All components using useTheme() → re-render with dark colors
```

## 📱 File Count

- **Total Files**: 34
- **JavaScript Files**: 25
- **Documentation Files**: 6
- **Configuration Files**: 3

## 🎨 Code Organization Principles

1. **Separation of Concerns**: UI, business logic, and API calls are separated
2. **DRY (Don't Repeat Yourself)**: Reusable components and hooks
3. **Single Responsibility**: Each file has one clear purpose
4. **Modular**: Easy to add, remove, or modify features
5. **Testable**: Pure functions and separated logic
6. **Maintainable**: Clear structure and naming conventions

## 🚀 Adding New Features

### To Add a New Screen:
1. Create screen file in `src/screens/`
2. Add route in appropriate navigator (`src/navigation/`)
3. Use `useTheme()` for styling
4. Connect to Redux if needed

### To Add New API Endpoint:
1. Add function to appropriate service file (`src/services/`)
2. Create thunk in appropriate slice (`src/store/`)
3. Use thunk in screen/component

### To Add New Component:
1. Create file in `src/components/`
2. Use `useTheme()` for consistent styling
3. Export and use in screens

## 📖 Architecture Benefits

- **Scalability**: Easy to add new features
- **Maintainability**: Clear file organization
- **Testability**: Separated concerns make testing easier
- **Collaboration**: Team members can work on different parts
- **Best Practices**: Follows industry standards

---

This structure follows React Native and Redux best practices, making the codebase professional, maintainable, and scalable.
