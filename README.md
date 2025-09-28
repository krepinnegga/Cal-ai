# Nutri-Scan 🍎

A React Native app powered by Gemini AI that analyzes food photos to provide detailed nutritional information, health scores, and dietary insights.

## Features

- 📸 **Photo Analysis**: Take photos or select from gallery to analyze meals
- 🧠 **AI-Powered**: Uses Google's Gemini AI for accurate food identification
- 📊 **Nutritional Breakdown**: Detailed macronutrient and micronutrient information
- 🏥 **Health Scoring**: 0-100 health score with visual progress indicators
- 💡 **Smart Insights**: Preparation tips, storage advice, and health benefits
- 🎨 **Modern UI**: Beautiful animations and responsive design with NativeWind/Tailwind

## Prerequisites

### 1. Node.js Installation

**For macOS:**

```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
```

**For Windows:**

- Download and install from [nodejs.org](https://nodejs.org/)
- Choose the LTS version (recommended)

**For Linux:**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

**Verify Installation:**

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### 2. Expo Go App

**Download Expo Go:**

- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd cal-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
# .env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in your `.env` file

### 4. Start the Development Server

```bash
npm start
```

This will:

- Start the Metro bundler
- Display a QR code in your terminal
- Open the Expo DevTools in your browser

### 5. Run on Your Device

**Using Expo Go:**

1. **Open Expo Go** on your phone
2. **Scan the QR code** displayed in your terminal or browser
3. The app will load on your device

**Alternative Methods:**

```bash
# Run on iOS Simulator (macOS only)
npm run ios

# Run on Android Emulator
npm run android



## Project Structure

```

cal-ai/
├── app/ # App screens and components
│ ├── index.tsx # Main camera/upload screen
│ ├── result.tsx # Analysis results screen
│ └── components/ # Reusable components
├── atoms/ # Jotai state management
├── assets/ # Images and static assets
├── global.d.ts # TypeScript declarations
├── babel.config.js # Babel configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json # Dependencies and scripts

````

## Available Scripts

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm test           # Run tests
npm run lint       # Run ESLint
````

## Troubleshooting

### Common Issues

**1. Metro bundler issues:**

```bash
# Clear Metro cache
npx expo start --clear

# Reset project
npm run reset-project
```

**2. Node version conflicts:**

```bash
# Check Node version
node --version

# If using nvm, switch to LTS
nvm use --lts
```

**3. Expo Go connection issues:**

- Ensure your phone and computer are on the same WiFi network
- Try using the tunnel connection: `npx expo start --tunnel`

**4. API key not working:**

- Verify your `.env` file is in the root directory
- Check that `EXPO_PUBLIC_GEMINI_API_KEY` is correctly set
- Restart the development server after adding the key

### Performance Tips

- Use a stable WiFi connection for best performance
- Close other apps on your phone to free up memory
- For faster reloads, use the development build instead of Expo Go

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Jotai
- **Animations**: React Native Reanimated
- **AI**: Google Gemini API
- **Icons**: Expo Vector Icons
- **Notifications**: Sonner Native

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information about your problem

---

**Happy coding! 🚀**
