# GameDay - Sports & Lifestyle React Native App

A modern, feature-rich sports application built with React Native and Expo that allows users to view upcoming sports matches, manage favorites, and customize their experience with dark mode support.

## 🎯 Features

### Core Features
- ✅ **User Authentication**: Login and registration with form validation using Yup
- ✅ **Sports Data Integration**: Real-time sports match data from TheSportsDB API
- ✅ **Match Browsing**: Browse upcoming sports matches with detailed information
- ✅ **Match Details**: View comprehensive match information including teams, venue, date, and status
- ✅ **Favorites Management**: Add/remove matches to favorites with persistent storage
- ✅ **User Profile**: View user information and manage app settings
- ✅ **Dark Mode**: Full dark/light theme support with manual toggle

### Technical Features
- 📱 React Native with Expo
- 🧭 React Navigation (Stack + Bottom Tabs)
- 🔄 Redux Toolkit for state management
- 🔐 Secure token storage with Expo SecureStore
- 💾 Persistent favorites with AsyncStorage
- 🎨 Clean, responsive UI with Feather Icons
- ✅ Form validation with Yup
- 🌓 Automatic dark mode based on system preferences

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator / Expo Go app on physical device

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd GameDay
```

2. **Install dependencies**
```bash
npm install
```

3. **Install AsyncStorage**
```bash
npx expo install @react-native-async-storage/async-storage
```

4. **Start the development server**
```bash
npm start
# or
expo start
```

5. **Run on your device/simulator**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## 🔑 Demo Credentials

The app uses DummyJSON API for authentication. Use these credentials to login:

**Username:** `emilys`  
**Password:** `emilyspass`

Other valid credentials from DummyJSON:
- Username: `michaelw` / Password: `michaelwpass`
- Username: `sophiab` / Password: `sophiabpass`

## 📁 Project Structure

```
GameDay/
├── App.js                      # Main app entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── src/
    ├── components/             # Reusable UI components
    │   ├── MatchCard.js
    │   ├── EmptyState.js
    │   └── LoadingSpinner.js
    ├── constants/              # App constants
    │   ├── colors.js           # Theme colors (light/dark)
    │   └── validation.js       # Yup validation schemas
    ├── hooks/                  # Custom React hooks
    │   ├── useAuth.js          # Authentication hook
    │   └── useTheme.js         # Theme management hook
    ├── navigation/             # Navigation configuration
    │   ├── RootNavigator.js    # Main navigator
    │   ├── AuthNavigator.js    # Auth flow (Login/Register)
    │   └── AppNavigator.js     # Main app (Bottom Tabs)
    ├── screens/                # App screens
    │   ├── LoginScreen.js
    │   ├── RegisterScreen.js
    │   ├── HomeScreen.js
    │   ├── MatchDetailScreen.js
    │   ├── FavoritesScreen.js
    │   └── ProfileScreen.js
    └── store/                  # Redux store
        ├── store.js            # Store configuration
        ├── authSlice.js        # Authentication state
        ├── matchesSlice.js     # Matches data state
        ├── favoritesSlice.js   # Favorites state
        └── themeSlice.js       # Theme state
```

## 🔌 API Integration

### TheSportsDB API
- **Base URL**: `https://www.thesportsdb.com/api/v1/json/3`
- **Endpoints Used**:
  - `/eventsnextleague.php?id=4328` - Upcoming matches
  - `/eventspastleague.php?id=4328` - Past matches
  - `/lookupevent.php?id={eventId}` - Match details

### DummyJSON API
- **Base URL**: `https://dummyjson.com`
- **Endpoints Used**:
  - `/auth/login` - User authentication

## 🎨 Key Technologies

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **Expo SecureStore** - Secure token storage
- **AsyncStorage** - Local data persistence
- **Yup** - Form validation
- **Feather Icons** - Icon library

## 🌓 Dark Mode

The app supports both automatic and manual dark mode:

1. **Automatic**: Follows system preferences by default
2. **Manual Toggle**: Available in Profile screen
3. **Persistent**: Theme preference is saved across app restarts

## 💾 Data Persistence

- **Authentication**: Tokens stored securely using Expo SecureStore
- **Favorites**: Match favorites saved using AsyncStorage
- **Theme Preference**: Theme override saved in Redux (can be extended to AsyncStorage)

## 📱 Screens Overview

### Authentication Flow
- **Login Screen**: Username/password login with validation
- **Register Screen**: New user registration with email and password confirmation

### Main App Flow
- **Home Screen**: List of upcoming sports matches
- **Match Detail Screen**: Detailed match information with favorite toggle
- **Favorites Screen**: User's saved favorite matches
- **Profile Screen**: User information and app settings

## 🧪 Testing

To test the app:

1. **Login Flow**: Use demo credentials to login
2. **Registration**: Create a new account (mock implementation)
3. **Browse Matches**: View upcoming matches on home screen
4. **Match Details**: Tap any match to view details
5. **Add Favorites**: Tap heart icon to add/remove favorites
6. **Dark Mode**: Toggle dark mode in profile screen
7. **Logout**: Test session management

## 📸 Screenshots

Take screenshots of:
1. Login Screen
2. Home Screen (with matches)
3. Match Detail Screen
4. Favorites Screen
5. Profile Screen
6. Dark Mode examples

## 🎥 Demo Video

Record a 2-minute video showing:
1. App launch and login
2. Browsing matches
3. Viewing match details
4. Adding to favorites
5. Viewing favorites screen
6. Dark mode toggle
7. Logout

## 🚧 Future Enhancements

- Push notifications for match updates
- Search and filter functionality
- Team and player profiles
- Live match scores
- Social features (share matches)
- Multiple sports leagues support
- Match predictions and statistics

## 📄 License

This project is created for educational purposes as part of the IN3210 Mobile Applications Development course.

## 👨‍💻 Author

[Your Name]
[Your Student ID]

## 🙏 Acknowledgments

- TheSportsDB for sports data API
- DummyJSON for authentication API
- Expo team for excellent development tools
- React Navigation for navigation library
