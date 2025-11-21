import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/compliance/CookieBanner";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "niemehr.de — Nie mehr über Google-Antworten nachdenken",
  description: "Die KI, die Ihre Google-Bewertungen automatisch, schnell und perfekt beantwortet. 14 Tage kostenlos starten. Fokus auf Bäcker, Friseur, Döner-Mann.",
  openGraph: {
    title: "Nie mehr Zeit mit Google-Bewertungen verschwenden.",
    description: "Automatische KI-Antworten für lokale Geschäfte. 0 € heute.",
    url: "https://www.niemehr.de",
    siteName: "niemehr.de",
    images: [
      {
        url: "https://www.niemehr.de/og-nie-mehr.png",
        width: 1200,
        height: 630,
        alt: "Nie mehr",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

