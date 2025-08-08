// src/themes/ProfileVisuals/PizzaProfileScene.tsx
import { motion } from "framer-motion";

export default function PizzaProfileScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(130deg, #f25757 60%, #feedbb 100%)"
      }}
    >
      <motion.img
        src="/backgrounds/pizza_profile_bg.jpg"
        alt="Pizzeria"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          filter: "blur(8px)"
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6 }}
      />
      {/* Cheesy animated overlay */}
      <motion.div
        style={{
          position: "absolute",
          left: "55%",
          top: "60%",
          width: 80,
          height: 44,
          borderRadius: "44px 44px 60px 60px",
          background: "rgba(250,222,75,0.19)",
          filter: "blur(20px)"
        }}
        animate={{
          x: [0, -10, 12, 0],
          y: [0, -8, 7, 0],
          opacity: [0.13, 0.22, 0.13]
        }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
