import { Metadata } from "next";
import PageHero from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Orthomoleculaire therapie",
  description: "Behandeling van chronische klachten door tekorten aan te vullen met voeding, beweging en supplementen. Geschikt voor o.a. fibromyalgie, vermoeidheid en maag-darmklachten.",
};

export default function OrthomoleculairPage() {
  const klachten: string[] = [
    "Fibromyalgie & reuma",
    "Vermoeidheidsklachten",
    "Allergieën & intoleranties",
    "Artritis & artrose",
    "Maag- & Darmklachten",
    "Auto-immuunziekten",
    "Overgangsklachten",
    "PCOS & Menstruatieklachten",
    "Eczeem & Psoriasis",
    "Gewrichtsklachten",
    "Depressies",
    "Burn-out",
    "Overgewicht problematiek",
    "Diabetes type 2",
    "Concentratie- & Slaapproblemen",
    "Metabool syndroom",
    "ADHD & ADD",
    "Migraine",
    "Vitaal oud worden",
    "Verminderde weerstand",
  ];

  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Behandeling"
        title="Orthomoleculaire therapie"
        intro="Tekorten in het lichaam die voor allerlei klachten zorgen weer aanvullen met gezonde voeding, beweging en supplementen."
        image={{ src: "/ortho.jpeg", alt: "Orthomoleculaire therapie" }}
      />

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="space-y-8">
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  Binnen de orthomoleculaire therapie gaan we op zoek naar het 'waarom' van je klacht, ziekte, pijn of aandoening.
                  We brengen verstoorde werkingsmechanismen in kaart en bieden oplossingen. Als het over werkingsmechanismen gaat
                  moet je bijvoorbeeld denken aan het immuunsysteem, het hormonale systeem, het ademhalingssysteem, het
                  spijsverteringssysteem, enzovoorts. Een probleem in een van deze werkingsmechanismen kan ervoor zorgen dat je
                  klachten gaat ervaren.
                </p>

                <p>
                  Met deze klachten ben je misschien ook al bij de huisarts geweest en wellicht ook al in het ziekenhuis en
                  toch hebben zij jou onvoldoende kunnen helpen. Denk dan eens aan de orthomoleculaire therapie, je zult
                  versteld staan van de resultaten! Orthomoleculaire therapie is heel goed inzetbaar bij het optimaliseren van
                  de gezondheid en prestaties en daarmee het voorkomen van klachten.
                </p>

                <p>
                  Denk hierbij aan het optimaliseren van sport- en leerprestaties, het vergroten van de kans op een gezonde 
                  zwangerschap, het voorkomen van klachten die ontstaan door tekorten in de voeding.
                </p>

                <div className="bg-sage rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-6">Geschikt voor chronische klachten zoals:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {klachten.map((item) => (
                      <div key={item} className="flex items-center">
                        <div className="w-2 h-2 bg-white/70 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


