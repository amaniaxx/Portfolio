import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, VolumeX, Volume1, Volume } from 'lucide-react';
import VolumeSlider from '@/components/ui/VolumeSlider';

const GuestbookAndFavorite = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/weightless.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 60;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0 && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (newVolume > 0 && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />;
    if (volume < 0.3) return <Volume className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />;
    if (volume < 0.7) return <Volume1 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />;
    return <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />;
  };

  return (
    <section id="guestbook-favorite" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary tracking-tight">
            Connect & Discover
          </h2>
          <div className="w-32 h-1 bg-gradient-to-br from-primary via-accent to-secondary mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Leave your mark and see what I'm currently enjoying
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Favorite - Square */}
          <div className={`transition-all duration-500 ease-out ${isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0 scale-95'}`} style={{ animationDelay: '150ms' }}>
            <Card className="glass-effect hover:border-white/50 transition-all duration-700 professional-shadow hover-lift aspect-square">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <CardTitle className="text-lg font-bold text-foreground">Now Playing</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center h-full">
                <div className="space-y-6">
                  <div className="relative group">
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center music-pulse hover-lift mx-auto cursor-pointer transform transition-all duration-500 ease-out hover:scale-105"
                      onClick={togglePlay}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-black/20 rounded-lg flex items-center justify-center glass-effect">
                        {isPlaying ? getVolumeIcon() : <VolumeX className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />}
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-base sm:text-lg font-semibold text-blue-400 tracking-wide">Weightless</p>
                    <p className="text-sm sm:text-base text-muted-foreground">Marconi Union</p>
                    <p className="text-xs sm:text-sm text-muted-foreground opacity-75">Ambient Music • 8:10</p>
                    {/* Volume Control */}
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <VolumeX className="w-4 h-4 text-muted-foreground" />
                      <VolumeSlider volume={volume} onChange={handleVolumeChange} />
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-primary animate-float">
                      <span className="text-2xl sm:text-3xl md:text-4xl">🎵</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Guestbook - Rectangle */}
          <div className={`lg:col-span-2 transition-all duration-500 ease-out ${isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0 scale-95'}`} style={{ animationDelay: '250ms' }}>
            <Card className="glass-effect hover:border-white/50 transition-all duration-700 professional-shadow hover-lift h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                  <span className="text-3xl mr-3 guestbook-float">💬</span>
                  Guestbook
                </CardTitle>
                <p className="text-muted-foreground">Let me know you were here</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="relative overflow-hidden rounded-xl h-full min-h-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-gradient"></div>
                  <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 h-full flex items-center justify-center border border-white/10 glass-enhanced">
                    <div className="text-center animate-bounce-in">
                      <div className="text-6xl mb-6 animate-float">💌</div>
                      <p className="text-muted-foreground text-xl font-medium mb-4">Sign the guestbook and leave your mark!</p>
                      <div className="inline-block px-6 py-3 bg-primary/10 rounded-full border border-primary/20 glass-effect hover:bg-primary/20 transition-all duration-500">
                        <span className="text-primary text-base font-semibold">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestbookAndFavorite;
