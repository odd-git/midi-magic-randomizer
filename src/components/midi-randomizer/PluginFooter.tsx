
import React from 'react';
import { RefreshCw, Save } from 'lucide-react';

interface PluginFooterProps {
  onReset: () => void;
}

const PluginFooter: React.FC<PluginFooterProps> = ({ onReset }) => {
  return (
    <div className="mt-8 flex justify-between items-center border-t border-gray-700/50 pt-4">
      <div className="flex items-center gap-3">
        <button 
          className="plugin-button flex items-center gap-2"
          onClick={onReset}
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
  );
};

export default PluginFooter;
