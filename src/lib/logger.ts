/**
 * Sicherer Logger für Production
 * Verhindert das Loggen von sensiblen Daten
 */

interface LogContext {
  code?: string | number
  message?: string
  [key: string]: any
}

export const logger = {
  error: (message: string, context?: LogContext) => {
    // Nur in Development: Vollständige Fehler
    if (process.env.NODE_ENV === 'development') {
      console.error(message, context)
      return
    }

    // In Production: Nur sichere Metadaten
    console.error(message, {
      timestamp: new Date().toISOString(),
      // Keine Error-Objekte, nur Codes/Messages
      errorCode: context?.code,
      errorMessage: context?.message,
      // Keine User-Daten, Review-Texte, etc.
    })
  },

  info: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, context)
    } else {
      // In Production: Nur strukturierte Logs
      console.log(message, {
        timestamp: new Date().toISOString(),
        ...(context && { context: Object.keys(context).join(', ') }),
      })
    }
  },

  warn: (message: string, context?: LogContext) => {
    console.warn(message, {
      timestamp: new Date().toISOString(),
      ...(context && { context }),
    })
  },
}

