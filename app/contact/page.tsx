import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Praktijk Kim Dreef voor vragen over orthomoleculaire therapie en homeopathie. Gevestigd in Apeldoorn.",
};

export default function ContactPage() {
  const zaterdagData = [
    "2 mei 2026",
    "6 juni 2026",
    "5 september 2026",
    "30 oktober 2026",
    "7 november 2026",
    "5 december 2026",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 bg-[#899B90]">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                Contact
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Heeft u vragen of wilt u een afspraak maken? Neem gerust contact op!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-light text-gray-900 mb-8">Contactgegevens</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email */}
              <a
                href="mailto:info@praktijkkimdreef.nl"
                className="flex items-center group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#899B90]/10 rounded-xl mr-4 flex-shrink-0 group-hover:bg-[#899B90]/20 transition-colors duration-200">
                  <Mail className="w-6 h-6 text-[#899B90]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">E-mail</div>
                  <span className="text-lg text-[#899B90] group-hover:text-[#6d7c74] transition-colors duration-200">
                    info@praktijkkimdreef.nl
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+31615241539"
                className="flex items-center group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#899B90]/10 rounded-xl mr-4 flex-shrink-0 group-hover:bg-[#899B90]/20 transition-colors duration-200">
                  <Phone className="w-6 h-6 text-[#899B90]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Telefoon</div>
                  <span className="text-lg text-[#899B90] group-hover:text-[#6d7c74] transition-colors duration-200">
                    +31 6 15 24 15 39
                  </span>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://maps.google.com/?q=Het+Schip+237+Apeldoorn+7325NM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#899B90]/10 rounded-xl mr-4 flex-shrink-0 group-hover:bg-[#899B90]/20 transition-colors duration-200">
                  <MapPin className="w-6 h-6 text-[#899B90]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Adres</div>
                  <span className="text-lg text-[#899B90] group-hover:text-[#6d7c74] transition-colors duration-200">
                    Het Schip 237, Apeldoorn
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Afspraak maken */}
          <div className="bg-[#899B90] rounded-3xl p-6 lg:p-8">
            <div className="flex items-start">
              <Calendar className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-light text-white mb-4">Afspraak maken</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-4">
                  Een afspraak maken kan eenvoudig per e-mail. Stuur een bericht naar{" "}
                  <a
                    href="mailto:info@praktijkkimdreef.nl"
                    className="text-white underline underline-offset-2 hover:text-white/80 transition-colors duration-200"
                  >
                    info@praktijkkimdreef.nl
                  </a>{" "}
                  met een korte omschrijving van uw klacht en uw beschikbaarheid. Ik neem zo spoedig mogelijk contact met u op.
                </p>
              </div>
            </div>
          </div>

          {/* Openingstijden */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-[#899B90] mr-3" />
              <h2 className="text-2xl font-light text-gray-900">Openingstijden</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-base text-gray-700">Maandag t/m vrijdag</span>
                  <span className="text-lg font-medium text-gray-900">11:00 – 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-base text-gray-700">Zondag</span>
                  <span className="text-lg font-medium text-gray-500">Gesloten</span>
                </div>
              </div>

              {/* Zaterdag openingsdagen */}
              <div className="bg-[#f8f9fa] rounded-xl p-5">
                <h3 className="text-base font-medium text-gray-900 mb-3">Zaterdag open op afspraak</h3>
                <p className="text-sm text-gray-600 mb-3">Op de volgende zaterdagen ben ik geopend van 10:00 – 17:00:</p>
                <ul className="grid grid-cols-2 gap-2">
                  {zaterdagData.map((datum) => (
                    <li key={datum} className="text-sm text-gray-700">• {datum}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
