/**
 * Einladungs-Zeilen für Review-Antworten
 * 
 * Generiert passende Abschluss-Zeilen basierend auf:
 * - Business-Kategorie (REPEAT_BUSINESS, ONE_TIME_BUSINESS, MIXED)
 * - Kiez-Score (Lockerheit)
 * 
 * Verhindert "Come back soon" bei Behörden, Anwälten, Bestattern etc.
 */

import { BusinessCategory } from '@/core/business/categories'

/**
 * Generiert eine passende Einladungs-Zeile basierend auf Kategorie und Score
 * 
 * @param category Business-Kategorie
 * @param kiezScore Kiez-Score (0-100)
 * @param isPositive true wenn positive Review (4-5 Sterne)
 * @returns Passende Einladungs-Zeile
 */
export function getInvitationLine(
  category: BusinessCategory,
  kiezScore: number,
  isPositive: boolean = true
): string {
  switch (category) {
    case 'ONE_TIME_BUSINESS':
      // Behörden, Anwalt, Bestatter → KEIN "Come back soon"
      return getOneTimeBusinessInvitation(kiezScore, isPositive)
    
    case 'MIXED':
      // Zahnarzt, Apotheke, Schule → Neutral
      return getMixedBusinessInvitation(kiezScore, isPositive)
    
    case 'REPEAT_BUSINESS':
    default:
      // Restaurant, Friseur, etc. → "Komm wieder!"
      return getRepeatBusinessInvitation(kiezScore, isPositive)
  }
}

/**
 * Einladungen für ONE_TIME_BUSINESS (Behörden, Anwalt, Bestatter)
 */
function getOneTimeBusinessInvitation(kiezScore: number, isPositive: boolean): string {
  if (kiezScore <= 40) {
    // Formell
    if (isPositive) {
      const options = [
        'Wir wünschen Ihnen alles Gute und weiterhin viel Erfolg!',
        'Wir wünschen Ihnen für die Zukunft alles Gute!',
        'Vielen Dank und alles Gute für Ihre weitere Tätigkeit!',
        'Wir wünschen Ihnen weiterhin viel Erfolg!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Wir wünschen Ihnen alles Gute und hoffen, dass wir Ihre Anliegen zufriedenstellend klären konnten.',
        'Vielen Dank für Ihr Feedback und alles Gute für die Zukunft.',
        'Wir wünschen Ihnen weiterhin viel Erfolg.',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  } else if (kiezScore <= 75) {
    // Freundlich-locker
    if (isPositive) {
      const options = [
        'Wir wünschen dir alles Gute und weiterhin viel Erfolg!',
        'Alles Gute für die Zukunft!',
        'Vielen Dank und alles Gute!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Wir wünschen dir alles Gute und hoffen, dass wir deine Anliegen klären konnten.',
        'Vielen Dank für dein Feedback und alles Gute.',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  } else {
    // Sehr locker (selten bei Behörden, aber möglich)
    if (isPositive) {
      const options = [
        'Alles Gute und viel Erfolg!',
        'Viel Erfolg weiterhin!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      return 'Alles Gute!'
    }
  }
}

/**
 * Einladungen für MIXED (Zahnarzt, Apotheke, Schule)
 */
function getMixedBusinessInvitation(kiezScore: number, isPositive: boolean): string {
  if (kiezScore <= 40) {
    // Formell
    if (isPositive) {
      const options = [
        'Bleiben Sie gesund und bei Fragen sind wir da!',
        'Wir wünschen Ihnen alles Gute und bleiben Sie gesund!',
        'Bei weiteren Fragen stehen wir Ihnen gerne zur Verfügung.',
        'Bleiben Sie gesund und wir freuen uns auf Ihren nächsten Besuch!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Bleiben Sie gesund und bei Fragen sind wir gerne für Sie da.',
        'Wir wünschen Ihnen alles Gute und hoffen, dass wir Ihre Anliegen klären konnten.',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  } else if (kiezScore <= 75) {
    // Freundlich-locker
    if (isPositive) {
      const options = [
        'Bleib gesund und bei Fragen sind wir da!',
        'Wir wünschen dir alles Gute und bleiben gesund!',
        'Bei Fragen stehen wir dir gerne zur Verfügung.',
        'Bleib gesund und wir freuen uns auf deinen nächsten Besuch!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Bleib gesund und bei Fragen sind wir gerne für dich da.',
        'Wir wünschen dir alles Gute.',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  } else {
    // Sehr locker
    if (isPositive) {
      const options = [
        'Bleib gesund und komm gerne wieder!',
        'Bleib gesund und wir sehen uns!',
        'Bleib gesund und bei Fragen einfach melden!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      return 'Bleib gesund!'
    }
  }
}

/**
 * Einladungen für REPEAT_BUSINESS (Restaurant, Friseur, etc.)
 */
function getRepeatBusinessInvitation(kiezScore: number, isPositive: boolean): string {
  if (kiezScore <= 40) {
    // Formell
    if (isPositive) {
      const options = [
        'Wir freuen uns auf Ihren nächsten Besuch!',
        'Wir hoffen, Sie bald wieder begrüßen zu dürfen.',
        'Bis zum nächsten Mal!',
        'Auf bald!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Wir hoffen, Sie bei Ihrem nächsten Besuch von uns überzeugen zu können.',
        'Wir würden uns freuen, Sie wiederzusehen.',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  } else if (kiezScore <= 75) {
    // Freundlich-locker
    if (isPositive) {
      const options = [
        'Komm gerne wieder vorbei!',
        'Wir freuen uns auf deinen nächsten Besuch!',
        'Bis zum nächsten Mal!',
        'Auf bald!',
        'Bis bald!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Wir hoffen, dich beim nächsten Mal von uns überzeugen zu können.',
        'Wir würden uns freuen, dich wiederzusehen.',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  } else {
    // Sehr locker
    if (isPositive) {
      const options = [
        'Komm bald wieder vorbei!',
        'Ey, bis zum nächsten Mal!',
        'Bis bald, wir freuen uns!',
        'Komm gerne wieder!',
        'Bis zum nächsten Mal, ey!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    } else {
      const options = [
        'Hoffentlich sehen wir uns nochmal!',
        'Bis zum nächsten Mal!',
      ]
      return options[Math.floor(Math.random() * options.length)]
    }
  }
}

/**
 * Generiert eine passende Einladungs-Zeile für englische Reviews
 */
export function getInvitationLineEnglish(
  category: BusinessCategory,
  kiezScore: number,
  isPositive: boolean = true
): string {
  switch (category) {
    case 'ONE_TIME_BUSINESS':
      if (isPositive) {
        return 'We wish you all the best and continued success!'
      } else {
        return 'We wish you all the best and hope we were able to address your concerns.'
      }
    
    case 'MIXED':
      if (isPositive) {
        return 'Stay healthy and we\'re here if you have any questions!'
      } else {
        return 'Stay healthy and we\'re here if you need us.'
      }
    
    case 'REPEAT_BUSINESS':
    default:
      if (isPositive) {
        if (kiezScore <= 40) {
          return 'We look forward to your next visit!'
        } else if (kiezScore <= 75) {
          return 'Come back soon!'
        } else {
          return 'Come back soon, we\'d love to see you again!'
        }
      } else {
        return 'We hope to see you again soon.'
      }
  }
}

