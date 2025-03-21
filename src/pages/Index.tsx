
import React, { useState, useEffect } from 'react';
import MidiRandomizer from '@/components/MidiRandomizer';
import { cn } from '@/lib/utils';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading for smooth animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWMTZoMnY2em0tNiA2aC00djJoNHYtMnptMCA0aC00djJoNHYtMnptMC00aC00di0yaDF2LTJoLTF2LTJoNHYyaC0xdjJoMXYyem0tNi00aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHptMTAgMTBoLTJ2MmgydjIgIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-[0.03]"></div>
      
      {/* Main Content */}
      <div className={cn(
        "transition-all duration-700 ease-out transform",
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Header/Logo area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-plugin-accent/10 rounded-full mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17.5V7L20 4V14.5" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 17.5C7.65685 17.5 9 16.1569 9 14.5C9 12.8431 7.65685 11.5 6 11.5C4.34315 11.5 3 12.8431 3 14.5C3 16.1569 4.34315 17.5 6 17.5Z" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 14.5C18.6569 14.5 20 13.1569 20 11.5C20 9.84315 18.6569 8.5 17 8.5C15.3431 8.5 14 9.84315 14 11.5C14 13.1569 15.3431 14.5 17 14.5Z" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">MIDI Magic Randomizer</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Add human feel and groove to your MIDI sequences with intelligent randomization.
            Precisely control velocity and timing variations to breathe life into your music.
          </p>
        </div>
        
        {/* Plugin Interface */}
        <div className="mb-12 transform hover:scale-[1.01] transition-transform duration-300">
          <MidiRandomizer />
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.5V10.5M22 8.5H16M7 21V13M3 19.5H11" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 19.5H21" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 16.5V22.5" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3L9 9" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 3V9H11" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Velocity Control</h3>
            <p className="text-gray-400 text-sm">
              Fine-tune the intensity of your MIDI notes with precise velocity randomization.
              Add subtle dynamics or dramatic variations.
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Timing Variations</h3>
            <p className="text-gray-400 text-sm">
              Create natural-sounding performances by adding subtle timing variations.
              From tight and quantized to loose and human.
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 6C21.1046 6 22 5.10457 22 4C22 2.89543 21.1046 2 20 2C18.8954 2 18 2.89543 18 4C18 5.10457 18.8954 6 20 6Z" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 12H18" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 4H13C11 4 10 5 10 7V17C10 19 11 20 13 20H18" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Randomization Amount</h3>
            <p className="text-gray-400 text-sm">
              Control the percentage of notes affected by randomization.
              Apply changes to all notes or just a select few for more organic results.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>MIDI Magic Randomizer • Linux LV2 Plugin Demo</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
