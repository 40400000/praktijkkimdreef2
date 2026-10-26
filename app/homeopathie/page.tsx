import { Metadata } from "next";
import { pageMetadata } from "../../lib/site";
import PageHero from "../../components/page-hero";

export const metadata: Metadata = pageMetadata({
  title: "Homeopathie",
  description:
    "Klassieke veterinaire homeopathie voor dieren. Behandeling van chronische en acute klachten volgens natuurwetten.",
  path: "/homeopathie",
});

export default function HomeopathiePage() {
  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Behandeling"
        title="Homeopathie"
        intro="De klassieke veterinaire homeopathie is een geneeswijze voor dieren die berust op vele natuurwetten."
        image={{ src: "/homeo.jpg", alt: "Homeopathie behandeling" }}
      />

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="space-y-8">
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  De klassieke veterinaire homeopathie is een geneeswijze voor dieren die berust op vele natuurwetten.
                  Deze geneeswijze wordt al eeuwen lang toegepast en is gebaseerd op de ideeën van Samuel Hahnemann, de
                  grondlegger van de homeopathie. Hij ontdekte dat het behandelen van alleen een klacht meestal niet
                  voldoende is. Om een probleem echt op te lossen en ziektes te kunnen genezen, dient er op een dieper
                  niveau naar een dier gekeken te worden.
                </p>

                <p>
                  Er zijn verschillende factoren die invloed kunnen hebben op het ontstaan van klachten en de manier 
                  waarop het zich laat zien. Deze factoren verschillen per dier, per individu. Door die verschillende 
                  factoren te categoriseren ontstond er een zogenaamde ziekteclassificatie. Met deze ziekteclassificatie 
                  is het mogelijk om alle verschillende factoren als een soort puzzel in elkaar te leggen en zo een 
                  geheel beeld te vormen van wat er speelt bij het dier.
                </p>

                <div className="bg-sage rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-4">Behandelingsmogelijkheden</h3>
                  <p className="text-white leading-relaxed">
                    Ik heb de afgelopen jaren ervaring opgebouwd met de behandeling van onder andere chronische 
                    huidklachten, gewrichtsklachten (HD, arthrose, spondylose, ED, hernia's etc.), interne klachten 
                    (maag/darm klachten) en vele andere klachten. Ook gedragsafwijkingen laten zich, in combinatie 
                    met gedragstherapie, vaak goed behandelen met homeopathische middelen. Ook heb ik ervaring bij 
                    de begeleiding van OK's bij dieren.
                  </p>
                </div>

                <p>
                  Omdat de homeopathie werkt op het zelfgenezend vermogen van het individu maakt het eigenlijk niet 
                  uit of de klacht chronisch is of acuut. In beide gevallen zijn prachtige resultaten te behalen!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


