// src/themes/ProfileVisuals/CoffeeProfileScene.tsx
import { motion } from "framer-motion";

export default function CoffeeProfileScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(180deg, #5f4636 60%, #b89c6a 100%)"
      }}
    >
      {/* Blurred coffee shop background */}
      <motion.img
        src="/backgrounds/coffee_profile_bg.jpg"
        alt="Coffeehouse"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.32,
          filter: "blur(10px)"
        }}
        initial={{ scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.9 }}
      />
      {/* Extra animated steam overlay effect */}
      <motion.div
        style={{
          position: "absolute",
          left: "20%",
          top: "28%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(252,252,250,0.3)",
          filter: "blur(22px)",
        }}
        animate={{
          y: [0, -25, 0],
          opacity: [0.24, 0.45, 0.29]
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
