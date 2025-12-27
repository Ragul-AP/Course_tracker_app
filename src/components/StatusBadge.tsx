import { cn } from "@/lib/utils";

type Status = "not-started" | "in-progress" | "complete";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = {
    "not-started": {
      label: "Not Started",
      classes: "bg-muted text-muted-foreground",
    },
    "in-progress": {
      label: "In Progress",
      classes: "bg-in-progress/20 text-in-progress border border-in-progress/30",
    },
    complete: {
      label: "Complete",
      classes: "bg-success/20 text-success border border-success/30",
    },
  };

  const { label, classes } = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        classes,
        className
      )}
    >
      {status === "complete" && (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {status === "in-progress" && (
        <span className="w-1.5 h-1.5 rounded-full bg-in-progress mr-1.5 animate-pulse" />
      )}
      {label}
    </span>
  );
};
