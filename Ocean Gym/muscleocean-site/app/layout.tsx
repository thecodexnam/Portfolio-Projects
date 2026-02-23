import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "MuscleOcean - Professional Online Fitness Coaching",
  description: "Transform your body with professional online coaching from a champion men's physique athlete. Custom workouts, diet plans, and weekly check-ins for fat loss, muscle gain, and stage prep.",
  keywords: "online fitness coaching, personal trainer, bodybuilding coach, men's physique, fat loss, muscle gain, diet plans, workout plans, transformation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
