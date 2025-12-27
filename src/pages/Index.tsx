import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { MonthCard } from "@/components/MonthCard";
import { MilestoneSection } from "@/components/MilestoneSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const {
    progress,
    loading: progressLoading,
    saving,
    toggleDailyTask,
    toggleProjectTask,
    toggleMilestoneItem,
    toggleCourseProject,
    getWeekProgress,
    getMonthProgress,
    getOverallProgress,
    getTotalHours,
    getMonthStatus,
    resetProgress,
    addDailyTask,
    removeDailyTask,
    addProjectTask,
    removeProjectTask,
    addMilestone,
    removeMilestone,
    addMilestoneItem,
    removeMilestoneItem,
  } = useProgress();

  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      resetProgress();
      toast({
        title: "Progress Reset",
        description: "All your progress has been cleared.",
      });
    }
  };

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const overallProgress = getOverallProgress();
  const totalHours = getTotalHours();

  return (
    <div className="min-h-screen bg-background">
      <Header onReset={handleReset} saving={saving} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Dashboard */}
        <Dashboard
          overallProgress={overallProgress}
          totalHours={totalHours}
          currentWeek={progress.currentWeek}
          startDate={progress.startDate}
          targetCompletion={progress.targetCompletion}
        />

        {/* Months */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-xl text-foreground">
            Learning Modules
          </h2>
          <div className="space-y-4">
            {progress.months.map((month, index) => {
              const monthProgress = getMonthProgress(month.id);
              const status = getMonthStatus(month.id);
              const isActive =
                index === 0 ||
                (index > 0 && getMonthProgress(progress.months[index - 1].id) > 0);

              return (
                <MonthCard
                  key={month.id}
                  month={month}
                  progress={monthProgress}
                  status={status}
                  isActive={isActive && monthProgress < 100}
                  onToggleTask={toggleDailyTask}
                  onToggleProjectTask={toggleProjectTask}
                  getWeekProgress={getWeekProgress}
                  onAddDailyTask={addDailyTask}
                  onRemoveDailyTask={removeDailyTask}
                  onAddProjectTask={addProjectTask}
                  onRemoveProjectTask={removeProjectTask}
                />
              );
            })}
          </div>
        </div>

        {/* Course Projects */}
        <ProjectsSection
          projects={progress.courseProjects || []}
          onToggleProject={toggleCourseProject}
        />

        {/* Milestones */}
        <MilestoneSection
          milestones={progress.milestones}
          onToggleItem={toggleMilestoneItem}
          onAddMilestone={addMilestone}
          onRemoveMilestone={removeMilestone}
          onAddMilestoneItem={addMilestoneItem}
          onRemoveMilestoneItem={removeMilestoneItem}
        />

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            🎓 Start Date: {new Date(progress.startDate).toLocaleDateString()} • Target: {new Date(progress.targetCompletion).toLocaleDateString()}
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Invest ~90 hours, build a comprehensive skill set, land that data analyst role!
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
