import Image from "next/image";
import { Metadata } from "next";

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
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-12 lg:p-16 bg-[#899B90]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-light text-white leading-tight">
                  Orthomoleculaire therapie
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Tekorten in het lichaam die voor allerlei klachten zorgen weer aanvullen met gezonde voeding, beweging en supplementen.
                </p>
              </div>
              
              {/* Right Content - Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/ortho.jpeg"
                    alt="Orthomoleculaire therapie"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

                <div className="bg-[#899B90] rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-6">Geschikt voor chronische klachten zoals:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {klachten.map((item) => (
                      <div key={item} className="flex items-center">
                        <div className="w-2 h-2 bg-white/70 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-white/90">{item}</span>
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


