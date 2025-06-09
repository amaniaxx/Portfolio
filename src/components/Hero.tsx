import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FolderOpen, ChevronDown, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const taglines = [
    "Full-Stack Web Developer",
    "Frontend Specialist", 
    "React Developer",
    "Modern Web Solutions"
  ];

  useEffect(() => {
    // Trigger content animation after initial load
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentTagline = taglines[currentIndex];
    
    // Dynamic typing speed based on character position
    const getTypingSpeed = () => {
      if (isDeleting) return 30; // Faster deletion
      if (isPaused) return 1000; // Pause between words
      
      // Vary typing speed based on position
      const position = displayedText.length;
      if (position < 5) return 150; // Start slower
      if (position > currentTagline.length - 5) return 150; // End slower
      return 50 + Math.random() * 50; // Random speed in middle
    };

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText === currentTagline) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 2000);
          return;
        }
        
        setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
      } else {
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % taglines.length);
          return;
        }
        
        setDisplayedText(currentTagline.slice(0, displayedText.length - 1));
      }
    }, getTypingSpeed());

    return () => clearTimeout(timer);
  }, [displayedText, currentIndex, isDeleting, isPaused]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers with aria-hidden */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.1),transparent_50%)]" aria-hidden="true"></div>
      
      {/* Grid pattern with aria-hidden */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>
      
      {/* Floating orbs with aria-hidden */}
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-float" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} aria-hidden="true"></div>
      <div className="absolute top-1/2 right-1/3 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} aria-hidden="true"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${showContent ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          {/* Status indicator with proper ARIA attributes */}
          <div 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-effect-strong border border-green-500/30 mb-8 sm:mb-12 premium-glow"
            role="status"
            aria-label="Current availability status"
          >
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full mr-3 sm:mr-4 animate-pulse" aria-hidden="true"></div>
            <span className="text-xs sm:text-sm text-green-400 font-semibold tracking-wide">Available for opportunities</span>
          </div>
          
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-8 premium-text tracking-tighter leading-[0.85] animate-bounce-in">
              Aman Awasthi
            </h1>
            <div className="h-16 sm:h-20 mb-8 sm:mb-12 flex items-center justify-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/90 font-medium flex items-center" role="status" aria-live="polite">
                {displayedText}
                <span className="typing-cursor" aria-hidden="true"></span>
              </p>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${showContent ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-16 max-w-5xl mx-auto leading-relaxed font-light px-4">
              Passionate web developer from <span className="text-gradient-primary font-semibold">Dehradun, India</span>, 
              specializing in cutting-edge frontend technologies and creating exceptional digital experiences 
              that drive business growth and user engagement.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-12 sm:mb-20 transition-all duration-1000 delay-500 ${showContent ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-primary-foreground px-6 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl transition-all duration-500 hover-lift group glass-effect-strong border border-primary/20 btn-ripple btn-premium btn-click-pulse"
              onClick={scrollToProjects}
              aria-label="View projects section"
            >
              <FolderOpen className="mr-3 sm:mr-4 h-5 w-5 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:transform-none" aria-hidden="true" />
              View My Projects
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToAbout}
              className="w-full sm:w-auto border-2 border-primary/40 hover:border-white/80 text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-semibold rounded-xl sm:rounded-2xl transition-all duration-500 group glass-effect hover-lift btn-ripple"
              aria-label="View portfolio section"
            >
              View Portfolio
              <ArrowRight className="ml-3 sm:ml-4 h-5 w-5 sm:h-7 sm:w-7 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
            </Button>
          </div>

          {/* Scroll indicator with proper ARIA attributes */}
          <div 
            className={`text-center transition-all duration-1000 delay-700 ${showContent ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}
            role="navigation"
            aria-label="Scroll to about section"
          >
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 font-medium">Discover my work</p>
            <button 
              className="inline-block animate-bounce transition-transform duration-300" 
              onClick={scrollToAbout}
              aria-label="Scroll to about section"
            >
              <div className="w-6 sm:w-8 h-10 sm:h-14 border-2 border-primary/50 rounded-full flex justify-center relative glass-effect">
                <div className="w-1.5 sm:w-2 h-3 sm:h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-2 sm:mt-3 animate-pulse" aria-hidden="true"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;