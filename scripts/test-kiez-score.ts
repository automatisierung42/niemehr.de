/**
 * Test-Script für Kiez-Score Berechnung
 * 
 * Simuliert 3 Businesses (Neukölln, Cottbus, Rostock)
 * Prüft: Neukölln ~90, Cottbus ~20, Rostock ~60
 */

import { calculateKiezScore, interpretKiezScore, isEchoAllowed, getOpenerStyle, getSignatureStyle } from '../src/core/kiez/scoreEngine'

// Test-Businesses
const testBusinesses = [
  {
    name: 'Kiez Döner Neukölln',
    city: 'Neukölln',
    address: 'Sonnenallee 123, 12059 Berlin',
    postalCode: '12059',
  },
  {
    name: 'Hotel Cottbus',
    city: 'Cottbus',
    address: 'Berliner Straße 1, 03046 Cottbus',
    postalCode: '03046',
  },
  {
    name: 'Café Rostock',
    city: 'Rostock',
    address: 'Kröpeliner Straße 1, 18055 Rostock',
    postalCode: '18055',
  },
]

console.log('🧪 KIEZ-SCORE TESTS\n')
console.log('='.repeat(60))

for (const business of testBusinesses) {
  const score = calculateKiezScore(business)
  const interpretation = interpretKiezScore(score)
  const echoAllowed = isEchoAllowed(score)
  const openerStyle = getOpenerStyle(score)
  const signatureStyle = getSignatureStyle(score)
  
  console.log(`\n📍 ${business.name}`)
  console.log(`   Stadt: ${business.city}`)
  console.log(`   Score: ${score}/100`)
  console.log(`   Kategorie: ${interpretation.category} (${interpretation.description})`)
  console.log(`   Echo-Technik: ${echoAllowed ? '✅ Erlaubt' : '❌ Nicht erlaubt'}`)
  console.log(`   Opener: ${interpretation.openerStyle}`)
  console.log(`   Signatur: ${interpretation.signatureStyle}`)
}

console.log('\n' + '='.repeat(60))
console.log('\n✅ ERWARTETE WERTE:')
console.log('   Neukölln: ~90 (50 + 40 = 90)')
console.log('   Cottbus: ~20 (50 - 30 = 20)')
console.log('   Rostock: ~60 (50 + 10 = 60)')
console.log('\n✅ VERIFIKATION:')
const neukoellnScore = calculateKiezScore({ city: 'Neukölln' })
const cottbusScore = calculateKiezScore({ city: 'Cottbus' })
const rostockScore = calculateKiezScore({ city: 'Rostock' })

console.log(`   Neukölln: ${neukoellnScore} ${neukoellnScore >= 85 && neukoellnScore <= 95 ? '✅' : '❌'}`)
console.log(`   Cottbus: ${cottbusScore} ${cottbusScore >= 15 && cottbusScore <= 25 ? '✅' : '❌'}`)
console.log(`   Rostock: ${rostockScore} ${rostockScore >= 55 && rostockScore <= 65 ? '✅' : '❌'}`)

// Prüfe Echo-Technik
console.log('\n✅ ECHO-TECHNIK VERIFIKATION:')
console.log(`   Neukölln (${neukoellnScore}): ${isEchoAllowed(neukoellnScore) ? '✅ Erlaubt' : '❌ Nicht erlaubt'} (erwartet: ✅)`)
console.log(`   Cottbus (${cottbusScore}): ${isEchoAllowed(cottbusScore) ? '✅ Erlaubt' : '❌ Nicht erlaubt'} (erwartet: ❌)`)
console.log(`   Rostock (${rostockScore}): ${isEchoAllowed(rostockScore) ? '✅ Erlaubt' : '❌ Nicht erlaubt'} (erwartet: ✅)`)

console.log('\n🎉 Tests abgeschlossen!\n')

