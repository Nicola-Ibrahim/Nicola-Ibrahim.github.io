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
  description: "Nicola Ibrahim's portfolio: backend projects, data and ML work, and the tools behind them.",
  keywords: ["Software Engineer", "Backend Engineer", "Distributed Systems", "Python", "FastAPI", "Django", "M.Sc Thesis", "Inverse Engineering", "Nicola Ibrahim"],
  authors: [{ name: "Nicola Ibrahim" }],
  creator: "Nicola Ibrahim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nicolaibrahim.github.io",
    title: "Nicola Ibrahim | Portfolio",
    description: "Backend projects, data and ML work, and the tools behind them.",
    siteName: "Nicola Ibrahim Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicola Ibrahim | Portfolio",
    description: "Backend projects, data and ML work, and the tools behind them.",
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

import HeroSpaceTransitionProvider from './_shared/HeroSpaceTransition';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-dark text-light font-sans antialiased overflow-x-hidden">
        <HeroSpaceTransitionProvider>{children}</HeroSpaceTransitionProvider>
      </body>
    </html>
  );
}
