'use client';

import { motion } from 'framer-motion';

interface LoadingStateProps {
  businessName: string;
  progress: number;
}

export function LoadingState({ businessName, progress }: LoadingStateProps) {
  const steps = [
    { id: 1, label: 'Google Reviews gefunden', completed: progress >= 30 },
    { id: 2, label: 'Business-Profil erkannt', completed: progress >= 60 },
    { id: 3, label: 'KI-Antworten werden generiert...', completed: progress >= 90 },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-14 h-14 md:w-16 md:h-16 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-6"
          />
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-2">
            ⏳ Wir analysieren {businessName}...
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-secondary to-primary h-2.5 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 font-medium">{progress}%</p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: step.completed ? 1 : 0.5, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center justify-center space-x-2"
            >
              {step.completed ? (
                <span className="text-secondary text-xl">✓</span>
              ) : (
                <span className="text-gray-400 text-xl">○</span>
              )}
              <span className={`text-lg ${step.completed ? 'text-primary-dark' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

