'use client';

/**
 * NotificationSettings — Dark-themed Settings Panel
 *
 * Allows customization of notification types, styles, audio, and timing.
 * Settings persist to localStorage via useNotificationSettings hook.
 *
 * Rendered as a modal overlay on the user profile page.
 */

import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Button, Input, Heading } from '@chakra-ui/react';
import { useNotificationSettings } from '../hooks/useNotificationSettings';
import { useNotificationAudio, BUILT_IN_SOUNDS } from '../hooks/useNotificationAudio';

interface NotificationSettingsProps {
  creatorId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  creatorId,
  isOpen,
  onClose,
}) => {
  const { preferences, updatePreferences } = useNotificationSettings(creatorId);
  const {
    volume,
    changeVolume,
    play,
    soundType,
    changeSoundType,
    toggleMute,
    isMuted,
    getCurrentSoundName,
  } = useNotificationAudio(creatorId);
  const [newTier, setNewTier] = useState({ minAmount: 50, durationMs: 10000 });
  const builtInSoundEntries = Object.entries(BUILT_IN_SOUNDS) as Array<
    [keyof typeof BUILT_IN_SOUNDS, (typeof BUILT_IN_SOUNDS)[keyof typeof BUILT_IN_SOUNDS]]
  >;

  const handleTypeToggle = (type: 'toast' | 'modal' | 'banner' | 'slide-in') => {
    const newTypes = preferences.types.includes(type)
      ? preferences.types.filter((t) => t !== type)
      : [...preferences.types, type];
    updatePreferences({ types: newTypes });
  };

  const handleAddTier = () => {
    if (newTier.minAmount >= 0) {
      const updatedTiers = [...preferences.autoDismissTiers, newTier].sort(
        (a, b) => b.minAmount - a.minAmount
      );
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
      bg="rgba(0, 0, 0, 0.7)"
      backdropFilter="blur(8px)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        className="glass-strong"
        maxW="500px"
        maxH="85vh"
        overflow="auto"
        padding={6}
        onClick={(e) => e.stopPropagation()}
        mx={4}
      >
        <HStack justify="space-between" marginBottom={4}>
          <Heading size="md" color="white" fontFamily="'Fredoka', sans-serif">
            🎵 Notifications
          </Heading>
          <Button
            variant="ghost"
            color="whiteAlpha.500"
            _hover={{ color: "white", bg: "whiteAlpha.100" }}
            onClick={onClose}
          >
            ✕
          </Button>
        </HStack>

        <VStack align="start" gap={5}>
          {/* Enable/Disable */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Master Control
            </Text>
            <Button
              width="100%"
              bg={preferences.enabled ? 'rgba(34, 197, 94, 0.15)' : 'whiteAlpha.50'}
              color={preferences.enabled ? 'green.300' : 'whiteAlpha.500'}
              border="1px solid"
              borderColor={preferences.enabled ? 'rgba(34, 197, 94, 0.2)' : 'whiteAlpha.100'}
              _hover={{ bg: preferences.enabled ? 'rgba(34, 197, 94, 0.2)' : 'whiteAlpha.100' }}
              onClick={() => updatePreferences({ enabled: !preferences.enabled })}
              borderRadius="xl"
            >
              {preferences.enabled ? '✓ Enabled' : '✗ Disabled'}
            </Button>
          </Box>

          {/* Notification Types */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Notification Types
            </Text>
            <VStack gap={1} align="stretch">
              {(['toast', 'modal', 'banner', 'slide-in'] as const).map((type) => {
                const isActive = preferences.types.includes(type);
                return (
                  <Button
                    key={type}
                    width="100%"
                    bg={isActive ? 'rgba(121, 40, 202, 0.15)' : 'transparent'}
                    color={isActive ? 'purple.300' : 'whiteAlpha.500'}
                    border="1px solid"
                    borderColor={isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100'}
                    _hover={{ bg: isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100' }}
                    onClick={() => handleTypeToggle(type)}
                    borderRadius="lg"
                    justifyContent="space-between"
                  >
                    <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    <Text>{isActive ? '✓' : '○'}</Text>
                  </Button>
                );
              })}
            </VStack>
          </Box>

          {/* Content Style */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Content Style
            </Text>
            <VStack gap={1} align="stretch">
              {(['simple', 'rich', 'confetti', 'coin', 'all'] as const).map((style) => {
                const isActive = preferences.contentStyle === style;
                return (
                  <Button
                    key={style}
                    width="100%"
                    bg={isActive ? 'rgba(121, 40, 202, 0.15)' : 'transparent'}
                    color={isActive ? 'purple.300' : 'whiteAlpha.500'}
                    border="1px solid"
                    borderColor={isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100'}
                    _hover={{ bg: isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100' }}
                    onClick={() => updatePreferences({ contentStyle: style })}
                    borderRadius="lg"
                    justifyContent="space-between"
                  >
                    <Text>{style.charAt(0).toUpperCase() + style.slice(1)}</Text>
                    <Text>{isActive ? '✓' : '○'}</Text>
                  </Button>
                );
              })}
            </VStack>
          </Box>

          {/* Audio */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Audio Volume: {volume}%
            </Text>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => changeVolume(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <Button
              marginTop={2}
              width="100%"
              variant="outline"
              borderColor="whiteAlpha.200"
              color="whiteAlpha.600"
              _hover={{ bg: 'whiteAlpha.100' }}
              onClick={() => play()}
              borderRadius="lg"
            >
              🔊 Test Sound
            </Button>
          </Box>

          {/* Sound Selection */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Sound: {getCurrentSoundName()}
            </Text>
            <VStack align="stretch" gap={1}>
              {builtInSoundEntries.map(([type, sound]) => {
                const isActive = soundType === type;
                return (
                  <Button
                    key={type}
                    bg={isActive ? 'rgba(121, 40, 202, 0.15)' : 'transparent'}
                    color={isActive ? 'purple.300' : 'whiteAlpha.500'}
                    border="1px solid"
                    borderColor={isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100'}
                    _hover={{ bg: isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100' }}
                    onClick={() => changeSoundType(type)}
                    borderRadius="lg"
                  >
                    {sound.name}
                  </Button>
                );
              })}
              <Button
                bg={isMuted ? 'rgba(239, 68, 68, 0.15)' : 'transparent'}
                color={isMuted ? 'red.300' : 'whiteAlpha.500'}
                border="1px solid"
                borderColor={isMuted ? 'rgba(239, 68, 68, 0.2)' : 'whiteAlpha.100'}
                _hover={{ bg: isMuted ? 'rgba(239, 68, 68, 0.2)' : 'whiteAlpha.100' }}
                onClick={toggleMute}
                borderRadius="lg"
              >
                {isMuted ? '🔇 Unmute' : '🔊 Mute'}
              </Button>
            </VStack>
          </Box>

          {/* Stacking Mode */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Multiple Tips
            </Text>
            <VStack gap={1} align="stretch">
              {(['stack', 'replace', 'queue'] as const).map((mode) => {
                const isActive = preferences.stackingMode === mode;
                return (
                  <Button
                    key={mode}
                    width="100%"
                    bg={isActive ? 'rgba(121, 40, 202, 0.15)' : 'transparent'}
                    color={isActive ? 'purple.300' : 'whiteAlpha.500'}
                    border="1px solid"
                    borderColor={isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100'}
                    _hover={{ bg: isActive ? 'rgba(121, 40, 202, 0.2)' : 'whiteAlpha.100' }}
                    onClick={() => updatePreferences({ stackingMode: mode })}
                    borderRadius="lg"
                    justifyContent="space-between"
                  >
                    <Text>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
                    <Text>{isActive ? '✓' : '○'}</Text>
                  </Button>
                );
              })}
            </VStack>
          </Box>

          {/* Duration Tiers */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Duration Tiers
            </Text>
            {preferences.autoDismissTiers
              .sort((a, b) => b.minAmount - a.minAmount)
              .map((tier) => (
                <HStack key={tier.minAmount} gap={2} marginBottom={1}>
                  <Text flex={1} fontSize="sm" color="whiteAlpha.500">
                    ≥ ◎{tier.minAmount}: {(tier.durationMs / 1000).toFixed(1)}s
                  </Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="whiteAlpha.400"
                    _hover={{ color: "red.300", bg: "whiteAlpha.100" }}
                    onClick={() =>
                      updatePreferences({
                        autoDismissTiers: preferences.autoDismissTiers.filter(
                          (t) => t.minAmount !== tier.minAmount
                        ),
                      })
                    }
                  >
                    −
                  </Button>
                </HStack>
              ))}
            <HStack gap={2} marginTop={2}>
              <Input
                type="number"
                placeholder="SOL"
                value={newTier.minAmount}
                onChange={(e) =>
                  setNewTier({ ...newTier, minAmount: parseFloat(e.target.value) })
                }
                width="80px"
                size="sm"
              />
              <Input
                type="number"
                placeholder="Ms"
                value={newTier.durationMs}
                onChange={(e) =>
                  setNewTier({ ...newTier, durationMs: parseInt(e.target.value) })
                }
                width="100px"
                size="sm"
              />
              <Button
                size="sm"
                variant="outline"
                borderColor="whiteAlpha.200"
                color="whiteAlpha.600"
                _hover={{ bg: "whiteAlpha.100" }}
                onClick={handleAddTier}
                borderRadius="lg"
              >
                +
              </Button>
            </HStack>
          </Box>

          {/* Max on Screen */}
          <Box width="100%">
            <Text fontWeight="600" marginBottom={2} fontSize="sm" color="whiteAlpha.700">
              Max Notifications: {preferences.maxOnScreen}
            </Text>
            <input
              type="range"
              min="1"
              max="10"
              value={preferences.maxOnScreen}
              onChange={(e) =>
                updatePreferences({ maxOnScreen: parseInt(e.target.value) })
              }
              style={{ width: '100%' }}
            />
          </Box>
        </VStack>

        <HStack gap={3} marginTop={6} justify="flex-end">
          <Button
            variant="ghost"
            color="whiteAlpha.500"
            _hover={{ color: "white", bg: "whiteAlpha.100" }}
            onClick={onClose}
            borderRadius="xl"
          >
            Close
          </Button>
          <Button
            bg="linear-gradient(135deg, #7928CA, #FF0080)"
            color="white"
            _hover={{ opacity: 0.9 }}
            onClick={onClose}
            borderRadius="xl"
          >
            Done
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default NotificationSettings;
