import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon = ({ pageName }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">{pageName}</h1>
          <div className="relative">
            <div className="h-1 w-20 bg-accent mx-auto my-6"></div>
          </div>
          <p className="text-xl text-muted-foreground">Coming Soon</p>
        </div>
        
        <div className="py-8">
          <p className="text-muted-foreground mb-6">
            I pause this page for noe
          </p>
          
          <div className="flex flex-col gap-4 items-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                Want to collaborate on creating this page?
              </p>
              <Button 
                variant="default" 
                className="flex items-center gap-2"
                onClick={() => window.open("https://github.com/Raufjatoi/Bookers/issues/new?title=Feature%20Request:%20" + encodeURIComponent(pageName), "_blank")}
              >
                <Github className="w-4 h-4" />
                Submit a Request on GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;