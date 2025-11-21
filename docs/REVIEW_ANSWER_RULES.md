# 📋 Semantische und Inhaltliche Regeln für Review-Antworten

## 🔴 HARD CONSTRAINTS (Nicht verhandelbar - Höchste Priorität)

### 1. LANGUAGE_MATCH (Absolute Priorität)
- **Regel**: Die Antwort MUSS in der exakt gleichen Sprache wie die Original-Review verfasst werden
- **Beispiele**:
  - Englische Review → Englische Antwort
  - Deutsche Review → Deutsche Antwort
  - Türkische Review → Türkische Antwort
  - Arabische Review → Arabische Antwort
- **Priorität**: Diese Regel hat ABSOLUTE PRIORITÄT über alle anderen Einstellungen
- **Implementierung**: `src/lib/config/aiRules.ts` → `LANGUAGE_MATCH: true`

### 2. TONE_WARMTH_MIN (90% Wärme-Level)
- **Regel**: Antworten müssen mindestens 90% warm und freundlich sein
- **Bedeutung**: Antworten müssen einladend, freundlich und warm sein
- **Nicht erlaubt**: Steif, abweisend oder belehrend
- **Implementierung**: `src/lib/config/aiRules.ts` → `TONE_WARMTH_MIN: 0.9`

### 3. MAX_EMOJIS (1 Emoji)
- **Regel**: Genau 1 Emoji pro Antwort
- **Erlaubte Emojis**: 😊 🙂 😄 😉 (passend zur Stimmung)
- **Nicht erlaubt**: Mehr als 1 Emoji
- **Implementierung**: `src/lib/config/aiRules.ts` → `MAX_EMOJIS: 1`

### 4. SIGNATURE_MODE (Signatur - Flexibel seit Nov 2025)
- **Regel**: Signatur ist **empfohlen**, aber abschaltbar
- **User-Wahl**: 
  - Keine Signatur (möglich)
  - 1-3 Namen + Stilwahl (freundlich / professionell / witzig)
- **Dynamische Anpassung**: 
  - Signatur wird automatisch an **Lokalkolorit-Score** angepasst
  - Neukölln = locker, Zehlendorf = höflich
  - Döner = witzig möglich, Hotel = professionell
- **Format-Beispiele**: 
  - "Dein Max", "Deine Sarah", "Dr. Müller & Team"
  - "– Achmed & die Jungs vom Kiez Döner" (Lokalkolorit)
  - "– Ihr Team von Hotel Adlon" (professionell)
- **Implementierung**: `src/lib/config/aiRules.ts` → `SIGNATURE_MODE: "flexible"`

---

## 📐 STRUKTURELLE REGELN

### 1. Länge (Dynamisch)
- **Basis**: Antwort-Länge wird dynamisch an Review-Länge angepasst
- **Formel**:
  - Review: 0 Wörter → Antwort: 8-18 Wörter
  - Review: ≤30 Wörter → Antwort: 20-40 Wörter
  - Review: ≤60 Wörter → Antwort: 35-55 Wörter
  - Review: >60 Wörter → Antwort: 50-70 Wörter
- **Maximum**: NIEMALS länger als das 1,5-fache der Original-Review
- **Standard**: 2-3 Sätze, maximal 50 Wörter (wenn nicht dynamisch berechnet)

### 2. Struktur (Immer exakt)
1. **Satz 1**: Emotion des Kunden spiegeln (Dank oder Empathie)
2. **Satz 2**: Wertschätzung zeigen ODER konkrete Lösung nennen
3. **Satz 3** (falls Platz): Persönliche Einladung + echter Name/Team

### 3. Englischer Tag (Für nicht-DE/EN Reviews)
- **Regel**: Wenn Review NICHT auf Deutsch oder Englisch ist
- **Aktion**: Am Ende einen kurzen englischen Einzeiler hinzufügen (max. 10 Wörter)
- **Zweck**: Kern der Review zusammenfassen
- **Beispiele**:
  - Türkische Review über "sos" → "Yes, our sauces are delicious!"
  - Arabische Review über "الضيافة" → "Thank you for loving our hospitality!"

---

## 🎯 INHALTLICHE REGELN

### 1. Ton-Mix
- **90%**: Warm & freundlich
- **10%**: Professionell
- **Nicht erlaubt**: Steif, abweisend, belehrend

### 2. Sentiment-basierte Anpassung
- **Positive Reviews (4-5★)**:
  - Danken
  - Einladend bleiben
  - Wertschätzung zeigen
  
- **Negative Reviews (1-3★)**:
  - Empathie zuerst
  - Konkrete Lösung nennen
  - Persönlicher Kontakt anbieten ("Ich rufe dich an", "Komm gerne vorbei")

### 3. Spezialfälle
- **Nur Sterne (kein Text)**:
  - Ultra-kurz, aber herzlich
  - Keine Überladung
  
- **Irrelevante Reviews** (z.B. "Burger" beim Zahnarzt):
  - Leichter, freundlicher Humor
  - Zurück zum echten Service lenken
  - Nicht vorwurfsvoll

---

## 🎯 KRITISCHER SPEZIALFALL: Off-Topic / Irrelevante Reviews

### Erkennungslogik für irrelevante Reviews

**Review hat KEINEN Bezug zum Business, wenn:**
- Inhalt passt zu komplett anderer Branche (Burger/Fritten bei Zahnarzt)
- Verwechslung mit anderem Geschäft offensichtlich
- Thema hat NULL mit dem Service zu tun
- Kunde war offensichtlich an falscher Location

**Review ist KEIN Off-Topic, wenn:**
- Kunde kritisiert allgemeine Dinge (Parkplatz, Wartezeit, Freundlichkeit)
- Beschwerde über Preis, Service, Erreichbarkeit
- Negative Erfahrung ist nachvollziehbar (auch wenn überzogen)

### Antwort-Template für Off-Topic Reviews

**Struktur (immer exakt):**
1. **Satz 1**: Leichter, freundlicher Humor (Emotion spiegeln)
2. **Satz 2**: Zurück zum echten Service lenken
3. **Satz 3** (falls Platz): Persönliche Einladung + echter Name/Team

**WICHTIGE REGELN:**
- **Sprache:** Exakt die Sprache der Original-Review
- **Länge:** Dynamisch an Review-Länge (8-70 Wörter je nach Original)
- **Ton:** 90% warm & freundlich, 10% professionell
- **Emoji:** Genau 1 Emoji (😊 🙂 😄 😉)
- **Unterschrift:** Empfohlen - echter Vorname oder "& Team" (z.B. "Dein Max", "Sarah & Team") - kann aber auch weggelassen werden
- **Lokalkolorit:** Signatur-Stil wird automatisch an Standort angepasst (Neukölln = locker, Zehlendorf = höflich)
- **Verboten:** Rechtfertigen, streiten, "Leider", generische Floskeln

### Beispiele: Zahnarzt bekommt Burger-Review

#### ❌ FALSCH (zu defensiv):
> "Diese Review gehört nicht zu uns. Wir sind ein Zahnarzt und verkaufen keine Burger. Bitte löschen Sie diese Review."

#### ❌ FALSCH (zu passiv-aggressiv):
> "Interessant! Wir wussten gar nicht, dass wir Burger anbieten. Vielleicht waren Sie im falschen Restaurant?"

#### ✅ RICHTIG (leichter Humor + Umleitung):
> "Haha, die Fritten müssen wir noch verbessern! 😄 Falls Sie mal eine professionelle Zahnreinigung brauchen, sind wir die Richtigen. Komm gerne vorbei – Dein Dr. Müller & Team"

#### ✅ RICHTIG (Alternative):
> "Burger und Fritten klingt lecker – wir sind aber auf Zähne spezialisiert! 😊 Wenn Sie mal eine Zahnbehandlung brauchen, helfen wir gerne weiter. Deine Sarah"

### Weitere Beispiele

#### Beispiel 1: Steuerberater bekommt Friseur-Review
**Review:** *"Meine Dauerwelle ist kraus geworden, nie wieder!"*

**Antwort:**
> "Oh nein, eine krause Dauerwelle ist wirklich ärgerlich! 😅 Falls Sie stattdessen mal Hilfe bei der Steuererklärung brauchen, sind wir die Richtigen. Komm gerne vorbei – Dein Max"

#### Beispiel 2: Autowerkstatt bekommt Restaurant-Review
**Review:** *"Das Schnitzel war zäh und der Service langsam."*

**Antwort:**
> "Ein zähes Schnitzel würden wir auch nicht empfehlen! 😄 Bei uns gibt's zwar kein Essen, dafür reparieren wir Ihr Auto zuverlässig. Schau gerne vorbei – Dein Team"

#### Beispiel 3: Yoga-Studio bekommt Mechaniker-Review
**Review:** *"Ölwechsel dauerte ewig, Bremsen quietschen immer noch."*

**Antwort:**
> "Quietschende Bremsen sind nicht entspannend – da können wir nicht helfen! 😊 Aber für Entspannung durch Yoga sind wir die Experten. Komm gerne vorbei – Deine Sarah & Team"

### Off-Topic: DO's & DON'Ts

#### ✅ DO's:
- **Humor nutzen** (aber nie sarkastisch!)
- **Sprache:** Exakt die Sprache der Original-Review verwenden
- **Länge:** Dynamisch an Review-Länge anpassen (8-70 Wörter)
- **Positiv umlenken** zum eigenen Service
- **Genau 1 Emoji** (😊 🙂 😄 😉)
- **Unterschrift:** Empfohlen - echter Vorname oder "& Team" (flexibel, kann weggelassen werden)
- **Ton:** 90% warm & freundlich, 10% professionell

#### ❌ DON'Ts:
- **NIEMALS** vorwurfsvoll sein
- **NIEMALS** "Das gehört nicht zu uns" (klingt unhöflich)
- **NIEMALS** "Leider", "Bedauerlicherweise" ohne konkrete Maßnahme
- **NIEMALS** um Löschung bitten (öffentlich)
- **NIEMALS** den Reviewer bloßstellen
- **NIEMALS** mehr als 1 Emoji
- **NIEMALS** generische Floskeln ("Ihr Feedback ist uns wichtig")
- **NIEMALS** rechtfertigen oder streiten

### Erkennungs-Algorithmus (für automatische Detection)

Die Off-Topic-Erkennung erfolgt über Keyword-Matching in `src/lib/ai/response-generator.ts`:

```typescript
const OFF_TOPIC_KEYWORDS = {
  dentist: ['burger', 'pizza', 'schnitzel', 'essen', 'food', 'restaurant', 'kellner'],
  restaurant: ['zahnreinigung', 'zahnarzt', 'plombe', 'karies', 'dental'],
  lawyer: ['haarschnitt', 'friseur', 'dauerwelle', 'färben'],
  mechanic: ['massage', 'yoga', 'entspannung', 'meditation'],
  // ... mehr Mappings
};

// Prüfe ob mindestens 2 Off-Topic Keywords vorkommen
const matches = keywords.filter(kw => text.includes(kw));
return matches.length >= 2;
```

### Eskalationsstufen

#### Level 1: Off-Topic (Verwechslung)
→ **Humorvolle Antwort** wie oben beschrieben

#### Level 2: Spam / Fake
→ **Kurze Standardantwort** + Review bei Google melden
```
"Vielen Dank für Ihr Feedback. Leider können wir diese Review nicht zuordnen. Falls Sie Kunde bei uns waren, kontaktieren Sie uns gerne direkt."
```

#### Level 3: Beleidigend / Hassrede
→ **Keine öffentliche Antwort** + sofort bei Google melden
→ Ggf. rechtliche Schritte prüfen

### Ziel der Off-Topic-Antwort

**Primär:** Zeige anderen Lesern, dass du professionell & humorvoll bleibst

**Sekundär:** Reviewer wird eventuell Review selbst löschen (aus Peinlichkeit)

**Tertiär:** Google erkennt, dass Review nicht zum Business passt (kann Ranking beeinflussen)

### Wichtiger Hinweis

Laut Google-Best-Practices sollten irrelevante Reviews gemeldet werden, aber eine professionelle öffentliche Antwort zeigt anderen Kunden, dass das Business aktiv ist und mit Feedback umgehen kann. Eine humorvolle Antwort kann sogar die **Sympathie potenzieller Kunden erhöhen**, weil sie zeigt:

✅ Das Team nimmt sich nicht zu ernst  
✅ Professioneller Umgang auch mit Absurditäten  
✅ Aktive Präsenz & schnelle Reaktion  
✅ Positiver Brand-Charakter

---

## 🚫 VERBOTENE INHALTE

### 1. Sprache & Formulierung
- ❌ Rechtfertigen
- ❌ Streiten
- ❌ "Leider" ohne konkrete Maßnahme
- ❌ "Bedauerlicherweise" ohne Lösung
- ❌ "Tut mir leid, dass..." ohne konkrete Maßnahme
- ❌ Mehr als 1 Emoji
- ❌ Generische Floskeln ("Ihr Feedback ist uns wichtig")
- ❌ Englische Hauptantwort bei nicht-englischen Reviews

### 2. Formale Elemente
- ❌ "Mit freundlichen Grüßen" oder formelles Ende
- ❌ Corporate-Sprache (nicht persönlich)
- ❌ "Das gehört nicht zu uns" (klingt unhöflich)
- ❌ Um Löschung bitten
- ❌ Reviewer bloßstellen

### 3. Compliance-Verbote
- ❌ Diskriminierende, beleidigende oder stereotype Sprache
- ❌ Medizinische Ratschläge oder Diagnosen
- ❌ Rechtsberatung
- ❌ Versprechen über Rabatte oder Angebote ohne explizite Freigabe
- ❌ Vorwurfsvoll sein

---

## ✅ ERLAUBTE & EMPFOHLENE INHALTE

### 1. Persönlichkeit
- ✅ Persönlich, nicht corporate
- ✅ Authentisch
- ✅ Signatur (empfohlen): Echter Vorname oder "& Team" - kann aber auch weggelassen werden
- ✅ Lokalkolorit-basierte Signatur (automatisch angepasst an Standort)
- ✅ Warm & einladend

### 2. Lösungsorientierung
- ✅ Konkrete Lösungen anbieten
- ✅ Persönlichen Kontakt anbieten
- ✅ Empathie zeigen
- ✅ Wertschätzung ausdrücken

### 3. Formatierung
- ✅ Prägnant und authentisch
- ✅ 1 Emoji (passend zur Stimmung)
- ✅ Signatur mit echtem Namen (empfohlen, aber flexibel - kann weggelassen werden)

---

## 📍 QUELLEN DER REGELN

### Hard-Constraints
- **Datei**: `src/lib/config/aiRules.ts`
- **Funktion**: `generateHardConstraintPrompt()`
- **Validierung**: `validateHardConstraints()`

### Strukturelle & Inhaltliche Regeln
- **Datei**: `src/app/api/ai/generate-responses/route.ts`
- **Funktion**: `generateResponseForTone()`
- **Zeilen**: 145-185

### Compliance-Regeln
- **Datei**: `src/lib/ai/response-generator.ts`
- **Funktion**: `buildPrompt()`
- **Zeilen**: 101-111

### Off-Topic Review Behandlung
- **Datei**: `src/lib/ai/response-generator.ts`
- **Funktion**: `isOffTopicReview()`, `buildOffTopicPrompt()`, `generateOffTopicResponse()`
- **Erkennung**: Keyword-basiert (mindestens 2 Off-Topic Keywords)
- **Behandlung**: Spezieller Prompt mit humorvollem Ton

---

## 🔄 WORKFLOW

1. **Hard-Constraints prüfen** → Sprache, Wärme-Level, Emoji-Limit
2. **Review analysieren** → Länge, Sentiment, Sprache
3. **Struktur anwenden** → 3-Satz-Struktur mit Signatur (falls gewählt)
4. **Ton anpassen** → Basierend auf Rating und Sentiment
5. **Validierung** → Gegen Hard-Constraints prüfen
6. **Manuelle Freigabe** → User prüft vor Veröffentlichung

---

**Letzte Aktualisierung**: 2025-01-XX
**Version**: 1.2.0

**Änderungen in v1.2.0**:
- Signatur-Regel aktualisiert: Jetzt flexibel (empfohlen, aber abschaltbar)
- Lokalkolorit-Score Integration dokumentiert
- Dynamische Signatur-Generierung (1-3 Namen + Stilwahl) dokumentiert

**Hinweis**: Diese Dokumentation konsolidiert die Regeln aus:
- `src/lib/config/aiRules.ts` (Hard-Constraints)
- `src/app/api/ai/generate-responses/route.ts` (Haupt-Engine-Regeln)
- `src/lib/ai/response-generator.ts` (Compliance & Off-Topic)

**Konsolidierung**: Alle Off-Topic-Regeln wurden in diese Dokumentation integriert.

