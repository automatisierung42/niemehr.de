# Incident Response Plan

**Projekt:** niemehr.de  
**Erstellt:** 2025-11-16  
**Letzte Aktualisierung:** 2025-11-16

---

## 1. Übersicht

Dieser Plan beschreibt den Prozess für den Umgang mit Datenschutzverletzungen und anderen Sicherheitsvorfällen gemäß Art. 33/34 DSGVO.

---

## 2. Verantwortlichkeiten

| Rolle | Verantwortlichkeit | Kontakt |
|-------|-------------------|---------|
| **Geschäftsführung** | Finale Entscheidungen, Eskalation | [Einzutragen] |
| **Datenschutzbeauftragter** | Compliance, Aufsichtsbehörde kontaktieren | [Einzutragen] |
| **Tech-Lead** | Technische Analyse, Behebung | [Einzutragen] |
| **Support** | Benachrichtigung betroffener Personen | [Einzutragen] |

---

## 3. Szenarien & Reaktionsprozess

### Szenario 1: Datenpanne (Unauthorized Access)

**Beschreibung:** Unbefugter Zugriff auf personenbezogene Daten

**Reaktionszeit:** Innerhalb 72 Stunden Meldung an Aufsichtsbehörde

**Prozess:**

1. **Erkennung (Tag 0)**
   - Vorfall dokumentieren
   - Tech-Lead informieren
   - Zugriff sofort sperren (falls möglich)

2. **Analyse (Tag 0-1)**
   - Umfang der Datenpanne ermitteln
   - Betroffene Personen identifizieren
   - Art der Daten bestimmen
   - Risiko bewerten

3. **Meldung (Tag 1-3)**
   - Aufsichtsbehörde kontaktieren (innerhalb 72h)
   - Betroffene Personen benachrichtigen (falls hohes Risiko)

4. **Behebung (Tag 1+)**
   - Sicherheitslücke schließen
   - Zugriffskontrollen überprüfen
   - Monitoring verstärken

5. **Dokumentation**
   - Vorfall vollständig dokumentieren
   - Maßnahmen zur Prävention festlegen

**Kontakt Aufsichtsbehörde:**
- Bundesbeauftragter für Datenschutz: https://www.bfdi.bund.de
- Oder zuständige Landesbehörde

---

### Szenario 2: AI generiert unangemessene Antwort die veröffentlicht wird

**Beschreibung:** KI-generierte Antwort enthält diskriminierende/beleidigende Inhalte und wurde veröffentlicht

**Reaktionszeit:** Sofort

**Prozess:**

1. **Erkennung**
   - Vorfall dokumentieren
   - Veröffentlichte Antwort identifizieren

2. **Sofortmaßnahmen**
   - Antwort auf Google Maps löschen (falls möglich)
   - Business-Owner kontaktieren
   - Feedback-Mechanismus auslösen

3. **Analyse**
   - Prompt überprüfen
   - Ursache identifizieren
   - Bias-Testing durchführen

4. **Behebung**
   - Prompt anpassen
   - Guardrails verstärken
   - Testing erweitern

5. **Prävention**
   - Monitoring verstärken
   - Regelmäßige Stichproben
   - Feedback-Loop verbessern

---

### Szenario 3: User beschwert sich über Datenschutz-Verstoß

**Beschreibung:** Nutzer meldet Verstoß gegen DSGVO

**Reaktionszeit:** Innerhalb 30 Tage Antwort

**Prozess:**

1. **Erhalt der Beschwerde**
   - Beschwerde dokumentieren
   - Datenschutzbeauftragten informieren

2. **Prüfung**
   - Vorwurf analysieren
   - Rechtliche Bewertung
   - Fakten sammeln

3. **Antwort**
   - Innerhalb 30 Tage antworten
   - Erklärung oder Entschuldigung
   - Maßnahmen zur Behebung (falls erforderlich)

4. **Behebung**
   - Verstoß beheben (falls bestätigt)
   - Prozesse anpassen
   - Dokumentation aktualisieren

---

### Szenario 4: Aufsichtsbehörde stellt Anfrage

**Beschreibung:** Aufsichtsbehörde fragt nach Compliance oder meldet Verstoß

**Reaktionszeit:** Innerhalb gesetzter Frist

**Prozess:**

1. **Erhalt der Anfrage**
   - Anfrage dokumentieren
   - Geschäftsführung informieren
   - Datenschutzbeauftragten einbeziehen

2. **Vorbereitung**
   - Geforderte Informationen sammeln
   - VVT bereitstellen
   - Compliance-Nachweise zusammenstellen

3. **Antwort**
   - Innerhalb Frist antworten
   - Vollständige Informationen bereitstellen
   - Kooperativ bleiben

4. **Follow-up**
   - Maßnahmen umsetzen (falls gefordert)
   - Compliance verbessern
   - Regelmäßige Updates an Behörde

---

## 4. Kommunikationsvorlagen

### Vorlage: Meldung an Aufsichtsbehörde

```
Betreff: Meldung einer Datenschutzverletzung gemäß Art. 33 DSGVO

Sehr geehrte Damen und Herren,

hiermit melden wir eine Datenschutzverletzung gemäß Art. 33 DSGVO:

- Datum der Verletzung: [Datum]
- Art der Verletzung: [Beschreibung]
- Umfang: [Anzahl betroffener Personen, Art der Daten]
- Wahrscheinliche Folgen: [Risiko-Bewertung]
- Maßnahmen zur Behebung: [Beschreibung]

Mit freundlichen Grüßen
[Name, Position]
```

### Vorlage: Benachrichtigung betroffener Personen

```
Betreff: Wichtige Information zu Ihren Daten

Sehr geehrte/r [Name],

wir möchten Sie über eine Datenschutzverletzung informieren, die Ihre Daten betrifft:

[Beschreibung des Vorfalls]

Was wir getan haben:
- [Maßnahme 1]
- [Maßnahme 2]

Was Sie tun können:
- [Empfehlung 1]
- [Empfehlung 2]

Bei Fragen kontaktieren Sie uns unter: [E-Mail]

Mit freundlichen Grüßen
[Name, Position]
```

---

## 5. Checkliste für Incident Response

### Sofort (Tag 0)
- [ ] Vorfall dokumentieren
- [ ] Verantwortliche informieren
- [ ] Zugriff sperren (falls möglich)
- [ ] Umfang ermitteln

### Kurzfristig (Tag 1-3)
- [ ] Aufsichtsbehörde kontaktieren (falls erforderlich)
- [ ] Betroffene benachrichtigen (falls erforderlich)
- [ ] Sicherheitslücke beheben
- [ ] Monitoring verstärken

### Mittelfristig (Woche 1-2)
- [ ] Vollständige Analyse durchführen
- [ ] Maßnahmen zur Prävention festlegen
- [ ] Prozesse anpassen
- [ ] Dokumentation aktualisieren

### Langfristig (Monat 1+)
- [ ] Maßnahmen umsetzen
- [ ] Testing durchführen
- [ ] Review des Vorfalls
- [ ] Lessons Learned dokumentieren

---

## 6. Präventionsmaßnahmen

### Regelmäßige Maßnahmen
- Monatliche Security-Reviews
- Quartalsweise Compliance-Checks
- Jährliche Penetration-Tests
- Kontinuierliches Monitoring

### Technische Maßnahmen
- Verschlüsselung (in Transit und at Rest)
- Zugriffskontrolle
- Logging & Monitoring
- Backup & Recovery

---

## 7. Kontakte

### Aufsichtsbehörden

**Bundesbeauftragter für Datenschutz (BfDI):**
- Website: https://www.bfdi.bund.de
- E-Mail: [Einzutragen]
- Telefon: [Einzutragen]

**Landesbehörden:**
- [Einzutragen: Zuständige Landesbehörde]

### Interne Kontakte

- Geschäftsführung: [Einzutragen]
- Datenschutzbeauftragter: [Einzutragen]
- Tech-Lead: [Einzutragen]
- Support: [Einzutragen]

---

## 8. Änderungshistorie

| Datum | Änderung | Autor |
|-------|----------|-------|
| 2025-11-16 | Initiale Erstellung | [Name] |

---

**Hinweis:** Dieser Plan sollte regelmäßig überprüft und aktualisiert werden, insbesondere nach Vorfällen oder Änderungen der Rechtslage.

