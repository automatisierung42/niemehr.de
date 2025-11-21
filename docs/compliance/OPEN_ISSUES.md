# Open Compliance Issues

**Projekt:** niemehr.de  
**Letzte Aktualisierung:** 2025-11-16

---

## 🔴 Kritische offene Punkte (Pre-Launch)

### 1. Kontaktdaten für rechtliche Dokumente

**Status:** ❌ Offen  
**Priorität:** 🔴 HOCH  
**Betrifft:** Impressum, Datenschutzerklärung

**Benötigt:**
- Name des Verantwortlichen (Firma/Person)
- Postanschrift
- E-Mail-Adresse (z.B. datenschutz@niemehr.de)
- Optional: Telefonnummer

**Aktion:** Projekt-Owner muss Kontaktdaten bereitstellen

---

### 2. OpenAI DPA abschließen

**Status:** ❌ Offen  
**Priorität:** 🔴 BLOCKIEREND  
**Betrifft:** Phase 2 - OpenAI Integration

**Beschreibung:**
- DPA muss manuell über OpenAI Account Settings abgeschlossen werden
- Link: https://openai.com/policies/data-processing-addendum
- Vor Launch erforderlich

**Aktion:** 
- DPA abschließen
- Status in `DPA_OPENAI_STATUS.md` dokumentieren
- Abschluss-Datum vermerken

---

### 3. Datenschutzbeauftragter prüfen

**Status:** ⚠️ Zu prüfen  
**Priorität:** 🟡 MITTEL  
**Betrifft:** Datenschutzerklärung

**Beschreibung:**
- Erforderlich ab 20 Mitarbeitern mit Datenverarbeitung
- Aktueller Status: Unbekannt

**Aktion:**
- Prüfen ob erforderlich
- Falls ja: Kontaktdaten einfügen
- Falls nein: In Datenschutzerklärung weglassen oder als "aktuell nicht erforderlich" dokumentieren

---

## 🟡 Wichtige offene Punkte (Post-Launch)

### 4. Branchenspezifische Filter erweitern

**Status:** 📋 Geplant  
**Priorität:** 🟡 MITTEL  
**Betrifft:** Phase 4 - AI-Prompts

**Beschreibung:**
- Grundstruktur ist vorbereitet
- Erweiterte Filter für Medizin/Recht geplant
- Branchenspezifische Prompt-Templates

**Geplant für:** Phase 2 (Post-Launch, innerhalb 3 Monate)

---

### 5. Feedback-Mechanismus für problematische Antworten

**Status:** 📋 Geplant  
**Priorität:** 🟡 MITTEL  
**Betrifft:** Qualitätssicherung

**Beschreibung:**
- API-Endpoint für Feedback
- UI-Element "Problem melden"
- Datenbank-Model für ResponseFeedback

**Geplant für:** Phase 2 (Post-Launch)

---

### 6. Regelmäßige Qualitätsstichproben

**Status:** 📋 Geplant  
**Priorität:** 🟡 MITTEL  
**Betrifft:** Monitoring

**Beschreibung:**
- 5% der generierten Antworten prüfen
- Auf Bias, Fehler, unangemessene Inhalte
- Quartalsweise Durchführung

**Geplant für:** Phase 3 (Post-Launch, innerhalb 6 Monate)

---

## ✅ Erledigte Punkte

### Kontaktdaten-Template erstellt
- **Datum:** 2025-11-16
- **Status:** ✅ Platzhalter verwendet, wartet auf echte Daten

### VVT erstellt
- **Datum:** 2025-11-16
- **Status:** ✅ Dokumentiert, wartet auf Kontaktdaten

### Interessenabwägung dokumentiert
- **Datum:** 2025-11-16
- **Status:** ✅ Vollständig dokumentiert

---

## 📝 Notizen

- Alle kritischen Pre-Launch Punkte müssen vor Go-Live abgeschlossen sein
- Post-Launch Punkte können iterativ umgesetzt werden
- Regelmäßige Reviews der offenen Punkte empfohlen (monatlich)

