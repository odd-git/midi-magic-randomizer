
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MidiVisualizer from './MidiVisualizer';
import PluginHeader from './midi-randomizer/PluginHeader';
import ParameterControls from './midi-randomizer/ParameterControls';
import PluginFooter from './midi-randomizer/PluginFooter';

interface MidiRandomizerProps {
  className?: string;
}

const MidiRandomizer: React.FC<MidiRandomizerProps> = ({ className }) => {
  const [velocity, setVelocity] = useState(20);
  const [timing, setTiming] = useState(15);
  const [randomizeAmount, setRandomizeAmount] = useState(50);
  const [isActive, setIsActive] = useState(true);
  const [presetOpen, setPresetOpen] = useState(false);
  const [updatingVisualizer, setUpdatingVisualizer] = useState(false);
  
  // Refresh visualizer when parameters change
  useEffect(() => {
    setUpdatingVisualizer(true);
    const timer = setTimeout(() => {
      setUpdatingVisualizer(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [velocity, timing, randomizeAmount]);
  
  // Mock presets
  const presets = [
    { name: "Subtle Groove", velocity: 15, timing: 10, randomize: 30 },
    { name: "Human Feel", velocity: 25, timing: 20, randomize: 60 },
    { name: "Chaotic", velocity: 70, timing: 60, randomize: 90 }
  ];
  
  const applyPreset = (preset: typeof presets[0]) => {
    setVelocity(preset.velocity);
    setTiming(preset.timing);
    setRandomizeAmount(preset.randomize);
    setPresetOpen(false);
  };

  const handleReset = () => {
    setVelocity(20);
    setTiming(15);
    setRandomizeAmount(50);
  };
  
  return (
    <div className={cn(
      "plugin-container w-full max-w-2xl animate-fade-in", 
      isActive ? "shadow-blue-500/10" : "opacity-80",
      className
    )}>
      {/* Plugin Header */}
      <PluginHeader 
        title="MIDI Magic Randomizer"
        version="1.0"
        isActive={isActive}
        setIsActive={setIsActive}
        presetOpen={presetOpen}
        setPresetOpen={setPresetOpen}
        presets={presets}
        applyPreset={applyPreset}
      />
      
      {/* Main Interface */}
      <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Visualizer */}
        <MidiVisualizer 
          velocityAmount={velocity} 
          timingAmount={timing} 
          randomizeAmount={randomizeAmount}
          className={cn(updatingVisualizer ? "opacity-50" : "opacity-100", "transition-opacity duration-300")} 
        />
        
        {/* Controls */}
        <ParameterControls 
          velocity={velocity}
          setVelocity={setVelocity}
          timing={timing}
          setTiming={setTiming}
          randomizeAmount={randomizeAmount}
          setRandomizeAmount={setRandomizeAmount}
        />
        
        {/* Footer Controls */}
        <PluginFooter onReset={handleReset} />
      </div>
    </div>
  );
};

export default MidiRandomizer;
