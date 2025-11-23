# GameDay - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```
   - Verify installation: `expo --version`

### Optional (for testing)

4. **iOS Simulator** (Mac only)
   - Install Xcode from App Store
   - Install Xcode Command Line Tools

5. **Android Studio** (for Android Emulator)
   - Download from: https://developer.android.com/studio
   - Set up Android Virtual Device (AVD)

6. **Expo Go App** (for testing on physical device)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

## 🚀 Installation Steps

### Step 1: Get the Project

**Option A: Clone from GitHub**
```bash
git clone <your-repository-url>
cd GameDay
```

**Option B: Extract from ZIP**
```bash
unzip GameDay.zip
cd GameDay
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install
```

This will install:
- React Native and Expo packages
- React Navigation libraries
- Redux Toolkit
- Yup for validation
- All other dependencies listed in package.json

### Step 3: Install AsyncStorage

This is required for favorites persistence:

```bash
npx expo install @react-native-async-storage/async-storage
```

### Step 4: Verify Installation

Check that everything is installed correctly:

```bash
npm ls @react-navigation/native
npm ls @reduxjs/toolkit
npm ls expo-secure-store
npm ls @react-native-async-storage/async-storage
```

## 🏃‍♂️ Running the App

### Method 1: Expo Development Server

1. Start the development server:
```bash
npm start
# or
expo start
```

2. A browser window will open with the Expo DevTools

3. Choose how to run:
   - Press `i` for iOS Simulator (Mac only)
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

### Method 2: Specific Platform

**For iOS:**
```bash
npm run ios
# or
expo start --ios
```

**For Android:**
```bash
npm run android
# or
expo start --android
```

**For Web (limited functionality):**
```bash
npm run web
# or
expo start --web
```

## 📱 Testing on Physical Device

### iOS Device

1. Install **Expo Go** from App Store
2. Make sure your phone and computer are on the same WiFi
3. Run `expo start`
4. Open Expo Go app
5. Scan the QR code from the terminal/browser

### Android Device

1. Install **Expo Go** from Google Play Store
2. Make sure your phone and computer are on the same WiFi
3. Run `expo start`
4. Open Expo Go app
5. Scan the QR code from the terminal/browser

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Command not found: expo"

**Solution:**
```bash
npm install -g expo-cli
```

#### Issue 2: "Unable to resolve module @react-native-async-storage/async-storage"

**Solution:**
```bash
npx expo install @react-native-async-storage/async-storage
rm -rf node_modules
npm install
```

#### Issue 3: Metro bundler error

**Solution:**
```bash
# Clear cache and restart
expo start -c
# or
rm -rf node_modules
npm install
npm start
```

#### Issue 4: "Network response timed out"

**Solution:**
- Check your internet connection
- Try using a different network
- Disable VPN if running
- Check firewall settings

#### Issue 5: iOS Simulator not opening

**Solution:**
- Make sure Xcode is installed (Mac only)
- Open Xcode and accept license agreements
- Install Command Line Tools:
  ```bash
  xcode-select --install
  ```

#### Issue 6: Android Emulator issues

**Solution:**
- Make sure Android Studio is installed
- Create/start an AVD in Android Studio
- Set ANDROID_HOME environment variable

#### Issue 7: "Cannot read property 'navigate' of undefined"

**Solution:**
- Make sure you're using `navigation` prop correctly
- Check that screen is wrapped in a navigator
- Restart the app

## 🎯 First Run Checklist

After installation, verify these work:

- [ ] App launches without errors
- [ ] Login screen appears
- [ ] Can login with demo credentials (emilys/emilyspass)
- [ ] Home screen loads matches
- [ ] Can navigate to match details
- [ ] Can add/remove favorites
- [ ] Favorites persist after app restart
- [ ] Dark mode toggle works
- [ ] Can logout successfully

## 🔐 Demo Credentials

Use these credentials to test the app:

**Primary:**
- Username: `emilys`
- Password: `emilyspass`

**Alternatives:**
- Username: `michaelw` / Password: `michaelwpass`
- Username: `sophiab` / Password: `sophiabpass`

## 📁 Project Structure Overview

```
GameDay/
├── App.js                  # Entry point
├── package.json            # Dependencies
├── app.json               # Expo config
└── src/
    ├── components/        # Reusable UI components
    ├── constants/         # App constants (colors, validation)
    ├── hooks/            # Custom React hooks
    ├── navigation/       # Navigation setup
    ├── screens/          # App screens
    └── store/            # Redux store and slices
```

## 🌐 API Information

### TheSportsDB API
- No API key required for basic usage
- Free tier: 3 requests per second
- Documentation: https://www.thesportsdb.com/api.php

### DummyJSON API
- No authentication required
- Free to use
- Documentation: https://dummyjson.com/docs

## 🛠️ Development Tips

### Hot Reload

Changes to your code will automatically reload in the app. If not:
- Shake your device or press `Cmd + D` (iOS) / `Cmd + M` (Android)
- Select "Reload"

### Debugging

1. **Chrome DevTools:**
   - Shake device → "Debug Remote JS"
   - Opens Chrome debugger

2. **React Native Debugger:**
   - Install standalone app
   - Better debugging experience

3. **Console Logs:**
   - Use `console.log()` in your code
   - View in terminal or debugger

### Useful Commands

```bash
# Clear cache
expo start -c

# Clear all caches and node_modules
rm -rf node_modules
npm cache clean --force
npm install

# Check Expo diagnostics
expo doctor

# Update dependencies
npm update

# View app logs
expo start --dev-client
```

## 📦 Building for Production

### Create APK (Android)

```bash
expo build:android
```

### Create IPA (iOS)

```bash
expo build:ios
```

Note: Building requires Expo account. Create one at https://expo.dev

## 🔄 Updating the App

If you pull new changes from Git:

```bash
# Update dependencies
npm install

# Clear cache and restart
expo start -c
```

## 💡 Best Practices

1. **Always test on clean install**
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

2. **Test on multiple devices/simulators**

3. **Clear cache if you encounter weird issues**
   ```bash
   expo start -c
   ```

4. **Check Expo CLI version**
   ```bash
   expo --version
   npm install -g expo-cli@latest
   ```

## 📞 Getting Help

If you encounter issues:

1. Check this guide first
2. Check Expo documentation: https://docs.expo.dev/
3. Search on Stack Overflow
4. Check GitHub Issues (if repository has any)
5. Review React Navigation docs: https://reactnavigation.org/

## ✅ Verification Steps

Before submitting/sharing your app:

1. **Clean Install Test:**
   ```bash
   rm -rf node_modules
   npm install
   npx expo install @react-native-async-storage/async-storage
   npm start
   ```

2. **Feature Test:** Go through all features systematically

3. **Error Test:** Try invalid logins, empty forms, etc.

4. **Performance Test:** Check loading times, smooth scrolling

5. **Cross-Platform Test:** Test on both iOS and Android if possible

## 🎓 Learning Resources

- **React Native:** https://reactnative.dev/
- **Expo:** https://docs.expo.dev/
- **React Navigation:** https://reactnavigation.org/
- **Redux Toolkit:** https://redux-toolkit.js.org/
- **Yup:** https://github.com/jquense/yup

---

**Need Help?** Make sure you've followed all steps in order. Most issues are resolved by clearing cache and reinstalling dependencies.

Happy coding! 🚀
