import Hero from "@/components/home/Hero";
import Latest from "@/components/home/Latest";
import Now from "@/components/home/Now";
import SelectedWork from "@/components/home/SelectedWork";
import Navbar from "@/components/layout/Navbar";
import NeuralSection from "@/components/neural/NeuralSection";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <SelectedWork />

      <NeuralSection />

      <Latest />

      <Now />
    </main>
  );
}