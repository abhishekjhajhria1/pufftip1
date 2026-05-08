'use client';

import React, { useEffect } from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { NotificationRendererProps } from './types';

/**
 * NotificationToast - Floating notification in corner
 */
export const NotificationToast: React.FC<NotificationRendererProps> = ({ tip, duration, onDismiss }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
      <Box
        position="fixed"
        top={4}
        right={4}
        zIndex={9999}
        style={{
          animation: isVisible ? 'slideIn 0.3s ease-out' : 'fadeOut 0.3s ease-out',
        }}
      >
        <Box
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          borderRadius="lg"
          padding={4}
          boxShadow="0 10px 25px rgba(0,0,0,0.2)"
          minW="300px"
        >
          <VStack align="start" gap={2}>
            <HStack justify="space-between" width="100%">
              <Text fontWeight="bold" color="white" fontSize="md">
                {tip.donorName}
              </Text>
              <Text fontWeight="bold" color="yellow.200" fontSize="lg">
                ◎ {tip.amount.toFixed(2)}
              </Text>
            </HStack>

            {tip.message && (
              <Text color="white" fontSize="sm" fontStyle="italic">
                {`"${tip.message}"`}
              </Text>
            )}

            <Button
              size="xs"
              variant="ghost"
              color="white"
              onClick={() => {
                setIsVisible(false);
                setTimeout(onDismiss, 300);
              }}
            >
              Dismiss
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default NotificationToast;
