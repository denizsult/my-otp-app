import React from "react";
import { Platform, StatusBar } from "react-native";
import { KeyboardAvoidingView } from "@/components/ui/keyboard-avoiding-view";
import { ScrollView } from "@/components/ui/scroll-view";

interface KeyboardWrapperProps {
  children: React.ReactNode;
  className?: string;
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
  keyboardVerticalOffset?: number;
}

export default function KeyboardWrapper({
  children,
  className = "flex-1",
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  keyboardVerticalOffset,
}: KeyboardWrapperProps) {
  const defaultOffset = Platform.OS === "ios" ? 0 : 20;
  const offset = keyboardVerticalOffset !== undefined ? keyboardVerticalOffset : defaultOffset;

  return (
    <KeyboardAvoidingView
      className={className}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={offset}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={[
          { flexGrow: 1 },
          contentContainerStyle
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        bounces={false}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
