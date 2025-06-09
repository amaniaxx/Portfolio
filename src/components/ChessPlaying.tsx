import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad, Trophy } from 'lucide-react';

const ChessPlaying = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const handlePlayWithMeClick = () => {
    window.open('https://lichess.org/@/', '_blank'); 
  };

  return (
    <div ref={sectionRef} className="w-full">
      <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
        <Card className="glass-effect hover:border-white/50 transition-all duration-500 flex flex-col p-6 rounded-2xl group bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-none relative overflow-hidden backdrop-blur-xl">
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-gradient-shift"></div>
          </div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-700">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <CardHeader className="flex flex-row items-center space-y-0 pb-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-700 shadow-lg shadow-purple-500/5 group-hover:shadow-purple-500/10">
                <Gamepad className="w-6 h-6 text-purple-400/90 group-hover:text-purple-300 transition-colors duration-500" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400/90 to-blue-400/90 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-700 tracking-tight">
                  Chess Enthusiast
                </CardTitle>
                <p className="text-sm text-gray-400/90 group-hover:text-gray-300 transition-colors duration-500 font-medium">
                  Let's play a game!
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between relative z-10 p-6">
            <div className="flex items-center mb-6 space-x-6">
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden glass-effect-strong group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-700 hover:border hover:border-purple-500/30">
                <img 
                  src="/chess.png" 
                  alt="Chess Icon" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base text-gray-400/90 mb-6 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                  Ready for a <span className="text-purple-400/90 font-semibold group-hover:text-purple-300">challenge</span>? Let's play a game of <span className="text-white/90 font-semibold group-hover:text-blue-300">chess</span>!
                </p>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-500/80" />
                  <p className="text-xs text-gray-500/90 group-hover:text-gray-400 transition-colors duration-500 font-medium">
                    Connect with me on my preferred chess platform
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <Button 
                onClick={handlePlayWithMeClick}
                className="w-full bg-gradient-to-r from-purple-500/90 to-blue-500/90 hover:from-purple-600 hover:to-blue-600 text-white py-2.5 text-base font-medium rounded-lg transition-all duration-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02] hover:translate-y-[-1px]"
              >
                <Gamepad className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform duration-500" />
                Play with Me
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChessPlaying; 