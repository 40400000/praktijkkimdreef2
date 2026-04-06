import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & over mij",
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight">
                  Contact & over mij
                </h1>
                <p className="text-lg text-white/90 leading-relaxed">
                  Mijn naam is Kim Dreef en ik heb een orthomoleculaire en homeopatische praktijk voor mens & dier in Apeldoorn.
                </p>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/kim_hero_foto.jpg"
                    alt="Kim Dreef - Praktijk voor orthomoleculaire therapie en homeopathie"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Over mij */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              Na mijn studie HBO-Verpleegkunde heb ik een aantal jaren in het algemeen ziekenhuis gewerkt.
              Omdat mijn hart toch meer uit ging naar de dieren besloot ik de opleiding tot Klassiek Homeopaat
              voor dieren te gaan doen.
            </p>
            <p>
              In de tussentijd deed ik ook de opleiding tot Celzouttherapeut. De afgelopen jaren heb ik een mooie
              praktijk opgezet waarin ik mensen en dieren help met zowel chronische als acute klachten!
            </p>
            <p>
              Inmiddels ben ik ook afgestudeerd in de Orthomoleculaire Geneeskunde.
            </p>

            <div className="bg-[#899B90] rounded-2xl p-8 lg:p-10">
              <p className="text-white/95 text-xl leading-relaxed italic">
                &ldquo;In mijn praktijk voor mens en dier is geen klacht te groot of te klein. Samen gaan we op zoek naar
                antwoorden en daarvoor gebruik ik de Qest 4. Dit is een geavanceerd apparaat
                dat mij helpt te begrijpen wat er allemaal speelt in jouw lichaam.&rdquo;
              </p>
            </div>

            <p className="text-xl font-medium text-gray-900 mt-8">
              Hartelijke groet,<br />
              <span className="text-[#899B90]">Kim</span>
            </p>
          </div>

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
                <p className="text-white/90 text-lg leading-relaxed">
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
                    <li key={datum} className="text-sm text-gray-700">{datum}</li>
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
