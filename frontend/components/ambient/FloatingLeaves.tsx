"use client";

import { motion } from "framer-motion";

const LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${(i * 9.7) % 100}%`,
  delay: (i % 5) * 1.4,
  duration: 9 + (i % 4) * 2,
  scale: 0.6 + ((i * 37) % 50) / 100,
  hue: i % 2 === 0 ? "#6a8f5c" : "#93b384",
}));

function Leaf({ hue }: { hue: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 1c4 2 7 5 7 9a7 7 0 0 1-14 0c0-4 3-7 7-9Z"
        fill={hue}
        opacity={0.75}
      />
      <path d="M9 2v13" stroke="#1f4d3a" strokeWidth="0.6" opacity={0.4} />
    </svg>
  );
}

export function FloatingLeaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {LEAVES.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-[-5%]"
          style={{ left: leaf.left, scale: leaf.scale }}
          initial={{ y: "-10%", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, 24, -18, 12, 0],
            rotate: [0, 25, -15, 10, 0],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Leaf hue={leaf.hue} />
        </motion.div>
      ))}
    </div>
  );
}
