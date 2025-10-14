import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Praktijk Kim Dreef",
    short_name: "Kim Dreef",
    description: "Praktijk voor orthomoleculaire therapie en homeopathie voor mens en dier",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F4F1",
    theme_color: "#899B90",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}





