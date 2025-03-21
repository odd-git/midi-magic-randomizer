
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Power } from 'lucide-react';

interface PluginHeaderProps {
  title: string;
  version: string;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  presetOpen: boolean;
  setPresetOpen: (open: boolean) => void;
  presets: Array<{ name: string; velocity: number; timing: number; randomize: number }>;
  applyPreset: (preset: { name: string; velocity: number; timing: number; randomize: number }) => void;
}

const PluginHeader: React.FC<PluginHeaderProps> = ({
  title,
  version,
  isActive,
  setIsActive,
  presetOpen,
  setPresetOpen,
  presets,
  applyPreset
}) => {
  return (
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
          <h1 className="text-xl font-medium text-white tracking-tight">{title}</h1>
          <p className="text-xs text-gray-400 mt-0.5">v{version}</p>
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
  );
};

export default PluginHeader;
