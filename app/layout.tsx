import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus AI — Intelligence Without Limits",
  description:
    "Nexus AI pioneers the next generation of artificial intelligence, building systems that learn, adapt, and evolve in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#0A0A0F] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
