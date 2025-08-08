// src/themes/ProfileVisuals/CandyProfileScene.tsx
import { motion } from "framer-motion";

export default function CandyProfileScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(135deg, #f787ba 70%, #f9adc3 100%)"
      }}
    >
      <motion.img
        src="/backgrounds/candy_profile_bg.jpg"
        alt="Candy Pop"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          filter: "blur(8px)"
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6 }}
      />
      {/* Floating pastel bubbles */}
      <motion.div
        style={{
          position: "absolute",
          left: "15%",
          top: "23%",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(250,170,225,0.38)",
          filter: "blur(3px)"
        }}
        animate={{
          y: [0, 24, 0],
          x: [0, 8, 0],
          opacity: [0.23, 0.44, 0.23]
        }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "75%",
          top: "37%",
          width: 33,
          height: 33,
          borderRadius: "50%",
          background: "rgba(254,235,247,0.60)",
          filter: "blur(1.5px)",
          border: "2px solid #f787ba"
        }}
        animate={{
          y: [0, -16, 0],
          opacity: [0.49, 0.81, 0.49]
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
