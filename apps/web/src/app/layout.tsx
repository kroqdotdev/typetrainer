import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeTrainer",
  description: "Learn to code in any language. Interactive lessons, real code, no fluff.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">{`(function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if(e==='system'||!e){var m=window.matchMedia('(prefers-color-scheme:dark)').matches;c.add(m?'dark':'light')}else{c.add(e)}}catch(e){}})();`}</Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased dark:bg-black dark:text-neutral-100`}
      >
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
