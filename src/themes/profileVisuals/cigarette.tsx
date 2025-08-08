import { motion } from "framer-motion";

export default function CigaretteProfileScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.25, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(180deg, #1b1616 66%, #f3ae6d 100%)"
      }}
    >
      {/* Blurred dark lounge background image */}
      <motion.img
        src="/backgrounds/cigarette_profile_bg.jpg"
        alt="Cigarette Lounge"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
          filter: "blur(10px)"
        }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.0 }}
      />

      {/* Animated smoke overlay */}
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          top: "26%",
          width: 160,
          height: 80,
          borderRadius: 44,
          background: "rgba(239,235,229,0.18)",
          filter: "blur(18px)"
        }}
        animate={{
          x: [0, 35, -18, 0],
          opacity: [0.44, 0.65, 0.51, 0.40]
        }}
        transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "59%",
          top: "43%",
          width: 80,
          height: 32,
          borderRadius: 28,
          background: "rgba(230,222,204,0.13)",
          filter: "blur(14px)"
        }}
        animate={{
          x: [0, -16, 17, 0],
          opacity: [0.23, 0.33, 0.23]
        }}
        transition={{ repeat: Infinity, duration: 17, ease: "easeInOut" }}
      />
      {/* You can add more smoke wisps, SVGs, or animated icons for "lounge" mood! */}
    </motion.div>
  );
}
