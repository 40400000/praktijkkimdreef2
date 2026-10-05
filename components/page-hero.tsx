import Image from "next/image";

interface PageHeroProps {
  title: string;
  intro?: string;
  eyebrow?: string;
  image?: { src: string; alt: string };
}

export default function PageHero({ title, intro, eyebrow, image }: PageHeroProps) {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-sage px-8 py-12 lg:px-16 lg:py-16">
          {/* Decoratieve cirkels */}
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

          <div
            className={`relative grid grid-cols-1 gap-10 lg:gap-12 items-center ${
              image ? "lg:grid-cols-2" : "text-center"
            }`}
          >
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-700">
              {eyebrow && (
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">{eyebrow}</p>
              )}
              <h1 className="text-4xl lg:text-5xl font-light text-white leading-tight">{title}</h1>
              {intro && (
                <p
                  className={`text-lg lg:text-xl text-white leading-relaxed ${
                    image ? "" : "max-w-2xl mx-auto"
                  }`}
                >
                  {intro}
                </p>
              )}
            </div>

            {image && (
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl shadow-black/10 animate-in fade-in zoom-in-95 duration-700">
                <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
