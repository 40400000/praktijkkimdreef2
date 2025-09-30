import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { generateLocalBusinessSchema, generateOrganizationSchema } from "./structured-data";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://praktijkkimdreef.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Praktijk Kim Dreef - Orthomoleculaire therapie en homeopathie",
    template: "%s | Praktijk Kim Dreef",
  },
  description: "Praktijk voor orthomoleculaire therapie en homeopathie voor mens en dier. Gespecialiseerd in natuurlijke geneeswijzen en Qest4 diagnostiek.",
  keywords: ["orthomoleculaire therapie", "homeopathie", "natuurlijke geneeswijze", "Qest4", "Kim Dreef", "veterinaire homeopathie"],
  authors: [{ name: "Kim Dreef" }],
  creator: "Kim Dreef",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteUrl,
    title: "Praktijk Kim Dreef - Orthomoleculaire therapie en homeopathie",
    description: "Praktijk voor orthomoleculaire therapie en homeopathie voor mens en dier.",
    siteName: "Praktijk Kim Dreef",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Praktijk Kim Dreef",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praktijk Kim Dreef - Orthomoleculaire therapie en homeopathie",
    description: "Praktijk voor orthomoleculaire therapie en homeopathie voor mens en dier.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F4F4F1]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
