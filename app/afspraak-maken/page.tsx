"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Clock, ArrowLeft, Mail, CheckCircle2, Plus } from "lucide-react";
import PageHero from "../../components/page-hero";

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
  const [isBooked, setIsBooked] = useState(false);
  const selectedConsult = consultTypes.find((c) => c.id === selected);

  // Na een geslaagde boeking een knop tonen om direct nog een consult in te plannen
  useEffect(() => {
    if (!selected) return;
    let active = true;
    (async () => {
      const cal = await getCalApi({ namespace: selected });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          if (active) setIsBooked(true);
        },
      });
    })();
    return () => {
      active = false;
    };
  }, [selected]);

  const kiesConsult = (id: string | null) => {
    setIsBooked(false);
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <PageHero
        title="Afspraak maken"
        intro="Kies het type consult en plan direct een afspraak in op een moment dat u uitkomt"
      />

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
                  onClick={() => kiesConsult(consult.id)}
                  className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 text-left hover:border-sage/40 hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-sage transition-colors duration-200">
                    {consult.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {consult.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <Clock className="w-4 h-4 mr-2 text-sage" />
                    {consult.duration}
                  </div>
                </button>
              ))}
            </div>

            <a
              href="mailto:info@praktijkkimdreef.nl"
              className="group mt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 rounded-3xl bg-white border border-gray-100 shadow-sm px-6 py-6 text-center hover:border-sage/40 hover:shadow-md transition-all duration-200"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-sage-50 flex-shrink-0">
                <Mail className="w-6 h-6 text-sage" />
              </span>
              <span className="text-lg lg:text-xl text-gray-700">
                Liever mailen? Mail naar{" "}
                <span className="block sm:inline whitespace-nowrap font-medium text-sage-dark underline underline-offset-4 decoration-sage/40 group-hover:decoration-sage-dark">
                  info@praktijkkimdreef.nl
                </span>
              </span>
            </a>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <button
              onClick={() => kiesConsult(null)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ander consult kiezen
            </button>

            {isBooked && (
              <div className="rounded-3xl bg-sage p-6 lg:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-7 h-7 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-2xl font-light text-white">Uw afspraak is aangevraagd</h2>
                    <p className="text-white mt-1">
                      U ontvangt hierover een e-mail. Wilt u nog een consult inplannen, bijvoorbeeld voor een
                      ander dier of een vervolgafspraak?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => kiesConsult(null)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium text-sage-dark bg-white hover:bg-sage-50 transition-colors duration-200 cursor-pointer flex-shrink-0"
                >
                  <Plus className="mr-2 w-5 h-5" />
                  Nog een consult inplannen
                </button>
              </div>
            )}

            <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
              <Cal
                key={selected}
                namespace={selected}
                calLink={selectedConsult!.calLink}
                config={{
                  layout: "month_view",
                  theme: "light",
                  // Telefoonveld standaard op Nederland (+31) i.p.v. land op basis van locatie
                  attendeePhoneNumber: "+31",
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
