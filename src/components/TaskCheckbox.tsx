import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TaskCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  sublabel?: string;
  className?: string;
}

export const TaskCheckbox = ({
  checked,
  onChange,
  label,
  sublabel,
  className,
}: TaskCheckboxProps) => {
  return (
    <button
      onClick={onChange}
      className={cn(
        "group flex items-start gap-3 w-full p-3 rounded-lg transition-all duration-200",
        "hover:bg-secondary/50",
        checked && "bg-success/5",
        className
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 transition-all duration-200",
          "flex items-center justify-center",
          checked
            ? "bg-success border-success"
            : "border-muted-foreground/40 group-hover:border-primary"
        )}
      >
        {checked && <Check className="w-3 h-3 text-success-foreground animate-check" />}
      </div>
      <div className="flex-1 text-left">
        <span
          className={cn(
            "block text-sm font-medium transition-all duration-200",
            checked ? "text-muted-foreground line-through" : "text-foreground"
          )}
        >
          {label}
        </span>
        {sublabel && (
          <span className="block text-xs text-muted-foreground mt-0.5">{sublabel}</span>
        )}
      </div>
    </button>
  );
};
