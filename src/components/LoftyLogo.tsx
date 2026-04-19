import { cn } from "@/lib/utils";
import loftyMark from "@/assets/lofty-mark.png";

interface LoftyLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export const LoftyLogo = ({ className, showWordmark = true }: LoftyLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={loftyMark}
        alt="Lofty"
        className="h-8 w-8 rounded-lg object-cover"
      />
      {showWordmark && (
        <span className="font-display font-extrabold text-2xl tracking-tight text-primary">
          Lofty
        </span>
      )}
    </div>
  );
};
