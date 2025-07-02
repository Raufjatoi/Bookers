
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Users, Clock, Mail, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getFeaturedPrototypes, removeFeaturedPrototype, type FeaturedPrototype } from "@/utils/featuredPrototypes";
import { useToast } from "@/hooks/use-toast";

const sampleBooks = [
  {
    id: "sample-1",
    title: "The Art of Letting Go",
    author: "Rauf",
    genre: "Young Adult Romance",
    hook: "When A-nya's string of failed relationships makes her wonder if she's destined to be alone, she must confront the true meaning of love and heartbreak.",
    status: "Seeking Investors",
    pages: 272,
    words: 66000,
    themes: ["The pursuit of love and relationships", "Self-discovery and growth", "The importance of self-love and acceptance"],
    fullDescription: "A-nya, a hopeless romantic in her twenties, feels lost after her ex-boyfriend Taro leaves her for someone else. Despite Lila’s support, she can’t stop yearning for her soulmate. Through reflection and new encounters, A-nya finally learns to embrace herself and discovers love where she least expects it.",
    targetAudience: "Adults 18-25, Girls, People who are finding True love ",
    estimatedBudget: "$1000 - $1200",
    timeline: "4-6 months",
    contactEmail: "raufpokemon00@gmail.com",
    contactNote: "Looking for investors and publishing partners. Open for collaboration"
  },
    {
    id: "sample-2",
    title: "Beyond the Cosmic Rift",
    author: "Rp",
    genre: "Science Fiction",
    hook: "When Earth's remnants collide with a distant galaxy, the survivors must navigate a treacherous alien landscape and forge unlikely alliances to prevent the annihilation of the universe.",
    status: "Seeking Investors",
    pages: 320,
    words: 80000,
    themes: ["Survival and Resilience", "Cooperation and Conflict", "Redemption and Sacrifice"],
    fullDescription: "After Earth’s destruction, Aurora leads survivors into alien territories. They forge fragile alliances while Kael’s hidden motives unfold. As cosmic war escalates, impossible choices decide the universe’s survival or doom.",
    targetAudience: "Adults 18-25, Girls, People who are finding True love ",
    estimatedBudget: "$1500 - $2000",
    timeline: "10-12 months",
    contactEmail: "raufpokemon00@gmail.com",
    contactNote: "Looking for investors and publishing partners. Open for collaboration"
  },
];

const BookShowcase = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [userPrototypes, setUserPrototypes] = useState<FeaturedPrototype[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setUserPrototypes(getFeaturedPrototypes());
  }, []);

  const handleRemovePrototype = (id: string) => {
    removeFeaturedPrototype(id);
    setUserPrototypes(getFeaturedPrototypes());
  };

  const handleContactAuthor = (email: string) => {
    window.location.href = `mailto:${email}?subject=Interested in your book prototype`;
    toast({
      title: "Email client opened",
      description: "Connecting you with the author",
    });
  };

  const handleSendMessage = (book: any) => {
    // Open a messaging dialog or redirect to a messaging platform
    toast({
      title: "Message feature",
      description: `You're connecting with ${book.author} about "${book.title}"`,
    });
    
    // For demo purposes, we'll just show a toast
    // In a real app, you might open a chat interface or redirect to a messaging platform
  };

  const handleScheduleCall = (book: any) => {
    // Open a calendar scheduling tool or redirect to a scheduling platform
    window.open('https://calendly.com', '_blank');
    
    toast({
      title: "Scheduling a call",
      description: `Opening scheduling tool to connect with ${book.author}`,
    });
  };

  const allBooks = [...userPrototypes, ...sampleBooks];

  return (
    <section id="showcase" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Featured Prototypes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing book prototypes from our community of writers. 
            Invest, collaborate, or get inspired.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBooks.map((book, index) => (
            <Dialog key={book.id || index}>
              <DialogTrigger asChild>
                <Card 
                  className="book-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {book.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                        {book.id && !book.id.startsWith('sample-') && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePrototype(book.id);
                            }}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            title="Remove from featured"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <Badge variant="outline" className="w-fit">
                      {book.genre}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm italic text-muted-foreground leading-relaxed">
                      "{book.hook}"
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {book.themes.map((theme, themeIndex) => (
                        <Badge 
                          key={themeIndex} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {book.pages} pages
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {(book.words / 1000).toFixed(0)}k words
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-2">{book.title}</DialogTitle>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-muted-foreground">by {book.author}</p>
                    <Badge variant="outline">{book.genre}</Badge>
                    <Badge variant="secondary">{book.status}</Badge>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Hook */}
                  <div>
                    <h4 className="font-semibold mb-2">Story Hook</h4>
                    <p className="italic text-muted-foreground">"{book.hook}"</p>
                  </div>

                  {/* Full Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Full Description</h4>
                    <p className="text-sm leading-relaxed">{book.fullDescription}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{book.pages} pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{(book.words / 1000).toFixed(0)}k words</span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm"><strong>Timeline:</strong> {book.timeline}</p>
                      <p className="text-sm"><strong>Budget:</strong> {book.estimatedBudget}</p>
                    </div>
                  </div>

                  {/* Themes */}
                  <div>
                    <h4 className="font-semibold mb-2">Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {book.themes.map((theme, themeIndex) => (
                        <Badge key={themeIndex} variant="secondary">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h4 className="font-semibold mb-2">Target Audience</h4>
                    <p className="text-sm">{book.targetAudience}</p>
                  </div>

                  {/* Contact Section */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-3">Interested in Collaborating?</h4>
                    <p className="text-sm text-muted-foreground mb-4">{book.contactNote}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        className="flex items-center gap-2"
                        onClick={() => handleContactAuthor(book.contactEmail)}
                      >
                        <Mail className="w-4 h-4" />
                        Contact Author
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => handleSendMessage(book)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => handleScheduleCall(book)}
                      >
                        <Phone className="w-4 h-4" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {allBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No prototypes yet
            </h3>
            <p className="text-muted-foreground">
              Be the first to add your prototype to the featured section!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookShowcase;


