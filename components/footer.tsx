import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const openingHours = [
    { day: "Ma t/m vr", hours: "11:00 – 18:00" },
    { day: "Zaterdag", hours: "Op afspraak" },
    { day: "Zondag", hours: "Gesloten" },
  ];

  return (
    <footer className="mt-8 bg-sage rounded-t-[2.5rem]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          
          {/* Merk */}
          <div className="space-y-5">
            <p className="font-[family-name:var(--font-display)] text-2xl font-light text-white">Praktijk Kim Dreef</p>
            <p className="text-base text-white/90 leading-relaxed max-w-xs">
              Praktijk voor orthomoleculaire therapie en homeopathie voor mens &amp; dier.
            </p>
            <Link
              href="/afspraak-maken"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-base font-medium text-sage-dark bg-white hover:bg-sage-50 transition-colors duration-200"
            >
              Afspraak maken
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Openingstijden */}
          <div className="space-y-6">
            <h3 className="text-xl font-normal text-white">Openingstijden</h3>
            <div className="space-y-3">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between text-base">
                  <span className="text-white/90">{item.day}:</span>
                  <span className={`font-medium ${item.hours === "Gesloten" ? "text-white/80" : "text-white"}`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Praktijkgegevens */}
          <div className="space-y-6">
            <h3 className="text-xl font-normal text-white">Praktijkgegevens</h3>
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
            <h3 className="text-xl font-normal text-white">Behandelingen</h3>
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
            
            <h3 className="text-xl font-normal text-white">Praktijkinformatie</h3>
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
            </div>
          </div>

        </div>

        {/* Association Logos */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col items-center space-y-8">
            <h4 className="text-sm font-medium text-white/90 uppercase tracking-[0.2em]">
              Aangesloten bij
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <div className="flex h-20 items-center rounded-2xl bg-white px-5 py-3 shadow-sm">
                <Image
                  src="/footer_logos/nwp_logo.png"
                  alt="NWP - Nederlandse Werkgroep Fytotherapie"
                  width={120}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div className="flex h-20 items-center rounded-2xl bg-white px-5 py-3 shadow-sm">
                <Image
                  src="/footer_logos/rbcz_logo.jpg"
                  alt="RBCZ - Register Beroepsbeoefenaren Complementaire Zorg"
                  width={120}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div className="flex h-20 items-center rounded-2xl bg-white px-5 py-3 shadow-sm">
                <Image
                  src="/footer_logos/bkhd_logo.png"
                  alt="BKHD - Beroepsvereniging Klassiek Homeopathische Dierenartsen"
                  width={120}
                  height={64}
                  className="h-14 w-auto object-contain"
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
                className="text-sm text-white/85 hover:text-white transition-colors duration-200"
              >
                Algemene voorwaarden
              </Link>
              <Link 
                href="/privacy-policy" 
                className="text-sm text-white/85 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-center text-sm text-white/85">
              © {new Date().getFullYear()} Praktijk Kim Dreef. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
