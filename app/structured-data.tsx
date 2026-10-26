import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/site";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE_URL}/#praktijk`,
    "name": SITE_NAME,
    "description": SITE_DESCRIPTION,
    "url": SITE_URL,
    "image": `${SITE_URL}/og-image.jpg`,
    "logo": `${SITE_URL}/web-app-manifest-512x512.png`,
    "telephone": "+31615241539",
    "email": "info@praktijkkimdreef.nl",
    "founder": {
      "@type": "Person",
      "name": "Kim Dreef"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Het Schip 237",
      "addressLocality": "Apeldoorn",
      "postalCode": "7325 NM",
      "addressCountry": "NL"
    },
    "areaServed": "Apeldoorn",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:00",
        "closes": "18:00"
      }
    ],
    "knowsAbout": ["Orthomoleculaire therapie", "Homeopathie", "Mycotherapie", "Qest4"],
    "priceRange": "€60 - €105"
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organisatie`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/web-app-manifest-512x512.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31615241539",
      "email": "info@praktijkkimdreef.nl",
      "contactType": "customer service",
      "availableLanguage": "Dutch"
    }
  };
}

// Google gebruikt dit om de sitenaam ("Praktijk Kim Dreef") in de zoekresultaten te tonen.
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": SITE_NAME,
    "alternateName": ["Kim Dreef", "praktijkkimdreef.nl"],
    "url": `${SITE_URL}/`,
    "inLanguage": "nl-NL",
    "publisher": { "@id": `${SITE_URL}/#organisatie` }
  };
}
