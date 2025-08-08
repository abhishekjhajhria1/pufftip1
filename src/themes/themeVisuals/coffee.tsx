// src/themes/ThemeVisuals/CoffeeScene.tsx
import { motion } from "framer-motion";

export default function CoffeeScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        // background: "linear-gradient(180deg, #5f4636 60%, #b89c6a 100%)",
        overflow: "hidden"
      }}
    >
      {/* Soft Coffeehouse Background */}
      <motion.img
        src="/coffee_bg.png"
        alt="Coffeehouse"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.56,
          // filter: "blur(1.5px)"
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Steam effect: animated white blobs */}
      <motion.div
        style={{
          position: "absolute",
          left: "22%",
          top: "28%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(252,252,250,0.35)",
          filter: "blur(20px)",
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.33, 0.53, 0.36]
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "34%",
          top: "19%",
          width: 60,
          height: 60,
          borderRadius: "40%",
          background: "rgba(238,236,227,0.20)",
          filter: "blur(16px)"
        }}
        animate={{
          y: [0, -28, 0],
          opacity: [0.19, 0.32, 0.19]
        }}
        transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
      />
      {/* You can add a subtle coffee cup SVG or mug shadow at the bottom if you wish */}
    </motion.div>
  );
}
