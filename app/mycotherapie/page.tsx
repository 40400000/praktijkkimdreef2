import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { pageMetadata } from "../../lib/site";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../../components/page-hero";

export const metadata: Metadata = pageMetadata({
  title: "Mycotherapie",
  description:
    "Mycotherapie: het gebruik van medicinale paddenstoelen en paddenstoelextracten bij het voorkomen of behandelen van o.a. allergieën, auto-immuunziekten, chronische vermoeidheid en ontstekingen.",
  path: "/mycotherapie",
});

export default function MycotherapiePage() {
  const werkzameStoffen = [
    {
      title: "Polysachariden",
      text: "De belangrijkste geneeskracht van de paddenstoelen komt door het hoge gehalte aan actieve polysachariden. De sterk vertakte 1,3 en 1,6 β-D-glucanen hebben afweerstimulerende eigenschappen. Doordat zij de oppervlaktestructuren van virussen en bacteriën kunnen imiteren, zorgen zij bijvoorbeeld bij een infectie voor een cellulaire en humorale reactie van het immuunsysteem. Hiermee kan een chronisch ontstekingsproces worden doorbroken.",
    },
    {
      title: "Triterpenen",
      text: "Triterpenen beschermen tegen besmetting met micro-organismen en hebben een antivirale en antibacteriële werking. Deze triterpenen zijn ook een voorstof van bepaalde steroïdhormonen en werken doelgericht tegen tumoren.",
    },
    {
      title: "Polyfenolen",
      text: "Paddenstoelen bevatten een groot aantal polyfenolen. Dat zijn secundaire plantenstoffen met een positieve invloed op het immuunsysteem: ze remmen het verouderingsproces, zijn radicalenvangers, voorkomen oxidatie van vetten en werken antimicrobieel.",
    },
    {
      title: "Enzymen",
      text: "De hoge concentratie van enzymen van paddenstoelen wordt benut als antioxidant en heeft een ontgiftende en antitumorale werking.",
    },
  ];

  const toepassingen: string[] = [
    "Allergieën",
    "Auto-immuunziekten",
    "Chronische vermoeidheid",
    "Depressie",
    "Overgangsklachten",
    "Diabetes",
    "Slaapstoornissen",
    "Bijwerkingen van chemotherapie",
    "Bijwerkingen van bestraling",
    "Ontstekingen",
  ];

  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Behandeling"
        title="Mycotherapie"
        intro="Het gebruik van paddenstoelen of extracten uit paddenstoelen bij het voorkomen of genezen van bepaalde aandoeningen en ziekten."
        image={{ src: "/myco.jpg", alt: "Medicinale paddenstoelen (elfenbankje) op een boomstam" }}
      />

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                Mycotherapie wordt vaak gedefinieerd als het gebruik van paddenstoelen of extracten uit paddenstoelen om
                in te zetten bij het voorkomen of genezen van bepaalde aandoeningen en ziekten. Bepaalde stoffen uit
                bepaalde paddenstoelen kennen een geneeskrachtige werking, dit is aangetoond in divers klinisch
                onderzoek. In China, Japan en Korea is mycotherapie al vele duizenden jaren een onderdeel van de
                traditionele geneeskunde. Recent heeft de medische wetenschap de paddenstoelen omarmd als bron van
                mogelijk nieuwe stoffen die verwerkt kunnen worden in geneesmiddelen.
              </p>

              <p>
                Mycotherapie als (complementair) middel bij de behandeling van diverse ziekten en aandoeningen heeft
                voorzichtig haar plaats in de medische wereld veroverd en gaat zeker een belangrijke rol spelen in de
                nabije toekomst.
              </p>

              <h2 className="text-2xl lg:text-3xl font-light text-gray-900 pt-4">Een lange geschiedenis</h2>

              <p>
                Een van de eerste geschreven werken in de westerse geschiedschrijving waarin paddenstoelen als medicijn
                voorkomen is in een verhaal van de Romeinse geschiedschrijver Plinius de Oudere (23-79 AD). In zijn
                verhaal beschrijft hij het gebruik van de <em>Fomitopsis officinalis</em> als diureticum en
                toepassingen bij ademnood, koorts, epilepsie en tuberculose.
              </p>

              <figure className="relative rounded-2xl overflow-hidden aspect-[3/2] my-2">
                <Image
                  src="/myco-2.jpg"
                  alt="Oranje paddenstoelen op de bosbodem"
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </figure>

              <p>
                In de Middeleeuwen was het gebruik van paddenstoelen als medicinaal middel wijdverbreid. Bekende
                veelgebruikte paddenstoelen waren het Judasoor (<em>Auricularia auricula-judae</em>), de reuzenbovist
                (<em>Langermannia gigantea</em>) en de echte tondelzwam (<em>Fomes fomentarius</em>). In de tijd van de
                Renaissance zijn er andere voorbeelden te vinden zoals de <em>Inonotus obliquus</em>, in de volksmond
                chaga genoemd, die in de 16e eeuw al werd gebruikt in Rusland en Noord-Europa tegen tumoren (Zheng et
                al., 2010).
              </p>

              <p>
                In het begin van de 20e eeuw zijn er met familieleden van de paddenstoel, de zogenaamde fungi of
                schimmels, experimenten gedaan en daaruit zijn een aantal geneesmiddelen ontstaan die heden ten dage nog
                worden gebruikt. Een bekend voorbeeld is het antibioticum penicilline dat wordt gewonnen uit de schimmel
                <em> Penicillium</em>.
              </p>
            </div>
          </div>

          {/* Werkzame stoffen */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">Werkzame stoffen</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              In de opleiding zijn de belangrijkste stoffen van de diverse paddenstoelen uitvoerig behandeld.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {werkzameStoffen.map((stof) => (
                <div key={stof.title} className="rounded-2xl bg-sage-50 p-5 sm:p-6">
                  <h3 className="text-xl font-normal text-gray-900 mb-3">{stof.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{stof.text}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed text-lg mt-8">
              Eén en ander vindt plaats in interactie met verschillende pathogeen-geassocieerde structuren van
              medicinale schimmels. De glucanen horen net als de cytokinen interferon en interleukine tot de groep van Biological Response
              Modifiers (BRM): ze kunnen het kwaadaardige verloop van een ziekte positief beïnvloeden. Een ander effect
              van deze vorm van glucanen is de remming van de prostaglandineproductie en de uitstoot van histamine. Ook
              remmen ze de neoangiogenese (tumorgroei).
            </p>
          </div>

          {/* Toepassingen */}
          <div className="bg-sage rounded-3xl p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-light text-white mb-4">
              Waarbij worden medicinale paddenstoelen ingezet?
            </h2>
            <p className="text-white leading-relaxed text-lg mb-6">
              Mycotherapie, oftewel het werken met medicinale paddenstoelen om ziekten te behandelen, klachten te
              verhelpen of preventie te bedrijven, wordt ingezet bij een breed scala van aandoeningen, zoals:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toepassingen.map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-2 h-2 bg-white/80 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-white text-lg">{item}</span>
                </div>
              ))}
              <div className="flex items-center">
                <div className="w-2 h-2 bg-white/80 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-white text-lg italic">en veel meer</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-sage-100 p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-xl text-gray-800">Benieuwd wat mycotherapie voor u kan betekenen?</p>
            <Link
              href="/afspraak-maken"
              className="group inline-flex items-center justify-center px-7 py-3 rounded-full text-base font-medium text-white bg-sage hover:bg-sage-dark transition-colors duration-200 flex-shrink-0"
            >
              Afspraak maken
              <ArrowUpRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
