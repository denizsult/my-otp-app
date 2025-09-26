import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhoneScreen from "../screens/PhoneScreen";
import OTPScreen from "../screens/OTPScreen";
import SuccessScreen from "../screens/SuccessScreen";
import ApiConfigScreen from "../screens/ApiConfigScreen";
import { useOTPStore } from "../stores/otpStore";
import { useApiConfigStore } from "../stores/apiConfigStore";

export type RootStackParamList = {
  ApiConfig: undefined;
  Phone: undefined;
  OTP: undefined;
  Success: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { requestId, timeLeft } = useOTPStore();
  const { isConfigured } = useApiConfigStore();

  // Determine initial route based on API configuration and OTP state
  const getInitialRouteName = () => {
    if (!isConfigured) {
      return "ApiConfig";
    }
    if (requestId && timeLeft > 0) {
      return "OTP";
    }
    return "Phone";
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Disable swipe back gesture
        }}
      >
        <Stack.Screen name="ApiConfig" component={ApiConfigScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
