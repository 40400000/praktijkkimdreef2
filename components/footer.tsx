import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const openingHours = [
    { day: "Maandag", hours: "8.30 – 21.00" },
    { day: "Dinsdag", hours: "8.30 – 18.00" },
    { day: "Woensdag", hours: "8.30 – 21.00" },
    { day: "Donderdag", hours: "8.30 – 18.00" },
    { day: "Vrijdag", hours: "8.30 – 18.00" },
    { day: "Zaterdag", hours: "Gesloten" },
    { day: "Zondag", hours: "Gesloten" },
  ];

  return (
    <footer className="bg-[#899B90] border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Openingstijden */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Openingstijden</h3>
            <div className="space-y-3">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between text-base">
                  <span className="text-white/90">{item.day}:</span>
                  <span className={`font-medium ${item.hours === "Gesloten" ? "text-white/70" : "text-white"}`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Praktijkgegevens */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Praktijkgegevens</h3>
            <div className="space-y-4 text-base text-white/90">
              <div>
                <p>Het Schip 237</p>
                <p>Apeldoorn, 7325NM</p>
              </div>
              <div>
                <a 
                  href="mailto:info@praktijkkimdreef.nl" 
                  className="hover:text-white transition-colors duration-200"
                >
                  info@praktijkkimdreef.nl
                </a>
              </div>
              <div>
                <a 
                  href="tel:+31615241539" 
                  className="hover:text-white transition-colors duration-200"
                >
                  +31 6 15 24 15 39
                </a>
              </div>
            </div>
          </div>

          {/* Behandelingen & Praktijkinformatie */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Behandelingen</h3>
            <div className="space-y-4">
              <Link 
                href="/orthomoleculair" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Orthomoleculair
              </Link>
              <Link 
                href="/homeopathie" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Homeopathie
              </Link>
              <Link 
                href="/qest4" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Qest4
              </Link>
            </div>
            
            <h3 className="text-xl font-medium text-white">Praktijkinformatie</h3>
            <div className="space-y-4">
              <Link 
                href="/tarieven" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Tarieven
              </Link>
              <Link 
                href="/contact" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Contact & over mij
              </Link>
              <Link 
                href="/afspraak-maken" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Afspraak maken
              </Link>
            </div>
          </div>

          {/* Sociale Media & Legal */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Volg ons</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Association Logos */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col items-center space-y-8">
            <h4 className="text-base font-medium text-white uppercase tracking-wide">
              Aangesloten bij
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
              <div className="h-16 w-auto">
                <Image
                  src="/footer_logos/nwp_logo.png"
                  alt="NWP - Nederlandse Werkgroep Fytotherapie"
                  width={120}
                  height={64}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
              <div className="h-16 w-auto">
                <Image
                  src="/footer_logos/rbcz_logo.jpg"
                  alt="RBCZ - Register Beroepsbeoefenaren Complementaire Zorg"
                  width={120}
                  height={64}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
              <div className="h-16 w-auto">
                <Image
                  src="/footer_logos/bkhd_logo.png"
                  alt="BKHD - Beroepsvereniging Klassiek Homeopathische Dierenartsen"
                  width={120}
                  height={64}
                  className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-6">
              <Link 
                href="/algemene-voorwaarden" 
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Algemene voorwaarden
              </Link>
              <Link 
                href="/privacy-policy" 
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-center text-base text-white/90">
              © {new Date().getFullYear()} Praktijk Kim Dreef. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
