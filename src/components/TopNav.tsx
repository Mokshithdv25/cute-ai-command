import { LoftyLogo } from "./LoftyLogo";
import { Search, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = ["Dashboard", "People", "Transactions", "Calendar", "Listings", "Marketing", "Reporting", "Marketplace"];

export const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center gap-6 h-16">
        <LoftyLogo />
        <div className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((item, i) => (
            <button
              key={item}
              className={cn(
                "px-3 py-1.5 rounded-full font-medium transition-colors",
                i === 0
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <div className="ml-2 h-9 w-9 rounded-full bg-gradient-ai shadow-glow flex items-center justify-center text-primary-foreground font-bold text-sm">
            F
          </div>
        </div>
      </div>
    </header>
  );
};
