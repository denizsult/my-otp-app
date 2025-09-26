import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useOTPStore } from "../stores/otpStore";

type SuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Success'>;

export default function SuccessScreen() {
  const navigation = useNavigation<SuccessScreenNavigationProp>();
  const { phoneNumber, reset } = useOTPStore();
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
              <Box className="bg-green-500 p-4 rounded-full">
                <Text className="text-white text-2xl font-bold">✅</Text>
              </Box>
              <Heading size="xl" className="text-typography-900 text-center">
                Verification Successful!
              </Heading>
              <Text className="text-typography-600 text-center text-sm">
                {phoneNumber} number has been successfully verified
              </Text>
            </VStack>

            {/* Content Section */}
            <VStack space="lg">
              <VStack space="md">
                <Button
                  className="bg-secondary-500 border-secondary-500 text-typography-0"
                  size="lg"
                  action="positive"
                  variant="solid"
                  onPress={() => {
                    reset();
                    navigation.navigate('Phone');
                  }}
                >
                  <ButtonText className="text-black">Verify Another Number</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
