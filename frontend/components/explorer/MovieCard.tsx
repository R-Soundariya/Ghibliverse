"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { formatRating, formatUsdCompact } from "@/lib/format";
import type { MovieCard as MovieCardType } from "@/lib/types";

const PLACEHOLDER_GRADIENTS = [
  "from-forest to-moss",
  "from-dusk to-sakura",
  "from-moss to-sunlight",
  "from-forest-dark to-dusk-light",
];

function placeholderGradient(slug: string) {
  const index = slug.charCodeAt(0) % PLACEHOLDER_GRADIENTS.length;
  return PLACEHOLDER_GRADIENTS[index];
}

export function MovieCard({ movie }: { movie: MovieCardType }) {
  return (
    <motion.article
      className="group relative aspect-[2/3] overflow-hidden rounded-2xl shadow-md"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${placeholderGradient(movie.slug)} flex items-end p-4`}
      >
        {!movie.poster_url && (
          <h3 className="font-display text-xl font-semibold text-cloud drop-shadow">
            {movie.title}
          </h3>
        )}
      </div>

      {movie.poster_url && (
        <Image
          src={movie.poster_url}
          alt={`${movie.title} poster`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      )}

      <motion.div
        variants={{ rest: { y: "100%" }, hover: { y: "0%" } }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="absolute inset-0 flex flex-col justify-end gap-2 bg-forest-dark/90 p-4 text-cloud"
      >
        <h3 className="font-display text-xl font-semibold">{movie.title}</h3>
        <p className="text-sm text-cloud/80">{movie.release_year}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          <span aria-label="IMDb rating">⭐ {formatRating(movie.imdb_rating)}</span>
          <span aria-label="Box office">💰 {formatUsdCompact(movie.box_office_usd)}</span>
          <span aria-label="Awards">🏆 {movie.awards_count}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {movie.genres.map((genre) => (
            <Badge key={genre} className="bg-cloud/20 text-cloud">
              {genre}
            </Badge>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
