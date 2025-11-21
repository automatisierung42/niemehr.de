'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface DemoHeaderProps {
  businessName: string;
  step: 1 | 2 | 3;
}

export function DemoHeader({ businessName, step }: DemoHeaderProps) {
  const stepLabels = {
    1: 'Schritt 1 von 3: Style wählen',
    2: 'Schritt 2 von 3: Ergebnisse prüfen',
    3: 'Schritt 3 von 3: Loslegen',
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-4 rounded-full bg-secondary"></div>
              <div className="w-2 h-4 rounded-full bg-accent"></div>
              <div className="w-2 h-4 rounded-full bg-secondary"></div>
            </div>
            <span className="text-lg md:text-xl font-bold text-primary-dark">Nie Mehr</span>
          </Link>
          
          <div className="flex items-center space-x-3 md:space-x-4">
            <span className="text-xs md:text-sm text-gray-700 font-medium hidden sm:inline">{stepLabels[step]}</span>
            <div className="flex space-x-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s <= step ? 'bg-secondary w-6' : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

