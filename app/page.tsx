import Navbar from "../components/navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">

      
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)]">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 w-full h-full flex flex-col">
          <div className="rounded-3xl pt-8 lg:pt-12 pb-4 lg:pb-6 px-8 lg:px-12 bg-[#899B90] flex-1 flex items-center mb-4 lg:mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-light text-white leading-tight font-serif">
                Praktijk Kim Dreef{" "}
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-lg">
              Praktijk voor orthomoleculaire therapie
              en homeopathie voor mens & dier.              </p>
              
              <div className="pt-4">
                <Link
                  href="/afspraak-maken"
                  className="inline-flex items-center px-8 py-3 border border-white/30 rounded-full text-base font-medium text-white bg-white/10 hover:bg-white/20 hover:cursor-pointer transition-colors duration-200"
                >
                  Afspraak maken
                  <ArrowUpRight className="ml-3 w-5 h-5" />
                </Link>
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/kim_hero_foto.jpg"
                  alt="Kim Dreef - Orthomoleculaire therapie en homeopathie"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diensten (korte samenvatting) */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
              Behandelingen
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Homeopathie */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="relative h-56 lg:h-72">
                <Image
                  src="/homeo.jpg"
                  alt="Homeopathie"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Homeopathie</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  De klassieke veterinaire homeopathie is een geneeswijze voor dieren die berust op vele natuurwetten.
                </p>
                <Link
                  href="/homeopathie"
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Lees meer
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Orthomoleculaire therapie */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="relative h-56 lg:h-72">
                <Image
                  src="/ortho.jpeg"
                  alt="Orthomoleculaire therapie"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Orthomoleculaire therapie</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Tekorten in het lichaam die voor klachten zorgen weer aanvullen met voeding, beweging en supplementen.
                </p>
                <Link
                  href="/orthomoleculair"
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Lees meer
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qest 4 Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#899B90] rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-light text-white">Qest 4</h3>
                <p className="text-xl text-white/90 leading-relaxed">
                De test met de Qest4 is erop gericht verstoringen op te sporen en te zoeken naar wat het lichaam nodig heeft om weer in balans te komen.                </p>
                <Link
                  href="/qest"
                  className="inline-flex items-center px-6 py-3 border border-white/30 rounded-full text-base font-medium text-white bg-white/10 hover:bg-white/20 hover:cursor-pointer transition-colors duration-200"
                >
                  Meer informatie
                  <ArrowUpRight className="ml-3 w-5 h-5" />
                </Link>
              </div>
              
              {/* Right Content - Qest 4 Image */}
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
    </div>
  );
}
