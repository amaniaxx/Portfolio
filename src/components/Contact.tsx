import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Gamepad } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully",
      description: "Thank you for reaching out. I'll respond within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="section-heading">
              Let's Connect
            </h2>
            <div className="section-divider" aria-hidden="true"></div>
            <p className="section-description">
              Ready to discuss your next project? Let's create something exceptional together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-effect hover:bg-card/60 transition-all duration-300 professional-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="glass-effect border-border/50 focus:border-primary transition-colors duration-300 h-10 sm:h-11"
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="glass-effect border-border/50 focus:border-primary transition-colors duration-300 h-10 sm:h-11"
                      />
                    </div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="glass-effect border-border/50 focus:border-primary transition-colors duration-300 h-10 sm:h-11"
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="glass-effect border-border/50 focus:border-primary transition-colors duration-300 resize-none min-h-[120px] sm:min-h-[150px]"
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 subtle-glow group"
                    >
                      <Send className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="glass-effect hover:bg-card/60 transition-all duration-300 professional-shadow">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gradient-primary">Get in Touch</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-effect rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-300">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">Email</p>
                        <a href="mailto:beingamaniac@gmail.com" className="text-muted-foreground hover:text-primary transition-colors duration-300">beingamaniac@gmail.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-effect rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-300">
                        <Gamepad className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">Chess.com</p>
                        <a href="https://www.chess.com/member/amaniaxx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">amaniaxx</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-effect rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-300">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">Location</p>
                        <p className="text-muted-foreground text-xs sm:text-sm">Dehradun, Uttarakhand, India</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover:bg-card/60 transition-all duration-300 professional-shadow">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gradient-accent">Connect Online</h3>
                  <div className="flex gap-3 sm:gap-4">
                    <Button 
                      asChild
                      variant="outline" 
                      size="icon"
                      className="w-10 h-10 sm:w-12 sm:h-12 glass-effect hover:bg-github hover:text-white border-github/50 hover:border-github transition-all duration-300"
                      aria-label="Visit GitHub profile"
                    >
                      <a href="https://github.com/amaniaxx" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline" 
                      size="icon"
                      className="w-10 h-10 sm:w-12 sm:h-12 glass-effect hover:bg-linkedin hover:text-white border-linkedin/50 hover:border-linkedin transition-all duration-300"
                      aria-label="Visit LinkedIn profile"
                    >
                      <a href="https://www.linkedin.com/in/amaniax/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-border/30 text-center">
        <p className="text-sm sm:text-base text-muted-foreground">
          © 2024 Aman Awasthi. Crafted with precision in Dehradun, India.
        </p>
      </div>
    </section>
  );
};

export default Contact;
