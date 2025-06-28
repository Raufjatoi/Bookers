
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
            Craft Your Literary
            <br />
            <span className="text-accent">Masterpiece</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-elegant">
            Transform your story ideas into compelling book prototypes with AI-powered assistance. 
            From concept to publication-ready outline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg book-shadow"
              onClick={() => document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Creating
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg"
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Prototypes
            </Button>
          </div>
        </div>
        
        <div className="mt-16 animate-slide-up">
          <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
