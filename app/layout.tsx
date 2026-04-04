import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicola Ibrahim | Portfolio",
  description: "Personal portfolio of Nicola Ibrahim, showcasing high-performance backend, AI projects, and interactive technical roadmaps.",
};

import AOSInit from '@/components/ui/AOSInit';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-dark text-light font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          <AOSInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
