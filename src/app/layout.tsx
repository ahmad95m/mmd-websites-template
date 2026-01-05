import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "APEX Martial Arts Academy | Kids & Adult Martial Arts in Chandler, AZ",
  description: "Transform your child's life with martial arts. APEX Martial Arts Academy offers kids & adult classes in Chandler, AZ. Build confidence, discipline & fitness. Free trial class!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bebas.variable} ${outfit.variable} font-body antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
