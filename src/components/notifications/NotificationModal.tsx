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
 * Themed with Solana gradient accent and design token colors.
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
      bg="rgba(0,0,0,0.6)"
      backdropFilter="blur(4px)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={handleClose}
    >
      <Box
        bg="var(--theme-bg)"
        boxShadow="0 20px 60px rgba(0,0,0,0.4)"
        borderRadius="xl"
        overflow="hidden"
        maxW="400px"
        border="1.5px solid var(--theme-card-border)"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Solana gradient */}
        <Box bg="linear-gradient(135deg, #9945FF 0%, #14F195 100%)" padding={6} color="white">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={2} fontFamily="var(--theme-font-heading)">
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
              <Text fontWeight="bold" fontSize="lg" color="brand.ink" fontFamily="var(--theme-font-heading)">
                {tip.donorName}
              </Text>
              <Text color="brand.inkSoft" fontSize="sm" fontFamily="var(--theme-font-body)">
                {new Date(tip.timestamp).toLocaleTimeString()}
              </Text>
            </VStack>
          </HStack>

          {/* Amount highlight */}
          <Box
            bg="linear-gradient(135deg, #9945FF 0%, #14F195 100%)"
            color="white"
            padding={4}
            borderRadius="lg"
            width="100%"
            textAlign="center"
          >
            <Text fontSize="sm" opacity={0.9} fontFamily="var(--theme-font-body)">
              Tip Amount
            </Text>
            <Text fontSize="3xl" fontWeight="bold" fontFamily="var(--theme-font-heading)">
              ◎ {tip.amount.toFixed(2)}
            </Text>
          </Box>

          {/* Message */}
          {tip.message && (
            <Box width="100%" bg="brand.paperDeep" padding={3} borderRadius="md" borderLeft="4px solid" borderColor="brand.solana">
              <Text fontSize="sm" color="brand.ink" fontStyle="italic" fontFamily="var(--theme-font-body)">
                {`"${tip.message}"`}
              </Text>
            </Box>
          )}

          {/* Stats footer */}
          <Text fontSize="xs" color="brand.inkSoft" width="100%" fontFamily="var(--theme-font-body)">
            Tip ID: {tip.id.substring(0, 8)}...
          </Text>
        </VStack>

        {/* Footer */}
        <HStack padding={4} gap={3} justify="flex-end" borderTopWidth="1px" borderColor="var(--theme-card-border)">
          <Button variant="ghost" onClick={handleClose} color="brand.ink" fontFamily="var(--theme-font-body)">
            Dismiss
          </Button>
          <Button bg="linear-gradient(135deg, #9945FF 0%, #14F195 100%)" color="white" fontFamily="var(--theme-font-heading)" _hover={{ opacity: 0.9 }} onClick={handleClose}>
            Thanks!
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default NotificationModal;
