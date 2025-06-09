import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiPython, SiGithub } from 'react-icons/si';

const skills = [
  { name: 'JavaScript', level: 70, category: 'Frontend', icon: <SiJavascript className="w-6 h-6 text-yellow-400" /> },
  { name: 'HTML', level: 90, category: 'Frontend', icon: <SiHtml5 className="w-6 h-6 text-orange-500" /> },
  { name: 'CSS', level: 90, category: 'Styling', icon: <SiCss3 className="w-6 h-6 text-blue-500" /> },
  { name: 'Tailwind', level: 90, category: 'Styling', icon: <SiTailwindcss className="w-6 h-6 text-cyan-400" /> },
  { name: 'Python', level: 70, category: 'Backend', icon: <SiPython className="w-6 h-6 text-blue-600" /> },
  { name: 'Git & GitHub', level: 90, category: 'Tools', icon: <SiGithub className="w-6 h-6" /> },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(new Array(skills.length).fill(0));
  const sectionRef = useRef<HTMLElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Reset levels first
          setAnimatedLevels(new Array(skills.length).fill(0));
          
          // Start animation after a small delay to ensure smooth transition
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }
          
          animationTimeoutRef.current = setTimeout(() => {
            setAnimatedLevels(skills.map(skill => skill.level));
          }, 100);
        } else {
          setIsVisible(false);
          setAnimatedLevels(new Array(skills.length).fill(0));
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '20px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      {/* Enhanced background particles with depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-accent/5 rounded-full blur-lg animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-20 sm:w-28 h-20 sm:h-28 bg-primary/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-2/3 w-12 sm:w-20 h-12 sm:h-20 bg-accent/5 rounded-full blur-lg animate-float" style={{ animationDelay: '4.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="section-heading group">
              Technical <span className="text-gradient-accent">Skills</span>
            </h2>
            <div className="section-divider" aria-hidden="true"></div>
            <p className="section-description max-w-2xl mx-auto">
              Expertise across modern web technologies and development tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name} 
                className={`glass-effect hover:bg-card/60 transition-all duration-500 ease-out subtle-glow professional-shadow card-3d hover-lift transform ${
                  isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0 scale-95'
                }`}
                style={{ 
                  animationDelay: `${index * 75}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, box-shadow',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out'
                } as React.CSSProperties}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <CardHeader className="pb-3 sm:pb-4" style={{ transform: 'translateZ(20px)' }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center space-x-3 group/icon">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 group-hover/icon:scale-110" style={{ transform: 'translateZ(15px)' }}>
                        {skill.icon}
                      </div>
                      <CardTitle className="text-base sm:text-lg font-semibold group-hover:text-gradient-primary transition-all duration-300" style={{ transform: 'translateZ(10px)' }}>
                        {skill.name}
                      </CardTitle>
                    </div>
                    <span 
                      className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full glass-effect w-fit hover:bg-primary/20 transition-all duration-300"
                      style={{ transform: 'translateZ(5px)' }}
                    >
                      {skill.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent style={{ transform: 'translateZ(15px)' }}>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="relative group/progress">
                      <Progress 
                        value={animatedLevels[index]} 
                        className="h-2 sm:h-3 progress-glow will-change-transform"
                        style={{
                          transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: `scaleX(${isVisible ? 1 : 0})`,
                          transformOrigin: 'left'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-50 group-hover/progress:opacity-75 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span 
                        className="text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300"
                        style={{ transform: 'translateZ(5px)' }}
                      >
                        {skill.level === 70 ? 'Intermediate' : 'Proficiency'}
                      </span>
                      <span 
                        className="text-primary font-bold bg-primary/10 px-2 py-0.5 sm:py-1 rounded-md hover:bg-primary/20 transition-all duration-300"
                        style={{
                          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          opacity: isVisible ? 1 : 0,
                          transform: `translateY(${isVisible ? '0' : '10px'}) translateZ(5px)`
                        }}
                      >
                        {Math.round(animatedLevels[index])}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
