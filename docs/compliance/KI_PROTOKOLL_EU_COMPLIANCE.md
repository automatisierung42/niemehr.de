# KI-Protokoll für niemehr.de

## EU-rechtskonforme KI-generierte Review-Antworten

**Version:** 1.0  

**Stand:** November 2025  

**Projekt:** niemehr.de - Automatisierte Google Review Antworten  

**Geltungsbereich:** Alle KI-generierten Inhalte der Plattform

---

## 1. Executive Summary

### 1.1 Projektbeschreibung

niemehr.de ist eine SaaS-Plattform zur automatisierten Generierung von Antworten auf Google Maps Reviews mittels KI (GPT-4o-mini). Die Plattform richtet sich an B2B-Kunden verschiedener Branchen.

### 1.2 Rechtliche Einordnung

- **AI Act Risikokategorie:** Begrenztes Risiko (Limited Risk System)

- **DSGVO-Status:** Vollständig anwendbar (Verarbeitung personenbezogener Daten)

- **Rolle:** Anbieter und Deployer im Sinne des AI Act

- **Besonderheit:** Human-in-the-Loop durch manuelle Freigabe

---

## 2. Anwendbare Rechtsgrundlagen

### 2.1 EU AI Act (Verordnung (EU) 2024/1689)

**Relevante Artikel für Limited Risk Systems:**

- Art. 50: Transparenzpflichten für KI-Systeme

- Art. 52: Kennzeichnungspflicht für KI-generierte Inhalte

- Art. 53: Anforderungen an Trainingsdaten

### 2.2 DSGVO (Verordnung (EU) 2016/679)

**Zentrale Artikel:**

- Art. 5: Grundsätze der Datenverarbeitung

- Art. 6: Rechtmäßigkeit der Verarbeitung

- Art. 13/14: Informationspflichten

- Art. 15-22: Betroffenenrechte

- Art. 25: Datenschutz durch Technikgestaltung

- Art. 28: Auftragsverarbeitung

- Art. 32: Sicherheit der Verarbeitung

### 2.3 Weitere relevante Rechtsgrundlagen

- **Digital Services Act (DSA):** Transparenz bei automatisierten Systemen

- **UWG:** Wettbewerbsrechtliche Anforderungen

- **Branchenspezifisch:**

  - Heilmittelwerbegesetz (HWG) für medizinische Praxen

  - BORA (Berufsordnung Rechtsanwälte) für Kanzleien

  - Standesrecht für andere regulierte Berufe

---

## 3. Compliance-Anforderungen & Entscheidungspunkte

### 3.1 Transparenzpflichten (AI Act Art. 50 & 52)

#### ENTSCHEIDUNG 1: Kennzeichnung KI-generierter Inhalte

**Rechtliche Anforderung:**

KI-generierte Inhalte müssen für Nutzer erkennbar sein.

**Umsetzungsoptionen:**

| Option | Vorteile | Nachteile | Empfehlung |

|--------|----------|-----------|------------|

| **A) Keine Kennzeichnung in Antwort** | Natürlich wirkend | Nicht AI Act-konform | ❌ Nicht zulässig |

| **B) Diskrete Kennzeichnung** (z.B. "Mit KI-Unterstützung erstellt") | Transparent, wenig aufdringlich | Weniger deutlich | ✅ **Empfohlen** |

| **C) Deutliche Kennzeichnung** (z.B. "Diese Antwort wurde automatisch generiert") | Maximale Transparenz | Möglicherweise unpersönlich wirkend | ⚠️ Nur bei Bedarf |

| **D) Freiwillige Kennzeichnung** durch Business-Owner | Flexibilität | Nicht durchgängig compliant | ❌ Nicht ausreichend |

**Empfohlene Umsetzung:**

```
Option B mit folgenden Elementen:

1. Disclaimer im Dashboard für Business-Owner

2. Optionaler, diskreter Zusatz in generierten Antworten

3. Transparenzhinweis in den AGBs der Plattform
```

**Zu implementieren:**

- [x] Dashboard-Hinweis: "Diese Antwort wurde KI-gestützt erstellt und kann vor Veröffentlichung angepasst werden"

- [ ] Optionaler Footer für Antworten (per Einstellung): "Mit ❤️ und KI erstellt"

- [ ] Transparenzseite auf Website mit Erklärung der KI-Funktionalität

---

#### ENTSCHEIDUNG 2: Informationspflichten gegenüber Business-Ownern

**Rechtliche Anforderung:**

Nutzer (Business-Owner) müssen über die Funktionsweise der KI informiert werden.

**Zu implementieren:**

- [ ] **Onboarding-Tutorial** mit KI-Erklärung

- [ ] **FAQ-Sektion:** "Wie funktioniert die KI?", "Welche Daten werden verwendet?"

- [ ] **Dashboard-Info-Banner** (beim ersten Login)

- [ ] **Dokumentation:** Verwendetes Modell (GPT-4o-mini), Limitierungen, Best Practices

**Mindestinhalte der Information:**

1. Verwendetes KI-System (OpenAI GPT-4o-mini)

2. Funktionsweise (Analyse Review → Generierung Antwort → Manuelle Freigabe)

3. Mögliche Fehlerquellen (Halluzinationen, Missverständnisse)

4. Verantwortung bleibt beim Business-Owner

5. Hinweis auf Bearbeitungsmöglichkeit vor Veröffentlichung

---

### 3.2 DSGVO-Compliance

#### ENTSCHEIDUNG 3: Rechtsgrundlage für Datenverarbeitung (Art. 6 DSGVO)

**Erforderliche Rechtsgrundlagen:**

**A) Verarbeitung von Business-Owner-Daten:**

- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)

- **Daten:** Name, E-Mail, Google-Profildaten, Telefonnummer (für SMS)

- **Zweck:** Bereitstellung des SaaS-Dienstes

**B) Verarbeitung von Reviewer-Daten (indirekt betroffen):**

- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)

- **Berechtigtes Interesse:** Reputation Management des Business-Owners

- **Daten:** Review-Text, Reviewer-Name (öffentlich auf Google Maps)

- **Interessenabwägung erforderlich:** ✅ Ja

**Interessenabwägung dokumentieren:**

```
Berechtigtes Interesse: Business-Owner haben legitimes Interesse,

auf öffentliche Reviews zu antworten (Reputation Management).

Schutzinteressen Reviewer: Reviews sind bereits öffentlich auf 

Google Maps. Keine zusätzliche Offenlegung. Antworten werden 

manuell freigegeben (Human-in-the-Loop).

Ergebnis: Berechtigtes Interesse überwiegt.
```

**Zu implementieren:**

- [ ] **Interessenabwägung** dokumentieren (intern, VVT)

- [ ] **Datenschutzerklärung** mit Rechtsgrundlagen

- [ ] **Informationspflicht** für Business-Owner (sie müssen Reviewer nicht informieren, da Daten öffentlich sind)

---

#### ENTSCHEIDUNG 4: Auftragsverarbeitung mit OpenAI (Art. 28 DSGVO)

**Rechtliche Anforderung:**

Bei Weitergabe personenbezogener Daten an OpenAI ist ein Auftragsverarbeitungsvertrag (AVV/DPA) erforderlich.

**Status quo:**

- OpenAI bietet standardisierten Data Processing Addendum (DPA)

- Verfügbar unter: https://openai.com/policies/data-processing-addendum

**Zu implementieren:**

- [ ] **DPA mit OpenAI** abschließen (über Account-Einstellungen)

- [ ] **API-Konfiguration:** Zero Data Retention aktivieren (falls verfügbar)

- [ ] **Dokumentation:** DPA im Verzeichnis von Verarbeitungstätigkeiten (VVT) aufnehmen

- [ ] **Prüfung:** Stellt OpenAI ausreichende technische und organisatorische Maßnahmen (TOMs) bereit? (Ja, laut OpenAI-Zertifizierungen)

**Alternative Maßnahmen:**

```
Falls Datenweitergabe minimiert werden soll:

- Pseudonymisierung von Review-Texten vor API-Call

- Entfernung von Namen/Adressen aus Review-Texten

- Lokale Verarbeitung prüfen (unrealistisch bei GPT-4)
```

---

#### ENTSCHEIDUNG 5: Betroffenenrechte (Art. 15-22 DSGVO)

**Rechtliche Anforderung:**

Business-Owner und (theoretisch) Reviewer haben Rechte auf Auskunft, Löschung, Berichtigung etc.

**Umsetzung für Business-Owner:**

- [ ] **Selbstbedienung im Dashboard:**

  - Datenexport (alle eigenen Daten)

  - Account-Löschung

  - Einstellungen für Datenverarbeitung

- [ ] **Support-E-Mail** für Anfragen (z.B. datenschutz@niemehr.de)

- [ ] **Reaktionszeit:** 30 Tage (DSGVO-Anforderung)

**Umsetzung für Reviewer (indirekt betroffen):**

```
Reviewer-Daten stammen von Google Maps (öffentlich).

niemehr.de ist nicht Verantwortlicher für diese Daten.

Bei Anfragen:

→ Verweis an Google (Datenquelle)

→ Optional: Löschen der Kopie in niemehr.de-Datenbank
```

**Zu implementieren:**

- [ ] **Prozess für Betroffenenrechte** dokumentieren

- [ ] **Löschkonzept:** Automatische Löschung nach Account-Kündigung (z.B. 30 Tage Karenzzeit)

- [ ] **Dokumentation:** Aufbewahrungsfristen festlegen

---

#### ENTSCHEIDUNG 6: Datenschutz durch Technikgestaltung (Art. 25 DSGVO)

**Rechtliche Anforderung:**

Privacy by Design und Privacy by Default.

**Technische Maßnahmen (bereits teilweise umgesetzt):**

- ✅ OAuth-Integration (sichere Authentifizierung)

- ✅ HTTP-Only Cookies (Session-Sicherheit)

- ✅ Verschlüsselte Datenübertragung (HTTPS)

**Zu ergänzen:**

- [ ] **Datenminimierung:**

  - Nur notwendige Review-Daten speichern (nicht alle Google-Daten)

  - Keine Speicherung von Profilbildern (falls nicht benötigt)

  - Review-Texte nicht länger als nötig speichern

- [ ] **Verschlüsselung at Rest:** Datenbank-Verschlüsselung aktivieren

- [ ] **Zugriffskontrolle:** Rollenbasierte Zugriffe implementieren (falls Team-Features geplant)

- [ ] **Logging:** Audit-Logs für Datenzugriffe (insbesondere bei Support-Zugriffen)

**Privacy by Default:**

- [ ] **Opt-in statt Opt-out** für optionale Features (z.B. SMS-Benachrichtigungen)

- [ ] **Minimale Datensammlung** als Standardeinstellung

---

### 3.3 Inhaltliche Qualitätssicherung

#### ENTSCHEIDUNG 7: Human-in-the-Loop-Prozess

**Rechtliche Relevanz:**

Manuelle Freigabe reduziert Risiko und erfüllt AI Act-Anforderungen für Limited Risk Systems.

**Aktueller Prozess (laut Analyse):**

1. KI generiert Antwort

2. Business-Owner erhält Vorschau im Dashboard

3. Manuelle Freigabe vor Veröffentlichung

**Zu implementieren:**

- [ ] **Klare UI-Kennzeichnung:** "Vorschlag - vor Veröffentlichung überprüfen"

- [ ] **Bearbeitungsfunktion:** Business-Owner kann Antwort editieren

- [ ] **Ablehnungsoption:** Antwort verwerfen und neu generieren

- [ ] **Disclaimer:** "Sie sind für den Inhalt der veröffentlichten Antwort verantwortlich"

**Dokumentation:**

```
Der Human-in-the-Loop-Prozess stellt sicher, dass:

- Keine vollautomatische Veröffentlichung erfolgt

- Business-Owner finale Kontrolle haben

- Haftung beim Business-Owner liegt (nicht bei niemehr.de)
```

---

#### ENTSCHEIDUNG 8: Qualitätskontrolle & Bias-Vermeidung

**Rechtliche Anforderung:**

AI Act Art. 10: Vermeidung von Diskriminierung und Bias.

**Risiken bei Review-Antworten:**

- Stereotype Formulierungen

- Unangemessene Reaktionen auf Kritik

- Kulturelle/sprachliche Fehlinterpretationen

- Branchenspezifische Fehler (z.B. medizinische/rechtliche Fehlinformationen)

**Zu implementieren:**

- [ ] **Prompt Engineering:**

  - Explizite Anweisungen gegen Bias

  - Neutrale, professionelle Formulierungen

  - Branchenspezifische Guardrails

- [ ] **Testing:**

  - Testfälle mit verschiedenen Review-Typen (positiv, negativ, neutral)

  - Verschiedene Branchen testen

  - Edge Cases (beleidigende Reviews, Fake Reviews)

- [ ] **Feedback-Loop:**

  - Business-Owner können problematische Antworten melden

  - Regelmäßige Überprüfung gemeldeter Inhalte

  - Anpassung der Prompts basierend auf Feedback

- [ ] **Branchenspezifische Filter:**

  - Medizin: Keine Diagnosen/Therapieempfehlungen

  - Recht: Keine Rechtsberatung

  - Allgemein: Keine Rabatte/Angebote ohne Freigabe

**Monitoring:**

```
Regelmäßige Stichproben (z.B. 5% der generierten Antworten)

auf problematische Inhalte prüfen:

- Diskriminierende Sprache

- Faktische Fehler

- Unangemessener Ton

- Rechtliche Risiken
```

---

#### ENTSCHEIDUNG 9: Umgang mit sensiblen Branchen

**Rechtliche Anforderung:**

Besondere Sorgfaltspflichten bei regulierten Berufen.

**Medizinische Praxen (HWG, ärztliche Schweigepflicht):**

- [ ] **Prompt-Anweisung:** "Keine medizinischen Ratschläge oder Diagnosen"

- [ ] **Filter:** Automatische Erkennung von Gesundheitsdaten in Reviews

- [ ] **Warnung:** "Achtung: Review enthält möglicherweise Gesundheitsdaten. Bitte vorsichtig antworten."

- [ ] **Disclaimer:** Hinweis auf Heilmittelwerbegesetz im Dashboard

**Rechtsanwaltskanzleien (BORA):**

- [ ] **Prompt-Anweisung:** "Keine Rechtsberatung, keine Werbeaussagen"

- [ ] **Hinweis:** Standesrechtliche Anforderungen im Onboarding erwähnen

**Allgemeine Maßnahme:**

- [ ] **Branchen-Auswahl** bei Registrierung (optional)

- [ ] **Branchenspezifische Prompt-Templates**

---

### 3.4 Vertragliche & organisatorische Maßnahmen

#### ENTSCHEIDUNG 10: AGBs & Haftungsausschluss

**Rechtliche Anforderung:**

Klare Verantwortlichkeiten definieren.

**Zu regeln in AGBs:**

- [ ] **Haftung für KI-generierte Inhalte liegt beim Business-Owner**

- [ ] **niemehr.de übernimmt keine Gewähr für Korrektheit**

- [ ] **Business-Owner verpflichtet sich zur Überprüfung vor Veröffentlichung**

- [ ] **Branchenspezifische Verantwortung** (z.B. Einhaltung HWG, BORA)

- [ ] **Unzulässige Nutzung:** Verbot von Fake Reviews, manipulativen Antworten

**Haftungsausschluss:**

```
"niemehr.de stellt lediglich ein Werkzeug zur Unterstützung 

bei der Erstellung von Review-Antworten bereit. Die finale 

Verantwortung für den Inhalt und die Veröffentlichung liegt 

beim Nutzer. niemehr.de übernimmt keine Haftung für Inhalte, 

die gegen gesetzliche Bestimmungen, Standesrecht oder 

Werberichtlinien verstoßen."
```

---

#### ENTSCHEIDUNG 11: Datenschutzerklärung

**Rechtliche Anforderung:**

Vollständige Informationen gemäß Art. 13/14 DSGVO.

**Mindestinhalte:**

- [ ] Verantwortlicher (niemehr.de Betreiber mit Kontaktdaten)

- [ ] Datenschutzbeauftragter (falls erforderlich, ab 20 Mitarbeiter mit Datenverarbeitung)

- [ ] Zwecke der Verarbeitung

- [ ] Rechtsgrundlagen (Art. 6 Abs. 1 lit. b und f DSGVO)

- [ ] Empfänger der Daten (OpenAI, Google)

- [ ] Aufbewahrungsfristen

- [ ] Betroffenenrechte

- [ ] Beschwerderecht bei Aufsichtsbehörde

- [ ] Hinweis auf automatisierte Entscheidungsfindung (AI-Generierung mit Human-in-the-Loop)

**Zu erstellen:**

- [ ] Datenschutzerklärung (Website & Dashboard)

- [ ] Cookie-Banner mit Einwilligungsmanagement

- [ ] Verzeichnis von Verarbeitungstätigkeiten (VVT, intern)

---

#### ENTSCHEIDUNG 12: Incident Response & Monitoring

**Rechtliche Anforderung:**

Art. 33/34 DSGVO: Meldepflicht bei Datenschutzverletzungen (innerhalb 72 Stunden).

**Zu implementieren:**

- [ ] **Incident Response Plan:**

  - Verantwortlichkeiten definieren

  - Prozess für Datenpanne dokumentieren

  - Kontakt zur Aufsichtsbehörde vorbereiten

- [ ] **Monitoring:**

  - Logging von API-Zugriffen

  - Alerts bei ungewöhnlichen Zugriffsmustern

  - Regelmäßige Security Audits

- [ ] **Backup & Recovery:**

  - Regelmäßige Backups

  - Disaster Recovery Plan

---

## 4. Implementierungs-Roadmap

### Phase 1: Pre-Launch (MVP) - KRITISCH

**Priorität: HOCH - vor öffentlichem Launch umsetzen**

- [ ] Datenschutzerklärung erstellen & veröffentlichen

- [ ] AGBs mit Haftungsausschluss

- [ ] Cookie-Banner implementieren

- [ ] DPA mit OpenAI abschließen

- [ ] Transparenzhinweis im Dashboard (KI-Kennzeichnung)

- [ ] Human-in-the-Loop UI-Disclaimer

- [ ] Interessenabwägung dokumentieren (intern)

- [ ] Verzeichnis von Verarbeitungstätigkeiten (VVT) erstellen

### Phase 2: Post-Launch - Innerhalb 3 Monate

**Priorität: MITTEL**

- [ ] Betroffenenrechte-Prozess implementieren (Datenexport, Löschung)

- [ ] FAQ-Sektion mit KI-Erklärung

- [ ] Onboarding-Tutorial

- [ ] Feedback-Mechanismus für problematische Antworten

- [ ] Branchenspezifische Prompts (Medizin, Recht)

- [ ] Monitoring & Logging erweitern

### Phase 3: Optimierung - Innerhalb 6 Monate

**Priorität: NIEDRIG**

- [ ] Regelmäßige Qualitätsstichproben (5% der Antworten)

- [ ] Bias-Testing & Prompt-Optimierung

- [ ] Security Audit

- [ ] Dokumentation erweitern (Best Practices für Business-Owner)

---

## 5. Risikobewertung & Mitigationsmaßnahmen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |

|--------|-------------------|--------|------------|

| **KI generiert diskriminierende/beleidigende Antwort** | Mittel | Hoch | Human-in-the-Loop, Prompt Engineering, Feedback-Loop |

| **Datenschutzverstoß (fehlender DPA mit OpenAI)** | Niedrig | Sehr hoch | DPA vor Launch abschließen |

| **Business-Owner veröffentlicht unangemessene Antwort** | Mittel | Mittel | Disclaimer, AGBs, Haftungsausschluss |

| **Review-Daten enthalten sensible Gesundheitsdaten** | Mittel | Hoch | Warnung bei Erkennung, branchenspezifische Prompts |

| **Fehlende Transparenz (AI Act-Verstoß)** | Niedrig | Mittel | Kennzeichnung, Informationspflichten erfüllen |

| **Datenpanne (Zugriff Unbefugter)** | Niedrig | Hoch | Verschlüsselung, Monitoring, Incident Response Plan |

---

## 6. Dokumentationspflichten (intern)

### 6.1 Verzeichnis von Verarbeitungstätigkeiten (VVT)

**Pflicht ab:** 1 Mitarbeiter (Best Practice, auch wenn Ausnahme für <250 MA gilt)

**Mindestinhalte:**

- Name und Kontaktdaten des Verantwortlichen

- Zwecke der Verarbeitung

- Kategorien betroffener Personen (Business-Owner, Reviewer)

- Kategorien personenbezogener Daten (Name, E-Mail, Review-Texte)

- Kategorien von Empfängern (OpenAI, Google)

- Drittlandtransfers (USA - OpenAI, Angemessenheitsbeschluss/Standardvertragsklauseln)

- Fristen für Löschung

- Technische und organisatorische Maßnahmen (TOMs)

### 6.2 Technische und organisatorische Maßnahmen (TOMs)

**Zu dokumentieren:**

- Zugriffskontrolle

- Weitergabekontrolle

- Eingabekontrolle

- Auftragskontrolle (OpenAI-DPA)

- Verfügbarkeitskontrolle (Backups)

- Trennungskontrolle (Mandantenfähigkeit)

### 6.3 Datenschutz-Folgenabschätzung (DSFA)

**Erforderlich?** Vermutlich NEIN.

- Keine umfangreiche Profilerstellung

- Keine automatisierte Entscheidungsfindung (Human-in-the-Loop)

- Keine besonders sensiblen Daten systematisch verarbeitet

**Empfehlung:** Freiwillig durchführen als Best Practice, dokumentiert verantwortungsvolle Herangehensweise.

---

## 7. Checkliste für Compliance-Verantwortliche

### Vor Launch:

- [ ] Datenschutzerklärung veröffentlicht

- [ ] AGBs mit Haftungsausschluss

- [ ] Cookie-Banner aktiv

- [ ] DPA mit OpenAI abgeschlossen

- [ ] VVT erstellt

- [ ] Interessenabwägung dokumentiert

- [ ] UI-Disclaimers implementiert

- [ ] Transparenzhinweise im Dashboard

### Laufender Betrieb:

- [ ] Monatliche Stichproben von Antworten

- [ ] Quartalsweise Überprüfung der Prompts

- [ ] Jährliche Überprüfung der Datenschutzerklärung

- [ ] Bei Änderungen: VVT aktualisieren

- [ ] Incident Response Plan getestet (jährlich)

### Bei Anfragen:

- [ ] Betroffenenrechte innerhalb 30 Tage beantworten

- [ ] Datenschutzverletzungen innerhalb 72h melden (falls erforderlich)

---

## 8. Kontakte & Ressourcen

### Aufsichtsbehörden (Deutschland):

- **Bundesbeauftragter für Datenschutz (BfDI):** https://www.bfdi.bund.de

- **Landesbehörden:** Je nach Sitz des Unternehmens (z.B. Berliner Beauftragte für Datenschutz)

### Hilfreiche Ressourcen:

- **AI Act Volltext:** https://eur-lex.europa.eu

- **OpenAI DPA:** https://openai.com/policies/data-processing-addendum

- **Google API Datenschutz:** https://developers.google.com/terms/api-services-user-data-policy

- **Datenschutzkonferenz (DSK) Leitlinien:** https://www.datenschutzkonferenz-online.de

---

## 9. Ansprechpartner & Verantwortlichkeiten

| Rolle | Verantwortlichkeit | Kontakt |

|-------|-------------------|---------|

| **Geschäftsführung** | Finale Entscheidungen, Budget, Haftung | [Einzutragen] |

| **Datenschutzbeauftragter** (falls erforderlich) | DSGVO-Compliance, Beratung, Aufsichtsbehörde | [Einzutragen] |

| **Tech-Lead** | Technische Umsetzung, Security, API-Integration | [Einzutragen] |

| **Legal/Compliance** | Verträge, AGBs, rechtliche Prüfung | [Einzutragen] |

---

## 10. Änderungshistorie

| Version | Datum | Änderungen | Autor |

|---------|-------|------------|-------|

| 1.0 | 2025-11-16 | Initiale Erstellung | [Ihr Name] |

---

**Hinweis:** Dieses Protokoll dient als Leitfaden und ersetzt keine individuelle Rechtsberatung. Bei spezifischen Fragen sollte ein auf IT-Recht und Datenschutz spezialisierter Anwalt konsultiert werden.

