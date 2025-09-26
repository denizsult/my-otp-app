# My OTP App 📱

Simple OTP verification app built with React Native + Expo + TypeScript.

## What it does
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

# Add your Vonage API keys to .env
EXPO_PUBLIC_VONAGE_API_KEY=your_key
EXPO_PUBLIC_VONAGE_API_SECRET=your_secret

# Run
npm start
```

## Project Structure
```
src/
├── screens/          # Phone → OTP → Success
├── components/       # PhoneInput, OTPInput, etc.
├── stores/          # Zustand state management
├── api/             # Vonage SMS integration
└── hooks/           # Custom hooks
```

## Features
- International phone input
- 6-digit OTP with auto-focus
- 5-minute timer
- Resend functionality
- Error handling
- State persistence

That's it! 🚀
