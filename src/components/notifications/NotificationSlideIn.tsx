/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect } from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';
import { NotificationRendererProps } from './types';

/**
 * NotificationSlideIn - Slides in from left with flourish
 */
export const NotificationSlideIn: React.FC<NotificationRendererProps> = ({ tip, duration, onDismiss }) => {
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
        @keyframes slideInLeft {
          from {
            transform: translateX(-500px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <Box
        position="fixed"
        bottom={8}
        left={-4}
        zIndex={9999}
        style={{ animation: 'slideInLeft 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
      >
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="0 20px 40px rgba(102, 126, 234, 0.4)"
          minW="320px"
          maxW="380px"
          border="2px solid"
          borderColor="purple.200"
        >
          <VStack gap={0} align="stretch">
            {/* Header */}
            <Box
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              padding={4}
              borderTopRadius="lg"
              color="white"
            >
              <HStack justify="space-between" align="flex-start">
                <VStack align="start" gap={1} flex={1}>
                  <Text fontWeight="bold" fontSize="lg">
                    💰 New Tip!
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    ◎ {tip.amount.toFixed(2)}
                  </Text>
                </VStack>
                <Text fontSize="4xl" opacity={0.9}>
                  ✨
                </Text>
              </HStack>
            </Box>

            {/* Body */}
            <VStack padding={4} gap={3} align="start" width="100%">
              {/* Donor info */}
              <HStack gap={3} width="100%">
                {tip.avatar && (
                  <img
                    src={tip.avatar}
                    alt={tip.donorName}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <VStack align="start" gap={0}>
                  <Text fontWeight="bold" color="gray.800">
                    {tip.donorName}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(tip.timestamp).toLocaleTimeString()}
                  </Text>
                </VStack>
              </HStack>

              {/* Message */}
              {tip.message && (
                <Box width="100%" bg="gray.50" padding={3} borderRadius="md">
                  <Text fontSize="sm" color="gray.700">
                    {tip.message}
                  </Text>
                </Box>
              )}

              {/* Action button */}
              <Button
                width="100%"
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                fontWeight="bold"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onDismiss, 300);
                }}
              >
                👋 Thanks!
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default NotificationSlideIn;
