import Image from "next/image";

export default function QestPage() {
  const voordelen: string[] = [
    "Snelle en pijnloze diagnose",
    "Geen bloedafname nodig",
    "Direct inzicht in gezondheidsstatus",
    "Preventieve gezondheidszorg",
    "Ondersteuning bij chronische klachten",
    "Optimalisatie van behandelplannen",
    "Monitoring van behandelresultaten",
    "Vroege detectie van verstoringen",
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
                  Qest 4
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Een systeem dat ontwikkeld is voor artsen en therapeuten om inzicht en informatie te verschaffen over de gezondheid die niet uit een anamnese of simpele observatie kunnen worden verkregen.
                </p>
              </div>
              
              {/* Right Content - Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/qest4.jpg"
                    alt="Qest 4 systeem"
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
                  In mijn praktijk werk ik met de Qest 4, vroeger genaamd Asyra Pro. De Qest 4 (of Asyra Pro) is een systeem 
                  dat ontwikkeld is voor artsen en therapeuten met als doelstelling inzicht en informatie te verschaffen over 
                  de gezondheid van de cliënt die niet uit een anamnese of een simpele observatie kunnen worden verkregen.
                </p>

                <p>
                  Het systeem gaat op zoek naar de oorzaak van de verstoringen. Dit kunnen allergieën, virussen, parasieten, 
                  bacteriën, emotionele en psychische verstoringen, fysieke belasting van bijvoorbeeld de wervels, gebitsbelasting, 
                  gifstoffenbelasting, hormonale verstoringen, problemen van het immuunsysteem, resten van doorgemaakte ziekten, 
                  spijsverteringsproblemen, stofwisselingsproblemen, vaccinatie belasting, voedingstekorten en voedingsintoleranties zijn.
                </p>

                <div className="bg-[#899B90] rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-4">Wat meet de Qest 4?</h3>
                  <p className="text-white/90 leading-relaxed">
                    Ook meet de Qest4 of er een tekort is aan o.a. vitaminen, mineralen, sporenelementen, enzymen, essentiële 
                    vetten en aminozuren. In de database van de Qest4 zitten meer dan 150.000 frequenties opgeslagen die het 
                    lichaam weer in balans kunnen brengen. Na de test kunnen we zien of alles weer in balans is. Indien nodig 
                    kan er meer en nog specifieker getest worden.
                  </p>
                </div>

                <p>
                  De testen met de Qest4 zijn geen vervanging voor de reguliere analyse en diagnose. Het kan een aanvulling zijn 
                  naast een reguliere behandeling of als u klachten heeft en er regulier geen afwijkingen te vinden zijn.
                </p>

                <div className="bg-[#a8b5a8] rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-4">Preventieve gezondheidszorg</h3>
                  <p className="text-white/90 leading-relaxed">
                    Ziekte ontstaat niet van vandaag op morgen, het is het eindstation van een proces. Door middel van een scan 
                    met de Qest4 kunt u, indien nodig, ingrijpen en proberen het proces te keren, voordat een ziekte zich 
                    openbaart. Een jaarlijkse check zou een overweging kunnen zijn.
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