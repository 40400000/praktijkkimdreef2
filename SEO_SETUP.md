# SEO Setup Documentation

## Overview
This project has been configured with comprehensive SEO best practices for optimal search engine visibility and social media sharing.

## Implemented Features

### 1. Root Layout Metadata (`app/layout.tsx`)
- **Title template**: Dynamic titles for all pages
- **Meta description**: Clear, keyword-rich description
- **Keywords**: Relevant search terms
- **Open Graph**: Social media preview with image
- **Twitter Cards**: Optimized Twitter/X sharing
- **Robots directives**: Proper indexing instructions
- **Google verification**: Support for Search Console verification

### 2. Page-Specific Metadata
All pages have unique metadata:
- `/` - Home page
- `/homeopathie` - Homeopathy services
- `/orthomoleculair` - Orthomolecular therapy
- `/qest` - Qest 4 system
- `/afspraak-maken` - Appointment booking
- `/tarieven` - Pricing
- `/contact` - Contact and about

### 3. Sitemap (`app/sitemap.ts`)
- Auto-generated XML sitemap at `/sitemap.xml`
- All pages included with proper priorities
- Change frequencies set appropriately

### 4. Robots.txt (`app/robots.ts`)
- Auto-generated at `/robots.txt`
- Allows all crawlers
- Blocks admin and API routes
- References sitemap location

### 5. Structured Data (`app/structured-data.tsx`)
Two JSON-LD schemas:
- **LocalBusiness**: For Google Maps and local search
- **Organization**: For brand identity

### 6. Web App Manifest (`app/manifest.ts`)
- PWA-ready configuration
- App icons for mobile devices
- Theme colors matching brand

### 7. Open Graph Image (`app/opengraph-image.tsx`)
- Dynamically generated OG image
- 1200x630px (optimal for social media)
- Brand colors and typography

## Environment Variables

Add to `.env.local`:
```bash
# Required
NEXT_PUBLIC_SITE_URL=https://praktijkkimdreef.nl

# Optional (for Google Search Console verification)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

## Post-Deployment Checklist

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership using the meta tag method
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

### Testing
- [ ] Verify sitemap: `/sitemap.xml`
- [ ] Verify robots: `/robots.txt`
- [ ] Test OG image: `/opengraph-image.png`
- [ ] Check manifest: `/manifest.webmanifest`
- [ ] Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Analytics (Recommended)
Consider adding:
- Google Analytics 4
- Google Tag Manager
- Microsoft Clarity

### Performance
All metadata is:
- ✅ Statically generated at build time
- ✅ No runtime overhead
- ✅ SEO-friendly URLs
- ✅ Mobile-optimized

## File Structure
```
app/
├── layout.tsx              # Root metadata + structured data
├── sitemap.ts             # XML sitemap generator
├── robots.ts              # Robots.txt generator
├── manifest.ts            # Web app manifest
├── opengraph-image.tsx    # OG image generator
├── structured-data.tsx    # JSON-LD schemas
├── page.tsx               # Home page
├── homeopathie/
│   └── page.tsx           # With metadata
├── orthomoleculair/
│   └── page.tsx           # With metadata
├── qest/
│   └── page.tsx           # With metadata
├── tarieven/
│   └── page.tsx           # With metadata
├── contact/
│   └── page.tsx           # With metadata
└── afspraak-maken/
    ├── layout.tsx         # With metadata (client component)
    └── page.tsx           # Client component
```

## Best Practices Applied

1. **Semantic HTML**: Proper heading hierarchy
2. **Alt text**: All images have descriptive alt attributes
3. **Language tag**: `<html lang="nl">` for Dutch content
4. **Mobile-first**: Responsive design with Tailwind
5. **Fast loading**: Optimized images with Next.js Image
6. **Clean URLs**: No query parameters in main routes
7. **HTTPS ready**: All metadata supports secure connections

## Maintenance

### When Adding New Pages
1. Add page-specific metadata export
2. Update sitemap.ts with new URL
3. Test OG preview
4. Submit updated sitemap to Google

### Regular Updates
- Review and update meta descriptions quarterly
- Monitor Search Console for issues
- Update structured data if business info changes
- Refresh OG image annually

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)






