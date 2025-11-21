'use client';

import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function StickyPricingButton() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = React.useState(false);

  // Zeigt den Button, sobald der Nutzer aus dem Hero gescrollt hat
  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Angenommen, der Hero ist 800px hoch
    if (latest > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <>
      {/* Desktop: Oben rechts */}
      <motion.a
        href="#preis"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-3 px-6 rounded-full shadow-2xl transition-colors hidden md:block"
      >
        99 € →
      </motion.a>

      {/* Mobile: Unten (wie Instagram) */}
      <motion.a
        href="#preis"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 w-full z-50 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl py-4 text-center block md:hidden"
      >
        Jetzt 14 Tage kostenlos starten
      </motion.a>
    </>
  );
}

