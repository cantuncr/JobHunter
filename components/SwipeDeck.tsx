
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Briefcase, MapPin, DollarSign, AlertTriangle, Mail, ShoppingBag, Lock } from 'lucide-react';
import { useStore } from '../lib/store';
import { generateOptimization } from '../services/geminiService';
import { Job } from '../types';

export const SwipeDeck: React.FC = () => {
  const { jobs, currentJobIndex, tokens, swipeLeft, swipeRight, superLike, userProfile } = useStore();
  const [superLikeResult, setSuperLikeResult] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Get current job
  const currentJob = jobs[currentJobIndex];
  
  const handleManualSuperLike = async () => {
    if (tokens > 0 && currentJob) {
        setIsThinking(true);
        // Call the Mock Service
        const result = await generateOptimization(currentJob, userProfile);
        setIsThinking(false);
        setSuperLikeResult(result);
    } else {
        alert("Insufficient tokens. Invite a friend to recharge.");
    }
  };

  // If no more jobs
  if (!currentJob) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-black/90 z-40 relative overflow-y-auto">
        <div className="w-20 h-20 bg-hunter-gray/50 rounded-full flex items-center justify-center mb-6 animate-pulse mt-10">
            <Briefcase className="w-10 h-10 text-hunter-purple" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Deck Cleared</h2>
        <p className="text-gray-400 max-w-xs mx-auto mb-8">
            You've exhausted the current batch of high-value targets. Our agents are scraping for more.
        </p>

        {/* Protocol Expansion - Coming Soon */}
        <div className="w-full max-w-sm bg-hunter-gray/30 border border-white/10 rounded-lg p-4 mb-8 text-left">
            <h3 className="text-xs font-bold text-hunter-green uppercase tracking-widest mb-3 flex items-center">
                <Lock className="w-3 h-3 mr-2" />
                System Upgrades Incoming
            </h3>
            <ul className="space-y-3 text-sm text-gray-400 font-mono">
                <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>
                    AI Mock Interviews (Voice Mode)
                </li>
                <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>
                    Deep Resume Audit & Rewrite
                </li>
                <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>
                    Automated Reference Verification
                </li>
            </ul>
        </div>
        
        <div className="space-y-4 w-full max-w-sm mb-12">
            <a 
                href="mailto:info@ct-ss.com?subject=Requesting%20Premium%20Access"
                className="flex items-center justify-center w-full py-4 bg-hunter-green text-black font-bold rounded uppercase tracking-wider hover:scale-105 transition-transform"
            >
                <Mail className="w-5 h-5 mr-2" />
                Contact Agents
            </a>
            <button 
                onClick={() => window.open('https://jobhunter.ai/store', '_blank')} // Mock link
                className="flex items-center justify-center w-full py-4 border border-hunter-purple text-hunter-purple font-bold rounded uppercase tracking-wider hover:bg-hunter-purple/10 transition-colors"
            >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Buy Priority Pass
            </button>
        </div>

        <div className="absolute bottom-6 text-[10px] font-mono text-gray-600 tracking-widest uppercase opacity-50 pointer-events-none">
            System Architect: Can Tunçer <span className="mx-2 text-hunter-green">///</span> © 2024 All Rights Reserved
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden">
      {/* Security Warning */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 z-[60] animate-pulse"></div>
      
      {/* Top Bar */}
      <div className="h-16 px-6 flex items-center justify-between z-50 bg-gradient-to-b from-black via-black/80 to-transparent mt-1">
        <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter text-white">
            Job<span className="text-hunter-green">Hunter</span>
            </span>
            <span className="text-[9px] text-red-500 font-mono tracking-widest animate-pulse flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                ANTI-SPAM PROTOCOL ACTIVE
            </span>
        </div>
        <div className="flex items-center space-x-1 bg-hunter-gray/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-mono text-sm font-bold text-white">{tokens}</span>
        </div>
      </div>

      {/* Deck Container */}
      <div className="flex-1 flex items-center justify-center relative p-4">
        <AnimatePresence>
          {/* Overlay for AI result if Super Liked */}
          {superLikeResult && (
             <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full"
                >
                  <div className="flex items-center space-x-2 mb-4 text-hunter-green border-b border-hunter-green/30 pb-2">
                    <Zap className="w-6 h-6 fill-hunter-green" />
                    <h3 className="text-xl font-bold">AI Hook Generated</h3>
                  </div>
                  <div className="p-6 border border-hunter-purple/50 rounded bg-hunter-purple/10 text-gray-200 font-mono text-sm leading-relaxed relative shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                    {superLikeResult}
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 bg-hunter-purple animate-ping rounded-full opacity-50"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button 
                        onClick={() => setSuperLikeResult(null)} // Cancel
                        className="py-3 border border-gray-600 text-gray-400 font-bold uppercase tracking-widest hover:bg-gray-800 rounded"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={() => {
                            setSuperLikeResult(null);
                            superLike(); // Actually advance the deck
                        }}
                        className="py-3 bg-hunter-green text-black font-bold uppercase tracking-widest hover:bg-emerald-400 shadow-lg rounded"
                    >
                        Inject & Apply
                    </button>
                  </div>
                </motion.div>
             </div>
          )}
        </AnimatePresence>

        {/* The Card */}
        <Card 
           key={currentJob.id} 
           job={currentJob} 
           onSwipeLeft={swipeLeft}
           onSwipeRight={swipeRight}
           onSuperLike={handleManualSuperLike}
           isThinking={isThinking}
        />
      </div>
      
      {/* Controls */}
      <div className="h-28 flex items-center justify-center space-x-6 pb-8 z-40">
        <button onClick={swipeLeft} className="w-16 h-16 rounded-full bg-black/50 border border-hunter-red/50 flex items-center justify-center text-hunter-red hover:bg-hunter-red/20 hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,0,85,0.3)]">
          <X className="w-8 h-8" />
        </button>
        
        {/* Super Like Button */}
        <button 
            onClick={handleManualSuperLike} 
            disabled={tokens === 0}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-110
            ${tokens > 0 
                ? 'border-yellow-400/50 text-yellow-400 bg-black/50 hover:bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                : 'border-gray-700 text-gray-700 bg-transparent cursor-not-allowed'}`}
        >
          <Zap className={`w-6 h-6 ${tokens > 0 ? 'fill-yellow-400' : ''}`} />
        </button>

        <button onClick={swipeRight} className="w-16 h-16 rounded-full bg-black/50 border border-hunter-green/50 flex items-center justify-center text-hunter-green hover:bg-hunter-green/20 hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,255,157,0.3)]">
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  job: Job;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
  isThinking: boolean;
}

const Card: React.FC<CardProps> = ({ job, onSwipeLeft, onSwipeRight, onSuperLike, isThinking }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  const opacityNope = useTransform(x, [-150, -50], [1, 0]);
  const opacityLike = useTransform(x, [50, 150], [0, 1]);
  const opacitySuper = useTransform(y, [-150, -80], [1, 0]); 

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    const superLikeThreshold = 80; 
    
    if (info.offset.y < -superLikeThreshold && Math.abs(info.offset.x) < 80) {
        onSuperLike();
    } else if (info.offset.x > threshold) {
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, y, rotate }}
      drag={!isThinking}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6} 
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-sm h-[65vh] sm:h-[600px] bg-hunter-gray rounded-2xl shadow-2xl border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Visual Indicators */}
      <motion.div style={{ opacity: opacityLike }} className="absolute top-8 left-8 z-30 transform -rotate-12 border-4 border-hunter-green text-hunter-green px-4 py-2 rounded font-black text-4xl uppercase tracking-widest bg-black/50 backdrop-blur-sm">
        APPLY
      </motion.div>
      <motion.div style={{ opacity: opacityNope }} className="absolute top-8 right-8 z-30 transform rotate-12 border-4 border-hunter-red text-hunter-red px-4 py-2 rounded font-black text-4xl uppercase tracking-widest bg-black/50 backdrop-blur-sm">
        PASS
      </motion.div>
      <motion.div style={{ opacity: opacitySuper }} className="absolute bottom-1/4 self-center z-30 border-4 border-yellow-400 text-yellow-400 px-6 py-2 rounded font-black text-4xl uppercase tracking-widest bg-black/50 backdrop-blur-sm w-full text-center shadow-[0_0_30px_rgba(250,204,21,0.5)]">
        AI HUNT
      </motion.div>

      {isThinking && (
         <div className="absolute inset-0 z-40 bg-black/90 flex items-center justify-center flex-col backdrop-blur-sm">
             <div className="w-16 h-16 border-4 border-hunter-purple border-t-transparent rounded-full animate-spin mb-6"></div>
             <p className="text-hunter-purple font-mono animate-pulse text-lg">ANALYZING VECTORS...</p>
             <p className="text-xs text-gray-500 font-mono mt-2">Comparing candidate DNA against job reqs</p>
         </div>
      )}

      {/* Card Content */}
      <div className="h-full flex flex-col bg-zinc-900 select-none">
         {/* Header Image/Color */}
         <div className="h-32 w-full relative" style={{ backgroundColor: job.color }}>
            <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-xl bg-black p-1 shadow-lg ring-2 ring-black">
                 <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-lg" />
            </div>
         </div>

         <div className="pt-12 px-6 pb-4 flex-1 flex flex-col">
            <div className="mb-1">
                <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2">{job.title}</h2>
                <p className="text-lg text-gray-400 font-medium">{job.company}</p>
            </div>

            <div className="flex flex-wrap gap-2 my-3">
                <Badge icon={<DollarSign className="w-3 h-3" />} text={job.salary} color="text-green-400 bg-green-400/10 border border-green-400/20" />
                <Badge icon={<MapPin className="w-3 h-3" />} text={job.type} color="text-blue-400 bg-blue-400/10 border border-blue-400/20" />
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 mb-4">{job.description}</p>
                
                <div className="mt-auto">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">REQUIRED SKILLS</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/5 text-gray-300 rounded border border-white/10 font-mono">
                                {req}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
         </div>

         {/* Card Bottom Gradient */}
         <div className="h-6 bg-gradient-to-t from-black/50 to-transparent -mt-6 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

const Badge: React.FC<{ icon: React.ReactNode; text: string; color: string }> = ({ icon, text, color }) => (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-bold ${color}`}>
        {icon}
        <span>{text}</span>
    </div>
);
