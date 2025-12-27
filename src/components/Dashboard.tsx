import { Target, Clock, Calendar, TrendingUp } from "lucide-react";
import { ProgressRing } from "./ProgressRing";
import { cn } from "@/lib/utils";

interface DashboardProps {
  overallProgress: number;
  totalHours: number;
  currentWeek: number;
  startDate: string;
  targetCompletion: string;
}

export const Dashboard = ({
  overallProgress,
  totalHours,
  currentWeek,
  startDate,
  targetCompletion,
}: DashboardProps) => {
  const targetHours = 89;
  const hoursProgress = Math.min(Math.round((totalHours / targetHours) * 100), 100);

  const start = new Date(startDate);
  const end = new Date(targetCompletion);
  const now = new Date();
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.max(0, Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, totalDays - daysElapsed);

  const stats = [
    {
      icon: Target,
      label: "Current Week",
      value: `${currentWeek}/20`,
      sublabel: `Week ${currentWeek}`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      label: "Hours Logged",
      value: `${totalHours}h`,
      sublabel: `${hoursProgress}% of ${targetHours}h goal`,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Calendar,
      label: "Days Remaining",
      value: daysRemaining.toString(),
      sublabel: `Until ${new Date(targetCompletion).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      color: "text-in-progress",
      bgColor: "bg-in-progress/10",
    },
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: `${overallProgress}%`,
      sublabel: "Overall progress",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-gradient-card border border-border shadow-card">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Progress Ring */}
        <div className="flex-shrink-0">
          <ProgressRing progress={overallProgress} size={160} strokeWidth={12} />
        </div>

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-secondary/40 border border-border/50 transition-all duration-200 hover:border-border"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", stat.bgColor)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
