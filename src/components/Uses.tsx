import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const tools = [
  {
    name: 'VS Code',
    icon: '💻',
    description: 'Code Editor',
    color: 'from-blue-500 to-indigo-600',
    gradient: 'hover:bg-gradient-to-br hover:from-blue-900/80 hover:to-indigo-950/80',
    imageSrc: '/vscode.png',
    isPrimary: true,
    techStack: ['TypeScript', 'React', 'Node.js'],
    officialUrl: 'https://code.visualstudio.com'
  },
  {
    name: 'GitHub',
    icon: '🐙',
    description: 'Version Control & Collaboration',
    color: 'from-gray-800 to-gray-900',
    gradient: 'hover:bg-gradient-to-br hover:from-gray-950/80 hover:to-black/80',
    imageSrc: '/github.png',
    techStack: ['Git', 'CI/CD', 'Actions'],
    officialUrl: 'https://github.com'
  },
  {
    name: 'Figma',
    icon: '🎨',
    description: 'UI/UX Design',
    color: 'from-purple-500 to-pink-500',
    gradient: 'hover:bg-gradient-to-br hover:from-purple-950/80 hover:to-pink-950/80',
    imageSrc: '/figma.png',
    techStack: ['UI Design', 'Prototyping', 'Components'],
    officialUrl: 'https://www.figma.com'
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
    <section 
      id="uses" 
      ref={sectionRef} 
      className="relative py-24 px-6"
      aria-label="Tools and Technology Section"
    >
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-500 ${isVisible ? 'animate-smooth-fade-in' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="section-heading">Tools & Tech</h2>
            <div className="section-divider"></div>
            <p className="section-description">Check out my favorite tools and spots around the web</p>
          </div>
          
          <Card className="glass-effect backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <span className="text-3xl mr-3" role="img" aria-label="Tools emoji">🛠️</span>
                My Essential Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className={`group relative aspect-square glass-effect backdrop-blur-sm transition-all duration-300 ease-out rounded-xl flex flex-col items-center justify-between p-6
                      ${isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0'}
                      hover:scale-[1.02] ${tool.gradient}
                      before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-transparent before:via-white/10 before:to-transparent
                      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                      after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent
                      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300
                      after:animate-shine`}
                    style={{ 
                      animationDelay: `${index * 100}ms`
                    }}
                    role="article"
                    aria-label={`${tool.name} - ${tool.description}`}
                  >
                    {tool.isPrimary && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full z-10">
                        Primary
                      </div>
                    )}
                    <div 
                      className={`w-28 h-28 rounded-lg flex items-center justify-center text-5xl 
                        overflow-hidden ${tool.name === 'Figma' ? '' : 'border border-white/5'} bg-gradient-to-br ${tool.color} bg-opacity-10
                        group-hover:bg-opacity-20 transition-transform duration-300`}
                    >
                      {tool.imageSrc ? (
                        <img 
                          src={tool.imageSrc} 
                          alt={`${tool.name} icon`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          width={112}
                          height={112}
                        />
                      ) : (
                        <span className="group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-semibold text-foreground block mb-1 group-hover:text-primary">
                      {tool.name}
                    </span>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground/80">
                      {tool.description}
                    </span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {tool.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="relative z-20 w-full">
                    <Button 
                      variant="outline"
                      size="sm"
                        className="w-full border border-white/5 hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
                        aria-label={`Learn more about ${tool.name}`}
                        onClick={() => window.open(tool.officialUrl, '_blank', 'noopener,noreferrer')}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
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
