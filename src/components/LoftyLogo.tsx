import { cn } from "@/lib/utils";

interface LoftyLogoProps {
  className?: string;
  showWordmark?: boolean;
}

// Recreated Lofty wordmark + "k" mark to match the brand image.
export const LoftyLogo = ({ className, showWordmark = true }: LoftyLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="loftyMark" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(230 92% 58%)" />
            <stop offset="100%" stopColor="hsl(220 100% 70%)" />
          </linearGradient>
        </defs>
        {/* stylized k */}
        <path
          d="M8 4 L8 28 L13 28 L13 20 L15 20 L22 28 L29 28 L19 17 L28 8 L21 8 L13 16 L13 4 Z"
          fill="url(#loftyMark)"
        />
      </svg>
      {showWordmark && (
        <span className="font-display font-extrabold text-2xl tracking-tight text-primary">
          Lofty
        </span>
      )}
    </div>
  );
};
