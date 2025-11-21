'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Loader2, CheckCircle, User, MessageSquare, X } from 'lucide-react';

// Mock-Daten für die automatische Generierung (Muss durch Ihre tatsächliche Logik ersetzt werden)
const MOCK_BUSINESS_NAME = "Kiez Döner Berlin";
const MOCK_INDUSTRY = "Döner-Imbiss";
const MOCK_LOKALKOLORIT_SCORE = 15; // > 10 bedeutet witzig möglich

interface SignatureModalProps {
  isOpen: boolean;
  onSaveSuccess: () => void;
  initialNames?: string[]; // Aktuelle Namen aus der DB (falls vorhanden)
  businessName?: string;
  industry?: string;
}

// Hilfsfunktion zur Generierung der Vorlagen (basierend auf Ihren Regeln)
const generateTemplates = (names: string[], businessName: string, industry: string) => {
  const primaryName = names[0];
  
  // Einfache Lokalkolorit-Logik (Mock)
  const isWittyPossible = MOCK_LOKALKOLORIT_SCORE > 10;
  const teamWords = industry.includes('Hotel') ? 'Team' : (industry.includes('Döner') ? 'Jungs' : 'Team');
  
  const templates: Array<{
    style: 'friendly' | 'professional' | 'witty';
    label: string;
    template: string;
  }> = [
    {
      style: 'friendly',
      label: 'Persönlich/Warm',
      template: primaryName ? `– ${primaryName} & das ${teamWords} vom ${businessName}` : `– Das gesamte ${teamWords} vom ${businessName}`,
    },
    {
      style: 'professional',
      label: 'Professionell/Neutral',
      template: `– Ihr ${teamWords} von ${businessName}`,
    },
  ];

  if (isWittyPossible) {
    templates.push({
      style: 'witty',
      label: 'Witzig/Locker (Lokalkolorit)',
      template: primaryName ? `– ${primaryName} & die Dönermafia` : `– Die Dönermafia`,
    });
  }

  return templates;
};

export const SignatureModal: React.FC<SignatureModalProps> = ({ 
  isOpen, 
  onSaveSuccess, 
  initialNames = [],
  businessName = MOCK_BUSINESS_NAME,
  industry = MOCK_INDUSTRY,
}) => {
  const [names, setNames] = useState<string[]>(initialNames.length > 0 ? initialNames : ['', '', '']);
  const [selectedStyle, setSelectedStyle] = useState<'friendly' | 'professional' | 'witty' | 'none'>('friendly');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Generierung der Signatur-Vorlagen
  const templates = useMemo(() => {
    const validNames = names.filter(n => n.trim().length > 0);
    return generateTemplates(validNames, businessName, industry);
  }, [names, businessName, industry]);
  
  // 2. Live-Vorschau der Signatur (basierend auf gewähltem Stil)
  const liveSignature = useMemo(() => {
    if (selectedStyle === 'none') return '';
    const template = templates.find(t => t.style === selectedStyle);
    return template ? template.template : (templates[0]?.template || '');
  }, [selectedStyle, templates]);
  
  // 3. Fiktive Beispiel-Antwort für die Vorschau
  const previewAnswer = "Vielen Dank für die 5★! Wir freuen uns riesig auf deinen nächsten Besuch.";

  // Setze initialen Stil, falls der Standard nicht verfügbar ist
  useEffect(() => {
    if (selectedStyle === 'friendly' && templates.length > 0 && templates[0].style !== 'friendly') {
      setSelectedStyle(templates[0].style);
    }
  }, [templates, selectedStyle]);

  const handleSave = async () => {
    setIsLoading(true);
    
    const validNames = names.filter(name => name.trim().length > 0);
    let finalTemplate = '';
    
    if (selectedStyle !== 'none') {
      const template = templates.find(t => t.style === selectedStyle);
      finalTemplate = template ? template.template : '';
    }
    
    const payload = {
      signatureNames: validNames,
      signatureStyle: selectedStyle,
      signatureTemplate: finalTemplate,
    };

    try {
      const response = await fetch('/api/user/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSaveSuccess(); // Schließt Modal und erlaubt Zugriff aufs Dashboard
      } else {
        const error = await response.json();
        alert(error.error || 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Ein Netzwerkfehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  
  // Soft Block: Kann nicht weggeklickt werden, wenn Onboarding nicht abgeschlossen
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header - KEIN Close Button (Soft Block!) */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Eine letzte Kleinigkeit – damit deine Antworten echt menschlich klingen
          </h2>
        </div>

        <div className="p-6 space-y-8">
          {/* SCHRITT 1: NAMEN EINGEBEN */}
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center text-gray-800">
              <User className="w-5 h-5 mr-2 text-emerald-600" /> 1. Wer unterschreibt?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {names.map((name, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder={`Name ${index + 1}${index === 0 ? ' (Pflicht)' : ' (optional)'}`}
                    value={name}
                    required={index === 0}
                    onChange={(e) => {
                      const newNames = [...names];
                      newNames[index] = e.target.value;
                      setNames(newNames);
                      // Wenn der Hauptname leer ist, muss der Stil auf 'none' gesetzt werden, um Template-Fehler zu vermeiden
                      if (index === 0 && e.target.value.trim() === '' && selectedStyle !== 'none') {
                        setSelectedStyle(templates[0]?.style || 'none');
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-base"
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">z. B. Achmed, Lisa, Max</p>
          </div>

          {/* SCHRITT 2: SIGNATUR-STIL WÄHLEN */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" /> 2. Welcher Stil passt?
            </h3>
            
            <div className="space-y-4">
              {templates.map((template) => (
                <div 
                  key={template.style} 
                  className={`flex flex-col space-y-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedStyle === template.style 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStyle(template.style)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="signatureStyle"
                      value={template.style}
                      id={template.style}
                      checked={selectedStyle === template.style}
                      onChange={() => setSelectedStyle(template.style)}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor={template.style} className="font-medium text-lg cursor-pointer flex-1">
                      {template.label}
                    </label>
                  </div>
                  <div className="ml-8 mt-2 p-3 bg-emerald-50 rounded-md border border-emerald-200">
                    <p className="text-gray-800 font-medium">
                      {previewAnswer}
                      <br />
                      <span className="font-bold text-emerald-700">{template.template}</span>
                    </p>
                  </div>
                </div>
              ))}
          
              {/* EXTRA OPTION: KEINE SIGNATUR */}
              <div 
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedStyle === 'none' 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:bg-gray-50 bg-gray-100'
                }`}
                onClick={() => setSelectedStyle('none')}
              >
                <input
                  type="radio"
                  name="signatureStyle"
                  value="none"
                  id="none"
                  checked={selectedStyle === 'none'}
                  onChange={() => setSelectedStyle('none')}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="none" className="font-medium text-lg cursor-pointer flex-1">
                  Ich möchte gar keine Signatur (nur „Vielen Dank!")
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer mit Save Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={isLoading || (names[0].trim() === '' && selectedStyle !== 'none')}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Speichere...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Sieht perfekt aus – speichern & loslegen
              </>
            )}
          </button>
          {names[0].trim() === '' && selectedStyle !== 'none' && (
            <p className="mt-2 text-sm text-red-500 text-center">
              Bitte gib mindestens einen Namen für die Signatur an oder wähle "keine Signatur".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

