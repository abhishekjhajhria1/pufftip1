// src/themes/ThemeVisuals/CandyScene.tsx
import { motion } from "framer-motion";

export default function CandyScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        // background: "linear-gradient(135deg, #f787ba 60%, #f9adc3 100%)",
        overflow: "hidden"
      }}
    >
      {/* Candy pastel gradient background image */}
      <motion.img
        src="/candy_bg.png"
        alt="Candy Pastels"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.52
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.1, ease: "easeOut" }}
      />

      {/* Animated floating bubbles (like candy confetti) */}
      <motion.div
        style={{
          position: "absolute",
          left: "15%",
          top: "20%",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(250,170,225,0.55)",
          filter: "blur(2px)",
        }}
        animate={{
          y: [0, 32, 0],
          x: [0, 4, 0],
          opacity: [0.55, 0.29, 0.55]
        }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "78%",
          top: "37%",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#feebf7",
          filter: "blur(1.2px)",
          border: "2px solid #f787ba"
        }}
        animate={{
          y: [0, -26, 0],
          opacity: [0.76, 0.43, 0.76]
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      {/* Add more bubbles, sprinkle SVGs, candy stickers, etc, for extra pop */}
    </motion.div>
  );
}
