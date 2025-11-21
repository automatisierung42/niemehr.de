'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckItem = ({ children, isFree }: { children: React.ReactNode; isFree?: boolean }) => (
  <li className={`flex items-start ${isFree ? 'text-gray-600' : 'text-white'}`}>
    <Check className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${isFree ? 'text-emerald-500' : 'text-white'}`} />
    <span>{children}</span>
  </li>
);

const XItem = ({ children }: { children: React.ReactNode }) => (
  <li className="text-gray-400 flex items-start">
    <X className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

export default function PricingSection() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-center text-4xl md:text-5xl font-black text-gray-900 mb-16">
        Ihre einzige Entscheidung.
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* FREE CARD (Unattraktiv, grau) */}
        <div className="bg-white rounded-3xl p-10 md:p-12 shadow-xl border border-gray-100">
          <h3 className="text-3xl font-black mb-4 text-gray-800">FREE</h3>
          <p className="text-6xl font-black mb-6">0 €</p>
          <ul className="space-y-4 text-lg text-gray-600">
            <CheckItem isFree>5 echte Beispiel-Bewertungen sehen</CheckItem>
            <CheckItem isFree>Sehen, was unsere KI draus macht</CheckItem>
            <XItem>Kein echtes Posten</XItem>
            <XItem>Kein Business verbinden</XItem>
          </ul>
          <button
            disabled
            className="w-full mt-8 bg-gray-200 text-gray-500 font-bold text-xl py-5 rounded-2xl cursor-not-allowed h-auto"
          >
            Nur anschauen
          </button>
        </div>

        {/* PRO CARD (HERO, Fett hervorgehoben) */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.05 }}
          className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-10 md:p-12 shadow-2xl border-4 border-emerald-400"
        >
          <div className="bg-white/20 rounded-full px-4 py-1 text-sm font-bold inline-block mb-4">
            Beliebt bei über 1.200 Unternehmen
          </div>
          <h3 className="text-4xl font-black mb-4">PRO</h3>
          <p className="text-6xl font-black mb-6">
            99 €<span className="text-2xl opacity-70"> / Monat</span>
          </p>
          <ul className="space-y-5 text-lg">
            <CheckItem>14 Tage kostenlos testen</CheckItem>
            <CheckItem>Unbegrenzt Locations verbinden</CheckItem>
            <CheckItem>SMS-Freigabe per „1" oder ignorieren</CheckItem>
            <CheckItem>Auto-Pilot inklusive (4-5★ Reviews laufen automatisch)</CheckItem>
            <CheckItem>Kritische & 1-3★ Reviews kommen immer zu dir</CheckItem>
            <CheckItem>Support direkt per WhatsApp an den Gründer</CheckItem>
          </ul>
          <a
            href="/api/auth/google"
            className="block w-full mt-8 bg-white text-emerald-600 hover:bg-gray-100 text-xl font-black py-6 rounded-2xl text-center shadow-lg transition transform hover:scale-[1.02]"
          >
            Jetzt 14 Tage kostenlos starten →
          </a>
          <p className="text-center mt-4 text-sm opacity-90">Danach 99 €/Monat • Jederzeit kündbar</p>
        </motion.div>
      </div>

      <div className="text-center mt-20">
        <p className="text-3xl font-black text-gray-800">
          Nie mehr Zeit mit Google-Bewertungen verschwenden.
          <br />
          <span className="text-emerald-600">Nie mehr.</span>
        </p>
      </div>
    </div>
  );
}

