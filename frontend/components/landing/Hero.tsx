"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ForestSpirit } from "@/components/ambient/ForestSpirit";

export function Hero() {
  return (
    <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
      <ForestSpirit />
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-forest-light dark:text-firefly"
      >
        <span className="dark:hidden">🌿</span>
        <span className="hidden dark:inline">✨</span> Welcome to
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-display text-5xl font-semibold text-forest-dark sm:text-7xl dark:text-cloud"
      >
        GhibliVerse
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 max-w-xl text-lg text-forest/80 dark:text-cloud/70"
      >
        Explore every Studio Ghibli film through interactive analytics and original,
        nature-inspired storytelling.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Button href="/explorer">Explore the World</Button>
        <Button href="/executive" variant="secondary">
          View Executive Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
