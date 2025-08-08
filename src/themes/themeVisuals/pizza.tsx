// src/themes/ThemeVisuals/PizzaScene.tsx
import { motion } from "framer-motion";

export default function PizzaScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 120 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        // background: "linear-gradient(125deg, #eb8888ff 60%, #feedbb 100%)",
        overflow: "hidden"
      }}
    >
      {/* Pizza shop background image */}
      <motion.img
        src="/pizza_bg.png"
        alt="Pizzeria"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 1,
          filter: "brightness(0.87)"
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Animated cheesy highlight */}
      <motion.div
        style={{
          position: "absolute",
          left: "60%",
          top: "58%",
          width: 90,
          height: 45,
          borderRadius: "30px 30px 60px 60px",
          background: "rgba(250,222,75,0.26)",
          filter: "blur(14px)",
        }}
        animate={{
          x: [0, -9, 10, 0],
          y: [0, -7, 8, 0],
          opacity: [0.38, 0.51, 0.38]
        }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
      />
      {/* Bouncing pizza slice (simple SVG) */}
      <motion.svg
        width={44}
        height={44}
        viewBox="0 0 44 44"
        fill="none"
        style={{
          position: "absolute",
          
        }}
        animate={{
          y: [0, -14, 0]
        }}
        transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
      >
        <ellipse cx="22" cy="38" rx="16" ry="4" fill="#d8334a" opacity=".38"/>
        <path d="M10 6 L39 13 L24 39 L10 6 Z" fill="#feedbb" stroke="#f25757" strokeWidth={2}/>
        <circle cx="18" cy="20" r="3" fill="#e06129" />
        <circle cx="25" cy="16" r="2.5" fill="#d8334a" />
        <circle cx="29" cy="28" r="2.6" fill="#e06129" />
      </motion.svg>
    </motion.div>
  );
}
