# My OTP App 📱

Simple OTP verification app built with React Native + Expo + TypeScript.

## What it does
- Configure Vonage API credentials (required on first launch)
- Enter phone number with country code
- Get 6-digit OTP via SMS
- Verify the code
- Done! ✅

## Tech Stack
- React Native + Expo
- TypeScript
- Gluestack UI + NativeWind
- Zustand for state
- Vonage API for SMS

## Quick Start

```bash
# Install
npm install

# Run
npm start
```

### First Time Setup
1. Launch the app
2. Enter your Vonage API Key and Secret when prompted
3. Your credentials are stored securely on your device
4. Start using OTP verification!

> **Note**: API credentials are now configured through the app interface instead of environment variables for better security and user control.

## Project Structure
```
src/
├── screens/          # ApiConfig → Phone → OTP → Success
├── components/       # PhoneInput, OTPInput, etc.
├── stores/          # Zustand state management (OTP + API Config)
├── api/             # Vonage SMS integration
└── hooks/           # Custom hooks
```

## Features
- **API Configuration**: Secure credential management with device storage
- **Settings Access**: Easy reconfiguration via settings button
- **Clear Configuration**: Reset API credentials when needed
- International phone input
- 6-digit OTP with auto-focus
- 5-minute timer
- Resend functionality
- Error handling
- State persistence

## API Configuration

The app requires Vonage API credentials to function. These are configured through the app interface:

### First Launch
- App automatically shows API configuration screen
- Enter your Vonage API Key and Secret
- Credentials are stored securely on your device

### Managing Credentials
- **Settings Button** (⚙️): Access configuration from Phone screen
- **Save Configuration**: Store new credentials
- **Clear Configuration**: Reset all API settings

### Security
- API Secret is masked in input field
- Credentials stored locally using AsyncStorage
- No external transmission except to Vonage API

That's it! 🚀
