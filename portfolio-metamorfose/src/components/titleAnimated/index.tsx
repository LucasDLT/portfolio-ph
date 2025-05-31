"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
      className="text-white text-4xl font-bold"
    >
 METAMORFOSE PH
     </motion.h1>
  );
}
