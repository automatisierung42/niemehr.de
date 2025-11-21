const fs = require('fs');
const path = require('path');

/**
 * Aktualisiert die investor_update_7_tage.md Datei täglich
 * Fügt einen neuen Eintrag für heute hinzu oder markiert als "Ruhetag"
 */
function updateInvestorReport() {
  const filePath = path.join(__dirname, '..', 'docs', 'investor_update_7_tage.md');
  
  // Aktuelles Datum
  const today = new Date();
  const todayStr = formatDate(today);
  const todayFormatted = formatDateGerman(today);
  
  // Datum vor 7 Tagen
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6); // 6 Tage zurück = 7 Tage insgesamt
  const sevenDaysAgoStr = formatDateGerman(sevenDaysAgo);
  
  // Datei lesen
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Stand-Datum aktualisieren
  content = content.replace(
    /\*\*Stand:\*\* \d{2}\.\d{2}\.\d{4}/,
    `**Stand:** ${todayFormatted}`
  );
  
  // Berichtszeitraum aktualisieren
  content = content.replace(
    /## Investoren-Update: \d{2}\.\d{2}\.\d{4} – \d{2}\.\d{2}\.\d{4}/,
    `## Investoren-Update: ${sevenDaysAgoStr} – ${todayFormatted}`
  );
  
  // Entferne "(Heute)" von allen Einträgen, die nicht heute sind
  content = content.replace(
    /### \*\*(\d{2}\.\d{2}\.\d{4}) \(Heute\)\*\*/g,
    (match, date) => {
      if (date !== todayFormatted) {
        return `### **${date}**`;
      }
      return match;
    }
  );

  // Extrahiere alle vorhandenen Einträge und finde fehlende Tage
  content = addMissingDays(content, today, todayFormatted);
  
  // Alte Einträge entfernen (nur die letzten 7 Tage behalten)
  content = removeOldEntries(content, today);
  
  // Datei schreiben
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Investor-Report aktualisiert: ${todayFormatted}`);
}

/**
 * Fügt fehlende Tage zwischen dem letzten Eintrag und heute hinzu
 */
function addMissingDays(content, today, todayFormatted) {
  const updateStartMarker = '<!-- UPDATE_START -->';
  const updateEndMarker = '<!-- UPDATE_END -->';
  const startIndex = content.indexOf(updateStartMarker);
  const endIndex = content.indexOf(updateEndMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    return content;
  }
  
  const beforeSection = content.substring(0, startIndex + updateStartMarker.length);
  const sectionContent = content.substring(startIndex + updateStartMarker.length, endIndex);
  const afterSection = content.substring(endIndex);
  
  // Extrahiere alle vorhandenen Datums-Einträge
  const existingDates = new Set();
  const datePattern = /### \*\*(\d{2}\.\d{2}\.\d{4})( \(Heute\))?\*\*/g;
  let match;
  while ((match = datePattern.exec(sectionContent)) !== null) {
    existingDates.add(match[1]);
  }
  
  // Finde fehlende Tage im 7-Tage-Fenster
  const missingDates = [];
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  
  // Prüfe jeden Tag im 7-Tage-Fenster (von heute zurück bis 7 Tage)
  const currentDate = new Date(today);
  while (currentDate >= sevenDaysAgo) {
    const dateStr = formatDateGerman(currentDate);
    if (!existingDates.has(dateStr)) {
      missingDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  // Erstelle Einträge für fehlende Tage
  let updatedSectionContent = sectionContent.trim();
  missingDates.forEach(date => {
    const dateStr = formatDateGerman(date);
    const isToday = dateStr === todayFormatted;
    const heuteTag = isToday ? ' (Heute)' : '';
    const newEntry = `### **${dateStr}${heuteTag}**\n🔄 **Ruhetag.** Keine neuen Entwicklungen heute.\n\n`;
    updatedSectionContent = newEntry + updatedSectionContent;
  });
  
  // Sortiere alle Einträge chronologisch (neueste zuerst)
  const sortedContent = sortEntriesChronologically(updatedSectionContent);
  
  return beforeSection + '\n' + sortedContent + '\n\n' + afterSection;
}

/**
 * Sortiert Einträge chronologisch (neueste zuerst)
 */
function sortEntriesChronologically(sectionContent) {
  const entries = [];
  const lines = sectionContent.split('\n');
  let currentEntry = [];
  let currentDate = null;
  
  for (const line of lines) {
    const dateMatch = line.match(/### \*\*(\d{2}\.\d{2}\.\d{4})( \(Heute\))?\*\*/);
    if (dateMatch) {
      if (currentDate) {
        entries.push({ date: parseGermanDate(currentDate), lines: currentEntry });
      }
      currentDate = dateMatch[1];
      currentEntry = [line];
    } else if (currentDate) {
      currentEntry.push(line);
    }
  }
  
  if (currentDate) {
    entries.push({ date: parseGermanDate(currentDate), lines: currentEntry });
  }
  
  // Sortiere nach Datum (neueste zuerst)
  entries.sort((a, b) => b.date - a.date);
  
  // Füge Einträge wieder zusammen und fülle leere Einträge mit Ruhetag-Text
  return entries.map(entry => {
    let entryText = entry.lines.join('\n').trim();
    // Prüfe, ob der Eintrag nur die Überschrift hat (kein Inhalt)
    const lines = entryText.split('\n');
    if (lines.length === 1 || (lines.length === 2 && lines[1].trim() === '')) {
      // Eintrag ist leer, füge Ruhetag-Text hinzu
      const dateMatch = entryText.match(/### \*\*(\d{2}\.\d{2}\.\d{4})( \(Heute\))?\*\*/);
      if (dateMatch) {
        entryText = `${entryText}\n🔄 **Ruhetag.** Keine neuen Entwicklungen heute.`;
      }
    }
    return entryText;
  }).join('\n\n');
}

/**
 * Entfernt Einträge, die älter als 7 Tage sind
 */
function removeOldEntries(content, today) {
  const lines = content.split('\n');
  const result = [];
  let inUpdateSection = false;
  let entryDates = [];
  let currentEntry = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('<!-- UPDATE_START -->')) {
      inUpdateSection = true;
      result.push(line);
      continue;
    }
    
    if (line.includes('<!-- UPDATE_END -->')) {
      // Alle Einträge verarbeiten
      const entries = [];
      let tempEntry = [];
      let tempDate = null;
      
      for (let j = 0; j < currentEntry.length; j++) {
        const entryLine = currentEntry[j];
        const dateMatch = entryLine.match(/### \*\*(\d{2}\.\d{2}\.\d{4})/);
        
        if (dateMatch) {
          if (tempDate) {
            entries.push({ date: tempDate, lines: tempEntry });
          }
          tempDate = dateMatch[1];
          tempEntry = [entryLine];
        } else {
          tempEntry.push(entryLine);
        }
      }
      
      if (tempDate) {
        entries.push({ date: tempDate, lines: tempEntry });
      }
      
      // Nur die letzten 7 Tage behalten
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0); // Normalisiere auf Mitternacht
      
      const validEntries = entries.filter(entry => {
        const entryDate = parseGermanDate(entry.date);
        entryDate.setHours(0, 0, 0, 0); // Normalisiere auf Mitternacht
        return entryDate >= sevenDaysAgo;
      });
      
      // Einträge wieder zusammenfügen
      validEntries.forEach(entry => {
        result.push(...entry.lines);
      });
      
      result.push(line);
      inUpdateSection = false;
      currentEntry = [];
      continue;
    }
    
    if (inUpdateSection) {
      currentEntry.push(line);
    } else {
      result.push(line);
    }
  }
  
  return result.join('\n');
}

/**
 * Parst ein deutsches Datum (DD.MM.YYYY) zu einem Date-Objekt
 */
function parseGermanDate(dateStr) {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formatiert ein Date-Objekt zu DD.MM.YYYY
 */
function formatDateGerman(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Formatiert ein Date-Objekt zu YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Skript ausführen
try {
  updateInvestorReport();
} catch (error) {
  console.error('❌ Fehler beim Aktualisieren des Investor-Reports:', error);
  process.exit(1);
}

