/**
 * Handkuratierte Opener für Review-Antworten
 * 
 * 100 menschliche Opener, sortiert nach Kiez-Score:
 * - Score 0-40: Höflich, warm, formell
 * - Score 41-75: Freundlich-locker, ausgewogen
 * - Score 76-100: Berliner Schnauze, Rostocker, Kölner, Bayerischer Charme
 * 
 * Jeder Opener ist so menschlich, dass der User denkt: "Das hab ich doch selbst geschrieben!"
 */

/**
 * Opener für Score 0-40 (Sehr formell bis formell)
 * Höflich, warm, respektvoll – "Herzlichen Dank" Standard
 */
export const FORMAL_OPENERS: string[] = [
  'Herzlichen Dank für Ihre nette Bewertung!',
  'Vielen Dank für Ihr wertvolles Feedback!',
  'Wir freuen uns sehr über Ihre positive Rückmeldung!',
  'Herzlichen Dank, dass Sie sich die Zeit genommen haben!',
  'Ihr Feedback bedeutet uns sehr viel – vielen Dank!',
  'Wir sind Ihnen sehr dankbar für diese schöne Bewertung!',
  'Herzlichen Dank für Ihre freundlichen Worte!',
  'Vielen Dank für Ihr Vertrauen und Ihre positive Bewertung!',
  'Wir schätzen Ihr Feedback sehr – herzlichen Dank!',
  'Ihre Bewertung hat uns sehr gefreut – vielen Dank!',
  'Herzlichen Dank für diese wunderbare Rückmeldung!',
  'Wir danken Ihnen herzlich für Ihre Zeit und Ihr Feedback!',
  'Vielen Dank für Ihre konstruktive Bewertung!',
  'Ihre Worte haben uns sehr berührt – herzlichen Dank!',
  'Wir sind dankbar für Ihr Vertrauen – vielen Dank!',
  'Herzlichen Dank für diese positive Bewertung!',
  'Ihr Feedback ist uns sehr wichtig – vielen Dank!',
  'Wir freuen uns riesig über Ihre nette Bewertung!',
  'Herzlichen Dank für Ihre wertschätzenden Worte!',
  'Vielen Dank, dass Sie uns Ihre Erfahrung mitgeteilt haben!',
]

/**
 * Opener für Score 41-75 (Neutral bis locker)
 * Freundlich-locker, ausgewogen, menschlich
 */
export const FRIENDLY_OPENERS: string[] = [
  'Danke dir für dein super Feedback!',
  'Wow, das freut uns total!',
  'Mega, dass es dir so gut gefallen hat!',
  'Danke für deine nette Bewertung!',
  'Das ist ja richtig schön zu lesen!',
  'Danke, dass du dir die Zeit genommen hast!',
  'Super, dass wir dich überzeugen konnten!',
  'Danke für dein ehrliches Feedback!',
  'Das freut uns wirklich sehr!',
  'Danke dir für deine tolle Bewertung!',
  'Wow, vielen Dank für diese schöne Rückmeldung!',
  'Mega, dass du so zufrieden warst!',
  'Danke für dein Vertrauen!',
  'Das ist ja richtig klasse zu hören!',
  'Danke, dass du uns deine Erfahrung mitgeteilt hast!',
  'Super, dass es dir gefallen hat!',
  'Danke für deine positive Bewertung!',
  'Das freut uns riesig!',
  'Danke dir für dein wertvolles Feedback!',
  'Wow, vielen Dank für diese nette Bewertung!',
  'Mega, dass wir dich begeistern konnten!',
  'Danke für deine ehrlichen Worte!',
  'Das ist wirklich schön zu lesen!',
  'Danke, dass du uns so gut bewertest!',
  'Super, dass du zufrieden warst!',
  'Danke für dein konstruktives Feedback!',
  'Das freut uns total!',
  'Danke dir für deine Zeit!',
  'Wow, vielen Dank für diese tolle Bewertung!',
  'Mega, dass es dir so gut gefallen hat!',
  'Danke für dein Vertrauen in uns!',
  'Das ist ja richtig klasse!',
  'Danke, dass du uns deine Erfahrung teilst!',
  'Super, dass wir dich überzeugen konnten!',
  'Danke für deine wertschätzenden Worte!',
  'Das freut uns wirklich sehr!',
  'Danke dir für dein super Feedback!',
  'Wow, vielen Dank!',
  'Mega, dass du so zufrieden warst!',
  'Danke für deine positive Rückmeldung!',
  'Das ist wirklich schön zu hören!',
]

/**
 * Opener für Score 76-100 (Sehr locker)
 * Berliner Schnauze, Rostocker, Kölner, Bayerischer Charme
 */
export const CASUAL_OPENERS: string[] = [
  'Ey du bist der Boss!',
  'Boah, danke dir!',
  'Hammer, dass wir dich glücklich gemacht haben!',
  'Respekt, du hast\'s gecheckt!',
  'Alter, das freut uns richtig!',
  'Ey, mega dass es dir gefallen hat!',
  'Boah, danke für dein Feedback!',
  'Hammer, dass du so zufrieden warst!',
  'Respekt, dass du dir die Zeit genommen hast!',
  'Ey, das ist ja richtig geil zu lesen!',
  'Boah, vielen Dank für diese tolle Bewertung!',
  'Hammer, dass wir dich überzeugen konnten!',
  'Respekt, du hast uns richtig verstanden!',
  'Ey, danke dir für dein ehrliches Feedback!',
  'Boah, das freut uns total!',
  'Hammer, dass es dir so gut gefallen hat!',
  'Respekt, dass du uns so gut bewertest!',
  'Ey, mega dass du zufrieden warst!',
  'Boah, danke für deine nette Bewertung!',
  'Hammer, dass wir dich begeistern konnten!',
  'Respekt, du hast\'s richtig gecheckt!',
  'Ey, das ist ja richtig klasse!',
  'Boah, vielen Dank!',
  'Hammer, dass du so positiv denkst!',
  'Respekt, dass du uns deine Erfahrung teilst!',
  'Ey, danke dir für dein super Feedback!',
  'Boah, das freut uns richtig!',
  'Hammer, dass es dir gefallen hat!',
  'Respekt, dass du uns vertraust!',
  'Ey, mega dass wir dich überzeugen konnten!',
  'Boah, danke für deine ehrlichen Worte!',
  'Hammer, dass du so zufrieden warst!',
  'Respekt, du hast uns richtig verstanden!',
  'Ey, das ist ja richtig geil!',
  'Boah, vielen Dank für diese tolle Bewertung!',
  'Hammer, dass wir dich glücklich gemacht haben!',
  'Respekt, dass du dir die Zeit genommen hast!',
  'Ey, danke dir für dein wertvolles Feedback!',
  'Boah, das freut uns total!',
  'Hammer, dass es dir so gut gefallen hat!',
]

/**
 * Wählt einen zufälligen Opener basierend auf Kiez-Score
 * 
 * @param kiezScore Kiez-Score (0-100)
 * @returns Zufälliger Opener aus passender Gruppe
 */
export function getRandomOpener(kiezScore: number): string {
  let openers: string[]
  
  if (kiezScore <= 40) {
    // Formell: Score 0-40
    openers = FORMAL_OPENERS
  } else if (kiezScore <= 75) {
    // Freundlich-locker: Score 41-75
    openers = FRIENDLY_OPENERS
  } else {
    // Sehr locker: Score 76-100
    openers = CASUAL_OPENERS
  }
  
  // Zufälliger Opener aus passender Gruppe
  const randomIndex = Math.floor(Math.random() * openers.length)
  return openers[randomIndex]
}

/**
 * Wählt einen Opener basierend auf Review-Sentiment und Kiez-Score
 * 
 * @param kiezScore Kiez-Score (0-100)
 * @param isPositive true wenn positive Review (4-5 Sterne)
 * @returns Passender Opener
 */
export function getContextualOpener(kiezScore: number, isPositive: boolean): string {
  const openers = getOpenerGroup(kiezScore)
  
  // Bei negativen Reviews etwas zurückhaltender
  if (!isPositive && kiezScore > 75) {
    // Auch bei hohem Score etwas respektvoller bei negativen Reviews
    const friendlyOpeners = FRIENDLY_OPENERS.filter(opener => 
      opener.toLowerCase().includes('danke') || 
      opener.toLowerCase().includes('feedback')
    )
    if (friendlyOpeners.length > 0) {
      return friendlyOpeners[Math.floor(Math.random() * friendlyOpeners.length)]
    }
  }
  
  return getRandomOpener(kiezScore)
}

/**
 * Gibt die passende Opener-Gruppe zurück
 */
function getOpenerGroup(kiezScore: number): string[] {
  if (kiezScore <= 40) {
    return FORMAL_OPENERS
  } else if (kiezScore <= 75) {
    return FRIENDLY_OPENERS
  } else {
    return CASUAL_OPENERS
  }
}

