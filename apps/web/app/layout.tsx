import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/ui/TechBackground";
import { QuoteWidget } from "@/components/ui/QuoteWidget";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://exvionglobal.com"),
  title: "Exvion Global | Premium Software & AI Solutions",
  description: "Exvion Global delivers high-performance software systems, AI solutions, and scalable digital platforms.",
  keywords: ["SaaS development", "AI solutions", "software company India", "digital platforms"],
  other: {
    "preconnect": [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://api.exvionglobal.com",
    ],
  },
  openGraph: {
    title: "Exvion Global",
    description: "Build. Automate. Scale.",
    url: "https://exvionglobal.com",
    siteName: "Exvion Global",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-brand-dark text-white antialiased overflow-x-hidden">
        <TechBackground />
        {children}
        <QuoteWidget />
      </body>
    </html>
  );
}
