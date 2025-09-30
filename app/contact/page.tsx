import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 bg-[#899B90]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight">
                  Contact & over mij
                </h1>
                <p className="text-lg text-white/90 leading-relaxed">
                  Mijn naam is Kim Dreef en ik heb een orthomoleculaire en homeopatische praktijk voor mens & dier in Apeldoorn.
                </p>
              </div>
              
              {/* Right Content - Image */}
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

      {/* Content Section - Letter Style */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Personal Letter */}
          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
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

            {/* Highlighted Quote Section */}
            <div className="bg-[#899B90] rounded-2xl p-8 lg:p-10 my-12">
              <p className="text-white/95 text-xl leading-relaxed italic">
                "In mijn praktijk voor mens en dier is geen klacht te groot of te klein. Samen gaan we op zoek naar 
                antwoorden en daarvoor gebruik ik de Qest 4, vroeger de AsyraPro. Dit is een geavanceerd apparaat 
                dat mij helpt te begrijpen wat er allemaal speelt in jouw lichaam."
              </p>
            </div>
            
            <p>
              Als je nieuwsgierig bent geworden en wellicht op zoek bent naar een oplossing die jou persoonlijk kan 
              helpen richting een gezonder leven, neem een kijkje op mijn website of neem contact met mij op.
            </p>
            
            <p className="text-xl font-medium text-gray-900 mt-12 mb-16">
              Hartelijke groet,<br />
              <span className="text-[#899B90]">Kim</span>
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 mt-16">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Contact</h2>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Heeft u vragen? Neem dan gerust contact op via onderstaande gegevens. Ik help u graag verder!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-[#899B90] mr-4 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">E-mail</div>
                      <a href="mailto:info@praktijkkimdreef.nl" className="text-lg text-[#899B90] hover:text-[#6d7c74] transition-colors duration-200">
                        info@praktijkkimdreef.nl
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-[#899B90] mr-4 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">Locatie</div>
                      <span className="text-lg text-gray-700">Apeldoorn</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8f9fa] rounded-xl p-6">
                  <p className="text-gray-600 leading-relaxed">
                    Voor het maken van een afspraak kunt u gebruik maken van de "Afspraak maken" knop in de navigatie 
                    of stuur een e-mail naar bovenstaand adres.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
