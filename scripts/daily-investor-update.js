const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILE_PATH = path.join(__dirname, '..', 'docs', 'investor_update_7_tage.md');

// === HILFSFUNKTIONEN ===

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

function getISOWeek(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const jan4 = new Date(target.getFullYear(), 0, 4);
  const dayDiff = (target - jan4) / 86400000;
  return 1 + Math.ceil(dayDiff / 7);
}

function getMonthName(date) {
  return date.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
}

function extractSection(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  
  if (start === -1 || end === -1) {
    throw new Error(`Marker nicht gefunden: ${startMarker} / ${endMarker}`);
  }
  
  return {
    before: content.substring(0, start + startMarker.length),
    section: content.substring(start + startMarker.length, end),
    after: content.substring(end)
  };
}

function getYesterdaySummary(yesterdayStr) {
  try {
    // Commits vom Vortag
    const commits = execSync(
      `git log --since="${yesterdayStr} 00:00" --until="${yesterdayStr} 23:59" --format="%s" --no-merges`,
      { encoding: 'utf8' }
    ).trim();
    
    if (commits) {
      const meaningful = commits
        .split('\n')
        .filter(c => c.length > 10)
        .filter(c => !c.match(/^(fix|update|wip|merge|typo|bump)/i))
        .slice(0, 3);
      
      if (meaningful.length > 0) {
        const summary = meaningful.join('. ').slice(0, 150);
        return summary + (summary.length === 150 ? '...' : '');
      }
    }
    
    // Fallback: Dateiänderungen
    const files = execSync(
      `git diff --name-only HEAD@{1} HEAD 2>/dev/null || echo ""`,
      { encoding: 'utf8' }
    ).trim().split('\n').filter(Boolean).slice(0, 5);
    
    if (files.length > 0) {
      return `Änderungen an: ${files.map(f => path.basename(f)).join(', ')}`;
    }
  } catch (e) {
    console.warn('⚠️  Git-Abfrage fehlgeschlagen:', e.message);
  }
  
  return 'Ruhetag. Keine neuen Entwicklungen.';
}

function safeWriteFile(filepath, content) {
  const backup = `${filepath}.backup`;
  
  if (fs.existsSync(filepath)) {
    fs.copyFileSync(filepath, backup);
  }
  
  try {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log('✅ Investor-Report erfolgreich aktualisiert');
    
    if (fs.existsSync(backup)) {
      fs.unlinkSync(backup);
    }
  } catch (e) {
    console.error('❌ Fehler beim Schreiben:', e);
    
    if (fs.existsSync(backup)) {
      fs.copyFileSync(backup, filepath);
      console.log('🔄 Backup wiederhergestellt');
    }
    throw e;
  }
}

// === HAUPTFUNKTION ===

function updateInvestorReport() {
  // Zeitzone Berlin
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);
  const kwToday = getISOWeek(today);
  const kwYesterday = getISOWeek(yesterday);
  
  console.log(`📅 Update für ${todayStr} (Daten vom ${yesterdayStr})`);
  
  let content = fs.readFileSync(FILE_PATH, 'utf8');
  
  // 1. Stand & Berichtszeitraum
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  
  content = content.replace(
    /\*\*Stand:\*\* .*/,
    `**Stand:** ${todayStr}`
  );
  
  content = content.replace(
    /## Investoren-Update: \d{2}\.\d{2}\.\d{4} – \d{2}\.\d{2}\.\d{4}/,
    `## Investoren-Update: ${formatDate(sevenDaysAgo)} – ${todayStr}`
  );
  
  // 2. Zusammenfassung generieren
  const summary = getYesterdaySummary(yesterdayStr);
  console.log(`📝 Summary: ${summary.slice(0, 80)}...`);
  
  // 3. Tageseintrag hinzufügen
  const newEntry = `### **${todayStr} (Heute)**\n${summary}\n\n`;
  
  const { before, section, after } = extractSection(content, '<!-- UPDATE_START -->', '<!-- UPDATE_END -->');
  
  let updatedSection = newEntry + section.replace(/ \(Heute\)/g, '');
  
  // 4. Nur letzte 7 Tage behalten
  const lines = updatedSection.split('\n');
  const entries = [];
  let current = [];
  
  for (const line of lines) {
    if (line.startsWith('### **')) {
      if (current.length) entries.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) entries.push(current);
  
  const validEntries = entries.filter(entry => {
    const dateMatch = entry[0].match(/(\d{2}\.\d{2}\.\d{4})/);
    if (!dateMatch) return true;
    const [d, m, y] = dateMatch[1].split('.');
    const entryDate = new Date(y, m - 1, d);
    return (today - entryDate) <= 6 * 86400000;
  });
  
  updatedSection = validEntries.map(e => e.join('\n')).join('\n\n');
  
  // 5. KW-Zusammenfassungen
  let kwSection = '';
  let kwData;
  
  try {
    kwData = extractSection(content, '<!-- KW_START -->', '<!-- KW_END -->');
    kwSection = kwData.section;
  } catch (e) {
    // Marker nicht vorhanden, erstelle neuen Abschnitt
    kwSection = '';
  }
  
  const lastKWLine = kwSection.trim().split('\n').find(l => l.includes('KW ')) || '';
  const lastKW = lastKWLine.match(/KW (\d+)/)?.[1] ? parseInt(lastKWLine.match(/KW (\d+)/)[1]) : null;
  
  if (kwYesterday !== lastKW && validEntries.length > 0) {
    const weekStart = new Date(yesterday);
    weekStart.setDate(yesterday.getDate() - ((yesterday.getDay() + 6) % 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const kwEntries = validEntries
      .filter(e => {
        const d = e[0].match(/(\d{2}\.\d{2}\.\d{4})/);
        if (!d) return false;
        const [day, month, year] = d[1].split('.');
        const ed = new Date(year, month - 1, day);
        return ed >= weekStart && ed <= weekEnd;
      })
      .map(e => e[1]?.trim() || e.join(' ').trim())
      .filter(Boolean)
      .slice(0, 7);
    
    const kwBlock = `<details>
<summary><strong>KW ${kwYesterday} (${formatDate(weekStart)} – ${formatDate(weekEnd)})</strong></summary>
- ${kwEntries.join('\n- ') || 'Keine wesentlichen Fortschritte'}
</details>\n\n`;
    
    kwSection = kwBlock + kwSection;
    console.log(`📊 Neue KW-Zusammenfassung erstellt: KW ${kwYesterday}`);
  }
  
  const kwBlocks = kwSection.split('</details>').slice(0, -1);
  kwSection = kwBlocks.slice(0, 8).join('</details>') + (kwBlocks.length > 0 ? '</details>\n\n' : '');
  
  // 6. Monatszusammenfassungen
  let monthSection = '';
  let monthData;
  
  try {
    monthData = extractSection(content, '<!-- MONTH_START -->', '<!-- MONTH_END -->');
    monthSection = monthData.section;
  } catch (e) {
    // Marker nicht vorhanden, erstelle neuen Abschnitt
    monthSection = '';
  }
  
  if (kwBlocks.length > 8) {
    const oldestKW = kwBlocks[8];
    const weekMatch = oldestKW.match(/\((\d{2}\.\d{2}\.\d{4})/);
    
    if (weekMatch) {
      const [d, m, y] = weekMatch[1].split('.');
      const weekDate = new Date(y, m - 1, d);
      const monthName = getMonthName(weekDate);
      
      const existingMonth = monthSection.match(new RegExp(`<summary><strong>${monthName}</strong></summary>([\\s\\S]*?)</details>`));
      
      if (existingMonth) {
        const updatedMonth = existingMonth[0].replace('</details>', `\n${oldestKW}</details>\n</details>`);
        monthSection = monthSection.replace(existingMonth[0], updatedMonth);
      } else {
        const monthBlock = `<details>
<summary><strong>${monthName}</strong></summary>
${oldestKW}</details>
</details>\n\n`;
        monthSection = monthBlock + monthSection;
      }
      
      console.log(`📦 KW in Monatsarchiv verschoben: ${monthName}`);
    }
  }
  
  // 7. Zusammenbauen
  let finalContent;
  
  if (kwData && monthData) {
    // Beide Marker vorhanden
    finalContent = 
      before + 
      '\n' + updatedSection + '\n' +
      after.split('<!-- KW_START -->')[0] +
      '<!-- KW_START -->\n' + kwSection +
      '<!-- KW_END -->\n\n---\n\n## Monatlicher Rückblick (älter als 8 Wochen)\n\n<!-- MONTH_START -->\n' + monthSection +
      '<!-- MONTH_END -->' +
      after.split('<!-- MONTH_END -->')[1];
  } else {
    // Marker fehlen, füge sie hinzu
    const afterUpdate = after.split('<!-- UPDATE_END -->')[1] || after;
    const beforeNext = afterUpdate.split('## 🎯')[0] || afterUpdate.split('## 🗂')[0] || afterUpdate;
    const afterNext = afterUpdate.substring(afterUpdate.indexOf(beforeNext) + beforeNext.length);
    
    finalContent = 
      before + 
      '\n' + updatedSection + '\n' +
      '<!-- UPDATE_END -->\n\n---\n\n## Wöchentlicher Rückblick (letzte 8 Wochen)\n\n<!-- KW_START -->\n' + kwSection +
      '<!-- KW_END -->\n\n---\n\n## Monatlicher Rückblick (älter als 8 Wochen)\n\n<!-- MONTH_START -->\n' + monthSection +
      '<!-- MONTH_END -->\n\n---\n\n' + beforeNext + afterNext;
  }
  
  safeWriteFile(FILE_PATH, finalContent);
  console.log(`✅ Update abgeschlossen: ${todayStr}`);
}

// === AUSFÜHRUNG ===

try {
  updateInvestorReport();
} catch (e) {
  console.error('❌ Kritischer Fehler:', e.message);
  process.exit(1);
}

