import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useOTPStore } from "./src/stores/otpStore";
import KeyboardWrapper from "./src/components/KeyboardWrapper";
import AppNavigator from "./src/navigation/AppNavigator";
import { Center } from "@/components/ui/center";
import { RenderIf } from "./src/components/RenderIf";
import { ActivityIndicator } from "react-native";
import { ToastContainer } from "./src/components/CustomToast";
import "@/global.css";

export default function App() {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand store to hydrate from AsyncStorage
  useEffect(() => {
    const unsubscribe = useOTPStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // If already hydrated, set immediately
    if (useOTPStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  return (
    <GluestackUIProvider>
      <RenderIf
        condition={isHydrated}
        fallback={
          <Center className="flex-1">
            <ActivityIndicator size="large" color="#0000ff" />
          </Center>
        }
      >
        <KeyboardWrapper>
          <AppNavigator />
        </KeyboardWrapper>
      </RenderIf>
      <ToastContainer />
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
