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
  metadataBase: new URL('https://nicolaibrahim.github.io'),
  title: {
    default: "Nicola Ibrahim | Portfolio",
    template: "%s | Nicola Ibrahim"
  },
  description: "Personal portfolio of Nicola Ibrahim, showcasing high-performance backend, AI projects, and interactive technical roadmaps.",
  keywords: ["Backend Engineer", "Distributed Systems", "Python", "FastAPI", "Django", "M.Sc Thesis", "Inverse Engineering", "Nicola Ibrahim"],
  authors: [{ name: "Nicola Ibrahim" }],
  creator: "Nicola Ibrahim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nicolaibrahim.github.io",
    title: "Nicola Ibrahim | Portfolio",
    description: "High-performance backend architecture, AI systems, and technical roadmaps.",
    siteName: "Nicola Ibrahim Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicola Ibrahim | Portfolio",
    description: "High-performance backend architecture, AI systems, and technical roadmaps.",
    creator: "@nicolaibrahim", // Placeholder: update if you have a handle
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    title: "N. Ibrahim",
    statusBarStyle: "black-translucent",
  },
};

import { ThemeProvider } from '@/components/ui/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-dark text-light font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
