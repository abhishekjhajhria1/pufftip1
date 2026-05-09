/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { NotificationRendererProps } from './types';

/**
 * NotificationModal - Centered modal dialog
 */
export const NotificationModal: React.FC<NotificationRendererProps> = ({ tip, onDismiss }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onDismiss, 200);
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,0.5)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={handleClose}
    >
      <Box
        bg="white"
        boxShadow="0 20px 60px rgba(0,0,0,0.3)"
        borderRadius="xl"
        overflow="hidden"
        maxW="400px"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" padding={6} color="white">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={2}>
            💝 New Tip Received!
          </Text>
        </Box>

        {/* Content */}
        <VStack padding={6} gap={4} align="start" width="100%">
          {/* Donor info */}
          <HStack gap={4} width="100%">
            {tip.avatar && (
              <img
                src={tip.avatar}
                alt={tip.donorName}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            )}
            <VStack align="start" gap={0}>
              <Text fontWeight="bold" fontSize="lg">
                {tip.donorName}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {new Date(tip.timestamp).toLocaleTimeString()}
              </Text>
            </VStack>
          </HStack>

          {/* Amount highlight */}
          <Box
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            padding={4}
            borderRadius="lg"
            width="100%"
            textAlign="center"
          >
            <Text fontSize="sm" opacity={0.9}>
              Tip Amount
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              ◎ {tip.amount.toFixed(2)}
            </Text>
          </Box>

          {/* Message */}
          {tip.message && (
            <Box width="100%" bg="gray.50" padding={3} borderRadius="md" borderLeft="4px" borderColor="purple.500">
              <Text fontSize="sm" color="gray.600" fontStyle="italic">
                {`"${tip.message}"`}
              </Text>
            </Box>
          )}

          {/* Stats footer */}
          <Text fontSize="xs" color="gray.400" width="100%">
            Tip ID: {tip.id.substring(0, 8)}...
          </Text>
        </VStack>

        {/* Footer */}
        <HStack padding={4} gap={3} justify="flex-end" borderTopWidth="1px">
          <Button variant="ghost" onClick={handleClose}>
            Dismiss
          </Button>
          <Button bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" color="white" onClick={handleClose}>
            Thanks!
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default NotificationModal;
