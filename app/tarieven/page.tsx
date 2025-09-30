import { Euro, Phone, Car } from "lucide-react";
import Accordion from "../../components/accordion";

export default function TarievenPage() {
  const orthomoleculairTarieven = [
    { service: "Intake consult", price: "€95,-" },
    { service: "Vervolgconsult", price: "€65,-" },
  ];

  const algemeneInformatie = [
    {
      id: "verzekering",
      title: "Vergoeding zorgverzekering",
      content: "Ben je aanvullend verzekerd, dan krijg je meestal een vergoeding voor de behandeling. Hoeveel dat is, hangt af van de zorgverzekeraar en welke verzekering jij precies hebt. Vraag dat even na bij je zorgverzekeraar. Een globaal overzicht van de vergoedingen staat ook op de website van de NWP, de beroepsvereniging voor natuurgeneeskundig werkende professionals."
    },
    {
      id: "kwaliteit",
      title: "Kwaliteit en opleiding",
      content: "Therapeuten aangesloten bij de NWP hebben een gedegen opleiding doorlopen, van minstens 4-5 jaar. De vereniging staat in voor de kwaliteit van haar aangesloten leden en ziet toe op bijscholing, beroepsethiek en praktijkvoering. De vereniging is aangesloten bij het RBCZ, een klachtencommissie en heeft een eigen tuchtcollege."
    },
    {
      id: "betaling",
      title: "Betaling",
      content: "In de praktijk kan worden gepind of contant worden afgerekend."
    }
  ];

  const homeopathieConsulten = [
    { service: "Intake consult", price: "€80,-" },
    { service: "Consult inclusief test met Qest4", price: "€95,-" },
    { service: "Vervolgconsult", price: "€60,-" },
    { service: "Telefonisch contact / update per 15 minuten", price: "€17,50" },
    { service: "Telefonisch spoedconsult", price: "€50,-" },
  ];

  const homeopathieMiddelen = [
    { service: "Middel ruikflesje", price: "€7,-" },
    { service: "Middel pipetflesje (5 ml)", price: "€8,-" },
    { service: "Middel pipetflesje (10 ml)", price: "€13,-" },
    { service: "Spagyriek, oertincturen, celzouten", price: "Afhankelijk van soort en hoeveelheid" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 bg-[#899B90]">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                Tarieven
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Transparante prijzen voor orthomoleculaire therapie en homeopathie behandelingen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Orthomoleculaire Therapie */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Euro className="w-6 h-6 text-[#899B90] mr-3" />
              <h2 className="text-2xl font-light text-gray-900">Orthomoleculaire therapie</h2>
            </div>
            
            <div className="space-y-3 mb-5">
              {orthomoleculairTarieven.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-base text-gray-700">{item.service}</span>
                  <span className="text-lg font-medium text-gray-900">{item.price}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-[#f8f9fa] rounded-xl p-4 mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">
 Genoemde bedragen zijn exclusief benodigde suppletie.
              </p>
            </div>

            {/* Accordion */}
            <div>
              <Accordion items={algemeneInformatie} />
            </div>
          </div>

          {/* Homeopathie (dieren) */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Euro className="w-6 h-6 text-[#899B90] mr-3" />
              <h2 className="text-2xl font-light text-gray-900">Homeopathie (dieren)</h2>
            </div>
            
            {/* Consulten */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Consulten</h3>
              <div className="space-y-3">
                {homeopathieConsulten.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-base text-gray-700">{item.service}</span>
                    <span className="text-lg font-medium text-gray-900">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middelen */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Middelen</h3>
              <div className="space-y-3">
                {homeopathieMiddelen.map((item, index) => (
                  <div key={index} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-base text-gray-700 flex-1 pr-4">{item.service}</span>
                    <span className="text-lg font-medium text-gray-900 text-right">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Huisbezoeken info */}
            <div className="bg-[#899B90] rounded-xl p-5 mb-5">
              <div className="flex items-start">
                <Car className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <h4 className="text-base font-medium text-white mb-2">Huisbezoeken</h4>
                  <p className="text-sm leading-relaxed mb-2">
                    Voor een consult voor homeopathie kunt u gemakkelijk met uw hond bij mij in de praktijk terecht. 
                    Voor paarden en katten geldt dat zij het best in hun eigen omgeving beoordeeld kunnen worden.
                  </p>
                  <p className="text-xs">
                    De prijzen voor de consulten aan huis zijn exclusief de voorrijkosten.<br />
                    <strong>Voorrijkosten:</strong> €0,25 per gereden kilometer vanaf postcode 7325 NM te Apeldoorn (retour).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Annuleringsbeleid */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Annuleringsbeleid</h2>
            <div className="bg-[#f8f9fa] rounded-xl p-5">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Bij het geen doorgang kunnen vinden van de afspraak wordt er 50% van het tarief van de voorgenomen 
                behandeling in rekening gebracht, tenzij de afspraak minimaal 24 uur van te voren is afgezegd.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                De prijzen voor de middelen zijn exclusief de verzendkosten.<br />
                <strong>Alle bovengenoemde prijzen zijn inclusief BTW, u ontvangt altijd een factuur.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
