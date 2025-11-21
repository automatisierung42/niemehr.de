'use client';

import React from 'react';

interface BlurOverlayProps {
  message?: string;
}

export default function BlurOverlay({ message = 'Anmelden für komplette Antwort' }: BlurOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10 rounded-xl">
      <a
        href="#preis"
        className="text-emerald-600 font-black text-center text-xl p-4 bg-white shadow-lg rounded-lg border-2 border-emerald-400 transform hover:scale-105 transition"
      >
        {message} →
      </a>
    </div>
  );
}

