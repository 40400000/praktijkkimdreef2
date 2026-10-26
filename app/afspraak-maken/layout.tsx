import { Metadata } from "next";
import { pageMetadata } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Afspraak maken",
  description:
    "Maak eenvoudig online een afspraak bij Praktijk Kim Dreef. Kies uw gewenste behandeling en beschikbare tijd.",
  path: "/afspraak-maken",
});

export default function AfspraakMakenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}






