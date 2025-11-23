# GameDay - Submission Checklist

## 📦 Deliverables Checklist

### 1. GitHub Repository ✅
- [ ] Create a public GitHub repository
- [ ] Push all project files
- [ ] Ensure README.md is complete
- [ ] Add .gitignore to exclude node_modules
- [ ] Verify all code is committed
- [ ] Test clone on a fresh directory

### 2. Screenshots 📸
Required screenshots to capture:

- [ ] **Login Screen** - Show the login form with demo credentials visible
- [ ] **Register Screen** - Show the registration form
- [ ] **Home Screen** - Display list of matches
- [ ] **Match Detail Screen** - Show match details with favorite button
- [ ] **Favorites Screen** - Show saved favorites (add some first!)
- [ ] **Profile Screen** - Show user info and settings
- [ ] **Dark Mode Example** - Show any screen in dark mode
- [ ] **Navigation** - Show bottom tab bar

**Screenshot Tips:**
- Use high-quality device frames (use React Native Debugger or device screenshots)
- Ensure screenshots are clear and readable
- Name files descriptively (e.g., `01-login-screen.png`, `02-home-screen.png`)
- Create a `screenshots/` folder in your repository

### 3. Demo Video 🎥
**Duration:** Maximum 2 minutes

**Script to Follow:**
1. **0:00-0:15** - App launch, show login screen, login with demo credentials
2. **0:15-0:45** - Navigate through home screen, show match cards, tap on a match
3. **0:45-1:00** - Show match details, add to favorites (heart icon)
4. **1:00-1:15** - Navigate to Favorites tab, show favorited match
5. **1:15-1:30** - Navigate to Profile, show user info
6. **1:30-1:45** - Toggle dark mode, show the change
7. **1:45-2:00** - Navigate back through app in dark mode, logout

**Recording Tips:**
- Use screen recording on your device/simulator
- Keep it concise and focused
- Show smooth navigation between screens
- Demonstrate all core features
- Upload to YouTube (unlisted) or Google Drive

**Tools for Recording:**
- **iOS Simulator**: Cmd + R (QuickTime)
- **Android Emulator**: Built-in screen recorder
- **Physical Device**: iOS Control Center / Android built-in recorder
- **Mac**: QuickTime Screen Recording
- **Windows**: Xbox Game Bar (Win + G)

### 4. Code Quality ✅

Before submission, verify:

- [ ] All files are properly formatted
- [ ] No console errors in the app
- [ ] No unused imports
- [ ] Meaningful variable and function names
- [ ] Comments where necessary
- [ ] Consistent code style
- [ ] All features working as expected

### 5. Testing Checklist ✅

Test the following flows:

**Authentication:**
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Form validation works (empty fields, short password)
- [ ] Registration form validation works
- [ ] Logout clears session

**Navigation:**
- [ ] Bottom tabs work correctly
- [ ] Stack navigation (Home → Detail) works
- [ ] Back button navigation works
- [ ] Tab persistence (switching tabs maintains state)

**Features:**
- [ ] Matches load from API
- [ ] Match details screen displays correctly
- [ ] Add to favorites works
- [ ] Remove from favorites works
- [ ] Favorites persist after app restart
- [ ] Empty states show when appropriate
- [ ] Pull to refresh works

**Dark Mode:**
- [ ] Dark mode toggle works
- [ ] Theme persists across screens
- [ ] System theme is followed by default
- [ ] All screens look good in both themes

## 📊 Evaluation Criteria Alignment

### Authentication & Validation (15 marks)
- ✅ Login and registration forms implemented
- ✅ Yup validation schemas
- ✅ Form error handling
- ✅ Secure token storage (SecureStore)
- ✅ Session restoration on app restart

### Navigation Implementation (10 marks)
- ✅ Stack navigator for auth flow
- ✅ Bottom tab navigator for main app
- ✅ Nested stack navigators
- ✅ Proper screen transitions
- ✅ Navigation params passing

### API Integration & Data Display (15 marks)
- ✅ TheSportsDB API integration
- ✅ DummyJSON authentication API
- ✅ Match data fetching and display
- ✅ Error handling
- ✅ Loading states

### State Management (15 marks)
- ✅ Redux Toolkit setup
- ✅ Multiple slices (auth, matches, favorites, theme)
- ✅ Async thunks for API calls
- ✅ Proper state updates
- ✅ Selector usage

### UI/UX Design & Responsiveness (15 marks)
- ✅ Clean, consistent design
- ✅ Feather icons throughout
- ✅ Responsive layouts
- ✅ Loading states and empty states
- ✅ Good color scheme and typography

### Code Quality & Best Practices (20 marks)
- ✅ Modular file structure
- ✅ Reusable components
- ✅ Custom hooks
- ✅ Proper error handling
- ✅ Clean code organization
- ✅ Separation of concerns

### Demo Video (5 marks)
- ⏳ Under 2 minutes
- ⏳ Shows all core features
- ⏳ Smooth demonstration
- ⏳ Clear and professional

### Bonus Feature (5 marks)
- ✅ Dark mode toggle implemented
- ✅ Theme persistence
- ✅ System preference support

**Total Possible: 100 marks (95 + 5 bonus)**

## 📦 Final Submission Package

Create a ZIP file containing:

```
GameDay_Submission/
├── GitHub_Repository_Link.txt    # Plain text file with your repo URL
├── Screenshots/
│   ├── 01-login-screen.png
│   ├── 02-register-screen.png
│   ├── 03-home-screen.png
│   ├── 04-match-detail.png
│   ├── 05-favorites-screen.png
│   ├── 06-profile-screen.png
│   ├── 07-dark-mode.png
│   └── 08-navigation.png
├── Demo_Video_Link.txt           # YouTube/Drive link to your video
└── README.txt                    # Brief notes about your submission
```

## 🚀 Quick Start Guide for Reviewers

Add this to your README or submission notes:

```markdown
## Quick Start for Reviewers

1. Clone the repository
2. Run `npm install`
3. Run `npx expo install @react-native-async-storage/async-storage`
4. Run `npm start` or `expo start`
5. Use demo credentials:
   - Username: emilys
   - Password: emilyspass
```

## ⏰ Pre-Submission Checklist (24 hours before deadline)

- [ ] All code committed and pushed to GitHub
- [ ] Repository is public and accessible
- [ ] README is complete and informative
- [ ] All screenshots captured and organized
- [ ] Demo video recorded and uploaded
- [ ] Tested app on clean install
- [ ] Verified all features work
- [ ] Prepared ZIP file for submission
- [ ] Double-checked submission requirements
- [ ] Submitted before deadline (Nov 23, 2025)

## 📝 Notes

**Common Issues to Avoid:**
1. Don't forget to install AsyncStorage separately
2. Make sure node_modules is in .gitignore
3. Test on a fresh clone before submitting
4. Verify demo credentials work
5. Check that screenshots are clear and readable
6. Keep demo video under 2 minutes

**Pro Tips:**
1. Commit frequently with meaningful messages
2. Test dark mode on all screens
3. Ensure app doesn't crash on edge cases
4. Show error handling in demo video
5. Highlight bonus features prominently

Good luck with your submission! 🎉
