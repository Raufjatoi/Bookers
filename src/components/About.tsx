
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, Target } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About Bookers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bookers is a unique platform where writers develop story prototypes and connect with investors. 
            We help transform raw ideas into structured book concepts, making it easier for talent scouts, 
            publishers, and investors to discover promising literary projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="book-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Story Prototypes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Transform your raw story ideas into structured book prototypes with AI assistance, 
                complete with characters, plot outlines, and market positioning.
              </p>
            </CardContent>
          </Card>

          <Card className="book-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Talent Discovery</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Investors and publishers can discover emerging writers and promising book concepts 
                before they're fully developed, getting in early on potential bestsellers.
              </p>
            </CardContent>
          </Card>

          <Card className="book-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Connect & Collaborate</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Build meaningful partnerships between writers, investors, publishers, and industry professionals 
                to bring story concepts to life.
              </p>
            </CardContent>
          </Card>

          <Card className="book-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Development Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Get the resources, funding, and guidance needed to develop your prototype 
                into a complete manuscript ready for publication.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <div className="bg-accent/10 p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Not Publication-Ready Books
            </h3>
            <p className="text-lg text-muted-foreground">
              Bookers focuses on <strong>story prototypes and concepts</strong> - not finished, publication-ready manuscripts. 
              Our platform helps writers develop and showcase their ideas to attract the right partners for the full development process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
