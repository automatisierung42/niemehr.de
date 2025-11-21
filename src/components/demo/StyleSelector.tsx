'use client';



import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Check, Zap, Heart, Smile, Info } from 'lucide-react';



interface StyleOption {

  id: 'professional' | 'friendly' | 'casual';

  name: string;

  icon: any;

  preview: string;

  formality: number; // 1-10

  emojiCount: number; // 0-3

  recommended?: boolean;

  description: string;

}



const STYLES: StyleOption[] = [

  {

    id: 'professional',

    name: 'Professional',

    icon: Zap,

    description: 'Förmlich, seriös, "Sie"',

    preview: 'Sehr geehrte Frau Alexandra,\n\nwir freuen uns über Ihre positive Bewertung. Es ist schön zu hören, dass die Behandlung erfolgreich war.\n\nMit freundlichen Grüßen,\nIhr Praxis-Team',

    formality: 8,

    emojiCount: 0

  },

  {

    id: 'friendly',

    name: 'Friendly',

    icon: Heart,

    description: 'Ausgewogen, persönlich, "du"',

    preview: 'Hallo Alexandra! 🙏\n\nVielen Dank für die tolle Bewertung! Freut uns riesig, dass die Behandlung gut geklappt hat.\n\nBis zum nächsten Mal!\nDas Praxis-Team',

    formality: 5,

    emojiCount: 2,

    recommended: true

  },

  {

    id: 'casual',

    name: 'Casual',

    icon: Smile,

    description: 'Locker, energetisch, "du"',

    preview: 'Hey Alexandra! 🙌\n\nMega, dass alles geklappt hat! Danke für die 5 Sterne! 💪\n\nBis bald!\nEuer Team 😊',

    formality: 2,

    emojiCount: 3

  }

];



interface StyleSelectorProps {

  review: {

    author: string;

    rating: number;

    text: string;

    time?: string;

  };

  onSelect: (styleId: string) => void;

  businessName?: string;

}



export function StyleSelector({ review, onSelect, businessName = 'Ihre Praxis' }: StyleSelectorProps) {

  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);



  const handleSelect = (styleId: string) => {

    setSelectedStyle(styleId);

    // Delay für smooth animation

    setTimeout(() => onSelect(styleId), 600);

  };



  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="text-center space-y-4">

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

        >

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-4">

            <span className="relative flex h-2 w-2">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>

            </span>

            Live-Demo mit echten KI-Antworten

          </div>

          

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">

            ✨ So antwortet <span className="text-emerald-400">niemehr.de</span> für Sie

          </h2>

          <p className="text-slate-400 text-lg">

            Eine echte Review von {businessName} • Drei Antwort-Stile zur Auswahl

          </p>

        </motion.div>

      </div>



      {/* Review Preview */}

      <motion.div

        initial={{ opacity: 0, scale: 0.95 }}

        animate={{ opacity: 1, scale: 1 }}

        transition={{ delay: 0.1 }}

        className="max-w-2xl mx-auto"

      >

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">

          <div className="flex items-start gap-4 mb-4">

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">

              {review.author[0]}

            </div>

            <div className="flex-1">

              <div className="flex items-center gap-2 mb-1">

                <p className="font-semibold text-white">{review.author}</p>

                <span className="text-slate-500 text-sm">•</span>

                <span className="text-slate-500 text-sm">{review.time || 'vor 11 Stunden'}</span>

              </div>

              <div className="flex gap-1">

                {Array.from({ length: 5 }).map((_, i) => (

                  <motion.span

                    key={i}

                    initial={{ opacity: 0, scale: 0 }}

                    animate={{ opacity: 1, scale: 1 }}

                    transition={{ delay: 0.2 + (i * 0.05) }}

                    className={i < review.rating ? 'text-yellow-400 text-lg' : 'text-slate-600 text-lg'}

                  >

                    ★

                  </motion.span>

                ))}

              </div>

            </div>

          </div>

          <p className="text-slate-300 text-lg leading-relaxed">

            "{review.text}"

          </p>

        </div>

      </motion.div>



      {/* Selection Prompt */}

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ delay: 0.3 }}

        className="text-center"

      >

        <div className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-2">

          <span>👇</span>

          <span>Wählen Sie Ihren Antwort-Stil</span>

        </div>

        <p className="text-slate-400">

          Alle Stile sind professionell - wählen Sie was zu Ihnen passt

        </p>

      </motion.div>



      {/* Style Cards */}

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {STYLES.map((style, index) => {

          const Icon = style.icon;

          const isHovered = hoveredStyle === style.id;

          const isSelected = selectedStyle === style.id;



          return (

            <motion.div

              key={style.id}

              initial={{ opacity: 0, y: 30 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.4 + (index * 0.1) }}

              onHoverStart={() => !selectedStyle && setHoveredStyle(style.id)}

              onHoverEnd={() => setHoveredStyle(null)}

              className="relative"

            >

              {/* Recommended Badge */}

              {style.recommended && (

                <motion.div

                  initial={{ opacity: 0, y: -10 }}

                  animate={{ opacity: 1, y: 0 }}

                  transition={{ delay: 0.8 }}

                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"

                >

                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">

                    <Check className="w-3 h-3" />

                    EMPFOHLEN

                  </div>

                </motion.div>

              )}



              <motion.div

                animate={{

                  scale: isHovered && !selectedStyle ? 1.03 : 1,

                  y: isHovered && !selectedStyle ? -4 : 0

                }}

                transition={{ type: "spring", stiffness: 300, damping: 20 }}

                className={`

                  relative bg-slate-900 rounded-2xl p-6 border-2 transition-all cursor-pointer h-full

                  ${isSelected 

                    ? 'border-emerald-500 shadow-2xl shadow-emerald-500/30' 

                    : isHovered 

                      ? 'border-slate-600 shadow-xl' 

                      : 'border-slate-800'

                  }

                  ${selectedStyle && !isSelected ? 'opacity-50' : 'opacity-100'}

                `}

              >

                {/* Selected Checkmark */}

                <AnimatePresence>

                  {isSelected && (

                    <motion.div

                      initial={{ scale: 0, rotate: -180 }}

                      animate={{ scale: 1, rotate: 0 }}

                      exit={{ scale: 0, rotate: 180 }}

                      transition={{ type: "spring", stiffness: 200 }}

                      className="absolute -top-3 -right-3 z-10"

                    >

                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">

                        <Check className="w-6 h-6 text-white" strokeWidth={3} />

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>



                {/* Icon & Name */}

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">

                    <Icon className="w-6 h-6 text-slate-400" />

                  </div>

                  <div>

                    <h4 className="font-bold text-white text-lg">{style.name}</h4>

                    <p className="text-xs text-slate-500">{style.description}</p>

                  </div>

                </div>



                {/* Preview Text */}

                <div className="bg-slate-800/50 rounded-xl p-4 mb-4 min-h-[180px] relative overflow-hidden">

                  <div className="absolute top-2 right-2">

                    <div className="bg-slate-900 px-2 py-1 rounded text-xs text-slate-400">

                      Vorschau

                    </div>

                  </div>

                  <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed pt-6">

                    {style.preview}

                  </p>

                </div>



                {/* Metrics */}

                <div className="space-y-3 mb-4">

                  {/* Formality Bar */}

                  <div>

                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">

                      <span className="flex items-center gap-1">

                        <Info className="w-3 h-3" />

                        Förmlichkeit

                      </span>

                      <span className="font-medium">{style.formality}/10</span>

                    </div>

                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                      <motion.div

                        initial={{ width: 0 }}

                        animate={{ width: `${style.formality * 10}%` }}

                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.8 }}

                        className={`h-full ${

                          style.formality >= 7 

                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'

                            : style.formality >= 4

                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'

                              : 'bg-gradient-to-r from-orange-500 to-pink-500'

                        }`}

                      />

                    </div>

                  </div>



                  {/* Emojis */}

                  <div className="flex justify-between items-center text-xs">

                    <span className="text-slate-500">Emojis</span>

                    <span className="text-slate-300 font-medium">

                      {style.emojiCount === 0 && '❌ Keine'}

                      {style.emojiCount === 1 && '✅ Einzeln'}

                      {style.emojiCount === 2 && '✅ Moderat (1-2)'}

                      {style.emojiCount === 3 && '✅✅ Viele (3+)'}

                    </span>

                  </div>

                </div>



                {/* Select Button */}

                <button

                  onClick={() => handleSelect(style.id)}

                  disabled={selectedStyle !== null}

                  className={`

                    w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2

                    ${isSelected

                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'

                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'

                    }

                    disabled:opacity-50 disabled:cursor-not-allowed

                  `}

                >

                  {isSelected ? (

                    <>

                      <Check className="w-5 h-5" />

                      <span>Gewählt</span>

                    </>

                  ) : (

                    <span>Diesen Stil wählen</span>

                  )}

                </button>

              </motion.div>

            </motion.div>

          );

        })}

      </div>



      {/* Help Text */}

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ delay: 0.9 }}

        className="text-center"

      >

        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg text-sm">

          <Info className="w-4 h-4" />

          <span>Sie können den Stil später jederzeit per Sprachnachricht anpassen</span>

        </div>

      </motion.div>

    </div>

  );

}
