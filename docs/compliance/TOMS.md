# Technische und organisatorische Maßnahmen (TOMs)

**Gemäß Art. 32 DSGVO**

**Projekt:** niemehr.de  
**Erstellt:** 2025-11-16  
**Letzte Aktualisierung:** 2025-11-16

---

## 1. Zugriffskontrolle

### 1.1 Authentifizierung

**Maßnahmen:**
- ✅ OAuth 2.0 Integration mit Google
- ✅ Sichere Session-Verwaltung
- ✅ HTTP-Only Cookies für Session-Tokens
- ✅ Secure Flag für Cookies (HTTPS)
- ✅ SameSite Protection gegen CSRF-Angriffe

**Implementierung:**
- Next.js Session-Management
- JWT-Tokens für API-Authentifizierung
- Automatische Session-Ablauf nach Inaktivität

---

### 1.2 Autorisierung

**Maßnahmen:**
- ✅ Rollenbasierte Zugriffe (vorbereitet für Team-Features)
- ✅ API-Endpoints prüfen Berechtigung
- ✅ Business-Owner können nur eigene Daten einsehen
- ✅ Keine Cross-Tenant-Zugriffe

**Implementierung:**
- Middleware für API-Routes
- Prisma-Queries mit User-ID-Filter
- Mandantenfähige Datenbank-Struktur

---

### 1.3 Physische Zugriffskontrolle

**Maßnahmen:**
- ✅ Hosting bei zertifiziertem Provider (ISO 27001)
- ✅ Rechenzentren mit physischer Sicherheit
- ✅ Zugriffskontrolle für Support-Personal

---

## 2. Weitergabekontrolle

### 2.1 Verschlüsselung in Transit

**Maßnahmen:**
- ✅ HTTPS/TLS für alle Verbindungen
- ✅ TLS 1.2 oder höher
- ✅ Verschlüsselte API-Kommunikation
- ✅ Verschlüsselte Datenbank-Verbindungen

**Implementierung:**
- SSL/TLS-Zertifikate für Domain
- Verschlüsselte Verbindungen zu OpenAI API
- Verschlüsselte Verbindungen zu Google API

---

### 2.2 Verschlüsselung at Rest

**Maßnahmen:**
- ✅ Datenbank-Verschlüsselung (PostgreSQL)
- ✅ Verschlüsselte Backups
- ✅ Verschlüsselte Logs (falls sensible Daten)

**Status:**
- [ ] Datenbank-Verschlüsselung aktivieren (zu prüfen mit Hosting-Provider)
- [ ] Backup-Verschlüsselung verifizieren

---

### 2.3 API-Key-Management

**Maßnahmen:**
- ✅ API-Keys in Umgebungsvariablen (nie im Code)
- ✅ Keine API-Keys in Git-Repository
- ✅ Separate Keys für Development/Production
- ✅ Regelmäßige Rotation (quartalsweise)

**Implementierung:**
- `.env` Dateien (nicht committed)
- Environment Variables in Hosting-Provider
- Dokumentation: `API_KEY_MANAGEMENT.md`

---

## 3. Eingabekontrolle

### 3.1 Validierung

**Maßnahmen:**
- ✅ Input-Validierung für alle User-Eingaben
- ✅ Sanitization von Review-Texten
- ✅ Type-Checking (TypeScript)
- ✅ Schema-Validierung (Prisma)

**Implementierung:**
- TypeScript für Type-Safety
- Prisma Schema für Datenbank-Validierung
- API-Validierung mit Zod (falls verwendet)

---

### 3.2 Rate Limiting

**Maßnahmen:**
- ✅ Rate Limiting für API-Endpoints
- ✅ Schutz gegen DDoS-Angriffe
- ✅ Begrenzung von OpenAI API-Calls

**Implementierung:**
- Rate Limiter für API-Routes
- Cloudflare oder ähnlicher Service (falls verwendet)
- OpenAI Rate Limits beachten

---

### 3.3 Error Handling

**Maßnahmen:**
- ✅ Keine sensiblen Daten in Error-Logs
- ✅ Generische Fehlermeldungen für User
- ✅ Detaillierte Logs nur server-side (ohne personenbezogene Daten)

**Implementierung:**
- Try-Catch-Blöcke mit sicherem Error Handling
- Keine Review-Texte in Logs
- Keine User-Daten in Stack-Traces

---

## 4. Auftragskontrolle

### 4.1 Auftragsverarbeitungsverträge (DPA)

**Maßnahmen:**
- ✅ DPA mit OpenAI (erforderlich)
- ✅ DPA mit Google (via API Terms)
- ✅ DPA mit Hosting-Provider (erforderlich)

**Status:**
- OpenAI DPA: [Einzutragen: Abgeschlossen/Pending]
- Google DPA: ✅ In API Terms enthalten
- Hosting-Provider DPA: [Zu prüfen]

**Dokumentation:**
- `DPA_OPENAI_STATUS.md`
- VVT: Abschnitt "Auftragsverarbeiter"

---

### 4.2 Überwachung von Auftragsverarbeitern

**Maßnahmen:**
- ✅ Regelmäßige Überprüfung der DPA-Compliance
- ✅ Monitoring von API-Zugriffen
- ✅ Alerts bei ungewöhnlichen Mustern

**Implementierung:**
- Logging von OpenAI API-Calls (ohne Inhalte)
- Monitoring-Dashboard (falls vorhanden)
- Quartalsweise Review der DPA

---

## 5. Verfügbarkeitskontrolle

### 5.1 Backups

**Maßnahmen:**
- ✅ Regelmäßige Backups (täglich)
- ✅ Verschlüsselte Backups
- ✅ Off-Site Backups
- ✅ Backup-Testing (monatlich)

**Implementierung:**
- Automatische Datenbank-Backups
- Backup-Retention: 30 Tage
- Disaster Recovery Plan dokumentiert

---

### 5.2 Redundanz

**Maßnahmen:**
- ✅ Redundante Server-Infrastruktur (falls verfügbar)
- ✅ Load Balancing (falls verfügbar)
- ✅ CDN für statische Assets

**Status:**
- [ ] Redundanz-Level dokumentieren
- [ ] Uptime-Ziel definieren (z.B. 99.9%)

---

### 5.3 Monitoring

**Maßnahmen:**
- ✅ Server-Monitoring
- ✅ Application-Monitoring
- ✅ Error-Tracking (anonymisiert)
- ✅ Performance-Monitoring

**Implementierung:**
- Monitoring-Tools (z.B. Sentry, DataDog)
- Alerts bei kritischen Fehlern
- Logging-System (ohne personenbezogene Daten)

---

## 6. Trennungskontrolle

### 6.1 Mandantenfähigkeit

**Maßnahmen:**
- ✅ Isolierung von Business-Owner-Daten
- ✅ Keine Datenvermischung zwischen Tenants
- ✅ User-ID-Filter in allen Queries

**Implementierung:**
- Prisma-Queries mit `where: { userId }`
- API-Middleware prüft User-Zugehörigkeit
- Keine Cross-Tenant-Zugriffe möglich

---

### 6.2 Datenbank-Struktur

**Maßnahmen:**
- ✅ Foreign Keys für Datenintegrität
- ✅ Indizes für Performance
- ✅ Cascade-Delete für abhängige Daten

**Implementierung:**
- Prisma Schema mit Relations
- Datenbank-Indizes für häufige Queries
- OnDelete: Cascade für Reviews bei Business-Löschung

---

## 7. Pseudonymisierung & Anonymisierung

### 7.1 Pseudonymisierung

**Maßnahmen:**
- ✅ User-IDs statt Namen in Logs
- ✅ Keine Klarnamen in API-Logs
- ✅ Pseudonymisierung für Analytics (falls verwendet)

**Implementierung:**
- Logging nur mit User-IDs
- Keine Review-Texte in Logs
- Analytics ohne personenbezogene Daten

---

### 7.2 Anonymisierung

**Maßnahmen:**
- ✅ Automatische Anonymisierung nach Löschung
- ✅ Anonymisierung für Test-Daten
- ✅ Keine personenbezogenen Daten in Test-Umgebung

---

## 8. Datensicherheit

### 8.1 Schutz vor unbefugtem Zugriff

**Maßnahmen:**
- ✅ Firewall-Regeln
- ✅ Intrusion Detection (falls verfügbar)
- ✅ Regelmäßige Security-Scans
- ✅ Penetration-Testing (jährlich)

---

### 8.2 Schutz vor Datenverlust

**Maßnahmen:**
- ✅ Regelmäßige Backups
- ✅ Backup-Testing
- ✅ Versionierung von Code (Git)
- ✅ Disaster Recovery Plan

---

### 8.3 Schutz vor Datenlecks

**Maßnahmen:**
- ✅ Keine API-Keys im Code
- ✅ Keine Credentials in Git
- ✅ .gitignore für sensible Dateien
- ✅ Code-Review vor Deployment

---

## 9. Datenschutz-Freundliche Voreinstellungen

### 9.1 Privacy by Default

**Maßnahmen:**
- ✅ Minimale Datensammlung als Standard
- ✅ Opt-in für optionale Features
- ✅ Keine Pre-Checked Checkboxes
- ✅ Transparente Datenschutz-Einstellungen

**Implementierung:**
- Cookie-Banner: Opt-in für nicht-essentielle Cookies
- SMS-Benachrichtigungen: Opt-in
- Marketing-E-Mails: Opt-in

---

### 9.2 Privacy by Design

**Maßnahmen:**
- ✅ Datenschutz von Anfang an berücksichtigt
- ✅ Datenminimierung in Schema-Design
- ✅ Automatische Löschung nach Fristen
- ✅ Transparenz in UI

---

## 10. Regelmäßige Überprüfung

### 10.1 Security Audits

**Frequenz:** Jährlich

**Inhalt:**
- Code-Review auf Sicherheitslücken
- Penetration-Testing
- Überprüfung der TOMs
- Update der Dokumentation

---

### 10.2 Compliance-Reviews

**Frequenz:** Quartalsweise

**Inhalt:**
- Überprüfung der DPA
- Review der Logs
- Prüfung der Betroffenenrechte-Umsetzung
- Update der VVT bei Änderungen

---

## 11. Dokumentation

**Verwandte Dokumente:**
- VVT: `VVT_VERZEICHNIS_VERARBEITUNGSTAETIGKEITEN.md`
- Incident Response Plan: `INCIDENT_RESPONSE_PLAN.md`
- API Key Management: `API_KEY_MANAGEMENT.md`

---

## 12. Änderungshistorie

| Datum | Änderung | Autor |
|-------|----------|-------|
| 2025-11-16 | Initiale Erstellung | [Name] |

---

**Hinweis:** Diese TOMs müssen regelmäßig aktualisiert werden, insbesondere bei:
- Neuen Technologien
- Änderungen der Infrastruktur
- Neuen Sicherheitsrisiken
- Änderungen der Compliance-Anforderungen

