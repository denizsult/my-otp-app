import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhoneScreen from "../screens/PhoneScreen";
import OTPScreen from "../screens/OTPScreen";
import SuccessScreen from "../screens/SuccessScreen";
import { useOTPStore } from "../stores/otpStore";

export type RootStackParamList = {
  Phone: undefined;
  OTP: undefined;
  Success: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { requestId, timeLeft } = useOTPStore();

  const initialRouteName = requestId && timeLeft > 0 ? "OTP" : "Phone";
 

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Disable swipe back gesture
        }}
      >
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
