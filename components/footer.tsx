import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const openingHours = [
    { day: "Ma t/m vr", hours: "11:00 – 18:00" },
    { day: "Zaterdag", hours: "Op afspraak" },
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
                href="/qest" 
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
                Contact
              </Link>
              <Link 
                href="/afspraak-maken" 
                className="block text-base text-white/90 hover:text-white transition-colors duration-200"
              >
                Afspraak maken
              </Link>
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
