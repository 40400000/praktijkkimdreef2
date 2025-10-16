export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Praktijk Kim Dreef",
    "description": "Praktijk voor orthomoleculaire therapie en homeopathie voor mens en dier",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://praktijkkimdreef.nl",
    "telephone": "",
    "email": "info@praktijkkimdreef.nl",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Apeldoorn",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "NL"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
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
      "email": "info@praktijkkimdreef.nl",
      "contactType": "customer service"
    }
  };
}






