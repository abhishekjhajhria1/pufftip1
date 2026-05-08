'use client';

import React, { useEffect } from 'react';
import { Box, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { NotificationRendererProps } from './types';

/**
 * NotificationBanner - Top banner that slides down
 */
export const NotificationBanner: React.FC<NotificationRendererProps> = ({ tip, duration, onDismiss }) => {
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
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={9998}
        style={{ animation: 'slideDown 0.4s ease-out' }}
      >
        <Box
          bg="linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
          padding={4}
          textAlign="center"
          boxShadow="0 8px 20px rgba(0,0,0,0.15)"
        >
          <VStack gap={2}>
            <HStack justify="center" gap={8} wrap="wrap">
              <Text color="white" fontWeight="bold" fontSize="lg">
                🎉 {tip.donorName} sent ◎{tip.amount.toFixed(2)}!
              </Text>
              <Button
                size="sm"
                bg="rgba(255,255,255,0.2)"
                color="white"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onDismiss, 300);
                }}
              >
                Dismiss
              </Button>
            </HStack>

            {tip.message && (
              <Text color="rgba(255,255,255,0.95)" fontSize="sm">
                {`"${tip.message}"`}
              </Text>
            )}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default NotificationBanner;
