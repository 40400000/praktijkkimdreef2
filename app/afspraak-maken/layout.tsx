import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afspraak maken",
  description: "Maak eenvoudig online een afspraak bij Praktijk Kim Dreef. Kies uw gewenste behandeling en beschikbare tijd.",
};

export default function AfspraakMakenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
