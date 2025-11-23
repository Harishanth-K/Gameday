# Assets Folder

This folder contains images, icons, and other static assets for the GameDay app.

## Required Assets (to be added)

When setting up the project, you'll need to add the following Expo default assets:

### App Icons and Splash Screens

1. **icon.png** (1024x1024)
   - Main app icon
   - Use a sports-related icon or the ⚽ emoji

2. **splash.png** (1242x2436 for iPhone X)
   - App splash screen
   - Can be a simple design with app name

3. **adaptive-icon.png** (1024x1024)
   - Android adaptive icon
   - Foreground layer for Android

4. **favicon.png** (48x48)
   - Web favicon
   - For web version of the app

## Generating Icons

You can use these tools to generate app icons:

1. **Expo Icon Generator**: 
   - https://icon.kitchen/
   - Upload a single image, download all sizes

2. **App Icon Generator**:
   - https://www.appicon.co/
   - Generate iOS and Android icons

3. **Manual Creation**:
   - Use design tools like Figma, Sketch, or Photoshop
   - Export in required sizes

## Creating Icons Quickly

For quick setup, you can:

1. Use emojis as placeholder icons:
   - ⚽ Soccer ball
   - 🏀 Basketball  
   - 🏈 Football
   - ⚾ Baseball

2. Use icon generators with sports themes

3. Create simple text-based icons with app name

## Custom Assets

If you want to add team logos or other images:

```
src/assets/
├── images/
│   ├── team-logos/
│   └── backgrounds/
└── fonts/
    └── (custom fonts if any)
```

## Notes

- All images should be optimized for mobile
- Use PNG for icons with transparency
- Use JPEG for photos
- Keep file sizes reasonable (< 1MB per image)
- Consider using vector graphics (SVG) where possible

## Current Status

The app currently uses emoji placeholders for team badges (⚽). You can replace these with actual team logos by:

1. Adding logo images to `src/assets/images/team-logos/`
2. Updating `MatchCard.js` and `MatchDetailScreen.js` to use Image components
3. Fetching team logo URLs from TheSportsDB API (available in response)

Example:
```javascript
// In MatchCard.js
{match.strTeamBadge ? (
  <Image 
    source={{ uri: match.strTeamBadge }}
    style={{ width: 50, height: 50 }}
  />
) : (
  <Text>⚽</Text>
)}
```
