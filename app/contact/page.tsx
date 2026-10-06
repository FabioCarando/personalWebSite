import type { Metadata } from "next";
import Contact from "@/components/home/Contact";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Contact | Fabio Carando",
  description: "Contact Fabio Carando by email, phone in Italy or Hong Kong, or GitHub.",
};

export default function ContactPage() {
  return <main className="min-h-screen bg-[#111111]"><Navbar /><Contact /></main>;
}
