import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TERMINAL_LOGS } from '../constants';
import { useStore } from '../lib/store';
import { AppState } from '../types';

export const TerminalLoader: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const setAppState = useStore((state) => state.setAppState);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < TERMINAL_LOGS.length) {
        setLogs((prev) => [...prev, TERMINAL_LOGS[currentIndex]]);
        currentIndex++;
        
        // Auto-scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        // Wait a moment after completion before transitioning
        setTimeout(() => {
          setAppState(AppState.SWIPING);
        }, 1500);
      }
    }, 800); // 800ms per log line for dramatic effect

    return () => clearInterval(interval);
  }, [setAppState]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl border border-hunter-green/30 bg-black rounded-md overflow-hidden shadow-[0_0_30px_rgba(0,255,157,0.1)]">
        
        {/* Terminal Header */}
        <div className="bg-hunter-gray border-b border-hunter-green/20 p-2 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-4 text-xs text-gray-500 flex items-center">
            <Terminal className="w-3 h-3 mr-1" />
            hunter-ai-core -- v4.0.1
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="h-80 p-4 overflow-y-auto text-sm sm:text-base scrollbar-hide relative"
        >
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 text-hunter-green/80"
            >
              <span className="mr-2 text-hunter-purple">{'>'}</span>
              {log}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-hunter-green inline-block align-middle ml-2"
          />
          
          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hunter-green/5 to-transparent h-4 w-full pointer-events-none animate-scan"></div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-500 text-xs uppercase tracking-widest animate-pulse">
        Do not close this window. Processing neural handshake...
      </p>
    </div>
  );
};
