import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy van Praktijk Kim Dreef. Hoe wij omgaan met uw gegevens.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 bg-[#899B90]">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                Privacy Policy
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-8">
              De Privacy Policy voor Bezoekers geldt voor iedereen die de website www.praktijkkimdreef.nl bezoekt.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">1. Beheer</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              De website www.praktijkkimdreef.nl is eigendom van Praktijk Kim Dreef. De contactgegevens van Praktijk Kim Dreef zijn te vinden op de genoemde website.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">2. Gegevens van bezoekers</h2>
            <ol className="list-[lower-alpha] list-inside space-y-2 text-gray-600 leading-relaxed mb-8">
              <li>Sommige gegevens die voortkomen uit één of meer bezoeken aan Praktijk Kim Dreef worden permanent bewaard, maar wel anoniem. De gegevens zullen dus nooit te herleiden zijn naar een persoon of organisatie.</li>
              <li>Praktijk Kim Dreef zorgt voor een goede beveiliging van de opgeslagen gegevens.</li>
            </ol>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">3. Cookies</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <div>
                <p className="font-medium text-gray-700 mb-1">a. Functionele cookies</p>
                <p>www.praktijkkimdreef.nl maakt gebruik van functionele cookies om de functionaliteit van bepaalde pagina&apos;s van de website te optimaliseren. Cookies zijn kleine tekstbestanden die door een pagina van de website op de computer van de bezoeker worden geplaatst. In zo&apos;n cookie wordt informatie opgeslagen, zoals bepaalde voorkeuren van de bezoeker. Hierdoor kan Praktijk Kim Dreef de bezoeker bij een volgend bezoek nog beter van dienst zijn, bijvoorbeeld door eerder ingevoerde informatie te onthouden.</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">b. Instellen van cookies</p>
                <p>Bezoekers kunnen zelf bepalen hoe er met cookies omgegaan moet worden. De browser kan zo worden ingesteld dat het gebruik van functionele cookies wordt toegestaan, niet toegestaan of slechts gedeeltelijk toegestaan.</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">c. Verwijderen van cookies</p>
                <p>Cookies kunnen altijd van een computer worden verwijderd via de browserinstellingen.</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">d. Analytics cookies</p>
                <p>www.praktijkkimdreef.nl maakt gebruik van Analytics cookies om geanonimiseerde gegevens over het surfgedrag van bezoekers te verzamelen. Deze gegevens worden gebruikt om de website te verbeteren.</p>
              </div>
            </div>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">4. Vragen</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Bezoekers kunnen met vragen over deze Privacy Policy terecht bij Praktijk Kim Dreef. De contactgegevens zijn te vinden op de website die genoemd wordt in artikel 1 van deze Privacy Policy.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">5. Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Praktijk Kim Dreef behoudt zich het recht voor de inhoud van de Privacy Policy te wijzigen zonder de bezoeker daarvan op de hoogte te stellen. Het doorvoeren van de wijziging op de website is hiervoor afdoende.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">6. Bestellingen</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              De Privacy Policy geldt ook voor iedereen die een bestelling plaatst bij Praktijk Kim Dreef.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">7. Gegevens die door de klant verstrekt worden</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              Praktijk Kim Dreef kan de gegevens die door de klant verstrekt worden voor de volgende doeleinden gebruiken:
            </p>
            <ol className="list-[lower-alpha] list-inside space-y-2 text-gray-600 leading-relaxed mb-4">
              <li>Het verwerken van de bestelling.</li>
              <li>Het sturen van één of meerdere e-mails die betrekking hebben op het bestelde, zoals bijvoorbeeld een e-mail met inloggegevens.</li>
              <li>Het incidenteel onder de aandacht brengen van een product, tip, of handigheid waarvan Praktijk Kim Dreef denkt dat dit nuttig kan zijn voor de klant.</li>
            </ol>
            <p className="text-gray-600 leading-relaxed mb-8">
              <strong>Gegevensverstrekking aan derden:</strong> Gegevens die door de klant aan Praktijk Kim Dreef zijn verstrekt, worden nooit aan derden doorgegeven. De enige uitzondering hierop is een gerechtelijk bevel.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">8. Beveiliging</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              De gegevens die de klant aan Praktijk Kim Dreef verstrekt, worden in een beveiligde omgeving opgeslagen.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">9. Aanpassing van klantgegevens</h2>
            <p className="text-gray-600 leading-relaxed">
              Klanten hebben te allen tijde de mogelijkheid om hun gegevens in te zien, te wijzigen of te verwijderen. Praktijk Kim Dreef kan vragen om wijzigingen via een voorgeschreven procedure door te geven. In sommige gevallen kan legitimatie worden verlangd.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
