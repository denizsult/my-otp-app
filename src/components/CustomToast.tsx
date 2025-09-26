import React from 'react';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { useToastStore, ToastMessage } from '../stores/toastStore';

interface CustomToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const getToastStyles = (type: ToastMessage['type']) => {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-400',
        borderColor: 'border-green-600',
        icon: '✓',
      };
    case 'error':
      return {
        bgColor: 'bg-red-400',
        borderColor: 'border-red-600',
        icon: '✕',
      };
    case 'warning':
      return {
        bgColor: 'bg-yellow-400',
        borderColor: 'border-yellow-600',
        icon: '⚠',
      };
    case 'info':
      return {
        bgColor: 'bg-blue-400',
        borderColor: 'border-blue-600',
        icon: 'ℹ',
      };
    default:
      return {
        bgColor: 'bg-gray-400',
        borderColor: 'border-gray-600',
        icon: 'ℹ',
      };
  }
};

export const CustomToast: React.FC<CustomToastProps> = ({ toast, onClose }) => {
  const styles = getToastStyles(toast.type);

  return (
    <Pressable onPress={() => onClose(toast.id)}>
      <Card 
        className={`${styles.bgColor} ${styles.borderColor} p-4 rounded-lg shadow-lg border-1 min-w-80 max-w-96`}
      >
        <VStack space="xs">
          <Box className="flex-row items-center gap-2">
            <Text className="text-white text-lg font-bold">
              {styles.icon}
            </Text>
            <Text className="text-white font-bold text-lg flex-1">
              {toast.title}
            </Text>
            <Pressable onPress={() => onClose(toast.id)}>
              <Text className="text-white text-lg font-bold">×</Text>
            </Pressable>
          </Box>
          {toast.description && (
            <Text className="text-white text-sm ml-6">
              {toast.description}
            </Text>
          )}
        </VStack>
      </Card>
    </Pressable>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <Box className="absolute top-16 left-4 right-4 z-50">
      <VStack space="sm">
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            toast={toast}
            onClose={hideToast}
          />
        ))}
      </VStack>
    </Box>
  );
};
