import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';

const tools = [
  {
    name: 'VS Code',
    icon: '/vscode.png',
    description: 'Code Editor',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    features: ['IntelliSense', 'Debugging', 'Extensions'],
    link: 'https://code.visualstudio.com'
  },
  {
    name: 'GitHub',
    icon: '/github.png',
    description: 'Version Control',
    color: 'bg-gradient-to-br from-purple-500 to-violet-600',
    features: ['Collaboration', 'CI/CD', 'Actions'],
    link: 'https://github.com'
  },
  {
    name: 'Figma',
    icon: '/figma.png',
    description: 'UI/UX Design',
    color: 'bg-gradient-to-br from-pink-500 to-rose-600',
    features: ['Prototyping', 'Components', 'Auto-layout'],
    link: 'https://figma.com'
  }
];

const Uses = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section 
      id="uses" 
      ref={sectionRef} 
      className="relative py-24 px-6"
      aria-label="Tools and Technology Section"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary tracking-tight">
              Tools & Tech
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-8" aria-hidden="true"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Check out my favorite tools and spots around the web
            </p>
          </div>
          
          <Card className="glass-effect hover:border-white/50 transition-all duration-500 professional-shadow mb-8 hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">🛠️</span>
                My Toolkit
              </CardTitle>
              <p className="text-muted-foreground">Essential tools for modern development</p>
            </CardHeader>
            <CardContent>
              <div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
                role="list"
                aria-label="Development tools list"
              >
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className={`group relative overflow-hidden glass-effect hover:border-white/50 transition-all duration-500 ease-out rounded-xl p-6 tool-card ${
                      isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0 scale-95'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.3s ease-out'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${tool.name} - ${tool.description}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                    <div className="relative z-10">
                      <div 
                        className={`w-20 h-20 sm:w-24 sm:h-24 ${tool.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                        style={{ transform: 'translateZ(20px)' }}
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <OptimizedImage 
                          src={tool.icon} 
                          alt={`${tool.name} icon`}
                          width={80}
                          height={80}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl relative z-10 filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" 
                          style={{ transform: 'translateZ(30px)' }}
                          priority={index < 2}
                        />
                      </div>
                      <h3 
                        className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
                        style={{ transform: 'translateZ(15px)' }}
                      >
                        {tool.name}
                      </h3>
                      <p 
                        className="text-sm text-muted-foreground mb-4"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        {tool.description}
                      </p>
                      <div 
                        className="space-y-2 mb-6"
                        style={{ transform: 'translateZ(5px)' }}
                        role="list"
                        aria-label={`${tool.name} features`}
                      >
                        {tool.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300"
                            role="listitem"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors duration-300" aria-hidden="true"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group-hover:bg-primary/10 transition-colors duration-300"
                        onClick={() => window.open(tool.link, '_blank')}
                        style={{ transform: 'translateZ(20px)' }}
                        aria-label={`Learn more about ${tool.name}`}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Uses;
