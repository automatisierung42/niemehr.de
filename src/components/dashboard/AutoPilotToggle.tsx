'use client';

import React, { useState } from 'react';
import { Zap, Clock, Shield } from 'lucide-react';
import { calculateTimeSaved } from '@/utils/reviewClassifier';

interface AutoPilotToggleProps {
  enabled: boolean;
  manualRepliesCount: number;
  autoRepliesCount: number;
  onToggle: () => Promise<void>;
}

export default function AutoPilotToggle({
  enabled,
  manualRepliesCount,
  autoRepliesCount,
  onToggle,
}: AutoPilotToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const timeWasted = calculateTimeSaved(manualRepliesCount);
  const timeSaved = calculateTimeSaved(autoRepliesCount);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Zap className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Auto-Pilot</h2>
            <p className="text-sm text-gray-600">
              {enabled ? '🟢 Aktiv' : '⚪ Inaktiv'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`relative inline-flex h-14 w-28 items-center rounded-full transition-colors ${
            enabled ? 'bg-green-500' : 'bg-gray-300'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span
            className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform ${
              enabled ? 'translate-x-16' : 'translate-x-2'
            }`}
          />
        </button>
      </div>

      {/* Stats Before Activation */}
      {!enabled && manualRepliesCount > 0 && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <Clock className="text-purple-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-gray-700 leading-relaxed">
                Seit du zahlst, hast du bereits <strong>{manualRepliesCount} Reviews</strong> manuell freigegeben.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Das waren ca. <strong className="text-purple-600">{timeWasted} Stunden</strong> Lebenszeit.
              </p>
              <p className="text-gray-900 font-semibold mt-3">
                💡 Schalte jetzt auf Auto-Pilot → ab sofort läuft alles von allein.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats After Activation */}
      {enabled && (
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm font-medium text-gray-700">Automatisch beantwortet</span>
            <span className="text-lg font-bold text-green-600">{autoRepliesCount}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-sm font-medium text-gray-700">Zur Freigabe gesendet</span>
            <span className="text-lg font-bold text-purple-600">{manualRepliesCount}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <span className="text-sm font-medium text-green-800">⏱️ Zeit gespart</span>
            <span className="text-lg font-bold text-green-700">{timeSaved} Std</span>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-900">
          <p className="font-semibold mb-1">So funktioniert's:</p>
          <ul className="space-y-1 text-blue-800">
            <li>✅ 4-5★ Reviews → Automatisch beantwortet</li>
            <li>⚠️ ≤3★ Reviews → Immer zur Freigabe</li>
            <li>🚨 Kritische Keywords → Immer zur Freigabe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

