"use client";

import { motion } from "framer-motion";

// An original, non-licensed "shy forest spirit" silhouette — a nod to Ghibli's
// woodland-guardian aesthetic without reproducing any copyrighted character design.
export function ForestSpirit() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 right-2 z-0 hidden scale-75 sm:right-10 sm:block sm:scale-100 lg:right-20"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
      aria-hidden="true"
    >
      <motion.svg
        width="150"
        height="110"
        viewBox="0 0 150 110"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M10,110 C10,55 45,20 75,20 C105,20 140,55 140,110 Z"
          className="fill-forest-dark dark:fill-night-canopy"
        />
        <path
          d="M33,30 C27,10 44,2 53,17 C48,22 39,27 33,30 Z"
          className="fill-forest-dark dark:fill-night-canopy"
        />
        <path
          d="M117,30 C123,10 106,2 97,17 C102,22 111,27 117,30 Z"
          className="fill-forest-dark dark:fill-night-canopy"
        />
        <ellipse cx="75" cy="72" rx="27" ry="30" className="fill-cloud/90 dark:fill-cloud/15" />

        <motion.g
          style={{ transformOrigin: "75px 46px" }}
          animate={{ scaleY: [1, 1, 0.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.92, 0.96, 1] }}
        >
          <circle cx="61" cy="46" r="7" className="fill-cloud" />
          <circle cx="89" cy="46" r="7" className="fill-cloud" />
          <circle cx="61" cy="47" r="3" className="fill-forest-dark dark:fill-night-deep" />
          <circle cx="89" cy="47" r="3" className="fill-forest-dark dark:fill-night-deep" />
        </motion.g>

        <g className="stroke-cloud/60" strokeWidth="1">
          <line x1="44" y1="62" x2="18" y2="58" />
          <line x1="44" y1="67" x2="18" y2="68" />
          <line x1="106" y1="62" x2="132" y2="58" />
          <line x1="106" y1="67" x2="132" y2="68" />
        </g>
      </motion.svg>
    </motion.div>
  );
}
