'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export default function CriticalReviewsInfo() {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
          <Shield className="text-white" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">So erkennen wir kritische Reviews</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-white rounded-lg p-4 border border-red-100">
          <p className="font-semibold text-red-600 mb-2">🚨 Automatisch erkannt:</p>
          <ul className="space-y-1 text-gray-700">
            <li>• Rating ≤ 3 Sterne</li>
            <li>• Keywords: "Anzeige", "Polizei", "Rechtsanwalt"</li>
            <li>• Gesundheitsamt, Ordnungsamt</li>
            <li>• Diskriminierung, Rassismus</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border border-orange-100">
          <p className="font-semibold text-orange-600 mb-2">⚠️ Branchenspezifisch:</p>
          <ul className="space-y-1 text-gray-700">
            <li>• Gastronomie: "Verdorben", "Schimmel", "Ratten"</li>
            <li>• Friseur: "Verbrannt", "Allergie", "Haare ab"</li>
            <li>• Praxis: "Fehldiagnose", "Kunstfehler"</li>
            <li>• Alle: Beleidigungen, Hasssprache</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800 font-medium">
          ✅ Diese Reviews kommen IMMER zur SMS-Freigabe – du behältst volle Kontrolle!
        </p>
      </div>
    </div>
  );
}

