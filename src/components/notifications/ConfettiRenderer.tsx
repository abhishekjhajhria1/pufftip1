'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';

/**
 * ConfettiRenderer - Animated confetti particles
 */
export const ConfettiRenderer: React.FC = () => {
  const confetti = Array.from({ length: 50 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = 2.5 + Math.random() * 0.5;
    const hue = Math.random() * 360;

    return (
      <Box
        key={i}
        position="fixed"
        width="10px"
        height="10px"
        top="-10px"
        left={`${left}%`}
        pointerEvents="none"
        zIndex={9900}
        bg={`hsl(${hue}, 100%, 50%)`}
        borderRadius="50%"
        style={{
          animation: `fall ${duration}s linear ${delay}s forwards`,
        }}
      />
    );
  });

  return (
    <>
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {confetti}
    </>
  );
};

export default ConfettiRenderer;
