import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description: "Algemene voorwaarden van Praktijk Kim Dreef, praktijk voor orthomoleculaire therapie en homeopathie in Apeldoorn.",
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 bg-[#899B90]">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                Algemene Voorwaarden
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">
              <strong>Algemene Voorwaarden (AV)</strong> van Praktijk Kim Dreef, Praktijk voor Orthomoleculaire gevestigd te Apeldoorn en geregistreerd bij de Kamer van Koophandel onder nummer 72422327.
            </p>
            <p className="text-gray-600 leading-relaxed">
              De Algemene Voorwaarden zijn onder hetzelfde nummer bij de Kamer van Koophandel gedeponeerd. Uitsluitend deze algemene voorwaarden gelden. Afwijkende voorwaarden worden niet geaccepteerd.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Praktijk Kim Dreef behoudt zich het recht voor deze algemene voorwaarden voor de toekomst te wijzigen. Wijzigingen in de algemene voorwaarden zijn pas van kracht nadat deze duidelijk door Praktijk Kim Dreef zijn bekendgemaakt.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Indien een bepaling van deze Algemene Voorwaarden ongeldig blijkt te zijn door de toepassing van wet, regelgeving of een definitieve beslissing van een bevoegde rechtbank, zullen alle overige bepalingen van de Algemene Voorwaarden volledig van kracht blijven.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 1. Algemeen</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed mb-8">
              <li>Deze voorwaarden zijn van toepassing op iedere overeenkomst gesloten tussen Praktijk Kim Dreef en een cliënt.</li>
              <li>De onderhavige voorwaarden zijn eveneens van toepassing op overeenkomsten met Praktijk Kim Dreef voor de uitvoering waarvan door Praktijk Kim Dreef derden dienen te worden betrokken.</li>
              <li>Indien zich tussen partijen een situatie voordoet die niet in deze algemene voorwaarden geregeld is, dan dient deze situatie te worden beoordeeld naar de geest van deze algemene voorwaarden.</li>
            </ol>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 2. Behandeling</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed">
              <li>De overeenkomst tussen Praktijk Kim Dreef en de cliënt wordt aangegaan voor de duur van de behandeling.</li>
              <li>Praktijk Kim Dreef zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap uitvoeren; op Praktijk Kim Dreef rust een inspanningsverbintenis. Een en ander op grond van de op dat moment bekende stand der wetenschap.</li>
              <li>Cliënt zorgt ervoor dat alle gegevens, die redelijkerwijs van belang kunnen zijn voor een goede uitvoering van de behandeling, tijdig aan Praktijk Kim Dreef worden medegedeeld.</li>
              <li>Praktijk Kim Dreef heeft het recht bepaalde werkzaamheden te laten verrichten door derden. De toepasselijkheid van artikel 7:404, 7:407 lid 2 en 7:409 BW wordt uitdrukkelijk uitgesloten.</li>
              <li>Indien door Praktijk Kim Dreef of door Praktijk Kim Dreef ingeschakelde derden in het kader van de opdracht werkzaamheden worden verricht op de locatie van de cliënt of een door de cliënt aangewezen locatie, draagt de cliënt kosteloos zorg voor de door die medewerkers in redelijkheid gewenste faciliteiten.</li>
              <li>
                Annulering van afspraken voor individuele personen voortvloeiend uit een overeenkomst dient uiterlijk 48 uur vóór het afgesproken tijdstip te geschieden. Voor annulering van consulten gelden de volgende annuleringsvoorwaarden:
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                  <li>Bij annulering tot 48 uur voor aanvang is de patiënt/cliënt geen kosten verschuldigd.</li>
                  <li>Bij annulering 24 uur voor aanvang van een consult is de patiënt/cliënt 50% van het bedrag voor het consult verschuldigd.</li>
                  <li>Bij annulering binnen 24 uur voor aanvang van een consult is de patiënt/cliënt 100% van het bedrag voor het consult verschuldigd.</li>
                  <li>
                    Indien een consult op verzoek van een patiënt/cliënt wordt verschoven naar een latere datum is de patiënt/cliënt bij verschuiving:
                    <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                      <li>Tot 48 uur voor aanvang van het consult geen kosten verschuldigd.</li>
                      <li>Binnen 48 uur voor aanvang: 50% van het bedrag voor het consult.</li>
                      <li>Binnen 24 uur voor aanvang: het volledige bedrag.</li>
                    </ul>
                  </li>
                  <li>Indien annulering niet of te laat geschiedt, is de therapeut gerechtigd de betreffende dienst(en) in rekening te brengen, onverkort het recht op betaling van alle in deze door hem/haar gemaakte kosten.</li>
                  <li>De therapeut is in redelijkheid gerechtigd een al geplande afspraak te wijzigen wat betreft tijdstip.</li>
                </ul>
              </li>
            </ol>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 3. Betaling en incassokosten</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed mb-8">
              <li>Betaling dient steeds te geschieden na behandeling via een PIN-transactie, contant of binnen 14 dagen na factuurdatum, op een door Praktijk Kim Dreef aan te geven wijze in de valuta waarin is gefactureerd. Praktijk Kim Dreef is gerechtigd om periodiek te factureren.</li>
              <li>Indien de cliënt in gebreke blijft in de tijdige betaling van een factuur, dan is de cliënt van rechtswege in verzuim. De cliënt is alsdan een rente verschuldigd van 1% per maand, tenzij de wettelijke rente hoger is, in welk geval de wettelijke rente verschuldigd is. De rente over het opeisbare bedrag zal worden berekend vanaf het moment dat de cliënt in verzuim is tot het moment van voldoening van het volledig verschuldigde bedrag.</li>
              <li>Indien de cliënt in verzuim verkeert, dan komen alle redelijke kosten ter verkrijging van voldoening buiten rechte voor rekening van de cliënt. De buitengerechtelijke kosten bedragen minimaal 15% van de hoofdsom of het restant daarvan, vermeerderd met de wettelijke rente, met een minimum van €10 exclusief omzetbelasting.</li>
              <li>Indien Praktijk Kim Dreef echter hogere kosten ter incasso heeft gemaakt die redelijkerwijs noodzakelijk waren en de cliënt een zakelijke cliënt is, komen de werkelijk gemaakte kosten voor vergoeding in aanmerking. De eventuele gemaakte gerechtelijke en executiekosten zullen eveneens op de cliënt worden verhaald. De cliënt is over de verschuldigde incassokosten eveneens rente verschuldigd.</li>
            </ol>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 4. Aansprakelijkheid</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed mb-8">
              <li>Praktijk Kim Dreef is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat Praktijk Kim Dreef is uitgegaan van door of namens de cliënt verstrekte onjuiste en/of onvolledige gegevens. Praktijk Kim Dreef is evenmin aansprakelijk als adviezen niet of onjuist worden opgevolgd.</li>
              <li>Indien Praktijk Kim Dreef aansprakelijk mocht zijn voor enigerlei schade, dan is de aansprakelijkheid van Praktijk Kim Dreef beperkt tot het bedrag der uitkering van zijn verzekeraar in voorkomend geval.</li>
              <li>Praktijk Kim Dreef is nimmer aansprakelijk voor gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie.</li>
              <li>Praktijk Kim Dreef is op geen enkele wijze aansprakelijk voor de kwaliteit en samenstelling van de door haar geadviseerde supplementen en/of medicijnen. De leverancier van deze supplementen, medicijnen, is hiervoor verantwoordelijk. Praktijk Kim Dreef zal zover het in haar vermogen ligt meewerken aan de juiste afhandeling van een klacht over de geadviseerde supplementen, medicijnen.</li>
              <li>De in dit artikel opgenomen beperkingen van de aansprakelijkheid gelden niet indien de schade te wijten is aan opzet of grove schuld van Praktijk Kim Dreef.</li>
            </ol>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 5. Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Praktijk Kim Dreef zal alle informatie betreffende de cliënt die zij verkrijgt bij de uitvoering van de behandeling vertrouwelijk behandelen en deze informatie niet aan derden ter hand stellen, behoudens voor zover Praktijk Kim Dreef daartoe verplicht is of toestemming heeft verkregen.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 6. Beëindiging overeenkomst</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed mb-8">
              <li>Tenzij anders is bepaald, wordt de overeenkomst aangegaan voor de duur van de behandeling.</li>
              <li>
                Ieder der partijen is, onverminderd het recht op vergoeding van kosten, schade en rente, gerechtigd de overeenkomst zonder rechterlijke tussenkomst met onmiddellijke ingang bij aangetekende brief te ontbinden indien:
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                  <li>De wederpartij één of meer van haar verplichtingen niet is nagekomen en nalatig is aan haar verplichtingen te voldoen binnen een aan haar bij aangetekende brief voor nakoming gestelde termijn.</li>
                  <li>Voor de wederpartij faillissement of surseance van betaling wordt aangevraagd of verleend, dan wel maatregelen worden getroffen.</li>
                </ul>
              </li>
              <li>Indien de overeenkomst tussentijds wordt opgezegd door Praktijk Kim Dreef, zal Praktijk Kim Dreef in overleg met de cliënt zorg dragen voor overdracht van nog te verrichten werkzaamheden aan derden.</li>
            </ol>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 7. Vrijwaring</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              De cliënt vrijwaart Praktijk Kim Dreef voor eventuele aanspraken van derden die schade lijden.
            </p>

            <h2 className="text-xl font-medium text-gray-900 mt-8 mb-4">Artikel 8. Toepasselijk recht en geschillen</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 leading-relaxed">
              <li>Op alle rechtsbetrekkingen waarbij Praktijk Kim Dreef partij is, is uitsluitend het Nederlands recht van toepassing.</li>
              <li>De rechtbank is bij uitsluiting bevoegd van geschillen kennis te nemen.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
