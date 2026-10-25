import { Mail, Phone, MapPin, Clock, Calendar, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PageHero from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Contact & Over mij",
  description: "Neem contact op met Praktijk Kim Dreef voor vragen over orthomoleculaire therapie en homeopathie. Gevestigd in Apeldoorn.",
};

export const revalidate = 86400;

export default function ContactPage() {
  const zaterdagData = [
    "2026-05-02",
    "2026-06-06",
    "2026-09-05",
    "2026-10-30",
    "2026-11-07",
    "2026-12-05",
    "2027-01-09",
    "2027-02-06",
    "2027-03-06",
    "2027-04-03",
    "2027-06-05",
    "2027-09-04",
    "2027-11-06",
  ];

  // Alleen komende zaterdagen tonen (pagina wordt dagelijks opnieuw opgebouwd)
  const vandaag = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Amsterdam" });
  const komendeZaterdagen = zaterdagData
    .filter((datum) => datum >= vandaag)
    .map((datum) =>
      new Date(`${datum}T12:00:00`).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
    );

  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Praktijkinformatie"
        title="Contact & Over mij"
        intro="Heeft u vragen of wilt u een afspraak maken? Neem gerust contact op!"
      />

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Over mij */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-6">Over mij</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Mijn naam is Kim Dreef en ik heb een Orthomoleculaire en Homeopatische praktijk voor mens & dier in Apeldoorn.
                  </p>
                  <p>
                    Na mijn studie HBO-Verpleegkunde heb ik een aantal jaren in het algemeen ziekenhuis gewerkt. Omdat mijn hart toch meer uit ging naar de dieren besloot ik de opleiding tot Klassiek Homeopaat voor dieren te gaan doen.
                  </p>
                  <p>
                    In de tussentijd deed ik ook de opleiding tot Celzouttherapeut. De afgelopen jaren heb ik een mooie praktijk opgezet waarin ik mensen en dieren help met zowel chronische als acute klachten! Inmiddels ben ik ook afgestudeerd in de Orthomoleculaire Geneeskunde en de Mycotherapie.
                  </p>
                  <p>
                    In mijn praktijk voor mens en dier is geen klacht te groot of te klein. Samen gaan we op zoek naar antwoorden en daarvoor gebruik ik de Qest 4, vroeger de AsyraPro. Dit is een geavanceerd apparaat dat mij helpt te begrijpen wat er allemaal speelt in jouw lichaam.
                  </p>
                  <p>
                    Als je nieuwsgierig bent geworden en wellicht op zoek bent naar een oplossing die jou persoonlijk kan helpen richting een gezonder leven, neem een kijkje op mijn website of neem contact met mij op.
                  </p>
                  <p className="text-gray-700 font-medium">Hartelijke groet, Kim</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden w-full lg:w-64 xl:w-72 flex-shrink-0">
                <Image
                  src="/kim_hero_foto.jpg"
                  alt="Kim Dreef - Orthomoleculaire therapie en homeopathie"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>
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
                <div className="flex items-center justify-center w-12 h-12 bg-sage/10 rounded-xl mr-4 flex-shrink-0 group-hover:bg-sage/20 transition-colors duration-200">
                  <Mail className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">E-mail</div>
                  <span className="text-lg text-sage group-hover:text-sage-dark transition-colors duration-200">
                    info@praktijkkimdreef.nl
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+31615241539"
                className="flex items-center group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-sage/10 rounded-xl mr-4 flex-shrink-0 group-hover:bg-sage/20 transition-colors duration-200">
                  <Phone className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Telefoon</div>
                  <span className="text-lg text-sage group-hover:text-sage-dark transition-colors duration-200">
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
                <div className="flex items-center justify-center w-12 h-12 bg-sage/10 rounded-xl mr-4 flex-shrink-0 group-hover:bg-sage/20 transition-colors duration-200">
                  <MapPin className="w-6 h-6 text-sage" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Adres</div>
                  <span className="text-lg text-sage group-hover:text-sage-dark transition-colors duration-200">
                    Het Schip 237, Apeldoorn
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Afspraak maken */}
          <div className="bg-sage rounded-3xl p-6 lg:p-8">
            <div className="flex items-start">
              <Calendar className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-light text-white mb-4">Afspraak maken</h2>
                <p className="text-white text-lg leading-relaxed mb-4">
                  Plan direct online een afspraak in op een moment dat u uitkomt.
                </p>
                <Link
                  href="/afspraak-maken"
                  className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium text-sage-dark bg-white hover:bg-sage-50 transition-colors duration-200"
                >
                  Afspraak maken
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Openingstijden */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Clock className="w-6 h-6 text-sage mr-3" />
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
              <div className="bg-sage-50 rounded-xl p-5">
                <h3 className="text-base font-medium text-gray-900 mb-3">Zaterdag open op afspraak</h3>
                <p className="text-sm text-gray-600 mb-3">Op de volgende zaterdagen ben ik geopend van 10:00 – 17:00:</p>
                {komendeZaterdagen.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {komendeZaterdagen.map((datum) => (
                      <li key={datum} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-sage flex-shrink-0" />
                        {datum}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">Nieuwe data volgen binnenkort.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
