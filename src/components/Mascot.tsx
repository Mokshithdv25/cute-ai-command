import mascotsImg from "@/assets/lofty-mascots.png";
import { cn } from "@/lib/utils";

// The uploaded image contains 5 mascots in a row on a blue background.
// We crop a single mascot using background-position + scale.
// Order (left→right): telescope, phone, hero (arms up), glasses, laptop.

export type MascotVariant = "telescope" | "phone" | "hero" | "glasses" | "laptop";

const VARIANT_X: Record<MascotVariant, string> = {
  telescope: "12%",
  phone: "32%",
  hero: "51%",
  glasses: "70%",
  laptop: "89%",
};

interface MascotProps {
  variant?: MascotVariant;
  size?: number;
  className?: string;
  animate?: boolean;
  glow?: boolean;
}

export const Mascot = ({
  variant = "hero",
  size = 96,
  className,
  animate = true,
  glow = false,
}: MascotProps) => {
  return (
    <div
      className={cn(
        "relative inline-block shrink-0",
        animate && "animate-float",
        className
      )}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-60"
          style={{ background: "radial-gradient(circle, hsl(230 92% 58% / 0.5), transparent 70%)" }}
        />
      )}
      <div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          backgroundImage: `url(${mascotsImg})`,
          // The mascots sit in the lower portion of the source image.
          backgroundSize: "500% auto",
          backgroundPosition: `${VARIANT_X[variant]} 78%`,
          backgroundRepeat: "no-repeat",
          // Soft brand-tint backdrop so the original blue card crop blends nicely
          backgroundColor: "hsl(230 92% 58%)",
        }}
        aria-label="Lofty mascot"
        role="img"
      />
    </div>
  );
};
