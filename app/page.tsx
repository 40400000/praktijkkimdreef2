import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Mail, Phone } from "lucide-react";

const behandelingen = [
  {
    title: "Homeopathie",
    href: "/homeopathie",
    image: "/homeo.jpg",
    tag: "Voor dieren",
    text: "De klassieke veterinaire homeopathie is een geneeswijze voor dieren die berust op vele natuurwetten.",
  },
  {
    title: "Orthomoleculaire therapie",
    href: "/orthomoleculair",
    image: "/ortho.jpeg",
    tag: "Voor mensen",
    text: "Tekorten in het lichaam die voor klachten zorgen weer aanvullen met voeding, beweging en supplementen.",
  },
  {
    title: "Mycotherapie",
    href: "/mycotherapie",
    image: "/myco.jpg",
    tag: "Medicinale paddenstoelen",
    text: "Het gebruik van paddenstoelen of extracten uit paddenstoelen bij het voorkomen of genezen van aandoeningen.",
  },
];

const opleidingen = [
  "HBO-Verpleegkunde",
  "Klassiek Homeopaat voor dieren",
  "Celzouttherapeut",
  "Orthomoleculaire Geneeskunde",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-sage px-8 py-12 lg:px-16 lg:py-20 lg:min-h-[calc(100vh-8rem)] flex items-center">
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-white/5" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Content */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">
                  Apeldoorn · Mens &amp; dier
                </p>
                <h1 className="text-5xl lg:text-7xl font-light text-white leading-[1.05]">
                  Praktijk Kim Dreef
                </h1>

                <p className="text-xl lg:text-2xl text-white leading-relaxed max-w-lg">
                  Praktijk voor orthomoleculaire therapie en homeopathie voor mens &amp; dier.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/afspraak-maken"
                    className="group inline-flex items-center px-7 py-3 rounded-full text-base font-medium text-sage-dark bg-white hover:bg-sage-50 transition-colors duration-200"
                  >
                    Afspraak maken
                    <ArrowUpRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href="#behandelingen"
                    className="inline-flex items-center px-7 py-3 border border-white/40 rounded-full text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Bekijk behandelingen
                  </Link>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative animate-in fade-in zoom-in-95 duration-700">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15">
                  <Image
                    src="/kim_hero_foto.jpg"
                    alt="Kim Dreef - Orthomoleculaire therapie en homeopathie"
                    width={600}
                    height={800}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behandelingen */}
      <section id="behandelingen" className="py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sage">Wat ik bied</p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-light text-gray-900">Behandelingen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {behandelingen.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-60 lg:h-64 overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-sm font-medium text-sage-dark">
                    {b.tag}
                  </span>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-2xl font-light text-gray-900 mb-3">{b.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-1">{b.text}</p>
                  <span className="inline-flex items-center text-sage-dark font-medium">
                    Lees meer
                    <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Qest 4 Section */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-sage rounded-3xl p-8 lg:p-14">
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">Diagnostiek</p>
                <h2 className="text-4xl lg:text-5xl font-light text-white">Qest 4</h2>
                <p className="text-xl text-white leading-relaxed">
                  De test met de Qest4 is erop gericht verstoringen op te sporen en te zoeken naar wat het lichaam nodig heeft om weer in balans te komen.
                </p>
                <Link
                  href="/qest"
                  className="group inline-flex items-center px-6 py-3 rounded-full text-base font-medium text-sage-dark bg-white hover:bg-sage-50 transition-colors duration-200"
                >
                  Meer informatie
                  <ArrowUpRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Right Content - Qest 4 Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/15">
                <Image
                  src="/qest4.jpg"
                  alt="Qest 4 systeem"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Over mij */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-sage">Over mij</p>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                In mijn praktijk is geen klacht te groot of te klein
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mijn naam is Kim Dreef en ik heb een Orthomoleculaire en Homeopatische praktijk voor mens &amp; dier in Apeldoorn. Samen gaan we op zoek naar antwoorden en daarvoor gebruik ik de Qest 4, vroeger de AsyraPro.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center text-lg text-sage-dark font-medium"
              >
                Lees meer over mij
                <ArrowUpRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-7 lg:p-9 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-sage-50">
                  <GraduationCap className="w-6 h-6 text-sage" />
                </div>
                <h3 className="text-2xl font-light text-gray-900">Opleidingen</h3>
              </div>
              <ul className="space-y-3">
                {opleidingen.map((o) => (
                  <li key={o} className="flex items-center gap-3 text-gray-700 text-lg">
                    <span className="h-2 w-2 rounded-full bg-sage flex-shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-sage-100 px-8 py-12 lg:px-16 lg:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900">Een afspraak maken?</h2>
              <p className="text-lg text-gray-700">Plan direct online een afspraak in, of neem gerust contact op.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/afspraak-maken"
                className="group inline-flex items-center px-7 py-3 rounded-full text-base font-medium text-white bg-sage hover:bg-sage-dark transition-colors duration-200"
              >
                Afspraak maken
                <ArrowUpRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="tel:+31615241539"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium text-gray-800 bg-white hover:bg-sage-50 transition-colors duration-200"
              >
                <Phone className="mr-2 w-4 h-4 text-sage" />
                Bellen
              </a>
              <a
                href="mailto:info@praktijkkimdreef.nl"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium text-gray-800 bg-white hover:bg-sage-50 transition-colors duration-200"
              >
                <Mail className="mr-2 w-4 h-4 text-sage" />
                Mailen
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
