import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Baobab Flight — Local Service, International Fun!",
    template: "%s | Baobab Flight",
  },
  description:
    "Baobab Flight, agence de voyage internationale basée au Maroc et au Sénégal : billets d'avion aux meilleurs tarifs, itinéraires sur-mesure et accompagnement VIP 24/7 sur WhatsApp.",
  keywords: [
    "agence de voyage",
    "billet d'avion",
    "voyage sur-mesure",
    "Baobab Flight",
    "Djibril NDIAYE",
    "agence de voyage Maroc",
    "agence de voyage Sénégal",
    "Casablanca",
    "Dakar",
    "devis WhatsApp",
  ],
  openGraph: {
    title: "Baobab Flight — Local Service, International Fun!",
    description:
      "Voyages sur-mesure et billets d'avion depuis le Maroc et le Sénégal. Accompagnement VIP 24/7 sur WhatsApp.",
    type: "website",
    locale: "fr_FR",
    siteName: "Baobab Flight",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f24",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night"
        >
          Aller au contenu
        </a>
        {children}
        <Script
          id="travelpayouts-drive"
          strategy="afterInteractive"
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.setAttribute("data-cmp-ab", "2");
                script.src = 'https://tp-em.com/NjAzODgw.js?t=603880';
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
