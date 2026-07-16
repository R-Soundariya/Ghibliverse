"use client";

import { motion } from "framer-motion";

const FIREFLIES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 6.3) % 100}%`,
  top: `${20 + ((i * 17) % 70)}%`,
  size: 3 + (i % 3),
  driftX: 20 + (i % 5) * 8,
  driftY: 14 + (i % 4) * 6,
  duration: 6 + (i % 5) * 1.5,
  delay: (i % 7) * 0.6,
}));

export function Fireflies() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {FIREFLIES.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full bg-firefly"
          style={{
            left: fly.left,
            top: fly.top,
            width: fly.size,
            height: fly.size,
            boxShadow: "0 0 6px 2px rgba(217,245,109,0.8), 0 0 14px 6px rgba(244,255,176,0.35)",
          }}
          animate={{
            x: [0, fly.driftX, -fly.driftX * 0.6, 0],
            y: [0, -fly.driftY, fly.driftY * 0.5, 0],
            opacity: [0.1, 1, 0.3, 0.9, 0.1],
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
