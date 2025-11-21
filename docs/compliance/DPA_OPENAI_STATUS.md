# DPA-Status mit OpenAI

**Projekt:** niemehr.de  
**Erstellt:** 2025-11-16  
**Letzte Aktualisierung:** 2025-11-16

---

## Status

**DPA-Abschluss:** ❌ Pending  
**Erforderlich:** ✅ Ja (Art. 28 DSGVO)  
**Blockierend für Launch:** ✅ Ja

---

## Informationen

### OpenAI Data Processing Addendum

**Link:** https://openai.com/policies/data-processing-addendum

**Verfügbarkeit:**
- OpenAI bietet standardisiertes DPA an
- Verfügbar über Account-Einstellungen
- Automatisch aktiviert bei Enterprise-Accounts

**Inhalt:**
- Standardvertragsklauseln (SCC) für Drittlandtransfer USA
- Technische und organisatorische Maßnahmen (TOMs)
- Datenschutz-Garantien
- Rechte der betroffenen Personen

---

## Abschluss-Prozess

### Schritt 1: Account-Zugriff
- [ ] OpenAI Account öffnen
- [ ] Zu Account Settings navigieren
- [ ] Data Processing Addendum aufrufen

### Schritt 2: DPA aktivieren
- [ ] DPA akzeptieren/aktivieren
- [ ] Abschluss-Datum notieren
- [ ] Bestätigung speichern

### Schritt 3: Dokumentation
- [x] Status in dieser Datei dokumentieren
- [ ] Abschluss-Datum eintragen
- [ ] VVT aktualisieren
- [ ] Datenschutzerklärung aktualisieren

---

## Zero Data Retention

**Status:** ⚠️ Zu prüfen

**Beschreibung:**
- OpenAI bietet Option für Zero Data Retention
- Verhindert Speicherung von API-Inputs für Training
- Erhöht Datenschutz-Compliance

**Aktion:**
- [ ] Prüfen ob verfügbar für verwendetes Modell (GPT-4o-mini)
- [ ] Falls verfügbar: Aktivieren
- [ ] In API-Calls konfigurieren

**API-Konfiguration:**
```typescript
// Falls verfügbar:
const completion = await client.responses.create({
  model: MODEL,
  input: prompt,
  // Zero Data Retention Option
  // (Exakte Parameter-Namen prüfen)
});
```

---

## Drittlandtransfer

**Rechtsgrundlage:**
- Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO
- ODER: EU-US Data Privacy Framework (falls OpenAI teilnimmt)

**Sicherheitsmaßnahmen:**
- Verschlüsselte Übertragung (HTTPS/TLS)
- DPA mit OpenAI
- Zero Data Retention (falls verfügbar)

**Dokumentiert in:**
- VVT: Abschnitt "Drittlandtransfers"
- Datenschutzerklärung: Abschnitt "Empfänger"

---

## Compliance-Checkliste

### Vor Launch:
- [ ] DPA mit OpenAI abgeschlossen
- [ ] Abschluss-Datum dokumentiert
- [ ] Zero Data Retention geprüft/aktiviert
- [ ] VVT aktualisiert
- [ ] Datenschutzerklärung aktualisiert

### Laufender Betrieb:
- [ ] Quartalsweise Überprüfung der DPA-Compliance
- [ ] Monitoring von API-Zugriffen
- [ ] Alerts bei ungewöhnlichen Mustern

---

## Kontakt

**OpenAI Support:**
- Website: https://openai.com/contact
- DPA-Fragen: Über Account-Support

**Interne Verantwortlichkeit:**
- Tech-Lead: [Einzutragen]
- Compliance: [Einzutragen]

---

## Änderungshistorie

| Datum | Änderung | Status |
|-------|----------|--------|
| 2025-11-16 | Initiale Dokumentation erstellt | Pending |

---

## Nächste Schritte

1. **Sofort:**
   - OpenAI Account öffnen
   - DPA aktivieren
   - Abschluss-Datum dokumentieren

2. **Diese Woche:**
   - Zero Data Retention prüfen
   - API-Konfiguration anpassen
   - VVT aktualisieren

3. **Vor Launch:**
   - Finale Verifizierung
   - Alle Checklisten abhaken

---

**WICHTIG:** DPA-Abschluss ist BLOCKIEREND für Launch. Launch erst nach Abschluss!

