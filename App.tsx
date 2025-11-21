
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useStore } from './lib/store';
import { AppState } from './types';
import { LandingPage } from './components/LandingPage';
import { TerminalLoader } from './components/TerminalLoader';
import { SwipeDeck } from './components/SwipeDeck';
import { UploadSim } from './components/UploadSim';
import { HowItWorks } from './components/HowItWorks';

const App: React.FC = () => {
  const currentState = useStore((state) => state.currentState);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const renderContent = () => {
    switch (currentState) {
      case AppState.LANDING:
        return <LandingPage />;
      case AppState.UPLOADING:
        return <UploadSim />;
      case AppState.ANALYZING:
        return <TerminalLoader />;
      case AppState.SWIPING:
        return <SwipeDeck />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-hunter-dark text-white font-sans selection:bg-hunter-green selection:text-black overflow-hidden">
      {renderContent()}

      {/* Global Help Button */}
      <button 
        onClick={() => setShowHowItWorks(true)}
        className="fixed bottom-4 right-4 z-[80] w-10 h-10 bg-hunter-gray/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors shadow-lg"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      <HowItWorks isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </div>
  );
};

export default App;
