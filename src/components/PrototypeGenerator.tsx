
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, BookOpen, Users, Palette, FileText, Star, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addFeaturedPrototype } from "@/utils/featuredPrototypes";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;


interface Prototype {
  title: string;
  genre: string;
  hook: string;
  characters: string[];
  acts: string[];
  themes: string[];
  estimatedPages: number;
  estimatedWords: number;
  tone: string;
}

interface FeaturedFormData {
  author: string;
  status: string;
  targetAudience: string;
  estimatedBudget: string;
  timeline: string;
  contactEmail: string;
  contactNote: string;
}

const PrototypeGenerator = () => {
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [prototype, setPrototype] = useState<Prototype | null>(null);
  const [featuredForm, setFeaturedForm] = useState<FeaturedFormData>({
    author: "",
    status: "Seeking Investors",
    targetAudience: "",
    estimatedBudget: "",
    timeline: "",
    contactEmail: "",
    contactNote: ""
  });
  const [isAddingToFeatured, setIsAddingToFeatured] = useState(false);
  const { toast } = useToast();

  const generatePrototype = async () => {
    if (!idea.trim()) {
      toast({
        title: "Please enter your story idea",
        description: "We need some details about your story to create a prototype.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'compound-beta',
          messages: [
            {
              role: 'system',
              content: `You are a professional book development assistant. Given a story idea, create a comprehensive book prototype. Return ONLY a valid JSON object with these exact fields:
              {
                "title": "A compelling book title",
                "genre": "The book's genre",
                "hook": "A compelling one-sentence hook",
                "characters": ["Character 1: brief description", "Character 2: brief description", "Character 3: brief description"],
                "acts": ["Act 1: description", "Act 2: description", "Act 3: description"],
                "themes": ["Theme 1", "Theme 2", "Theme 3"],
                "estimatedPages": 300,
                "estimatedWords": 75000,
                "tone": "The overall tone"
              }
              
              Be creative and professional. Make it publication-ready. Return ONLY the JSON, no other text.`
            },
            {
              role: 'user',
              content: `Create a book prototype for this idea: ${idea}`
            }
          ],
          temperature: 0.8,
          max_tokens: 1500,
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      const content = data.choices[0]?.message?.content?.trim();
      
      if (content) {
        try {
          // Try to parse the content directly as JSON
          let prototypeData;
          
          // Remove any markdown formatting if present
          const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          
          // Try to find JSON in the response
          const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            prototypeData = JSON.parse(jsonMatch[0]);
          } else {
            prototypeData = JSON.parse(cleanContent);
          }
          
          console.log('Parsed prototype:', prototypeData);
          setPrototype(prototypeData);
          toast({
            title: "Prototype Generated!",
            description: "Your book prototype is ready for review.",
          });
        } catch (parseError) {
          console.error('Parse error:', parseError);
          console.error('Content that failed to parse:', content);
          throw new Error('Failed to parse AI response. Please try again.');
        }
      } else {
        throw new Error('No content received from AI');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate prototype. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToFeatured = async () => {
    if (!prototype) return;

    if (!featuredForm.author || !featuredForm.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the author name and contact email.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAddingToFeatured(true);
      
      await addFeaturedPrototype({
        title: prototype.title,
        author: featuredForm.author,
        genre: prototype.genre,
        hook: prototype.hook,
        status: featuredForm.status,
        pages: prototype.estimatedPages,
        words: prototype.estimatedWords,
        themes: prototype.themes,
        fullDescription: `${prototype.hook} This ${prototype.genre.toLowerCase()} story explores themes of ${prototype.themes.join(', ')} with a ${prototype.tone.toLowerCase()} tone. The narrative follows ${prototype.characters.length} main characters through ${prototype.acts.length} acts.`,
        targetAudience: featuredForm.targetAudience || "General audience",
        estimatedBudget: featuredForm.estimatedBudget || "To be discussed",
        timeline: featuredForm.timeline || "Flexible",
        contactEmail: featuredForm.contactEmail,
        contactNote: featuredForm.contactNote || "Interested in collaboration and feedback."
      });

      toast({
        title: "Added to Featured!",
        description: "Your prototype has been added to the featured section.",
      });

      // Reset form
      setFeaturedForm({
        author: "",
        status: "Seeking Investors",
        targetAudience: "",
        estimatedBudget: "",
        timeline: "",
        contactEmail: "",
        contactNote: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add prototype to featured section.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToFeatured(false);
    }
  };

  return (
    <section id="prototype" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Create Your Prototype
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your story idea and let AI help you develop it into a comprehensive book prototype
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="book-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Tell Us Your Story Idea
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your story idea... What's the concept? Who are the characters? What's the setting? Any dreams or inspirations behind it?"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-[120px] paper-texture"
              />
              <Button 
                onClick={generatePrototype} 
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Crafting Your Prototype...
                  </>
                ) : (
                  "Generate Book Prototype"
                )}
              </Button>
            </CardContent>
          </Card>

          {prototype && (
            <div className="mt-8 animate-book-open">
              <Card className="book-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-center text-primary">
                        {prototype.title}
                      </CardTitle>
                      <p className="text-center text-muted-foreground text-lg">
                        {prototype.genre}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Add to Featured
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add to Featured Prototypes</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="author">Author Name *</Label>
                            <Input
                              id="author"
                              value={featuredForm.author}
                              onChange={(e) => setFeaturedForm({...featuredForm, author: e.target.value})}
                              placeholder="Your name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                              id="status"
                              value={featuredForm.status}
                              onChange={(e) => setFeaturedForm({...featuredForm, status: e.target.value})}
                              className="w-full px-3 py-2 border border-input rounded-md"
                            >
                              <option value="Seeking Investors">Seeking Investors</option>
                              <option value="Looking for Publisher">Looking for Publisher</option>
                              <option value="Collaboration Welcome">Collaboration Welcome</option>
                              <option value="In Development">In Development</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactEmail">Contact Email *</Label>
                            <Input
                              id="contactEmail"
                              type="email"
                              value={featuredForm.contactEmail}
                              onChange={(e) => setFeaturedForm({...featuredForm, contactEmail: e.target.value})}
                              placeholder="your.email@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Input
                              id="targetAudience"
                              value={featuredForm.targetAudience}
                              onChange={(e) => setFeaturedForm({...featuredForm, targetAudience: e.target.value})}
                              placeholder="e.g., Young Adults 16-35, Fantasy readers"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeline">Timeline</Label>
                            <Input
                              id="timeline"
                              value={featuredForm.timeline}
                              onChange={(e) => setFeaturedForm({...featuredForm, timeline: e.target.value})}
                              placeholder="e.g., 6-12 months"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget">Estimated Budget</Label>
                            <Input
                              id="budget"
                              value={featuredForm.estimatedBudget}
                              onChange={(e) => setFeaturedForm({...featuredForm, estimatedBudget: e.target.value})}
                              placeholder="e.g., $10,000 - $50,000"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactNote">Contact Note</Label>
                            <Textarea
                              id="contactNote"
                              value={featuredForm.contactNote}
                              onChange={(e) => setFeaturedForm({...featuredForm, contactNote: e.target.value})}
                              placeholder="Brief note about what you're looking for..."
                              className="min-h-[60px]"
                            />
                          </div>
                          <Button 
                            onClick={handleAddToFeatured}
                            disabled={isAddingToFeatured}
                            className="w-full"
                          >
                            {isAddingToFeatured ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Adding to Featured...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Featured
                              </>
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                    <h3 className="font-semibold text-accent mb-2">Story Hook</h3>
                    <p className="italic text-lg">{prototype.hook}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Main Characters
                      </h3>
                      <ul className="space-y-2">
                        {prototype.characters.map((character, index) => (
                          <li key={index} className="text-muted-foreground">
                            • {character}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Story Structure
                      </h3>
                      <ul className="space-y-2">
                        {prototype.acts.map((act, index) => (
                          <li key={index} className="text-muted-foreground">
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Themes & Tone
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {prototype.themes.map((theme, index) => (
                        <span 
                          key={index}
                          className="bg-secondary px-3 py-1 rounded-full text-sm"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      <strong>Tone:</strong> {prototype.tone}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{prototype.estimatedPages}</p>
                      <p className="text-sm text-muted-foreground">Estimated Pages</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{prototype.estimatedWords.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Estimated Words</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrototypeGenerator;
