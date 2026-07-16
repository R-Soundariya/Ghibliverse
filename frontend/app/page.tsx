import { AmbientBackground } from "@/components/ambient/AmbientBackground";
import { Hero } from "@/components/landing/Hero";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <AmbientBackground />
      <Hero />
    </main>
  );
}
