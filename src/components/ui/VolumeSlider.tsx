import React, { useState, useRef, useEffect, useCallback } from 'react';

interface VolumeSliderProps {
  volume: number;
  onChange: (newVolume: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  onChange,
  min = 0,
  max = 1,
  step = 0.1,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateVolume = useCallback((clientX: number) => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newVolume = (clientX - left) / width;
      newVolume = Math.max(min, Math.min(max, newVolume)); // Clamp between min and max

      // Round to nearest step
      const roundedVolume = Math.round(newVolume / step) * step;
      return parseFloat(roundedVolume.toFixed(1)); // Ensure correct decimal places
    }
    return volume;
  }, [min, max, step, volume]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    const newVolume = calculateVolume(e.clientX);
    onChange(newVolume);
  }, [calculateVolume, onChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newVolume = calculateVolume(e.clientX);
      onChange(newVolume);
    }
  }, [isDragging, calculateVolume, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const thumbPosition = ((volume - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className="relative w-24 h-1 bg-white/10 rounded-full cursor-pointer touch-action-none"
      onMouseDown={handleMouseDown}
      aria-label="Volume slider"
      role="slider"
      aria-valuenow={volume}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <div
        className="absolute h-full bg-blue-400 rounded-full"
        style={{ width: `${thumbPosition}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-md hover:bg-blue-300 transition-colors duration-200"
        style={{ left: `calc(${thumbPosition}% - 6px)` }} // Adjust 6px for half of thumb width
      />
    </div>
  );
};

export default VolumeSlider; 