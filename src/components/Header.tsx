
import { Book, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);

  const logoOptions = [
    { logo: '/logo1.png', favicon: '/title1.png' },
    { logo: '/logo2.png', favicon: '/title2.png' },
    { logo: '/logo3.png', favicon: '/title3.png' },
  ];

  useEffect(() => {
    // Generate random number between 0 and 2 to select logo
    const randomLogo = Math.floor(Math.random() * 3);
    setCurrentLogo(randomLogo);
    
    // Update favicon dynamically with a larger size
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = logoOptions[randomLogo].favicon;
      newFavicon.sizes = "32x32"; // Specify larger size
      newFavicon.type = "image/png";
      document.head.appendChild(newFavicon);
      
      // Add a larger version for better clarity
      const largeFavicon = document.createElement('link');
      largeFavicon.rel = 'icon';
      largeFavicon.href = logoOptions[randomLogo].favicon;
      largeFavicon.sizes = "192x192"; // Much larger for modern browsers
      largeFavicon.type = "image/png";
      document.head.appendChild(largeFavicon);
    } else {
      favicon.setAttribute('href', logoOptions[randomLogo].favicon);
      favicon.setAttribute('sizes', '32x32');
      favicon.setAttribute('type', 'image/png');
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center">
              <img 
                src={logoOptions[currentLogo].logo} 
                alt="Bookers Logo" 
                className="w-12 h-12 object-contain rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-primary">Bookers</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">Home</a>
            <a href="#prototype" className="text-foreground hover:text-accent transition-colors">Create Prototype</a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">About</a>
            <a href="#showcase" className="text-foreground hover:text-accent transition-colors">Showcase</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-foreground hover:text-accent transition-colors">Home</a>
              <a href="#prototype" className="text-foreground hover:text-accent transition-colors">Create Prototype</a>
              <a href="#about" className="text-foreground hover:text-accent transition-colors">About</a>
              <a href="#showcase" className="text-foreground hover:text-accent transition-colors">Showcase</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;





