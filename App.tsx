import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config';
import PhoneScreen from './src/screens/PhoneScreen';
import OTPScreen from './src/screens/OTPScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import { useOTPStore } from './src/stores/otpStore';
import '@/global.css';

type Screen = 'phone' | 'otp' | 'success';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('phone');
  const { reset, phoneNumber } = useOTPStore();

  const handleSendCode = () => {
    setCurrentScreen('otp');
  };

  const handleVerifySuccess = () => {
    setCurrentScreen('success');
  };

  const handleBackToPhone = () => {
    reset();
    setCurrentScreen('phone');
  };

  const handleStartOver = () => {
    reset();
    setCurrentScreen('phone');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'phone':
        return <PhoneScreen onSendCode={handleSendCode} />;
      case 'otp':
        return (
          <OTPScreen 
            onVerifySuccess={handleVerifySuccess}
            onBack={handleBackToPhone}
          />
        );
      case 'success':
        return <SuccessScreen phoneNumber={phoneNumber} onStartOver={handleStartOver} />;
      default:
        return <PhoneScreen onSendCode={handleSendCode} />;
    }
  };

  return (
    <GluestackUIProvider config={config}>
      {renderScreen()}
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
