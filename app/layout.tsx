import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fetch — Live-Configurable UI Components",
  description: "Visually tweak tokens, preview live components, and copy clean, accessible code into your Next.js and Tailwind projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#09090b] text-[#fafafa] selection:bg-indigo-500/20 selection:text-indigo-300">
        {children}
      </body>
    </html>
  );
}

