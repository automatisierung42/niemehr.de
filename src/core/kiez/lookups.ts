/**
 * Kiez-Score Lookup-Tabellen für ganz Deutschland
 * 
 * Jeder Wert repräsentiert die "Lockerheit" eines Ortes:
 * - Hohe Werte (60-100): Locker, lässig, "Ey" ist okay
 * - Mittlere Werte (40-60): Ausgewogen, respektvoll aber nicht steif
 * - Niedrige Werte (0-40): Formeller, "Herzlichen Dank" statt "Ey"
 * 
 * Default bei fehlenden Daten: 50 (sicheres Mittel)
 */

/**
 * Städte-Lookup: Direkte Zuordnung von Stadtnamen zu Kiez-Scores
 * 
 * Format: Stadtname (normalisiert, lowercase) → Score-Modifikator
 * 
 * Diese Werte werden zur Basis (50) addiert/subtrahiert
 */
export const CITY_SCORES: Record<string, number> = {
  // Berlin Bezirke & Kieze
  'neukölln': 40,        // +40: Multikulti, lässig, "Ey" ist Standard
  'kreuzberg': 35,       // +35: Alternative, kreativ, sehr locker
  'friedrichshain': 30,  // +30: Studentisch, jung, entspannt
  'prenzlauer berg': 25, // +25: Hipster, aber etwas formeller als Kreuzberg
  'wedding': 20,         // +20: Arbeiterkiez, authentisch, direkt
  'charlottenburg': -10, // -10: Elegant, formell, gehobenes Klientel
  'zehlendorf': -15,    // -15: Sehr formell, konservativ, "Herzlichen Dank"
  'mitte': 0,            // 0: Gemischt, Business + Tourismus
  'schöneberg': 10,      // +10: Queer-freundlich, locker aber nicht zu lässig
  'tempelhof': 5,        // +5: Familienfreundlich, respektvoll
  'spandau': -5,         // -5: Traditionell, etwas formeller
  'reinickendorf': 0,    // 0: Durchschnitt, neutral
  'lichtenberg': 10,     // +10: Arbeiterkiez, direkt aber respektvoll
  'marzahn': 5,          // +5: Familienfreundlich, respektvoll
  'pankow': 5,           // +5: Gemischt, leicht locker
  'treptow-köpenick': 0, // 0: Gemischt, neutral
  'steglitz': -10,       // -10: Formell, gehobenes Klientel
  'moabit': 15,          // +15: Multikulti, authentisch, locker

  // Hamburg Stadtteile
  'st. pauli': 35,       // +35: Party-Kiez, sehr locker, "Ey" Standard
  'schanzenviertel': 30, // +30: Alternative, kreativ, lässig
  'altona': 15,          // +15: Multikulti, authentisch, locker
  'eimsbüttel': 10,      // +10: Studentisch, jung, leicht locker
  'harburg': 5,          // +5: Arbeiterkiez, respektvoll
  'blankenese': -15,     // -15: Sehr formell, gehobenes Klientel
  'harvestehude': -10,   // -10: Elegant, formell
  'winterhude': 0,       // 0: Gemischt, neutral
  'barmbek': 5,          // +5: Familienfreundlich, respektvoll
  'wandsbek': 0,         // 0: Durchschnitt, neutral
  'bergedorf': -5,       // -5: Traditionell, etwas formeller

  // München Stadtteile
  'schwabing': 20,       // +20: Studentisch, jung, locker
  'glockenbachviertel': 25, // +25: Queer-freundlich, kreativ, lässig
  'maxvorstadt': 15,     // +15: Studentisch, jung, leicht locker
  'haidhausen': 10,      // +10: Gemischt, leicht locker
  'sendling': 5,         // +5: Arbeiterkiez, respektvoll
  'bogenhausen': -10,    // -10: Elegant, formell, gehobenes Klientel
  'grünwald': -20,       // -20: Sehr formell, sehr gehobenes Klientel
  'neuhausen': 0,        // 0: Gemischt, neutral
  'au': 10,              // +10: Multikulti, authentisch, locker
  'giesing': 5,          // +5: Arbeiterkiez, respektvoll

  // Köln Stadtteile
  'ehrenfeld': 30,       // +30: Multikulti, kreativ, sehr locker
  'nippes': 20,          // +20: Studentisch, jung, locker
  'sülz': 10,            // +10: Studentisch, leicht locker
  'belgisches viertel': 15, // +15: Hipster, kreativ, lässig
  'deutz': 5,            // +5: Gemischt, leicht locker
  'marienburg': -15,     // -15: Sehr formell, gehobenes Klientel
  'lindenthal': -10,     // -10: Elegant, formell
  'chorweiler': 10,      // +10: Arbeiterkiez, authentisch, locker
  'mülheim': 15,         // +15: Multikulti, authentisch, locker
  'kalk': 10,            // +10: Arbeiterkiez, respektvoll aber locker

  // Frankfurt Stadtteile
  'sachsenhausen': 20,   // +20: Party-Kiez, locker
  'bornheim': 15,        // +15: Studentisch, jung, locker
  'nordend': 10,         // +10: Hipster, kreativ, leicht locker
  'bockenheim': 15,      // +15: Studentisch, jung, locker
  'westend': -10,        // -10: Elegant, formell, Business
  'oberrad': 5,          // +5: Gemischt, neutral
  'griesheim': 10,       // +10: Arbeiterkiez, authentisch, locker
  'höchst': 5,           // +5: Arbeiterkiez, respektvoll

  // Stuttgart Stadtteile
  'feuerbach': 10,       // +10: Arbeiterkiez, authentisch, locker
  'bad cannstatt': 15,   // +15: Multikulti, authentisch, locker
  'vaihingen': 0,        // 0: Gemischt, neutral
  'degerloch': -5,       // -5: Traditionell, etwas formeller
  'west': 5,             // +5: Gemischt, leicht locker
  'nord': 10,            // +10: Multikulti, authentisch, locker
  'ost': 5,              // +5: Gemischt, neutral

  // Düsseldorf Stadtteile
  'flingern': 25,        // +25: Hipster, kreativ, sehr locker
  'bilk': 15,            // +15: Studentisch, jung, locker
  'oberkassel': -10,     // -10: Elegant, formell, gehobenes Klientel
  'gerresheim': 5,       // +5: Gemischt, neutral
  'derendorf': 10,       // +10: Multikulti, authentisch, locker
  'kalkum': -5,          // -5: Traditionell, etwas formeller

  // Dortmund Stadtteile
  'nordstadt': 20,       // +20: Multikulti, authentisch, locker
  'kreuzviertel': 15,    // +15: Studentisch, jung, locker
  'hombruch': 5,         // +5: Gemischt, neutral
  'aplerbeck': 0,        // 0: Gemischt, neutral
  'schüren': 5,          // +5: Arbeiterkiez, respektvoll

  // Essen Stadtteile
  'ruettenscheid': 10,   // +10: Gemischt, leicht locker
  'katernberg': 15,      // +15: Multikulti, authentisch, locker
  'frohnhausen': 5,      // +5: Arbeiterkiez, respektvoll
  'werden': 0,           // 0: Gemischt, neutral
  'bredeney': -10,       // -10: Elegant, formell

  // Leipzig Stadtteile
  'connewitz': 30,       // +30: Alternative, kreativ, sehr locker
  'plagwitz': 25,        // +25: Hipster, kreativ, lässig
  'lindenau': 20,        // +20: Studentisch, jung, locker
  'zentrum': 5,          // +5: Gemischt, leicht locker
  'gohlis': 0,           // 0: Gemischt, neutral
  'grünau': 5,           // +5: Familienfreundlich, respektvoll

  // Dresden Stadtteile
  'neustadt': 25,        // +25: Alternative, kreativ, locker
  'altstadt': 0,         // 0: Tourismus, gemischt
  'plauen': 5,           // +5: Gemischt, neutral
  'blasewitz': -5,       // -5: Traditionell, etwas formeller
  'cotta': 10,           // +10: Arbeiterkiez, authentisch, locker

  // Weitere Großstädte (vereinfacht)
  'hannover': 5,         // +5: Gemischt, neutral
  'nürnberg': 5,         // +5: Traditionell, respektvoll
  'duisburg': 10,        // +10: Arbeiterkiez, authentisch, locker
  'bochum': 10,          // +10: Studentisch, jung, locker
  'wuppertal': 5,        // +5: Gemischt, neutral
  'bielefeld': 0,        // 0: Gemischt, neutral
  'bonn': 5,             // +5: Studentisch, leicht locker
  'münster': 10,         // +10: Studentisch, jung, locker
  'karlsruhe': 5,        // +5: Gemischt, neutral
  'mannheim': 10,        // +10: Multikulti, authentisch, locker
  'augsburg': 5,         // +5: Gemischt, neutral
  'wiesbaden': -5,       // -5: Traditionell, etwas formeller
  'gelsenkirchen': 10,   // +10: Arbeiterkiez, authentisch, locker
  'mönchengladbach': 5,  // +5: Gemischt, neutral
  'braunschweig': 0,     // 0: Gemischt, neutral
  'chemnitz': 0,         // 0: Gemischt, neutral
  'kiel': 10,            // +10: Studentisch, jung, locker
  'aachen': 15,          // +15: Studentisch, sehr jung, locker
  'halle': 5,            // +5: Gemischt, neutral
  'magdeburg': 0,        // 0: Gemischt, neutral
  'freiburg': 15,        // +15: Studentisch, jung, locker
  'krefeld': 5,          // +5: Gemischt, neutral
  'lübeck': 0,           // 0: Traditionell, neutral
  'oberhausen': 10,     // +10: Arbeiterkiez, authentisch, locker
  'erfurt': 5,           // +5: Gemischt, neutral
  'mainz': 10,           // +10: Studentisch, jung, locker
  'rostock': 10,         // +10: Studentisch, jung, locker
  'kassel': 5,           // +5: Gemischt, neutral
  'hagen': 5,            // +5: Gemischt, neutral
  'hamm': 5,             // +5: Gemischt, neutral
  'saarbrücken': 10,     // +10: Studentisch, jung, locker
  'mülheim an der ruhr': 10, // +10: Arbeiterkiez, authentisch, locker
  'potsdam': 5,          // +5: Studentisch, leicht locker
  'ludwigshafen': 10,    // +10: Arbeiterkiez, authentisch, locker
  'oldenburg': 10,       // +10: Studentisch, jung, locker
  'leverkusen': 5,       // +5: Gemischt, neutral
  'osnabrück': 10,       // +10: Studentisch, jung, locker
  'solingen': 5,         // +5: Gemischt, neutral
  'heidelberg': 15,      // +15: Studentisch, sehr jung, locker
  'herne': 10,           // +10: Arbeiterkiez, authentisch, locker
  'neuss': 5,            // +5: Gemischt, neutral
  'darmstadt': 15,       // +15: Studentisch, sehr jung, locker
  'paderborn': 5,        // +5: Gemischt, neutral
  'regensburg': 10,      // +10: Studentisch, jung, locker
  'ingolstadt': 0,       // 0: Gemischt, neutral
  'würzburg': 10,        // +10: Studentisch, jung, locker
  'fürth': 5,            // +5: Gemischt, neutral
  'wolfsburg': 0,        // 0: Gemischt, neutral
  'offenbach': 15,       // +15: Multikulti, authentisch, locker
  'ulm': 10,             // +10: Studentisch, jung, locker
  'heilbronn': 5,        // +5: Gemischt, neutral
  'pforzheim': 5,        // +5: Gemischt, neutral
  'göttingen': 15,       // +15: Studentisch, sehr jung, locker
  'bottrop': 10,         // +10: Arbeiterkiez, authentisch, locker
  'trier': 10,           // +10: Studentisch, jung, locker
  'recklinghausen': 5,   // +5: Gemischt, neutral
  'reutlingen': 5,       // +5: Gemischt, neutral
  'bremerhaven': 10,     // +10: Arbeiterkiez, authentisch, locker
  'koblenz': 5,          // +5: Gemischt, neutral
  'bergisch gladbach': 0, // 0: Gemischt, neutral
  'jena': 15,            // +15: Studentisch, sehr jung, locker
  'remscheid': 5,        // +5: Gemischt, neutral
  'erlangen': 15,        // +15: Studentisch, sehr jung, locker
  'moers': 5,            // +5: Gemischt, neutral
  'siegen': 5,           // +5: Gemischt, neutral
  'hildesheim': 5,       // +5: Gemischt, neutral
  'salzgitter': 5,       // +5: Gemischt, neutral

  // Spezielle Städte mit besonderen Charakteren
  'cottbus': -30,        // -30: Sehr formell, konservativ, "Herzlichen Dank" Standard
  'weimar': 5,           // +5: Kulturstadt, respektvoll
  'eisenach': 0,         // 0: Traditionell, neutral
  'schwerin': 0,         // 0: Gemischt, neutral
  'potsdam': 5,          // +5: Studentisch, leicht locker
  'brandenburg': 0,      // 0: Gemischt, neutral
  'frankfurt (oder)': 0, // 0: Gemischt, neutral (Oder-Frankfurt)
  'neubrandenburg': 0,   // 0: Gemischt, neutral
  'stralsund': 0,        // 0: Traditionell, neutral
  'greifswald': 10,      // +10: Studentisch, jung, locker
  'rostock': 10,         // +10: Studentisch, jung, locker
  'wismar': 0,           // 0: Traditionell, neutral
}

/**
 * Postleitzahlen-Bereiche für grobe Zuordnung
 * 
 * Format: PLZ-Präfix (erste 2-3 Ziffern) → Score-Modifikator
 * 
 * Wird verwendet, wenn Stadtname nicht gefunden wird
 */
export const POSTAL_CODE_SCORES: Record<string, number> = {
  // Berlin (10xxx)
  '10': 15,              // +15: Berlin Durchschnitt (gemischt aus allen Bezirken)
  
  // Hamburg (20xxx)
  '20': 10,              // +10: Hamburg Durchschnitt
  
  // München (80xxx)
  '80': 5,               // +5: München Durchschnitt
  
  // Köln (50xxx)
  '50': 15,              // +15: Köln Durchschnitt
  
  // Frankfurt (60xxx)
  '60': 10,              // +10: Frankfurt Durchschnitt
  
  // Stuttgart (70xxx)
  '70': 5,               // +5: Stuttgart Durchschnitt
  
  // Düsseldorf (40xxx)
  '40': 10,              // +10: Düsseldorf Durchschnitt
  
  // Dortmund (44xxx)
  '44': 10,              // +10: Dortmund Durchschnitt
  
  // Essen (45xxx)
  '45': 10,              // +10: Essen Durchschnitt
  
  // Leipzig (04xxx)
  '04': 20,              // +20: Leipzig Durchschnitt (alternativ, kreativ)
  
  // Dresden (01xxx)
  '01': 5,               // +5: Dresden Durchschnitt
  
  // Weitere Großstädte
  '30': 5,               // +5: Hannover
  '90': 5,               // +5: Nürnberg
  '47': 10,              // +10: Duisburg
  '44': 10,              // +10: Bochum
  '42': 5,               // +5: Wuppertal
  '33': 0,               // 0: Bielefeld
  '53': 5,               // +5: Bonn
  '48': 10,              // +10: Münster
  '76': 5,               // +5: Karlsruhe
  '68': 10,              // +10: Mannheim
  '86': 5,               // +5: Augsburg
  '65': -5,              // -5: Wiesbaden
  '45': 10,              // +10: Gelsenkirchen
  '41': 5,               // +5: Mönchengladbach
  '38': 0,               // 0: Braunschweig
  '09': 0,               // 0: Chemnitz
  '24': 10,              // +10: Kiel
  '52': 15,              // +15: Aachen
  '06': 5,               // +5: Halle
  '39': 0,               // 0: Magdeburg
  '79': 15,              // +15: Freiburg
  '47': 5,               // +5: Krefeld
  '23': 0,               // 0: Lübeck
  '46': 10,              // +10: Oberhausen
  '99': 5,               // +5: Erfurt
  '55': 10,              // +10: Mainz
  '18': 10,              // +10: Rostock
  '34': 5,               // +5: Kassel
  '58': 5,               // +5: Hagen
  '59': 5,               // +5: Hamm
  '66': 10,              // +10: Saarbrücken
  '14': 5,               // +5: Potsdam
  '67': 10,              // +10: Ludwigshafen
  '26': 10,              // +10: Oldenburg
  '51': 5,               // +5: Leverkusen
  '49': 10,              // +10: Osnabrück
  '42': 5,               // +5: Solingen
  '69': 15,              // +15: Heidelberg
  '44': 10,              // +10: Herne
  '41': 5,               // +5: Neuss
  '64': 15,              // +15: Darmstadt
  '33': 5,               // +5: Paderborn
  '93': 10,              // +10: Regensburg
  '85': 0,               // 0: Ingolstadt
  '97': 10,              // +10: Würzburg
  '90': 5,               // +5: Fürth
  '38': 0,               // 0: Wolfsburg
  '63': 15,              // +15: Offenbach
  '89': 10,              // +10: Ulm
  '74': 5,               // +5: Heilbronn
  '75': 5,               // +5: Pforzheim
  '37': 15,              // +15: Göttingen
  '46': 10,              // +10: Bottrop
  '54': 10,              // +10: Trier
  '45': 5,               // +5: Recklinghausen
  '72': 5,               // +5: Reutlingen
  '27': 10,              // +10: Bremerhaven
  '56': 5,               // +5: Koblenz
  '51': 0,               // 0: Bergisch Gladbach
  '07': 15,              // +15: Jena
  '42': 5,               // +5: Remscheid
  '91': 15,              // +15: Erlangen
  '47': 5,               // +5: Moers
  '57': 5,               // +5: Siegen
  '31': 5,               // +5: Hildesheim
  '38': 5,               // +5: Salzgitter
  
  // Cottbus & Umgebung (03xxx)
  '03': -20,             // -20: Cottbus & Umgebung, sehr formell
}

/**
 * Bundesländer-Durchschnitte als Fallback
 * 
 * Format: Bundesland-Name → Score-Modifikator
 */
export const STATE_SCORES: Record<string, number> = {
  'berlin': 15,          // +15: Hauptstadt, gemischt aber tendenziell locker
  'hamburg': 10,        // +10: Hafenstadt, authentisch, locker
  'bremen': 5,          // +5: Gemischt, neutral
  'niedersachsen': 0,   // 0: Gemischt, neutral
  'schleswig-holstein': 0, // 0: Traditionell, neutral
  'mecklenburg-vorpommern': 0, // 0: Traditionell, neutral
  'brandenburg': -5,    // -5: Traditionell, etwas formeller
  'sachsen-anhalt': -5, // -5: Traditionell, etwas formeller
  'sachsen': 0,         // 0: Gemischt, neutral
  'thüringen': 0,       // 0: Traditionell, neutral
  'nordrhein-westfalen': 10, // +10: Ruhrgebiet, authentisch, locker
  'rheinland-pfalz': 5, // +5: Gemischt, neutral
  'saarland': 5,        // +5: Gemischt, neutral
  'hessen': 5,          // +5: Gemischt, neutral
  'baden-württemberg': 5, // +5: Gemischt, neutral
  'bayern': 0,          // 0: Traditionell, neutral
}

/**
 * Normalisiert einen Stadtnamen für Lookup
 * 
 * Entfernt Umlaute, macht lowercase, entfernt Sonderzeichen
 */
export function normalizeCityName(cityName: string): string {
  return cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Entfernt diakritische Zeichen
    .replace(/[^a-z0-9\s]/g, '')     // Entfernt Sonderzeichen
    .trim()
}

/**
 * Extrahiert Postleitzahl aus Adresse
 * 
 * Sucht nach 5-stelliger Zahl am Anfang der Adresse
 */
export function extractPostalCode(address: string): string | null {
  const match = address.match(/\b(\d{5})\b/)
  return match ? match[1] : null
}

/**
 * Extrahiert Postleitzahl-Präfix (erste 2 Ziffern) für grobe Zuordnung
 */
export function extractPostalCodePrefix(postalCode: string): string {
  return postalCode.substring(0, 2)
}

