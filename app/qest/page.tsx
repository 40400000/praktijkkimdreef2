import { Metadata } from "next";
import PageHero from "../../components/page-hero";

export const metadata: Metadata = {
  title: "Qest 4",
  description: "Geavanceerde diagnose en gezondheidscheck met het Qest 4 systeem. Snel en pijnloos inzicht in uw gezondheidsstatus zonder bloedafname.",
};

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
      <PageHero
        eyebrow="Diagnostiek"
        title="Qest 4"
        intro="Een systeem dat ontwikkeld is voor artsen en therapeuten om inzicht en informatie te verschaffen over de gezondheid die niet uit een anamnese of simpele observatie kunnen worden verkregen."
        image={{ src: "/qest4.jpg", alt: "Qest 4 systeem" }}
      />

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

                <div className="bg-sage rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-4">Wat meet de Qest 4?</h3>
                  <p className="text-white leading-relaxed">
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

                <div className="bg-sage-dark rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-4">Preventieve gezondheidszorg</h3>
                  <p className="text-white leading-relaxed">
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