import Hero from "@/components/home/Hero";
import Contact from "@/components/home/Contact";
import Latest from "@/components/home/Latest";
import Now from "@/components/home/Now";
import SelectedWork from "@/components/home/SelectedWork";
import Navbar from "@/components/layout/Navbar";
import NeuralSection from "@/components/neural/NeuralSection";
import RetentionLab from "@/components/lab/RetentionLab";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <SelectedWork />
      <RetentionLab />

      <NeuralSection />

      <Latest />

      <Now />
      <Contact />
    </main>
  );
}
