# Cal-AI: AI-Powered Calories tracking App

## Overview
Cal-AI is a modern, AI-powered Calories tracking App assistant built with React Native and Expo. It leverages generative AI to help users manage their calorie intake more efficiently through natural language processing and intelligent scheduling suggestions.

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Development](#development)
6. [Testing](#testing)
7. [Contributing](#contributing)

## Features
- Natural language processing for calendar management
- Intelligent scheduling suggestions
- Cross-platform compatibility (iOS, Android, Web)
- Modern, intuitive user interface
- Real-time updates and notifications
- Secure data handling

## Technology Stack
- **Frontend Framework**: React Native (v0.76.9)
- **Development Platform**: Expo (v52.0.40)
- **State Management**: Jotai (v2.12.2)
- **Navigation**: Expo Router (v4.0.19)
- **AI Integration**: Google Generative AI (v0.24.0)
- **UI Components**: 
  - Expo Blur
  - Expo Image Picker
  - React Native Reanimated
  - React Native Gesture Handler

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for mobile development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cal-ai.git
   cd cal-ai
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
   Fill in the required environment variables in the .env file.

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure
```
cal-ai/
├── app/                  # Main application code
│   ├── api/             # API integration
│   ├── _layout.tsx      # Layout configuration
│   ├── index.tsx        # Main entry point
│   └── result.tsx       # Results page
├── assets/              # Static assets
├── atoms/               # Jotai atoms for state management
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

### Code Style
The project follows TypeScript best practices and uses ESLint for code linting. Ensure your code follows the established patterns and passes all linting rules.

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
- Expo team for the excellent development platform
- React Native community for continuous support
- Google for the Generative AI capabilities
