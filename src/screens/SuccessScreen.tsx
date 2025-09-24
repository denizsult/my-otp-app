import React from 'react';
import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';

interface SuccessScreenProps {
  phoneNumber: string;
  onStartOver: () => void;
}

export default function SuccessScreen({ phoneNumber, onStartOver }: SuccessScreenProps) {
  return (
    <Box className="flex-1 bg-background-0 justify-center p-6">
      <Center>
        <Card className="max-w-96 w-full bg-white rounded-xl shadow-lg p-6" size="lg" variant="elevated">
          <VStack space="lg">
            {/* Header Section */}
            <VStack space="md" className="items-center">
              <Box className="bg-green-500 p-4 rounded-full">
                <Text className="text-white text-2xl font-bold">
                  ✅
                </Text>
              </Box>
              <Heading size="xl" className="text-typography-900 text-center">
                Verification Successful!
              </Heading>
              <Text className="text-typography-600 text-center text-sm">
                Your phone number has been successfully verified
              </Text>
            </VStack>
            
            {/* Content Section */}
            <VStack space="lg">
              <VStack space="sm" className="items-center">
                <Text className="text-typography-700 text-sm font-medium">
                  Verified Phone Number
                </Text>
                <Text className="text-primary-500 text-base font-semibold">
                  {phoneNumber}
                </Text>
              </VStack>

              <VStack space="md">
                <Button
                  size="lg"
                  action="positive"
                  variant="solid"
                  onPress={onStartOver}
                >
                  <ButtonText>VERIFY ANOTHER NUMBER</ButtonText>
                </Button>

                <VStack space="xs" className="items-center">
                  <Text className="text-typography-500 text-xs text-center">
                    You can now proceed with your account setup
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </Card>
      </Center>
    </Box>
  );
}
