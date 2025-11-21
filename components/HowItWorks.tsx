
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Crosshair } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorks: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => (prev + 1) % HOW_IT_WORKS_STEPS.length);
  const prevStep = () => setStep((prev) => (prev - 1 + HOW_IT_WORKS_STEPS.length) % HOW_IT_WORKS_STEPS.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center p-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-lg">
             <div className="mb-8 flex justify-center">
                 <div className="w-16 h-16 rounded-full bg-hunter-green/10 flex items-center justify-center border border-hunter-green">
                    <Crosshair className="w-8 h-8 text-hunter-green" />
                 </div>
             </div>

             <div className="h-64">
               <AnimatePresence mode='wait'>
                 <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                 >
                    <h2 className="text-3xl font-bold text-white mb-4">{HOW_IT_WORKS_STEPS[step].title}</h2>
                    <p className="text-lg text-gray-400 leading-relaxed">{HOW_IT_WORKS_STEPS[step].desc}</p>
                 </motion.div>
               </AnimatePresence>
             </div>

             <div className="flex items-center justify-between mt-8">
                <button onClick={prevStep} className="p-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex space-x-2">
                    {HOW_IT_WORKS_STEPS.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-hunter-green' : 'bg-gray-700'}`} />
                    ))}
                </div>
                <button onClick={nextStep} className="p-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white">
                    <ChevronRight className="w-6 h-6" />
                </button>
             </div>
             
             {step === HOW_IT_WORKS_STEPS.length - 1 && (
                 <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={onClose}
                    className="w-full mt-8 py-4 bg-white text-black font-bold rounded uppercase tracking-widest hover:scale-105 transition-transform"
                 >
                    Understood. Initialize.
                 </motion.button>
             )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
