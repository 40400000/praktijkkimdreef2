export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Praktijk Kim Dreef",
    "description": "Praktijk voor orthomoleculaire therapie en homeopathie voor mens en dier in Apeldoorn",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://praktijkkimdreef.nl",
    "telephone": "+31615241539",
    "email": "info@praktijkkimdreef.nl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Het Schip 237",
      "addressLocality": "Apeldoorn",
      "postalCode": "7325NM",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "NL"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€67,50 - €105,-",
    "sameAs": []
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Praktijk Kim Dreef",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://praktijkkimdreef.nl",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://praktijkkimdreef.nl"}/logopraktijkkimdreef.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31615241539",
      "email": "info@praktijkkimdreef.nl",
      "contactType": "customer service",
      "availableLanguage": "Dutch"
    }
  };
}
