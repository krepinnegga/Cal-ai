# NutriScan: AI-Powered Food Analysis App

## Overview
NutriScan is a modern, AI-powered food analysis application built with React Native and Expo. It leverages Google's Gemini AI to help users track their nutritional intake more efficiently through advanced image recognition and natural language processing. The app provides instant nutritional analysis of food items through photos, making calorie and nutrient tracking effortless and accurate.

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Development](#development)
6. [Testing](#testing)
7. [Contributing](#contributing)

## Features
- Advanced food recognition through image analysis
- Detailed nutritional breakdown including calories, macronutrients, and micronutrients
- Cross-platform compatibility (iOS, Android, Web)
- Modern, intuitive user interface with animated components
- Real-time AI-powered analysis using Gemini-2.0-flash
- Comprehensive portion size estimation
- Additional dietary information (allergens, dietary restrictions)

## Technology Stack
- **Frontend Framework**: React Native (v0.76.9)
- **Development Platform**: Expo (v52.0.40)
- **State Management**: Jotai (v2.12.2)
- **Navigation**: Expo Router (v4.0.19)
- **AI Integration**: Google Generative AI (Gemini-2.0-flash)
- **UI Components**: 
  - Expo Blur
  - Expo Image Picker
  - React Native Reanimated
  - React Native Gesture Handler
  - Linear Gradient

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Expo CLI
- Google Gemini API key
- iOS Simulator or Android Emulator (for mobile development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nutriscan.git
   cd nutriscan
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp DUMMY.env .env
   ```
   Add your Gemini API key to the .env file:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure
```
nutriscan/
├── app/                  # Main application code
│   ├── api/             # API integration with Gemini AI
│   │   └── analyze+api.ts # Food analysis endpoint
│   ├── _layout.tsx      # Layout configuration
│   ├── index.tsx        # Main camera/gallery interface
│   └── result.tsx       # Analysis results display
├── assets/              # Static assets and response templates
├── atoms/               # Jotai atoms for state management
│   └── analysis.ts      # Analysis state management
├── components/          # Reusable components
└── expo-env.d.ts        # TypeScript declarations
```

## Development

### Available Scripts
- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser
- `npm test` - Run tests
- `npm run lint` - Run linting
- `npm run reset-project` - Reset project configuration

### Key Features Implementation
- **Image Capture**: Uses Expo ImagePicker for camera and gallery access
- **AI Analysis**: Integrates with Gemini AI for food recognition and nutritional analysis
- **Results Display**: Animated collapsible sections showing detailed nutritional information
- **State Management**: Jotai for efficient state handling across components

## Testing
The project uses Jest for testing. Run tests using:
```bash
npm test
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Google Gemini AI team for the powerful image analysis capabilities
- Expo team for the excellent development platform
- React Native community for continuous support
