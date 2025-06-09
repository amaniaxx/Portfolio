import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecentFavorite = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.currentTime = 30;

    const handleEnded = () => {
      audio.currentTime = 30;
      audio.play().catch(e => console.error("Error playing audio on loop restart:", e));
    };

    audio.addEventListener('ended', handleEnded);

    audio.play().catch(e => console.error("Auto-play blocked:", e));

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  return (
    <div ref={sectionRef} className="w-full">
      <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
        <Card className="glass-effect hover:border-white/50 transition-all duration-500 professional-shadow hover-lift flex flex-col p-6 rounded-2xl group bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-none relative overflow-hidden">
          <audio
            ref={audioRef}
            src="/weightless.mp3"
            loop
            preload="metadata"
          />
          
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-green-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 animate-gradient-shift"></div>
          </div>

          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-center mb-6 space-x-4">
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden glass-effect-strong group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-500 relative">
                <img src="/weightless.png" alt="Weightless Album Art" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                {/* Audio visualization overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-400 transition-all duration-500">Weightless</p>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Marconi Union</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="flex items-center space-x-3 justify-center w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMuteToggle}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-80"
                />
              </div>

              <div className="flex items-center justify-center space-x-4 w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handlePlayPause}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-green-500/20 transform group-hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7" />
                  ) : (
                    <Play className="h-7 w-7" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecentFavorite;
