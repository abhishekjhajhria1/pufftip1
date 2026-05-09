'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Tip, ContentStyle } from './types';
import { Box, VStack, HStack, Text } from '@chakra-ui/react';

/**
 * SimpleContentRenderer - Minimal text-only display
 * Just name, amount, brief message
 */
export const SimpleContentRenderer: React.FC<{ tip: Tip }> = ({ tip }) => (
  <VStack align="start" gap={1}>
    <Text fontWeight="bold">{tip.donorName}</Text>
    <Text fontSize="lg" fontWeight="bold">
      ◎ {tip.amount.toFixed(2)}
    </Text>
    {tip.message && <Text fontSize="sm">{tip.message}</Text>}
  </VStack>
);

/**
 * RichContentRenderer - Full card with avatar and details
 */
export const RichContentRenderer: React.FC<{ tip: Tip }> = ({ tip }) => (
    <HStack gap={4} width="100%">
      {tip.avatar && (
        <img
          src={tip.avatar}
          alt={tip.donorName}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      )}
    <VStack align="start" gap={1} flex={1}>
      <HStack justify="space-between" width="100%">
        <Text fontWeight="bold">{tip.donorName}</Text>
        <Text fontWeight="bold" color="yellow.200">
          ◎ {tip.amount.toFixed(2)}
        </Text>
      </HStack>
      {tip.message && <Text fontSize="sm">{tip.message}</Text>}
      <Text fontSize="xs" opacity={0.7}>
        {new Date(tip.timestamp).toLocaleTimeString()}
      </Text>
    </VStack>
  </HStack>
);

/**
 * LuxeContentRenderer - Premium appearance with gradient and enhanced styling
 */
export const LuxeContentRenderer: React.FC<{ tip: Tip }> = ({ tip }) => (
  <Box width="100%">
    <HStack gap={4} marginBottom={3}>
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
      <VStack align="start" gap={0} flex={1}>
        <Text fontWeight="bold" fontSize="lg">
          ✨ {tip.donorName}
        </Text>
        <Text
          fontWeight="bold"
          fontSize="lg"
          style={{
            background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline'
          }}
        >
          ◎ {tip.amount.toFixed(2)} SOL
        </Text>
      </VStack>
    </HStack>
    {tip.message && (
      <Box bg="rgba(255,255,255,0.1)" padding={2} borderRadius="md" backdropFilter="blur(10px)">
        <Text fontSize="sm" fontStyle="italic">
          {`"${tip.message}"`}
        </Text>
      </Box>
    )}
  </Box>
);

/**
 * ContentRendererFactory - Get appropriate renderer for style
 *
 * @param style - The content style to render
 * @param tip - The tip data
 * @returns Rendered content component
 */
export function getContentRenderer(style: ContentStyle, tip: Tip): React.ReactNode {
  switch (style) {
    case 'simple':
      return <SimpleContentRenderer tip={tip} />;
    case 'rich':
      return <RichContentRenderer tip={tip} />;
    case 'confetti':
      return <SimpleContentRenderer tip={tip} />;
    case 'coin':
      return <RichContentRenderer tip={tip} />;
    case 'all':
      return <LuxeContentRenderer tip={tip} />;
    default:
      return <SimpleContentRenderer tip={tip} />;
  }
}

const ContentRenderers = { SimpleContentRenderer, RichContentRenderer, LuxeContentRenderer, getContentRenderer };

export default ContentRenderers;
