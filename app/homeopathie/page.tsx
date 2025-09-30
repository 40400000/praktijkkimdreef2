import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeopathie",
  description: "Klassieke veterinaire homeopathie voor dieren. Behandeling van chronische en acute klachten volgens natuurwetten.",
};

export default function HomeopathiePage() {
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
                  Homeopathie
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  De klassieke veterinaire homeopathie is een geneeswijze voor dieren die berust op vele natuurwetten.
                </p>
              </div>
              
              {/* Right Content - Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/homeo.jpg"
                    alt="Homeopathie behandeling"
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
                  geheel beeld te vormen van water speelt bij het dier.
                </p>

                <div className="bg-[#899B90] rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-medium text-white mb-4">Behandelingsmogelijkheden</h3>
                  <p className="text-white/90 leading-relaxed">
                    Ik heb de afgelopen jaren ervaring opgebouwd met de behandelingvan onder andere chronische 
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


