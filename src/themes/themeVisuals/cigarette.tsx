// src/themes/ThemeVisuals/CigaretteScene.tsx
import { motion } from "framer-motion";

export default function CigaretteScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: "linear-gradient(180deg, #1a1a1b 65%, #f3ae6d 100%)"
      }}
    >
      {/* Background image or illustration */}
      <motion.img
        src="/cigarette_bg.png"
        alt="Cigarette Lounge"
        style={{
          width: "100%", height: "100%", objectFit: "cover", opacity: 0.55, filter: "blur(1px)"
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Smoky animated overlay using framer */}
      <motion.div
        style={{
          position: "absolute", top: "10%", left: "15%",
          width: 250, height: 80, background: "rgba(239,235,229,0.26)",
          borderRadius: 48, filter: "blur(8px)", zIndex: 2
        }}
        animate={{
          x: [0, 30, -20, 0], opacity: [0.48, 0.56, 0.48, 0.4]
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      {/* Add SVGs or more animated “smoke”/sparkle elements if you like */}
    </motion.div>
  );
}
