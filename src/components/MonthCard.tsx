import { useState } from "react";
import { ChevronDown, Trophy, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Month } from "@/data/curriculumData";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { WeekSection } from "./WeekSection";

interface MonthCardProps {
  month: Month;
  progress: number;
  status: "not-started" | "in-progress" | "complete";
  isActive: boolean;
  onToggleTask: (weekId: string, taskId: string) => void;
  onToggleProjectTask: (weekId: string, taskId: string) => void;
  getWeekProgress: (weekId: string) => number;
  onAddDailyTask?: (weekId: string, topic: string, day?: string) => void;
  onRemoveDailyTask?: (weekId: string, taskId: string) => void;
  onAddProjectTask?: (weekId: string, description: string) => void;
  onRemoveProjectTask?: (weekId: string, taskId: string) => void;
}

const monthIcons: Record<number, string> = {
  1: "🐍",
  2: "🐼",
  3: "📊",
  4: "📈",
  5: "🤖",
};

export const MonthCard = ({
  month,
  progress,
  status,
  isActive,
  onToggleTask,
  onToggleProjectTask,
  getWeekProgress,
  onAddDailyTask,
  onRemoveDailyTask,
  onAddProjectTask,
  onRemoveProjectTask,
}: MonthCardProps) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  const totalHours = month.weeks.reduce(
    (acc, week) => acc + week.dailyTasks.reduce((tAcc, task) => tAcc + task.hours, 0),
    0
  );

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300",
        isActive
          ? "border-primary/40 shadow-glow bg-gradient-card"
          : "border-border bg-card hover:border-border/80"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center gap-4"
      >
        {/* Month Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
            status === "complete"
              ? "bg-success/20"
              : status === "in-progress"
                ? "bg-primary/20"
                : "bg-secondary"
          )}
        >
          {status === "complete" ? <Trophy className="w-7 h-7 text-success" /> : monthIcons[month.monthNumber]}
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Month {month.monthNumber}
            </span>
            <StatusBadge status={status} />
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            {month.title}
          </h3>
          <p className="text-sm text-muted-foreground">{month.focusArea}</p>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs">{month.weeks.length} weeks</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{totalHours}h logged</span>
            </div>
          </div>

          {/* Progress */}
          <div className="w-24">
            <div className="text-right text-sm font-medium text-foreground mb-1">
              {progress}%
            </div>
            <ProgressBar progress={progress} size="sm" />
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Mobile Stats */}
      <div className="md:hidden px-5 pb-3">
        <ProgressBar progress={progress} showLabel size="sm" />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 animate-fade-in">
          {month.weeks.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              progress={getWeekProgress(week.id)}
              onToggleTask={onToggleTask}
              onToggleProjectTask={onToggleProjectTask}
              onAddDailyTask={onAddDailyTask}
              onRemoveDailyTask={onRemoveDailyTask}
              onAddProjectTask={onAddProjectTask}
              onRemoveProjectTask={onRemoveProjectTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};
