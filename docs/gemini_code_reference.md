# Code-Referenz für Gemini - Landing Page Redesign

## Schnell-Referenz: Alle Komponenten im Überblick

### 1. Haupt-Landing Page

**Datei:** `src/app/page.tsx`

```typescript
'use client'

import React, { useState } from 'react'
import { RatingBoostHero } from '@/components/landing/RatingBoostHero'
import { ScanResultModal } from '@/components/landing/ScanResultModal'
import { FeaturesSection } from '@/components/ui/FeaturesSection'
import { ResponseComparison } from '@/components/landing/ResponseComparison'
import BusinessSearchWithPreview from '@/components/BusinessSearchWithPreview'

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scannedBusiness, setScannedBusiness] = useState('')

  return (
    <main className="min-h-screen bg-white">
      <RatingBoostHero />
      <BusinessSearchWithPreview />
      <ResponseComparison />
      <FeaturesSection />
      <ScanResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        businessName={scannedBusiness}
      />
    </main>
  )
}
```

---

### 2. Hero-Komponente (RatingBoostHero)

**Datei:** `src/components/landing/RatingBoostHero.tsx`

**Wichtige Design-Elemente:**
- Gradient: `bg-gradient-to-b from-white to-background`
- Brand-Logo mit dekorativen Pills
- Haupt-CTA: `/api/auth/google`
- Value Prop Badge: `bg-primary/5`

**Aktuelle Klassen:**
- Hero Container: `min-h-[90vh]`, `flex`, `flex-col`, `items-center`, `justify-center`
- Überschrift: `text-4xl md:text-5xl lg:text-6xl`, `font-bold`, `text-primary-dark`
- CTA Button: `bg-secondary`, `hover:bg-secondary/90`, `rounded-lg`, `shadow-lg`

---

### 3. Vergleichssektion (ResponseComparison)

**Datei:** `src/components/landing/ResponseComparison.tsx`

**Wichtige Design-Elemente:**
- Zwei Cards im Grid: `md:grid-cols-2`
- Links (negativ): `bg-red-50`, `border-red-200`
- Rechts (positiv): `bg-emerald-50`, `border-emerald-500`
- Hover: `hover:scale-105`, `transition`
- CTA: `bg-emerald-600`, `hover:bg-emerald-700`, `rounded-full`

**Struktur:**
```typescript
<section className="bg-gradient-to-b from-slate-50 to-white py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1>...</h1>
    <p>...</p>
    <div className="grid md:grid-cols-2 gap-8">
      {/* Negative Card */}
      {/* Positive Card */}
    </div>
    <div className="mt-16">
      {/* CTA Button */}
    </div>
  </div>
</section>
```

---

### 4. Features-Sektion

**Datei:** `src/components/ui/FeaturesSection.tsx`

**Features Array:**
```typescript
const features = [
  { emoji: '⏱️', title: 'Zeit sparen', description: '...' },
  { emoji: '💯', title: '100% Antworten', description: '...' },
  { emoji: '📈', title: 'Rating-Boost', description: '...' },
  { emoji: '🎯', title: 'Deine Markenstimme', description: '...' },
]
```

**Grid-Layout:**
- Desktop: `lg:grid-cols-4`
- Tablet: `md:grid-cols-2`
- Mobile: `grid-cols-1`

**Card-Styling:**
- `rounded-xl`, `border-2`, `border-gray-200`
- `hover:border-secondary/50`, `hover:shadow-lg`, `hover:scale-105`

---

### 5. Business Search Komponente

**Datei:** `src/components/BusinessSearchWithPreview.tsx`

**Wichtige Funktionen:**
- Debounced Search (300ms)
- Google Places API Integration
- Review-Vorschau mit AI-Antworten
- Copy-to-Clipboard

**Design-Elemente:**
- Suchfeld: `border-2`, `border-gray-300`, `focus:border-purple-500`
- Review Cards: Farbcodiert (blau, grün, rot)
- AI Response Cards: `bg-green-50`, `bg-blue-50`, `bg-purple-50`

**WICHTIG:** Diese Komponente ist komplex und sollte funktional bleiben!

---

## Design-System Referenz

### Farben (Tailwind Config)

```javascript
colors: {
  primary: {
    DEFAULT: '#2563eb',    // Blau
    dark: '#1e40af',      // Dunkles Blau
  },
  secondary: {
    DEFAULT: '#10b981',   // Grün (Emerald)
  },
  accent: {
    DEFAULT: '#f59e0b',   // Orange
  },
  background: '#f9fafb', // Hellgrau
}
```

### Typografie

- **Font:** Inter (Google Fonts)
- **Hero:** `text-4xl` bis `text-6xl`, `font-bold`
- **Sektionen:** `text-2xl` bis `text-3xl`, `font-bold`
- **Body:** `text-base` bis `text-lg`, `text-gray-700`

### Spacing

- **Sektionen:** `py-12` bis `py-20`
- **Container:** `max-w-6xl` bis `max-w-7xl`, `mx-auto`
- **Gaps:** `gap-6` bis `gap-8`

### Border Radius

- **Cards:** `rounded-xl` bis `rounded-2xl`
- **Buttons:** `rounded-lg` bis `rounded-full`

---

## Häufig verwendete Tailwind-Klassen

### Layout
```css
max-w-6xl mx-auto px-6
grid md:grid-cols-2 gap-8
flex items-center justify-center
```

### Typography
```css
text-4xl md:text-5xl lg:text-6xl font-bold
text-gray-700 leading-relaxed
```

### Colors
```css
bg-secondary hover:bg-secondary/90
text-primary-dark
bg-emerald-600 hover:bg-emerald-700
```

### Effects
```css
hover:scale-105 transition
shadow-lg hover:shadow-xl
transform hover:scale-105
```

---

## Responsive Breakpoints

- **Mobile:** Default (< 768px)
- **Tablet:** `md:` (≥ 768px)
- **Desktop:** `lg:` (≥ 1024px)

**Beispiel:**
```css
text-2xl md:text-3xl lg:text-4xl
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

---

## Icons (Lucide React)

**Verwendete Icons:**
- `Search` - Suchfeld
- `Star` - Bewertungen
- `Copy` - Copy-Funktion
- `Check` - Bestätigung
- `TrendingUp` - Neueste Review
- `ChevronDown` - Kritische Review
- `Sparkles` - AI-generiert
- `Camera` - Fotos in Reviews

**Import:**
```typescript
import { Search, Star, Copy, Check } from 'lucide-react'
```

---

## Animationen (Framer Motion verfügbar)

**Package:** `framer-motion: ^11.0.0`

**Beispiel-Nutzung:**
```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

---

## CTAs & Links

**Haupt-CTAs:**
- `/api/auth/google` - Google OAuth Start
- `/dashboard` - Dashboard (nach Login)

**Beispiel Button:**
```tsx
<a
  href="/api/auth/google"
  className="bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-8 rounded-lg"
>
  Jetzt kostenlos starten →
</a>
```

---

## Wichtige Hinweise für Gemini

### ✅ DO's

- Verwende Tailwind CSS Klassen
- Behalte TypeScript-Typen bei
- Verwende bestehende Farb-Palette (primary, secondary, accent)
- Responsive Design (mobile-first)
- Behalte Funktionalität bei

### ❌ DON'Ts

- Keine Breaking Changes
- Keine neuen Dependencies ohne Absprache
- Keine Hardcoded-Farben (außerhalb Design-System)
- Keine Funktionalität entfernen

---

## Datei-Struktur

```
src/
├── app/
│   ├── page.tsx                    # Haupt-Landing Page
│   ├── layout.tsx                  # Root Layout
│   └── globals.css                 # Globale Styles
├── components/
│   ├── landing/
│   │   ├── RatingBoostHero.tsx     # Hero-Sektion
│   │   ├── ResponseComparison.tsx  # Vergleichssektion
│   │   └── ScanResultModal.tsx      # Modal
│   ├── ui/
│   │   └── FeaturesSection.tsx     # Features
│   └── BusinessSearchWithPreview.tsx # Business Search
└── ...
```

---

## Quick Start Checkliste

1. ✅ Alle Komponenten gelesen
2. ✅ Design-System verstanden
3. ✅ Farb-Palette notiert
4. ✅ Responsive Breakpoints bekannt
5. ✅ Icons-Package bekannt (Lucide)
6. ✅ Animation-Package verfügbar (Framer Motion)
7. ✅ TypeScript-Typen beibehalten
8. ✅ Funktionalität erhalten

---

**Viel Erfolg! 🎨**

