
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface KnobProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Knob: React.FC<KnobProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit = '',
  className = '',
  size = 'md',
  color = 'bg-plugin-slider'
}) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Size mappings
  const sizeMap = {
    sm: {
      knob: 'w-12 h-12',
      inner: 'w-10 h-10',
      indicator: 'w-1 h-2',
      text: 'text-xs'
    },
    md: {
      knob: 'w-16 h-16',
      inner: 'w-14 h-14',
      indicator: 'w-1.5 h-2.5',
      text: 'text-sm'
    },
    lg: {
      knob: 'w-20 h-20',
      inner: 'w-18 h-18',
      indicator: 'w-2 h-3',
      text: 'text-base'
    }
  };

  // Calculate rotation based on value
  const getRotation = () => {
    const range = max - min;
    const percentage = (value - min) / range;
    return percentage * 270 - 135; // -135 to 135 degrees
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.clientY);
    setStartValue(value);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = startY - e.clientY;
    const range = max - min;
    
    // Sensitivity factor (higher means less sensitive)
    const sensitivity = 200;
    const deltaValue = (deltaY / sensitivity) * range;
    
    let newValue = startValue + deltaValue;
    
    // Apply step if provided
    if (step) {
      newValue = Math.round(newValue / step) * step;
    }
    
    // Clamp value to min/max
    newValue = Math.max(min, Math.min(max, newValue));
    
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const formattedValue = () => {
    // Display with appropriate precision
    let valueStr = value.toString();
    if (Number.isInteger(value)) {
      valueStr = value.toFixed(0);
    } else if (value < 0.1) {
      valueStr = value.toFixed(3);
    } else if (value < 1) {
      valueStr = value.toFixed(2);
    } else if (!Number.isInteger(value)) {
      valueStr = value.toFixed(1);
    }
    return `${valueStr}${unit}`;
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
          isDragging ? "scale-105" : "",
          sizeMap[size].knob,
          "bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg border border-gray-700"
        )}
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "absolute rounded-full",
            sizeMap[size].inner,
            "bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center"
          )}
        >
          <div
            className={cn(
              "absolute top-3 rounded-full",
              sizeMap[size].indicator,
              color
            )}
            style={{
              transform: `rotate(${getRotation()}deg) translateY(-40%)`,
              transformOrigin: 'bottom center',
            }}
          />
        </div>
        <div 
          className={cn(
            "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300",
            hovered || isDragging ? "opacity-10" : "opacity-0",
            color
          )}
        />
      </div>
      <div className="mt-2 text-center">
        <div className="knob-label">{label}</div>
        <div className={cn("font-mono font-medium mt-1", sizeMap[size].text)}>
          {formattedValue()}
        </div>
      </div>
    </div>
  );
};

export default Knob;
