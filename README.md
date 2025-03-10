# task-management

## This application is available on the Web, Android, and iOS.

## Environment Setup

1. Tested with the following:

   - macOS 15.2 or later
     - System Preferences → Software Update
     - Or download from https://support.apple.com/macos


   - Homebrew 4.4.23
     ```bash
     # Using homebrew (recommended)
     # Open terminal then copy and paste the following command into the terminal

     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 
     ```

   - Node.js 20.18.3
     ```bash
     # Using brew (recommended)
     brew install node
     
     # Or download from
     # https://nodejs.org/dist/v20.18.3/
     ```

   - NPM 10.8.2 (comes with Node.js)
     ```bash
     npm install -g npm@10.8.2
     ```

   - Java 17.0.9 LTS (Zulu)
     ```bash
     # Using Homebrew
     brew tap homebrew/cask-versions
     brew install --cask zulu17
     
     # Or download from
     # https://www.azul.com/downloads/?version=java-17-lts&package=jdk
     ```

   - Xcode 16.2
     - Download from App Store or
     - https://developer.apple.com/download/applications/
     - Set as active - example:
       ```bash
       sudo xcode-select -s /Applications/Xcode_15.4.app/Contents/Developer
       ```

   - Android Studio 2024.1
     - Download from:
       - https://developer.android.com/studio

     - Install Android SDK 34.0.5 from Android Studio:
       - Tools → SDK Manager → SDK Tools
       - Select "Android SDK Command-line Tools"
       - Select "Android SDK Platform-Tools"

3. Install project dependencies:
   ```bash
     # Using yarn
     yarn
   ```

4. Generate native projects (first time only):
   ```bash
     # Using yarn
     yarn run prebuild
   ```

. For iOS, setup native dependencies (macOS only):
   ```bash
   yarn run ios:setup
   ```

## Running the App

```bash
# Start the development server
yarn start -c

# Run on Android
yarn run android

# Run on iOS
yarn run ios
```

### Using Expo Go (Optional)

If you prefer to use Expo Go instead of native builds:
```bash
# Start with Expo Go
yarn run start:expo

# Run on Android with Expo Go
yarn run android:expo

# Run on iOS with Expo Go
yarn run ios:expo
```

The app can be run in:
- Native development build (default)
  - Android emulator
  - iOS simulator (requires macOS)
  - Physical devices
- Expo Go (optional)
  - Using the :expo script variants

## Resources

- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
