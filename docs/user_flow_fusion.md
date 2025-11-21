# User Flow: FUSION – GROK Journey + Cursor UX

## Neuer User Flow (Text-Diagramm)

```
LANDING PAGE
│
├─ User tippt Business-Name
│  └─ Dropdown zeigt passende Businesses
│
├─ User wählt Business aus Dropdown
│  └─ Call: GET /api/fetch-reviews?placeId=...
│     │
│     ├─ API wählt 3 Reviews:
│     │  1. Neueste (newest publishedAt)
│     │  2. 5-Sterne mit Text
│     │  3. Schlechteste (lowest rating)
│     │
│     └─ Response: { reviews: [...], businessInfo: {...} }
│
├─ Reviews werden SOFORT angezeigt (unter Suchfeld)
│  └─ Jede Review zeigt:
│     - Autor, Rating, Text, Datum
│     - Vorgefertigte Antwort (Mock)
│
├─ User klickt "Beispiel-Antworten sehen →"
│  └─ Weiterleitung zu /demo?business=...&placeId=...
│
└─ DEMO PAGE
   │
   ├─ Loading State (3 Sekunden)
   │  └─ Call: GET /api/generate-demo?business=...&placeId=...
   │     └─ Generiert 3 Style-Varianten für jede Review
   │
   ├─ Style Selector
   │  └─ Default: Friendly
   │  └─ 3 Karten: Professional, Friendly, Casual
   │
   ├─ Results View
   │  │
   │  ├─ Review Rating > 2:
   │  │  └─ Normale Antwort wird angezeigt
   │  │  └─ Confidence Badge: Grün (>= 90%) oder Gelb (< 90%)
   │  │
   │  └─ Review Rating <= 2:
   │     └─ ESCALATION MODE
   │        ├─ Badge: "⚠ SMS gesendet – Antwort in 24h automatisch"
   │        ├─ Generische Antwort: "Das tut uns leid. Wir nehmen uns der Sache an."
   │        └─ Confidence Badge: Gelb (immer)
   │
   └─ Upsell → Signup
```

## API Response Beispiel

### GET /api/fetch-reviews?placeId=ChIJN1t_tDeuEmsRUsoyG83frY4

```json
{
  "success": true,
  "businessInfo": {
    "placeId": "ChIJN1t_tDeuEmsRUsoyG83frY4",
    "name": "Burger Palace Berlin-Mitte",
    "location": "Berlin-Mitte",
    "type": "restaurant"
  },
  "reviews": [
    {
      "id": "review_1",
      "author": "Alexandra",
      "rating": 5,
      "text": "Absolut empfehlenswert! Beste Burger in Berlin.",
      "publishedAt": "2024-11-13T10:30:00Z",
      "date": "vor 11 Stunden",
      "selectedReason": "newest"
    },
    {
      "id": "review_2",
      "author": "Maria K.",
      "rating": 5,
      "text": "Sehr kompetente Behandlung und freundliches Personal.",
      "publishedAt": "2024-11-10T14:20:00Z",
      "date": "vor 3 Tagen",
      "selectedReason": "five_star_with_text"
    },
    {
      "id": "review_3",
      "author": "pL4YsC0Pe",
      "rating": 1,
      "text": "Habe dort Bestellt und meine Bestellung kam nie an. Man wartet über 2 Stunden.",
      "publishedAt": "2024-04-15T08:00:00Z",
      "date": "vor 7 Monaten",
      "selectedReason": "lowest_rating"
    }
  ]
}
```

## SMS Mock-Message

### Für Review mit Rating <= 2:

```
📱 SMS an Business-Owner:

"⚠️ Neue negative Review (1★) von pL4YsC0Pe:
'Habe dort Bestellt und meine Bestellung kam nie an. Man wartet über 2 Stunden, man erreicht auch niemanden'

Wir haben eine generische Antwort gesendet:
'Das tut uns leid. Wir nehmen uns der Sache an. Bitte kontaktieren Sie uns direkt unter [Kontakt], damit wir das für Sie klären können. Mit freundlichen Grüßen, Ihr Team'

Bitte antworte innerhalb von 24h mit einer persönlichen Nachricht.
→ [Link zu Dashboard]"
```

### Generische Antwort (automatisch gepostet):

```
"Das tut uns leid. Wir nehmen uns der Sache an. 
Bitte kontaktieren Sie uns direkt unter [Kontakt], 
damit wir das für Sie klären können. 
Mit freundlichen Grüßen, 
Ihr [Business Name] Team"
```

### SMS Format (JSON für später):

```json
{
  "to": "+491234567890",
  "message": "⚠️ Neue negative Review (1★) von pL4YsC0Pe:\n'Habe dort Bestellt...'\n\nWir haben eine generische Antwort gesendet.\nBitte antworte innerhalb von 24h.\n→ https://niemehr.de/dashboard/reviews/123",
  "reviewId": "review_3",
  "businessId": "burger-palace",
  "timestamp": "2024-11-13T12:00:00Z"
}
```

## Review-Auswahl-Kriterien

### 1. Neueste Review (newest publishedAt)
- Sortiere nach `publishedAt` DESC
- Nimm erste Review
- Falls keine vorhanden: Fallback auf älteste

### 2. 5-Sterne mit Text
- Filter: `rating === 5` UND `text.length > 0`
- Falls mehrere: Nimm neueste
- Falls keine: Fallback auf höchstes Rating mit Text

### 3. Schlechteste Review (lowest rating)
- Sortiere nach `rating` ASC
- Bei Gleichstand: Nimm neueste
- Falls keine: Fallback auf niedrigstes verfügbares Rating

## Escalation-Logik

### Trigger: `review.rating <= 2`

**Im ResultsView:**
- Zeige spezielles Badge: "⚠ SMS gesendet – Antwort in 24h automatisch"
- Zeige generische Antwort statt Style-Variante
- Confidence Badge: Immer Gelb
- Keine Style-Auswahl für diese Review

**Backend (später):**
- Automatisch SMS an Business-Owner senden
- Generische Antwort sofort posten
- 24h Timer für manuelle Antwort
- Falls keine Antwort: Automatische Follow-up-Antwort

