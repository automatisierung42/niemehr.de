# Aufbewahrungsfristen

**Projekt:** niemehr.de  
**Erstellt:** 2025-11-16  
**Letzte Aktualisierung:** 2025-11-16

---

## Übersicht

Dieses Dokument definiert die Aufbewahrungsfristen für alle personenbezogenen Daten gemäß DSGVO und internen Richtlinien.

---

## Aufbewahrungsfristen nach Datentyp

### 1. Business-Owner-Daten

**Datenkategorien:**
- Name, E-Mail, Profilbild
- Google User ID
- Geschäftsinformationen
- Account-Einstellungen

**Aufbewahrungsfrist:**
- **Aktiv:** Während der Vertragslaufzeit
- **Nach Kündigung:** 30 Tage Karenzzeit (für Datenexport)
- **Löschung:** Automatisch nach 30 Tagen nach Löschungsantrag

**Rechtsgrundlage:**
- Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
- Art. 17 DSGVO (Löschrecht)

**Löschprozess:**
- Soft-Delete: Account wird markiert für Löschung
- Hard-Delete: Automatisch nach 30 Tagen durch Cron-Job

---

### 2. Review-Daten

**Datenkategorien:**
- Review-Text
- Rating
- Reviewer-Name
- Zeitstempel
- Response-Status

**Aufbewahrungsfrist:**
- **Aktiv:** Während der Vertragslaufzeit
- **Nach letztem Sync:** 90 Tage
- **Nach Account-Löschung:** 90 Tage

**Rechtsgrundlage:**
- Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
- Berechtigtes Interesse erlischt nach Account-Löschung

**Löschprozess:**
- Automatisch nach 90 Tagen Inaktivität
- Oder 90 Tage nach Account-Löschung

---

### 3. Response-Drafts (nicht veröffentlicht)

**Datenkategorien:**
- KI-generierte Antwortvorschläge
- Bearbeitete Versionen
- Status (PENDING, READY_TO_APPROVE)

**Aufbewahrungsfrist:**
- **30 Tage** nach Erstellung
- Automatische Löschung wenn nicht veröffentlicht

**Rechtsgrundlage:**
- Datenminimierung (Art. 5 Abs. 1 lit. c DSGVO)
- Nicht veröffentlichte Drafts sind nicht langfristig erforderlich

**Löschprozess:**
- Täglich durch Cron-Job
- Löschung aller Drafts älter als 30 Tage

---

### 4. Veröffentlichte Antworten

**Datenkategorien:**
- Veröffentlichte Antworten auf Google Maps

**Aufbewahrungsfrist:**
- **Nicht in niemehr.de gespeichert**
- Antworten bleiben auf Google Maps (nicht unsere Verantwortung)

**Hinweis:**
- Veröffentlichte Antworten werden nicht in unserer Datenbank gespeichert
- Sie bleiben auf Google Maps und unterliegen deren Datenschutzrichtlinien

---

### 5. Logs

**Datenkategorien:**
- Server-Logs
- API-Logs
- Error-Logs
- Access-Logs

**Aufbewahrungsfrist:**
- **90 Tage** für Security-Logs
- **30 Tage** für Application-Logs
- Automatische Löschung danach

**Rechtsgrundlage:**
- Art. 32 DSGVO (Sicherheit der Verarbeitung)
- Logs sind für Security-Monitoring erforderlich

**Besonderheiten:**
- Keine personenbezogenen Daten in Logs
- Anonymisierte/aggregierte Daten nur
- Keine Review-Texte oder User-Daten

---

### 6. Session-Daten

**Datenkategorien:**
- Session-Tokens
- OAuth-Tokens
- Cookie-Daten

**Aufbewahrungsfrist:**
- **Bis Session-Ende** (automatisch)
- Session-Ablauf nach Inaktivität (z.B. 24h)

**Rechtsgrundlage:**
- Technisch notwendig für Funktionalität
- Automatische Löschung bei Session-Ende

---

## Automatische Löschprozesse

### Cron-Jobs

**Täglich:**
- Löschung von Response-Drafts älter als 30 Tage
- Löschung von Logs älter als 90 Tage (Security) / 30 Tage (Application)

**Wöchentlich:**
- Löschung von Accounts mit Löschungsantrag älter als 30 Tage
- Löschung von Review-Daten nach Frist

**Implementierung:**
- Siehe: `src/lib/cron/cleanup-deleted-accounts.ts` (zu erstellen)
- Cron-Job über Hosting-Provider oder Next.js API Routes

---

## Ausnahmen

### Rechtliche Aufbewahrungspflichten

Falls gesetzliche Aufbewahrungspflichten bestehen (z.B. steuerrechtlich), haben diese Vorrang.

**Beispiel:**
- Rechnungen: 10 Jahre (steuerrechtlich)
- Verträge: 3-10 Jahre (je nach Rechtsgebiet)

**Aktion:**
- Prüfen ob anwendbar
- Separate Aufbewahrung für steuerrechtliche Daten
- Nicht mit personenbezogenen Daten vermischen

---

## Datenexport vor Löschung

### Recht auf Datenexport (Art. 15 DSGVO)

**Vor Löschung:**
- User kann Daten exportieren
- 30 Tage Karenzzeit für Export
- JSON-Format mit allen Daten

**Implementierung:**
- API-Endpoint: `/api/user/data-export`
- UI im Dashboard: "Daten exportieren" Button

---

## Dokumentation

**Verwandte Dokumente:**
- VVT: `VVT_VERZEICHNIS_VERARBEITUNGSTAETIGKEITEN.md`
- Datenschutzerklärung: Abschnitt "Aufbewahrungsfristen"

---

## Änderungshistorie

| Datum | Änderung | Autor |
|-------|----------|-------|
| 2025-11-16 | Initiale Erstellung | [Name] |

---

**Hinweis:** Diese Fristen sollten regelmäßig überprüft werden, insbesondere bei Änderungen der Rechtslage oder Geschäftspraktiken.

