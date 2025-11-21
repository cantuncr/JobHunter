
import React from 'react';
import { Upload } from 'lucide-react';
import { useStore } from '../lib/store';
import { AppState } from '../types';

export const UploadSim: React.FC = () => {
  const setAppState = useStore((state) => state.setAppState);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulate processing time (1.5s)
      setTimeout(() => {
        setAppState(AppState.ANALYZING);
      }, 1500);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 border border-dashed border-gray-700 rounded-xl bg-hunter-gray/30 text-center hover:border-hunter-green transition-colors group">
        <div className="w-16 h-16 bg-hunter-gray rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-hunter-green" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Upload Source Material</h2>
        <p className="text-gray-400 text-sm mb-8">Upload your PDF Resume/CV to initialize the semantic vector database.</p>
        
        <label className="block w-full">
            <span className="sr-only">Choose profile photo</span>
            <input 
                type="file" 
                accept=".pdf"
                onChange={handleUpload}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-hunter-green file:text-black
                hover:file:bg-emerald-400
                cursor-pointer"
            />
        </label>
      </div>
    </div>
  );
};
