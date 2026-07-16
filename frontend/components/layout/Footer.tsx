export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-forest/50 dark:text-cloud/40">
      <p>
        Movie posters powered by the{" "}
        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-forest/80 dark:hover:text-cloud/70"
        >
          OMDb API
        </a>
        .
      </p>
    </footer>
  );
}
