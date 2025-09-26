import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useApiConfigStore } from "../stores/apiConfigStore";
import { useCustomToast } from "../hooks/useCustomToast";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RenderIf } from "../components/RenderIf";
import { RootStackParamList } from "../navigation/AppNavigator";

type ApiConfigScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ApiConfig"
>;

export default function ApiConfigScreen() {
  const navigation = useNavigation<ApiConfigScreenNavigationProp>();
  const toast = useCustomToast();
  const { apiKey, apiSecret, setApiKey, setApiSecret, setConfigured, reset } =
    useApiConfigStore();
  
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localApiSecret, setLocalApiSecret] = useState(apiSecret);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!localApiKey.trim() || !localApiSecret.trim()) {
      toast.error("Error", "Please enter both API Key and API Secret");
      return;
    }

    setIsLoading(true);
    try {
      // Save to store
      setApiKey(localApiKey.trim());
      setApiSecret(localApiSecret.trim());
      setConfigured(true);
      
      toast.success("Success", "API configuration saved successfully");
      
      // Navigate to Phone screen
      navigation.navigate("Phone");
    } catch (error) {
      toast.error("Error", "Failed to save API configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    reset();
    setLocalApiKey("");
    setLocalApiSecret("");
    toast.success("Success", "API configuration cleared successfully");
  };


  return (
    <Box className="flex-1 bg-background-0 justify-center p-6">
      <Center>
        <Card
          className="max-w-96 w-full bg-white rounded-xl shadow-lg p-6"
          size="lg"
          variant="elevated"
        >
          <VStack space="lg">
            {/* Header Section */}
            <VStack space="md" className="items-center">
              <Heading size="xl" className="text-typography-900 text-center">
                API Configuration
              </Heading>
              <Text className="text-typography-600 text-center text-sm">
                Please enter your Vonage API credentials to use the OTP service
              </Text>
            </VStack>

            {/* Content Section */}
            <VStack space="lg">
              <VStack space="sm">
                <Text className="text-typography-700 text-sm font-medium">
                  API Key
                </Text>
                <Input>
                  <InputField
                    placeholder="Enter your Vonage API Key"
                    value={localApiKey}
                    onChangeText={setLocalApiKey}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </Input>
              </VStack>

              <VStack space="sm">
                <Text className="text-typography-700 text-sm font-medium">
                  API Secret
                </Text>
                <Input>
                  <InputField
                    placeholder="Enter your Vonage API Secret"
                    value={localApiSecret}
                    onChangeText={setLocalApiSecret}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                  />
                </Input>
              </VStack>

              <Text size="xs" className="text-center text-gray-500">
                Your credentials will be stored securely on your device and used
                to authenticate with the Vonage API.
              </Text>

              <VStack space="sm">
                <Button
                  size="lg"
                  action=""
                  variant="solid"
                  className="!bg-gray-200 border-gray-200 rounded-lg"
                  onPress={handleSave}
                  disabled={!localApiKey.trim() || !localApiSecret.trim() || isLoading}
                >
                  <RenderIf
                    condition={isLoading}
                    fallback={
                      <ButtonText className="text-black">
                        SAVE CONFIGURATION
                      </ButtonText>
                    }
                  >
                    <HStack space="sm" className="items-center">
                      <Spinner size="small" color="white" />
                      <ButtonText>Saving...</ButtonText>
                    </HStack>
                  </RenderIf>
                </Button>

                <Button
                  size="md"
                  variant="outline"
                  action="secondary"
                  className="!border-red-300 !bg-red-50"
                  onPress={handleClear}
                  disabled={isLoading}
                >
                  <ButtonText className="text-red-600">
                    CLEAR CONFIGURATION
                  </ButtonText>
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
