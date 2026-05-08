'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

/**
 * CoinAnimationRenderer - Animated SOL coin cascade
 */
export const CoinAnimationRenderer: React.FC<{ amount: number }> = ({ amount }) => {
  const coinCount = Math.min(Math.ceil(amount / 10), 30);

  return (
    <>
      <style>{`
        @keyframes coinFall {
          from {
            transform: translateY(0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
          to {
            transform: translateY(100vh) rotateZ(360deg) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
      {Array.from({ length: coinCount }, (_, i) => {
        const left = Math.random() * 100;
        const delay = (Math.random() * 0.8).toFixed(2);
        const duration = (2 + Math.random() * 1).toFixed(2);

        return (
          <Box
            key={i}
            position="fixed"
            top="-50px"
            left={`${left}%`}
            pointerEvents="none"
            zIndex={9900}
            fontSize="2xl"
            style={{
              animation: `coinFall ${duration}s ease-in ${delay}s forwards`,
            }}
          >
            ◎
          </Box>
        );
      })}
    </>
  );
};

export default CoinAnimationRenderer;
