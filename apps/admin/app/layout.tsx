import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Exvion Admin",
  description: "Lead management and sales pipeline",
  manifest: "/manifest.json",
  themeColor: "#0A0A0F",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Exvion",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Exvion" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body 
        className={`${spaceGrotesk.className} bg-brand-dark text-white 
        antialiased overflow-x-hidden transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW reg error:', err));
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
