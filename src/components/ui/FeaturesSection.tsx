'use client'

import React from 'react'

const features = [
  {
    emoji: '⏱️',
    title: 'Zeit sparen',
    description:
      'Automatisiere deine Google-Antworten und gewinne Stunden pro Woche. Kein manuelles Tippen mehr.',
  },
  {
    emoji: '💯',
    title: '100% Antworten',
    description:
      'Jede Review wird beantwortet – positiv wie negativ. Google liebt dich, Kunden vertrauen dir.',
  },
  {
    emoji: '📈',
    title: 'Rating-Boost',
    description:
      'Steigere dein Google-Rating durch konsistente, professionelle Antworten. Mehr Sichtbarkeit = mehr Kunden.',
  },
  {
    emoji: '🎯',
    title: 'Deine Markenstimme',
    description:
      'KI-generierte Antworten, die zu deinem Ton passen. Professional, freundlich oder locker – du entscheidest.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-2xl md:text-3xl font-bold text-gray-900">
          Warum niemehr.de?
        </h2>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6 text-center shadow-lg transition-all hover:border-emerald-400"
            >
              <div className="mb-4 text-3xl md:text-4xl">{feature.emoji}</div>
              <h3 className="mb-2 text-base md:text-lg lg:text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

