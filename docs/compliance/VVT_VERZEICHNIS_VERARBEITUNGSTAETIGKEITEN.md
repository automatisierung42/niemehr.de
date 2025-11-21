# Verzeichnis von Verarbeitungstätigkeiten (VVT)

**Gemäß Art. 30 DSGVO**

**Projekt:** niemehr.de  
**Erstellt:** 2025-11-16  
**Letzte Aktualisierung:** 2025-11-16

---

## 1. Verantwortlicher

**Name:** [Einzutragen - Firmenname/Verantwortlicher]  
**Anschrift:** [Einzutragen - Postanschrift]  
**Kontakt:** [Einzutragen - E-Mail, Telefon]  
**Website:** https://niemehr.de

**Datenschutzbeauftragter:**  
[Falls erforderlich: Name, Kontakt]  
[Falls nicht erforderlich: Aktuell nicht erforderlich (unter 20 MA)]

---

## 2. Zwecke der Verarbeitung

### 2.1 Hauptzweck
Bereitstellung einer SaaS-Plattform zur KI-gestützten Generierung von Antworten auf Google Maps Reviews für Business-Owner.

### 2.2 Einzelne Verarbeitungszwecke

1. **Authentifizierung & Account-Verwaltung**
   - OAuth-Integration mit Google
   - Session-Management
   - User-Profile-Verwaltung

2. **Review-Management**
   - Synchronisation von Google Maps Reviews
   - Speicherung von Review-Daten
   - Status-Tracking (PENDING, READY_TO_APPROVE, etc.)

3. **KI-gestützte Antwortgenerierung**
   - Verarbeitung von Review-Texten durch OpenAI GPT-4o-mini
   - Generierung von Antwortvorschlägen
   - Human-in-the-Loop: Manuelle Freigabe durch Business-Owner

4. **Veröffentlichung von Antworten**
   - Übertragung genehmigter Antworten an Google Maps API
   - Tracking des Veröffentlichungsstatus

---

## 3. Kategorien betroffener Personen

### 3.1 Business-Owner (Hauptbetroffene)
- **Beschreibung:** Geschäftsinhaber, die die Plattform nutzen
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
- **Datenkategorien:** Siehe Abschnitt 4.1

### 3.2 Reviewer (Indirekt betroffen)
- **Beschreibung:** Personen, die Reviews auf Google Maps verfassen
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
- **Datenkategorien:** Siehe Abschnitt 4.2
- **Hinweis:** Reviews sind bereits öffentlich auf Google Maps

---

## 4. Kategorien personenbezogener Daten

### 4.1 Business-Owner-Daten

**Verarbeitete Daten:**
- Name (aus Google-Profil)
- E-Mail-Adresse (aus Google-Profil)
- Profilbild (aus Google-Profil, falls verwendet)
- Google User ID
- Telefonnummer (falls für SMS-Benachrichtigungen verwendet)
- Geschäftsinformationen:
  - Business-Name
  - Google Place ID
  - Rating-Statistiken

**Speicherdauer:** Bis 30 Tage nach Account-Löschung

**Löschung:** Automatisch nach 30 Tagen Karenzzeit

---

### 4.2 Reviewer-Daten (indirekt)

**Verarbeitete Daten:**
- Reviewer-Name (öffentlich auf Google Maps)
- Review-Text (öffentlich auf Google Maps)
- Rating (öffentlich auf Google Maps)
- Zeitstempel der Review (öffentlich auf Google Maps)

**Hinweis:** 
- Diese Daten stammen von Google Maps (öffentliche Quelle)
- niemehr.de ist nicht Verantwortlicher für diese Daten
- Verarbeitung erfolgt im Rahmen des berechtigten Interesses (Reputation Management)

**Speicherdauer:** Bis 90 Tage nach letztem Sync oder Account-Löschung

---

### 4.3 Technische Daten

**Verarbeitete Daten:**
- IP-Adressen (für Security & Rate Limiting)
- Session-Tokens
- API-Logs (ohne personenbezogene Inhalte)
- Error-Logs (anonymisiert)

**Speicherdauer:** 
- Session-Tokens: Bis Session-Ende
- Logs: 90 Tage, danach automatische Löschung

---

## 5. Kategorien von Empfängern

### 5.1 Auftragsverarbeiter

**OpenAI (USA)**
- **Zweck:** KI-gestützte Generierung von Antwortvorschlägen
- **Daten:** Review-Texte (anonymisiert, keine Namen)
- **Rechtsgrundlage:** Art. 28 DSGVO (Auftragsverarbeitung)
- **DPA:** ✅ Erforderlich - Data Processing Addendum mit OpenAI
- **Status:** [Einzutragen: Abgeschlossen/Pending]
- **Drittlandtransfer:** USA - Standardvertragsklauseln / EU-US Data Privacy Framework

**Google (USA/EU)**
- **Zweck:** OAuth-Authentifizierung, Review-Synchronisation, Veröffentlichung von Antworten
- **Daten:** OAuth-Tokens, Review-Daten, Antworten
- **Rechtsgrundlage:** Art. 28 DSGVO (Auftragsverarbeitung)
- **DPA:** Google API Terms of Service enthalten DPA-Klauseln
- **Drittlandtransfer:** USA - Standardvertragsklauseln / EU-US Data Privacy Framework

### 5.2 Weitere Empfänger

**Hosting-Provider**
- **Zweck:** Hosting der Anwendung und Datenbank
- **Daten:** Alle oben genannten Daten
- **Rechtsgrundlage:** Art. 28 DSGVO
- **DPA:** Erforderlich - mit Hosting-Provider abschließen

**Support-Team (intern)**
- **Zweck:** Technischer Support, Bug-Fixes
- **Zugriff:** Nur bei Bedarf, mit Zugriffskontrolle
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)

---

## 6. Drittlandtransfers

### 6.1 USA - OpenAI

**Rechtsgrundlage für Transfer:**
- Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO
- ODER: EU-US Data Privacy Framework (falls OpenAI teilnimmt)

**Sicherheitsmaßnahmen:**
- DPA mit OpenAI abgeschlossen
- Zero Data Retention aktiviert (falls verfügbar)
- Verschlüsselte Übertragung (HTTPS/TLS)

**Status:** [Einzutragen: DPA abgeschlossen/Pending]

---

### 6.2 USA - Google

**Rechtsgrundlage für Transfer:**
- Standardvertragsklauseln (SCC) in Google API Terms of Service
- ODER: EU-US Data Privacy Framework

**Sicherheitsmaßnahmen:**
- Verschlüsselte Übertragung (HTTPS/TLS)
- OAuth 2.0 für sichere Authentifizierung

---

## 7. Fristen für Löschung

### 7.1 Automatische Löschung

**Business-Owner-Accounts:**
- **Trigger:** Löschungsantrag durch User
- **Frist:** 30 Tage Karenzzeit (für Datenexport)
- **Automatische Löschung:** Nach 30 Tagen

**Review-Daten:**
- **Frist:** 90 Tage nach letztem Sync ODER Account-Löschung
- **Ausnahme:** Veröffentlichte Antworten bleiben auf Google (nicht in niemehr.de-Datenbank)

**Logs:**
- **Frist:** 90 Tage nach Erstellung
- **Automatische Löschung:** Täglich durch Cron-Job

**Response-Drafts (nicht veröffentlicht):**
- **Frist:** 30 Tage nach Erstellung
- **Automatische Löschung:** Täglich durch Cron-Job

---

### 7.2 Manuelle Löschung

**Auf Anfrage:**
- Betroffenenrechte gemäß Art. 17 DSGVO
- Reaktionszeit: Innerhalb 30 Tage
- Support-E-Mail: [Einzutragen: datenschutz@niemehr.de]

---

## 8. Technische und organisatorische Maßnahmen (TOMs)

**Detaillierte Dokumentation:** Siehe `TOMS.md`

### 8.1 Zugriffskontrolle
- OAuth 2.0 für Authentifizierung
- Session-Management mit HTTP-Only Cookies
- Rollenbasierte Zugriffe (falls Team-Features)

### 8.2 Weitergabekontrolle
- DPA mit allen Auftragsverarbeitern
- Verschlüsselte Datenübertragung (HTTPS/TLS)
- API-Keys sicher gespeichert (Umgebungsvariablen)

### 8.3 Eingabekontrolle
- Validierung aller Eingaben
- Sanitization von User-Input
- Rate Limiting für API-Calls

### 8.4 Auftragskontrolle
- DPA mit OpenAI
- DPA mit Google (via API Terms)
- DPA mit Hosting-Provider

### 8.5 Verfügbarkeitskontrolle
- Regelmäßige Backups (täglich)
- Disaster Recovery Plan
- Monitoring & Alerts

### 8.6 Trennungskontrolle
- Mandantenfähige Datenbank-Struktur
- Isolierung von User-Daten
- Keine Datenvermischung zwischen Business-Ownern

---

## 9. Besondere Verarbeitungen

### 9.1 Automatisierte Entscheidungsfindung

**Status:** ❌ Keine vollautomatisierte Entscheidungsfindung

**Begründung:**
- Human-in-the-Loop: Alle AI-generierten Antworten werden manuell geprüft
- Business-Owner hat finale Entscheidung über Veröffentlichung
- Keine Profilerstellung ohne menschliche Kontrolle

---

### 9.2 Besonders sensible Daten

**Gesundheitsdaten:**
- Können in Review-Texten enthalten sein (indirekt)
- Werden nicht systematisch verarbeitet
- Warnung bei Erkennung von Gesundheits-Keywords
- Keine medizinischen Ratschläge in AI-Antworten

**Rechtsdaten:**
- Können in Review-Texten enthalten sein (indirekt)
- Werden nicht systematisch verarbeitet
- Keine Rechtsberatung in AI-Antworten

---

## 10. Betroffenenrechte

### 10.1 Umsetzung

**Art. 15 DSGVO - Auskunftsrecht:**
- API-Endpoint: `/api/user/data-export`
- Selbstbedienung im Dashboard
- JSON-Format mit allen User-Daten

**Art. 17 DSGVO - Löschrecht:**
- API-Endpoint: `/api/user/delete-account`
- Selbstbedienung im Dashboard
- 30 Tage Karenzzeit

**Art. 18 DSGVO - Einschränkung:**
- Support-E-Mail: [Einzutragen]

**Art. 20 DSGVO - Datenübertragbarkeit:**
- Via Datenexport (JSON-Format)

**Art. 21 DSGVO - Widerspruch:**
- Support-E-Mail: [Einzutragen]

---

### 10.2 Kontakt für Betroffenenrechte

**E-Mail:** [Einzutragen: datenschutz@niemehr.de]  
**Reaktionszeit:** Innerhalb 30 Tage (DSGVO-Anforderung)

---

## 11. Änderungshistorie

| Datum | Änderung | Autor |
|-------|----------|-------|
| 2025-11-16 | Initiale Erstellung | [Name] |

---

## 12. Anhänge

- Interessenabwägung: `INTERESSENABWAEGUNG_ART6_LIT_F.md`
- TOMs-Detail: `TOMS.md`
- DPA-Status: `DPA_OPENAI_STATUS.md`

---

**Hinweis:** Dieses VVT muss regelmäßig aktualisiert werden, insbesondere bei:
- Änderungen der Verarbeitungszwecke
- Neuen Auftragsverarbeitern
- Änderungen der technischen Maßnahmen
- Neue Rechtsgrundlagen

