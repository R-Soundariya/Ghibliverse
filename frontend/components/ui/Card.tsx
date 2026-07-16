export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-forest/10 bg-white/90 shadow-sm transition-colors dark:border-cloud/10 dark:bg-night-canopy/70 ${className}`}
    >
      {children}
    </div>
  );
}
