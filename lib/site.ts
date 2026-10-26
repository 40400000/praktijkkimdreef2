import type { Metadata } from "next";

// Altijd het www-domein gebruiken: praktijkkimdreef.nl redirect (308) naar www,
// en WhatsApp/Facebook/Google volgen die redirect niet altijd voor previews.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.praktijkkimdreef.nl")
  .replace(/\/+$/, "")
  .replace("://praktijkkimdreef.nl", "://www.praktijkkimdreef.nl");

export const SITE_NAME = "Praktijk Kim Dreef";

export const SITE_DESCRIPTION =
  "Praktijk Kim Dreef in Apeldoorn: orthomoleculaire therapie, homeopathie en mycotherapie voor mens en dier, met Qest4-diagnostiek.";

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Praktijk Kim Dreef – orthomoleculaire therapie, homeopathie en mycotherapie in Apeldoorn",
};

// Per-pagina metadata. Next.js voegt openGraph/twitter niet samen met die van de
// layout, dus elke pagina krijgt hier een volledige set (incl. afbeelding en URL).
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
