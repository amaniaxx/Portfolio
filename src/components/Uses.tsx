import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const tools = [
  {
    name: 'RapidWeaver',
    icon: '🌐',
    description: 'Website building',
    color: 'bg-gradient-to-br from-pink-500 to-rose-600'
  },
  {
    name: 'Xcode',
    icon: '⚡',
    description: 'iOS Development',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    name: 'GitHub',
    icon: '👤',
    description: 'Version Control',
    color: 'bg-gradient-to-br from-purple-500 to-violet-600'
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

  return (
    <section id="uses" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary tracking-tight">
              Tools & Tech
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Check out my favorite tools and spots around the web
            </p>
          </div>
          
          <Card className="glass-effect hover:border-white/50 transition-all duration-500 professional-shadow mb-8 hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <span className="text-3xl mr-3">🛠️</span>
                My Toolkit
              </CardTitle>
              <p className="text-muted-foreground">Essential tools for modern development</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className={`aspect-square glass-effect hover:border-white/50 transition-all duration-500 ease-out rounded-2xl flex flex-col items-center justify-center p-6 tool-card ${
                      isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className={`w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg hover:shadow-2xl transition-all duration-300`}>
                      {tool.icon}
                    </div>
                    <span className="text-sm font-semibold text-center text-foreground mb-1">{tool.name}</span>
                    <span className="text-xs text-center text-muted-foreground">{tool.description}</span>
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
