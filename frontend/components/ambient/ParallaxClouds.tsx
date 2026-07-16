"use client";

import { motion } from "framer-motion";

const CLOUDS = [
  { top: "8%", width: 220, duration: 70, opacity: 0.8, delay: 0 },
  { top: "20%", width: 160, duration: 55, opacity: 0.6, delay: 6 },
  { top: "34%", width: 260, duration: 85, opacity: 0.5, delay: 3 },
];

export function ParallaxClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {CLOUDS.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white blur-2xl"
          style={{
            top: cloud.top,
            width: cloud.width,
            height: cloud.width * 0.45,
            opacity: cloud.opacity,
          }}
          initial={{ x: "-20vw" }}
          animate={{ x: "120vw" }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
