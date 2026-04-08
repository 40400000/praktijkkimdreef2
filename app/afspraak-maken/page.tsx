"use client";

import { useState } from "react";
import Cal from "@calcom/embed-react";
import { Clock, ArrowLeft, Mail } from "lucide-react";

const consultTypes = [
  {
    id: "intake",
    calLink: "praktijkkimdreef/intakeconsult",
    title: "Intake consult",
    description:
      "Een uitgebreid eerste consult waarin we uw gezondheidsklachten en achtergrond in kaart brengen.",
    duration: "60 min",
  },
  {
    id: "vervolg",
    calLink: "praktijkkimdreef/vervolgconsult",
    title: "Vervolg consult",
    description:
      "Een vervolgafspraak om uw voortgang te bespreken en het behandelplan bij te stellen.",
    duration: "30 min",
  },
];

export default function AfspraakMakenPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedConsult = consultTypes.find((c) => c.id === selected);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 bg-[#899B90]">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                Afspraak maken
              </h1>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Kies het type consult en plan direct een afspraak in op een
                moment dat u uitkomt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consult Selection / Booking */}
      <section className="py-12 lg:py-16">
        {!selected ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl font-light text-gray-900 text-center mb-8">
              Welk consult wilt u inplannen?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultTypes.map((consult) => (
                <button
                  key={consult.id}
                  onClick={() => setSelected(consult.id)}
                  className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 text-left hover:border-[#899B90]/40 hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-[#899B90] transition-colors duration-200">
                    {consult.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {consult.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <Clock className="w-4 h-4 mr-2 text-[#899B90]" />
                    {consult.duration}
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Of mail naar{" "}
              <a
                href="mailto:info@praktijkkimdreef.nl"
                className="text-[#899B90] hover:text-[#6d7c74] transition-colors duration-200 underline underline-offset-2"
              >
                info@praktijkkimdreef.nl
              </a>
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ander consult kiezen
            </button>

            <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
              <Cal
                calLink={selectedConsult!.calLink}
                config={{
                  layout: "month_view",
                  theme: "light",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
