
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MidiNote {
  id: string;
  velocity: number;
  timing: number;
  position: number;
}

interface MidiVisualizerProps {
  velocityAmount: number;
  timingAmount: number;
  randomizeAmount: number;
  className?: string;
}

const MidiVisualizer: React.FC<MidiVisualizerProps> = ({
  velocityAmount,
  timingAmount, 
  randomizeAmount,
  className
}) => {
  const [notes, setNotes] = useState<MidiNote[]>([]);
  const [originalNotes, setOriginalNotes] = useState<MidiNote[]>([]);
  
  // Generate initial notes pattern
  useEffect(() => {
    const newOriginalNotes = Array.from({ length: 16 }, (_, i) => ({
      id: `original-${i}`,
      velocity: 0.7 + Math.sin(i * 0.5) * 0.2, // Pattern between 0.5-0.9
      timing: 0,
      position: i * (100 / 16)
    }));
    
    setOriginalNotes(newOriginalNotes);
  }, []);
  
  // Apply randomization effect based on parameters
  useEffect(() => {
    if (originalNotes.length === 0) return;
    
    const shouldRandomize = (chance: number) => {
      return Math.random() < chance;
    };
    
    const randomizedNotes = originalNotes.map(note => {
      // Only apply randomization based on randomizeAmount
      if (shouldRandomize(randomizeAmount / 100)) {
        // Calculate randomized velocity
        const velRandom = (Math.random() * 2 - 1) * (velocityAmount / 100);
        let newVelocity = note.velocity + velRandom;
        newVelocity = Math.max(0.1, Math.min(1, newVelocity));
        
        // Calculate randomized timing
        const timeRandom = (Math.random() * 2 - 1) * (timingAmount / 10);
        let newTiming = timeRandom;
        newTiming = Math.max(-0.5, Math.min(0.5, newTiming));
        
        return {
          ...note,
          id: `random-${note.id}`,
          velocity: newVelocity,
          timing: newTiming
        };
      }
      
      return { ...note, id: `unchanged-${note.id}` };
    });
    
    setNotes(randomizedNotes);
  }, [originalNotes, velocityAmount, timingAmount, randomizeAmount]);
  
  return (
    <div className={cn("w-full h-36 bg-plugin-display rounded-lg relative overflow-hidden border border-gray-700", className)}>
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-0">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={`grid-${i}`} className="border-[0.5px] border-gray-800/30" />
        ))}
      </div>
      
      {/* Original note pattern (dimmed) */}
      {originalNotes.map((note) => (
        <div
          key={note.id}
          className="absolute bottom-0 w-4 bg-gray-500/30 rounded-t-sm"
          style={{
            height: `${note.velocity * 100}%`,
            left: `${note.position}%`,
            transform: `translateX(-50%)`,
          }}
        />
      ))}
      
      {/* Randomized notes */}
      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute bottom-0 w-4 bg-plugin-accent rounded-t-sm note-appear"
          style={{
            height: `${note.velocity * 100}%`,
            left: `${note.position + note.timing * 10}%`,
            transform: `translateX(-50%)`,
            opacity: 0.8,
          }}
        />
      ))}
      
      {/* Center line */}
      <div className="absolute left-0 w-full h-[1px] top-1/2 bg-gray-500/20" />
    </div>
  );
};

export default MidiVisualizer;
