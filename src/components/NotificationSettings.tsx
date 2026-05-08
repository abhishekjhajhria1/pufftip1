'use client';

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Heading,
} from '@chakra-ui/react';
import { useNotificationSettings } from '../hooks/useNotificationSettings';
import { useNotificationAudio, BUILT_IN_SOUNDS, SoundType } from '../hooks/useNotificationAudio';

interface NotificationSettingsProps {
  creatorId?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NotificationSettings - Simple settings panel (Phase 5)
 * Allows customization of notification types, styles, audio, and timing
 */
export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ creatorId, isOpen, onClose }) => {
  const { preferences, updatePreferences } = useNotificationSettings(creatorId);
  const { volume, changeVolume, play } = useNotificationAudio(creatorId);
  const [newTier, setNewTier] = useState({ minAmount: 50, durationMs: 10000 });

  const handleTypeToggle = (type: 'toast' | 'modal' | 'banner' | 'slide-in') => {
    const newTypes = preferences.types.includes(type) ? preferences.types.filter((t) => t !== type) : [...preferences.types, type];
    updatePreferences({ types: newTypes });
  };

  const handleAddTier = () => {
    if (newTier.minAmount >= 0) {
      const updatedTiers = [...preferences.autoDismissTiers, newTier].sort((a, b) => b.minAmount - a.minAmount);
      updatePreferences({ autoDismissTiers: updatedTiers });
      setNewTier({ minAmount: 50, durationMs: 10000 });
    }
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
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="lg"
        maxW="500px"
        maxH="85vh"
        overflow="auto"
        padding={6}
        onClick={(e) => e.stopPropagation()}
        boxShadow="0 25px 50px rgba(0,0,0,0.3)"
      >
        <HStack justify="space-between" marginBottom={4}>
          <Heading size="md">🎵 Notifications</Heading>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </HStack>

        <VStack align="start" gap={4}>
          {/* Enable/Disable */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Master Control</Text>
            <Button
              width="100%"
              colorScheme={preferences.enabled ? 'green' : 'gray'}
              onClick={() => updatePreferences({ enabled: !preferences.enabled })}
            >
              {preferences.enabled ? '✓ Enabled' : '✗ Disabled'}
            </Button>
          </Box>

          {/* Notification Types */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Notification Types</Text>
            {(['toast', 'modal', 'banner', 'slide-in'] as const).map((type) => (
              <Button
                key={type}
                width="100%"
                marginBottom={1}
                variant={preferences.types.includes(type) ? 'solid' : 'outline'}
                colorScheme={preferences.types.includes(type) ? 'purple' : undefined}
                onClick={() => handleTypeToggle(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} {preferences.types.includes(type) ? '✓' : '○'}
              </Button>
            ))}
          </Box>

          {/* Content Style */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Content Style</Text>
            {(['simple', 'rich', 'confetti', 'coin', 'all'] as const).map((style) => (
              <Button
                key={style}
                width="100%"
                marginBottom={1}
                variant={preferences.contentStyle === style ? 'solid' : 'outline'}
                colorScheme={preferences.contentStyle === style ? 'purple' : undefined}
                onClick={() => updatePreferences({ contentStyle: style })}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)} {preferences.contentStyle === style ? '✓' : '○'}
              </Button>
            ))}
          </Box>

          {/* Audio */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Audio Volume: {volume}%</Text>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => changeVolume(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <Button marginTop={2} width="100%" onClick={() => play()}>
              🔊 Test Sound
            </Button>
          </Box>

          {/* Stacking Mode */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Multiple Tips</Text>
            {(['stack', 'replace', 'queue'] as const).map((mode) => (
              <Button
                key={mode}
                width="100%"
                marginBottom={1}
                variant={preferences.stackingMode === mode ? 'solid' : 'outline'}
                colorScheme={preferences.stackingMode === mode ? 'purple' : undefined}
                onClick={() => updatePreferences({ stackingMode: mode })}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)} {preferences.stackingMode === mode ? '✓' : '○'}
              </Button>
            ))}
          </Box>

          {/* Duration Tiers */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Duration Tiers</Text>
            {preferences.autoDismissTiers
              .sort((a, b) => b.minAmount - a.minAmount)
              .map((tier) => (
                <HStack key={tier.minAmount} gap={2} marginBottom={1}>
                  <Text flex={1}>≥ ◎{tier.minAmount}: {(tier.durationMs / 1000).toFixed(1)}s</Text>
                  <Button size="sm" onClick={() => updatePreferences({
                    autoDismissTiers: preferences.autoDismissTiers.filter((t) => t.minAmount !== tier.minAmount),
                  })}>
                    -
                  </Button>
                </HStack>
              ))}
            <HStack gap={2} marginTop={2}>
              <Input
                type="number"
                placeholder="Amount"
                value={newTier.minAmount}
                onChange={(e) => setNewTier({ ...newTier, minAmount: parseFloat(e.target.value) })}
                width="80px"
              />
              <Input
                type="number"
                placeholder="Ms"
                value={newTier.durationMs}
                onChange={(e) => setNewTier({ ...newTier, durationMs: parseInt(e.target.value) })}
                width="100px"
              />
              <Button onClick={handleAddTier}>+</Button>
            </HStack>
          </Box>

          {/* Max on Screen */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2}>Max Notifications: {preferences.maxOnScreen}</Text>
            <input
              type="range"
              min="1"
              max="10"
              value={preferences.maxOnScreen}
              onChange={(e) => updatePreferences({ maxOnScreen: parseInt(e.target.value) })}
              style={{ width: '100%' }}
            />
          </Box>
        </VStack>

        <HStack gap={3} marginTop={6} justify="flex-end">
          <Button onClick={onClose}>Close</Button>
          <Button bg="purple.500" color="white" onClick={onClose}>Done</Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default NotificationSettings;
