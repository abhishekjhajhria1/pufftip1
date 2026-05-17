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
        className="paper-card"
        maxW="500px"
        maxH="85vh"
        overflow="auto"
        padding={6}
        onClick={(e) => e.stopPropagation()}
        mx={4}
        bg="brand.paper"
      >
        <HStack justify="space-between" marginBottom={4}>
          <Heading size="md" color="brand.ink" fontFamily="heading">
            🎵 Notifications
          </Heading>
          <Button
            variant="ghost"
            color="brand.inkSoft"
            _hover={{ color: "brand.ink", bg: "brand.markerYellow" }}
            onClick={onClose}
            fontFamily="heading"
            fontSize="xl"
          >
            ✕
          </Button>
        </HStack>

        <VStack align="start" gap={5}>
          {/* Enable/Disable */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Master Control
            </Text>
            <Button
              width="100%"
              bg={preferences.enabled ? 'brand.markerGreen' : 'transparent'}
              color="brand.ink"
              border={preferences.enabled ? '2px solid #1B1B1B' : '2px dashed #1B1B1B'}
              _hover={{ bg: preferences.enabled ? 'brand.markerGreen' : 'brand.paperDeep' }}
              onClick={() => updatePreferences({ enabled: !preferences.enabled })}
              borderRadius="md"
              fontFamily="heading"
              fontSize="lg"
            >
              {preferences.enabled ? '✓ Enabled' : '✗ Disabled'}
            </Button>
          </Box>

          {/* Notification Types */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Notification Types
            </Text>
            <VStack gap={1} align="stretch">
              {(['toast', 'modal', 'banner', 'slide-in'] as const).map((type) => {
                const isActive = preferences.types.includes(type);
                return (
                  <Button
                    key={type}
                    width="100%"
                    bg={isActive ? 'brand.markerYellow' : 'transparent'}
                    color="brand.ink"
                    border={isActive ? '2px solid #1B1B1B' : '2px dashed #4A4A4A'}
                    _hover={{ bg: isActive ? 'brand.markerYellow' : 'brand.paperDeep', transform: "rotate(calc(var(--theme-rot-1) / 4))" }}
                    onClick={() => handleTypeToggle(type)}
                    borderRadius="md"
                    justifyContent="space-between"
                    fontFamily="body"
                    fontWeight="bold"
                  >
                    <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    <Text fontFamily="heading" fontSize="xl">{isActive ? '✓' : '○'}</Text>
                  </Button>
                );
              })}
            </VStack>
          </Box>

          {/* Content Style */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Content Style
            </Text>
            <VStack gap={1} align="stretch">
              {(['simple', 'rich', 'confetti', 'coin', 'all'] as const).map((style) => {
                const isActive = preferences.contentStyle === style;
                return (
                  <Button
                    key={style}
                    width="100%"
                    bg={isActive ? 'brand.markerPink' : 'transparent'}
                    color="brand.ink"
                    border={isActive ? '2px solid #1B1B1B' : '2px dashed #4A4A4A'}
                    _hover={{ bg: isActive ? 'brand.markerPink' : 'brand.paperDeep', transform: "rotate(calc(var(--theme-rot-2) / 3))" }}
                    onClick={() => updatePreferences({ contentStyle: style })}
                    borderRadius="md"
                    justifyContent="space-between"
                    fontFamily="body"
                    fontWeight="bold"
                  >
                    <Text>{style.charAt(0).toUpperCase() + style.slice(1)}</Text>
                    <Text fontFamily="heading" fontSize="xl">{isActive ? '✓' : '○'}</Text>
                  </Button>
                );
              })}
            </VStack>
          </Box>

          {/* Audio */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Audio Volume: {volume}%
            </Text>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => changeVolume(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#FF0105' }}
            />
            <Button
              marginTop={2}
              width="100%"
              variant="outline"
              borderColor="brand.ink"
              color="brand.ink"
              _hover={{ bg: 'brand.paperDeep', transform: "rotate(var(--theme-rot-1))" }}
              onClick={() => play()}
              borderRadius="md"
              fontFamily="heading"
              fontSize="lg"
            >
              🔊 Test Sound
            </Button>
          </Box>

          {/* Sound Selection */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Sound: {getCurrentSoundName()}
            </Text>
            <VStack align="stretch" gap={1}>
              {builtInSoundEntries.map(([type, sound]) => {
                const isActive = soundType === type;
                return (
                  <Button
                    key={type}
                    bg={isActive ? 'brand.cyan' : 'transparent'}
                    color="brand.ink"
                    border={isActive ? '2px solid #1B1B1B' : '2px dashed #4A4A4A'}
                    _hover={{ bg: isActive ? 'brand.cyan' : 'brand.paperDeep' }}
                    onClick={() => changeSoundType(type)}
                    borderRadius="md"
                    fontFamily="body"
                    fontWeight="bold"
                  >
                    {sound.name}
                  </Button>
                );
              })}
              <Button
                bg={isMuted ? 'brand.markerRed' : 'transparent'}
                color={isMuted ? 'brand.paper' : 'brand.ink'}
                border={isMuted ? '2px solid #1B1B1B' : '2px dashed #1B1B1B'}
                _hover={{ bg: isMuted ? 'brand.markerRed' : 'brand.paperDeep' }}
                onClick={toggleMute}
                borderRadius="md"
                fontFamily="heading"
                fontSize="lg"
              >
                {isMuted ? '🔇 Unmute' : '🔊 Mute'}
              </Button>
            </VStack>
          </Box>

          {/* Stacking Mode */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Multiple Tips
            </Text>
            <VStack gap={1} align="stretch">
              {(['stack', 'replace', 'queue'] as const).map((mode) => {
                const isActive = preferences.stackingMode === mode;
                return (
                  <Button
                    key={mode}
                    width="100%"
                    bg={isActive ? 'brand.markerYellow' : 'transparent'}
                    color="brand.ink"
                    border={isActive ? '2px solid #1B1B1B' : '2px dashed #4A4A4A'}
                    _hover={{ bg: isActive ? 'brand.markerYellow' : 'brand.paperDeep', transform: "rotate(var(--theme-rot-2))" }}
                    onClick={() => updatePreferences({ stackingMode: mode })}
                    borderRadius="md"
                    justifyContent="space-between"
                    fontFamily="body"
                    fontWeight="bold"
                  >
                    <Text>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
                    <Text fontFamily="heading" fontSize="xl">{isActive ? '✓' : '○'}</Text>
                  </Button>
                );
              })}
            </VStack>
          </Box>

          {/* Duration Tiers */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
              Duration Tiers
            </Text>
            {preferences.autoDismissTiers
              .sort((a, b) => b.minAmount - a.minAmount)
              .map((tier) => (
                <HStack key={tier.minAmount} gap={2} marginBottom={1}>
                  <Text flex={1} fontSize="sm" color="brand.inkSoft" fontFamily="body">
                    ≥ ◎{tier.minAmount}: {(tier.durationMs / 1000).toFixed(1)}s
                  </Text>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="brand.inkSoft"
                    _hover={{ color: "brand.markerRed", bg: "brand.paperDeep" }}
                    onClick={() =>
                      updatePreferences({
                        autoDismissTiers: preferences.autoDismissTiers.filter(
                          (t) => t.minAmount !== tier.minAmount
                        ),
                      })
                    }
                    fontFamily="heading"
                    fontSize="xl"
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
                borderColor="brand.ink"
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
                borderColor="brand.ink"
              />
              <Button
                size="sm"
                variant="outline"
                borderColor="brand.ink"
                color="brand.ink"
                _hover={{ bg: "brand.markerYellow" }}
                onClick={handleAddTier}
                borderRadius="md"
                fontFamily="heading"
                fontSize="xl"
              >
                +
              </Button>
            </HStack>
          </Box>

          {/* Max on Screen */}
          <Box width="100%">
            <Text fontWeight="bold" marginBottom={2} fontSize="sm" color="brand.ink" fontFamily="body">
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
              style={{ width: '100%', accentColor: '#FF0105' }}
            />
          </Box>
        </VStack>

        <HStack gap={3} marginTop={6} justify="flex-end">
          <Button
            variant="ghost"
            color="brand.inkSoft"
            _hover={{ color: "brand.ink", bg: "brand.paperDeep" }}
            onClick={onClose}
            borderRadius="md"
            fontFamily="body"
          >
            Cancel
          </Button>
          <Button
            bg="brand.ink"
            color="brand.paper"
            _hover={{ transform: "rotate(var(--theme-rot-1))" }}
            onClick={onClose}
            borderRadius="md"
            className="shadow-sticker"
            fontFamily="heading"
            fontSize="xl"
          >
            Done
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default NotificationSettings;
