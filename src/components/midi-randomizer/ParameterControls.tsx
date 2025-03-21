
import React from 'react';
import { Slider } from '@/components/ui/slider';
import Knob from '../Knob';

interface ParameterControlsProps {
  velocity: number;
  setVelocity: (value: number) => void;
  timing: number;
  setTiming: (value: number) => void;
  randomizeAmount: number;
  setRandomizeAmount: (value: number) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  velocity,
  setVelocity,
  timing,
  setTiming,
  randomizeAmount,
  setRandomizeAmount
}) => {
  return (
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
  );
};

export default ParameterControls;
