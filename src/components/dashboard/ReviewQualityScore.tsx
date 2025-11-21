import React from 'react';
import { TrendingUp, Lock, Star } from 'lucide-react';

export default function ReviewQualityScore() {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative overflow-hidden">
      {/* Coming Soon Badge */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
          <Lock size={12} />
          Bald verfügbar
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Review Quality Score</h3>
          <p className="text-sm text-gray-600">Vergleiche deine Antworten mit unserer KI</p>
        </div>
      </div>

      {/* Preview Content (blurred) */}
      <div className="space-y-3 opacity-50 blur-sm pointer-events-none">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-900">Deine Antworten</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">Ø 6.2/10</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-400">47</p>
            <p className="text-xs text-gray-500">Antworten</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <div>
            <p className="text-sm font-medium text-primary-dark">KI-Antworten</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="fill-primary text-primary" />
              <span className="text-xs text-primary">Ø 9.1/10</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">128</p>
            <p className="text-xs text-primary/70">Antworten</p>
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-900">Zeitersparnis</p>
          <p className="text-2xl font-bold text-green-600 mt-1">8.4 Std/Monat</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg opacity-50 cursor-not-allowed">
          Freischalten mit Pro Plan
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Verfügbar ab Q1 2026 • Stimme ab für Early Access
        </p>
      </div>
    </div>
  );
}

