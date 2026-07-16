"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { FloatingLeaves } from "./FloatingLeaves";
import { ParallaxClouds } from "./ParallaxClouds";
import { Fireflies } from "./Fireflies";

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 13.7) % 100}%`,
  top: `${(i * 23.3) % 60}%`,
  size: 1 + (i % 3 === 0 ? 1 : 0),
  delay: (i % 6) * 0.5,
  duration: 2.5 + (i % 4),
}));

function TreeCanopy() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,180 L0,90 C60,60 90,110 140,70 C190,30 220,90 270,60 C320,30 360,100 420,65
           C480,30 520,95 580,60 C640,25 680,100 740,70 C800,40 840,100 900,65
           C960,30 1000,95 1060,60 C1120,25 1160,100 1220,70 C1280,40 1320,95 1380,65
           C1410,50 1430,70 1440,60 L1440,180 Z"
        fill="#050a08"
        opacity="0.92"
      />
    </svg>
  );
}

export function AmbientBackground() {
  const { theme } = useTheme();
  const isNight = theme === "night";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 ${
          isNight
            ? "bg-gradient-to-b from-night-sky via-forest-dark to-night-deep"
            : "bg-gradient-to-b from-sakura-light via-cloud to-moss-light"
        }`}
      >
        {isNight ? (
          <>
            <div className="absolute right-28 top-14 h-14 w-14 rounded-full bg-cloud shadow-[0_0_40px_18px_rgba(247,245,239,0.35)]" />
            {STARS.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-cloud"
                style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: star.duration, delay: star.delay, repeat: Infinity }}
              />
            ))}
            <Fireflies />
            <TreeCanopy />
          </>
        ) : (
          <>
            <ParallaxClouds />
            <FloatingLeaves />
          </>
        )}
      </motion.div>
    </div>
  );
}
