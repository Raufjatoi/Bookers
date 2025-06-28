
import { Book, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Bookers</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering writers to transform their ideas into compelling book prototypes 
              with AI assistance and community collaboration.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#home" className="hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="#prototype" className="hover:text-primary-foreground transition-colors">Create Prototype</a></li>
              <li><a href="#showcase" className="hover:text-primary-foreground transition-colors">Showcase</a></li>
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Writers Hub</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Investor Portal</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Publishing Partners</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/80">
            <span>by</span>
            <a 
              href="https://raufjatoi.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground hover:underline font-medium"
            >
              Abdul Rauf Jatoi
            </a>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-2">
            Logos by Anya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
