# Finale Pre-Launch Compliance Checkliste

## niemehr.de - Bereit für den Launch?

**Stand:** November 2025  
**Status:** Implementation abgeschlossen - Finale Überprüfung erforderlich

---

## 🔴 BLOCKIEREND - Muss VOR Launch erledigt sein:

### 1. Kontaktdaten vervollständigen (15-30 Min.)

#### ✏️ Impressum (`src/app/impressum/page.tsx`)

```typescript
// Zeile 18-23: Ersetze Platzhalter mit echten Daten
const contact = {
  name: "[IHR FIRMENNAME / VOLLSTÄNDIGER NAME]",
  address: "[STRASSE HAUSNUMMER, PLZ ORT]",
  email: "[IHRE@EMAIL.DE]",
  phone: "[+49 XXX XXXXXXX]", // Optional aber empfohlen
  vat: "[DE XXXXXXXXX]", // Nur wenn USt-pflichtig
  register: "[HRB XXXXX, Amtsgericht XXXXX]" // Nur bei GmbH/UG
};
```

**Zu prüfen:**

- [ ] Ist die Firma im Handelsregister eingetragen? → Register-Nr. eintragen
- [ ] Umsatzsteuer-pflichtig? → Ust-IdNr. eintragen
- [ ] Gibt es eine Aufsichtsbehörde? (z.B. IHK) → Eintragen

#### ✏️ Datenschutzerklärung (`src/app/datenschutz/page.tsx`)

```typescript
// Zeile 24-27: Kontaktdaten des Verantwortlichen
const responsible = {
  name: "[FIRMENNAME]",
  address: "[ADRESSE]",
  email: "datenschutz@niemehr.de", // Empfohlen: Eigene Adresse
  phone: "[OPTIONAL]"
};

// Zeile 37-40: Datenschutzbeauftragter (falls vorhanden)
// Falls KEIN DSB: Section komplett entfernen oder "nicht erforderlich" eintragen
const dataProtectionOfficer = {
  required: false, // Erst ab 20 Mitarbeiter mit Datenverarbeitung
  name: "[NAME DSB]",
  email: "[DSB@EMAIL.DE]"
};
```

**Zu entscheiden:**

- [ ] Benötigen Sie einen Datenschutzbeauftragten? 
  - ✅ Ja: Wenn ≥20 Personen ständig mit Datenverarbeitung beschäftigt
  - ❌ Nein: Bei kleineren Teams → Section entfernen

#### ✏️ Footer (`src/components/layout/Footer.tsx`)

```typescript
// Zeile 45: Kontakt-E-Mail
<a href="mailto:kontakt@niemehr.de">kontakt@niemehr.de</a>
```

---

### 2. OpenAI Data Processing Agreement (DPA) abschließen (10-15 Min.)

**Wo:** OpenAI Platform → Account Settings → Data Processing Agreement

**Schritte:**

1. Login auf https://platform.openai.com
2. Settings → Organization → Legal
3. "Data Processing Addendum" suchen
4. DPA elektronisch akzeptieren (oder Download + Unterschrift + Upload)
5. Bestätigung speichern

**Dokumentieren:**

```bash
# Öffne: docs/compliance/DPA_OPENAI_STATUS.md
# Aktualisiere:
## Status: ✅ ABGESCHLOSSEN
Datum: [TT.MM.YYYY]
Unterzeichner: [Ihr Name]
Dokumentation: [Link zur Bestätigung oder PDF speichern]
```

**Zusätzlich prüfen:**

- [ ] Zero Data Retention aktiviert? (falls verfügbar für GPT-4o-mini)
- [ ] API-Nutzungslimits gesetzt? (Kostenkontrolle)

---

### 3. Finale Code-Review (30-60 Min.)

#### ✅ Sicherheit überprüfen

**A) Umgebungsvariablen:**

```bash
# .env.local muss enthalten:
OPENAI_API_KEY=sk-... # ✅ Niemals in Git committen!
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
DATABASE_URL=...
NEXTAUTH_SECRET=... # ✅ Stark, zufällig, min. 32 Zeichen
```

**Prüfen:**

```bash
# Ist .env.local in .gitignore?
grep ".env.local" .gitignore
# Output sollte: .env.local sein
```

**B) API Error Handling prüfen:**

```bash
# Suche nach console.log/console.error mit sensiblen Daten
grep -r "console.log.*review" src/
grep -r "console.error.*user" src/

# Sollte KEINE Treffer in Production-Code geben!
```

**C) Auth-Konfiguration:**

```typescript
// src/app/api/auth/[...nextauth]/route.ts
// Prüfe: Ist NEXTAUTH_URL gesetzt für Production?
// Prüfe: Sind Callbacks sicher?
```

#### ✅ UI/UX überprüfen

**Test-Checklist:**

- [ ] Cookie-Banner wird beim ersten Besuch angezeigt
- [ ] Footer mit Links zu Impressum/Datenschutz/AGB ist sichtbar
- [ ] AI-Disclaimer wird bei allen generierten Antworten angezeigt
- [ ] Compliance-Info-Banner wird beim ersten Dashboard-Login angezeigt
- [ ] "Daten exportieren" Button in Einstellungen funktioniert
- [ ] "Account löschen" Button zeigt Bestätigungs-Dialog

**Manuell testen:**

```bash
npm run dev
# → http://localhost:3000
# → Alle oben genannten Punkte durchklicken
```

---

### 4. Prisma Schema & Database (15-30 Min.)

#### ✅ User Model erweitern (falls noch nicht vorhanden)

```prisma
// prisma/schema.prisma
model User {
  id                  String    @id @default(cuid())
  email               String    @unique
  name                String?
  // ... bestehende Felder ...
  
  // ✅ Compliance-Felder hinzufügen:
  deletionRequestedAt DateTime? // Für Art. 17 DSGVO
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
}
```

**Migration ausführen:**

```bash
npx prisma migrate dev --name add_compliance_fields
npx prisma generate
```

#### ✅ Automatische Löschung vorbereiten

**Cron-Job implementieren** (kann auch Post-Launch):

```typescript
// src/lib/cron/cleanup-deleted-accounts.ts
// Datei wurde von Cursor erstellt
// ABER: Cron-Job muss noch aktiviert werden!
```

**Optionen für Cron:**

- Vercel Cron Jobs (empfohlen für Vercel Hosting)
- GitHub Actions (für automatische Ausführung)
- Manuell: Eigener Server mit cron

**Für jetzt:** Kann Post-Launch implementiert werden (nicht blockierend)

---

## 🟡 WICHTIG - Innerhalb 1 Woche nach Launch:

### 5. Testing & Monitoring einrichten

#### A) Error Monitoring

```bash
# Optional: Sentry oder ähnliches integrieren
npm install @sentry/nextjs
# Konfiguration nach offiziellem Guide
```

#### B) Analytics (DSGVO-konform)

```bash
# Option 1: Plausible Analytics (Privacy-First)
# Option 2: Matomo (Self-Hosted)
# Option 3: Google Analytics mit Consent-Management

# WICHTIG: Bei Analytics → Cookie-Banner erweitern!
```

#### C) Logging einrichten

```typescript
// src/lib/logger.ts
// Strukturiertes Logging ohne sensible Daten
// z.B. mit Winston oder Pino
```

---

### 6. Erste User Tests durchführen

**Test-Szenarien:**

1. **Positive Review:** "Toller Service, sehr freundlich!"
2. **Negative Review:** "Katastrophe! Nie wieder!"
3. **Neutrale Review:** "Durchschnittlich, nichts Besonderes."
4. **Edge Case:** Nur Sterne, kein Text
5. **Sensibel:** Review mit Gesundheits-Bezug (Arztpraxis)

**Prüfe AI-Antworten auf:**

- [ ] Professioneller Ton
- [ ] Keine Diskriminierung
- [ ] Keine medizinischen Ratschläge (bei Arztpraxen)
- [ ] Angemessene Länge
- [ ] Passender Stil (Professional/Friendly/Casual)

---

### 7. Feedback-Mechanismus aktivieren

```typescript
// src/app/api/feedback/report-response/route.ts
// Von Cursor erstellt - Endpunkt testen

// In UI integrieren (Freigaben-Seite):
<Button variant="ghost" onClick={handleReportIssue}>
  ⚠️ Problem melden
</Button>
```

**Monitoring einrichten:**

- [ ] E-Mail-Benachrichtigung bei gemeldeten Problemen
- [ ] Wöchentliche Review der gemeldeten Antworten

---

## 🟢 NICE-TO-HAVE - Kontinuierliche Verbesserung:

### 8. Erweiterte Features (Post-Launch)

#### A) Branchen-spezifische Prompts

```typescript
// src/lib/ai/industry-prompts.ts
// Spezielle Regeln für:
// - Medizin (HWG-konform)
// - Recht (BORA-konform)
// - Gastronomie (besondere Anforderungen)
```

#### B) Multi-Language Support

- Englische Reviews erkennen und antworten
- Andere Sprachen (Französisch, Spanisch, etc.)

#### C) A/B-Testing für Prompts

- Verschiedene Prompt-Versionen testen
- Erfolgsmessung (User-Zufriedenheit)

---

## 📋 Launch-Day Checkliste

**Am Tag des Launches:**

### Vor Go-Live (Morgens):

- [ ] ✅ Alle Kontaktdaten eingetragen
- [ ] ✅ OpenAI DPA abgeschlossen und dokumentiert
- [ ] ✅ Database-Migration durchgeführt
- [ ] ✅ Environment Variables in Production gesetzt
- [ ] ✅ SSL-Zertifikat aktiv (HTTPS)
- [ ] ✅ DNS konfiguriert
- [ ] ✅ Backup-Strategie definiert

### Direkt nach Go-Live (erste Stunden):

- [ ] ⏰ Erste Test-Registrierung durchführen
- [ ] ⏰ Review-Sync testen (Google Integration)
- [ ] ⏰ AI-Antwort generieren und überprüfen
- [ ] ⏰ Error-Logs prüfen (keine 500er Fehler?)
- [ ] ⏰ Performance monitoring (Ladezeiten OK?)

### Erste Woche:

- [ ] 📊 Täglich Error-Logs prüfen
- [ ] 📊 User-Feedback sammeln
- [ ] 📊 AI-Antworten stichprobenartig überprüfen (5%)
- [ ] 📊 Compliance-Incidents dokumentieren (falls vorhanden)

---

## 🚨 Incident Response - Vorbereitet sein

**Falls etwas schief geht:**

### Szenario 1: AI generiert unangemessene Antwort

1. ✅ Human-in-the-Loop verhindert automatische Veröffentlichung
2. User meldet Problem über Feedback-Button
3. Prompt sofort anpassen
4. Dokumentieren in `docs/compliance/INCIDENT_LOG.md`

### Szenario 2: Datenpanne (Unauthorized Access)

1. 🚨 **KRITISCH:** 72-Stunden-Frist für Meldung!
2. Sofortige Eindämmung (API-Keys rotieren, Zugriff sperren)
3. Aufsichtsbehörde kontaktieren (vorbereitet in `INCIDENT_RESPONSE_PLAN.md`)
4. Betroffene User informieren (falls erforderlich)
5. Ursachenanalyse & Dokumentation

### Szenario 3: Beschwerde über Datenschutz

1. Innerhalb 30 Tage antworten (DSGVO-Pflicht)
2. Anfrage ernst nehmen und dokumentieren
3. Bei Bedarf: Rechtsberatung einholen
4. Prozess dokumentieren

**Kontakte vorbereiten:**

```markdown
## Notfall-Kontakte

- Datenschutzbeauftragter: [falls vorhanden]
- Rechtsanwalt (IT-Recht): [empfohlen]
- Aufsichtsbehörde: [je nach Bundesland]
- Hosting-Provider Support: [z.B. Vercel]
```

---

## ✅ Finale Freigabe

**Unterschreiben Sie diese Checkliste, wenn alles erledigt ist:**

```
Hiermit bestätige ich, dass alle kritischen Pre-Launch-Compliance-Anforderungen
erfüllt sind und niemehr.de bereit für den öffentlichen Launch ist.

Name: _______________________
Datum: _______________________
Unterschrift: _______________________
```

**Dokumentation archivieren:**

```bash
# Erstelle Launch-Snapshot
cp -r docs/compliance docs/compliance_backup_launch_$(date +%Y%m%d)
```

---

## 📞 Support & Ressourcen

**Bei Fragen zur Compliance:**

- KI-Protokoll: `docs/compliance/KI_PROTOKOLL_EU_COMPLIANCE.md`
- Cursor Rules: `.cursorrules`
- Implementation Log: `docs/compliance/IMPLEMENTATION_LOG.md`

**Externe Ressourcen:**

- DSGVO: https://dsgvo-gesetz.de
- AI Act: https://eur-lex.europa.eu
- OpenAI DPA: https://openai.com/policies/data-processing-addendum
- Datenschutzkonferenz: https://www.datenschutzkonferenz-online.de

**Bei technischen Problemen:**

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- OpenAI API: https://platform.openai.com/docs

---

## 🎯 Zusammenfassung

**Status:**

- ✅ Implementation: 95% abgeschlossen
- ⏰ Manuelle Aufgaben: ~3-4 Stunden (Kontaktdaten, DPA, Tests)
- 🚀 Launch-Bereitschaft: Nach Abschluss der manuellen Aufgaben

**Nächste Schritte:**

1. Kontaktdaten eintragen (15-30 Min)
2. OpenAI DPA abschließen (10-15 Min)
3. Code-Review & Tests (30-60 Min)
4. Database Migration (15-30 Min)
5. ✅ GO LIVE!

**Nach Launch:**

- Monitoring aktivieren (Woche 1)
- User-Feedback sammeln (laufend)
- Compliance-Reviews (monatlich)
- Prompt-Optimierung (kontinuierlich)

---

**Viel Erfolg beim Launch! 🚀**

