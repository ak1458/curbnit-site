import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Anton } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { ChatAssistant } from "@/components/ChatAssistant";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { home } from "@/lib/content";
import { siteUrl } from "@/lib/config";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: home.seo.title, template: "%s" },
  description: home.seo.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Curb'n IT",
    title: home.seo.title,
    description: home.seo.description,
    url: siteUrl,
    images: [{ url: "/images/logo.png" }],
  },
  twitter: { 
    card: "summary_large_image", 
    title: home.seo.title, 
    description: home.seo.description,
    images: ["/images/logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hanken.variable} ${anton.variable}`}>
      <body suppressHydrationWarning>
        <JsonLd data={localBusinessSchema()} />
        <Nav />
        <main>{children}</main>
        <Footer />
        <MobileStickyBar />
        <ChatAssistant />
      </body>
    </html>
  );
}
