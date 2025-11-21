# Compliance Decisions Made

**Projekt:** niemehr.de  
**Datum:** 2025-11-16

---

## Entscheidungen gemäß KI-Protokoll

### Entscheidung 1: Kennzeichnung KI-generierter Inhalte

**Entscheidung:** Option B - Diskrete Kennzeichnung

**Begründung:** 
- Transparent und AI Act-konform
- Weniger aufdringlich als deutliche Kennzeichnung
- Erfüllt Transparenzpflichten ohne User Experience zu beeinträchtigen

**Umsetzung:**
- Dashboard-Hinweis bei jeder AI-generierten Antwort
- Optionaler Footer möglich (per Einstellung)
- Transparenzhinweis in AGBs

---

### Entscheidung 2: Rechtsgrundlage für Reviewer-Daten

**Entscheidung:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)

**Begründung:**
- Reviews sind bereits öffentlich auf Google Maps
- Keine zusätzliche Offenlegung durch niemehr.de
- Human-in-the-Loop reduziert Risiko
- Berechtigtes Interesse (Reputation Management) überwiegt

**Dokumentiert in:** `INTERESSENABWAEGUNG_ART6_LIT_F.md`

---

### Entscheidung 3: Cookie-Consent

**Entscheidung:** Eigene einfache Lösung für MVP

**Begründung:**
- Nur technisch notwendige Cookies (Session)
- Kein Consent erforderlich für essentielle Cookies
- Später bei Analytics/Marketing: Library verwenden

**Umsetzung:**
- Einfacher Info-Banner
- Link zu Datenschutzerklärung
- Dismissible

---

### Entscheidung 4: Branchen-Filter

**Entscheidung:** Grundstruktur sofort, erweiterte Filter später

**Begründung:**
- MVP-Fokus auf Kernfunktionalität
- Grundlegende Warnungen bei Gesundheits-Keywords
- Vollständige branchenspezifische Prompts in Phase 2 (Post-Launch)

**Umsetzung:**
- Code-Struktur vorbereiten
- Basis-Warnungen implementieren
- Erweiterte Filter dokumentieren für später

---

### Entscheidung 5: User Rights Implementation

**Entscheidung:** Mindestens Datenexport vor Launch, Rest kann nachgeholt werden

**Begründung:**
- Datenexport ist kritischste Funktion
- Account-Löschung kann mit Soft-Delete nachgeholt werden
- Privacy Settings können iterativ erweitert werden

**Priorität:**
1. Datenexport (HOCH)
2. Account-Löschung (MITTEL)
3. Privacy Settings (NIEDRIG)

---

## Offene Entscheidungen

### Kontaktdaten
- **Status:** Benötigt vom Projekt-Owner
- **Aktion:** Platzhalter verwenden, vor Launch aktualisieren

### Datenschutzbeauftragter
- **Status:** Prüfen ob erforderlich (ab 20 MA)
- **Aktion:** Falls nicht erforderlich, in Datenschutzerklärung weglassen

### Impressum Details
- **Status:** Benötigt Firmendaten
- **Aktion:** Template erstellen, Platzhalter verwenden

---

## Änderungshistorie

| Datum | Entscheidung | Begründung |
|-------|--------------|------------|
| 2025-11-16 | Cookie-Consent: Eigene Lösung | Nur essentielle Cookies, keine Library nötig |
| 2025-11-16 | Branchen-Filter: Später erweitern | MVP-Fokus |
| 2025-11-16 | User Rights: Datenexport Priorität | Kritischste Funktion zuerst |

