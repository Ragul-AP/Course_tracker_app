import { BarChart3, RefreshCw, LogOut, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface HeaderProps {
  onReset: () => void;
  saving?: boolean;
}

export const Header = ({ onReset, saving }: HeaderProps) => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">
              Data Analyst Track
            </h1>
            <p className="text-xs text-muted-foreground">
              5-Month Python-Focused Learning Path
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saving && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Cloud className="w-3 h-3 animate-pulse" />
              <span>Saving...</span>
            </div>
          )}
          
          {user && (
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};
