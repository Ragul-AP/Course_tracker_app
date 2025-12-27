import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ProgressBar = ({
  progress,
  className,
  showLabel = false,
  size = "md",
}: ProgressBarProps) => {
  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-muted overflow-hidden", heights[size])}>
        <div
          className="h-full bg-gradient-progress rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
