import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'niemehr.de QR Scan',
  robots: {
    index: false, // Nicht von Google indizieren lassen
  },
};

export default function QRPage() {
  // Die QR-Seite leitet einfach auf die Hauptseite weiter.
  // In einer realen Implementierung würde man hier ggf. den Business-Namen aus der URL parsen
  // und ihn an die Hauptseite übergeben, um das Suchfeld vorab auszufüllen.
  // Beispiel: /qr?q=Döner King

  // Für diesen Build leiten wir einfach auf die Landingpage weiter.
  redirect('/');

  return null;
}

