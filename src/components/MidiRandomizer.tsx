
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import Knob from './Knob';
import MidiVisualizer from './MidiVisualizer';
import { cn } from '@/lib/utils';
import { ChevronDown, Power, RefreshCw, Save } from 'lucide-react';

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
  
  return (
    <div className={cn(
      "plugin-container w-full max-w-2xl animate-fade-in", 
      isActive ? "shadow-blue-500/10" : "opacity-80",
      className
    )}>
      {/* Plugin Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "rounded-full p-2 transition-colors duration-300",
              isActive ? "bg-plugin-accent text-white" : "bg-gray-800 text-gray-400"
            )}
          >
            <Power size={18} />
          </button>
          
          <div>
            <h1 className="text-xl font-medium text-white tracking-tight">MIDI Magic Randomizer</h1>
            <p className="text-xs text-gray-400 mt-0.5">v1.0</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setPresetOpen(!presetOpen)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded text-sm transition-colors duration-200"
          >
            Presets
            <ChevronDown size={14} className={cn(
              "transition-transform duration-200",
              presetOpen ? "rotate-180" : ""
            )} />
          </button>
          
          {presetOpen && (
            <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-xl z-10 w-48 py-1 animate-slide-up">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm transition-colors duration-150"
                >
                  {preset.name}
                </button>
              ))}
              <div className="border-t border-gray-700 my-1" />
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-plugin-accent transition-colors duration-150">
                Save Current Settings
              </button>
            </div>
          )}
        </div>
      </div>
      
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
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <Knob
              label="VELOCITY"
              value={velocity}
              min={0}
              max={100}
              step={1}
              onChange={setVelocity}
              unit="%"
              color="bg-blue-500"
            />
            <div className="mt-4 w-full px-2">
              <Slider
                value={[velocity]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setVelocity(value[0])}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Knob
              label="TIMING"
              value={timing}
              min={0}
              max={100}
              step={1}
              onChange={setTiming}
              unit="%"
              color="bg-green-500"
            />
            <div className="mt-4 w-full px-2">
              <Slider
                value={[timing]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setTiming(value[0])}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Knob
              label="AMOUNT"
              value={randomizeAmount}
              min={0}
              max={100}
              step={1}
              onChange={setRandomizeAmount}
              unit="%"
              color="bg-purple-500"
            />
            <div className="mt-4 w-full px-2">
              <Slider
                value={[randomizeAmount]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setRandomizeAmount(value[0])}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Footer Controls */}
        <div className="mt-8 flex justify-between items-center border-t border-gray-700/50 pt-4">
          <div className="flex items-center gap-3">
            <button 
              className="plugin-button flex items-center gap-2"
              onClick={() => {
                setVelocity(20);
                setTiming(15);
                setRandomizeAmount(50);
              }}
            >
              <RefreshCw size={16} />
              Reset
            </button>
            
            <button className="plugin-button flex items-center gap-2">
              <Save size={16} />
              Save
            </button>
          </div>
          
          <div className="plugin-display">
            <span className="opacity-70">Status:</span> Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidiRandomizer;
