import { useState } from "react";
import { ChevronRight, Folder, Sparkles, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Week } from "@/data/curriculumData";
import { ProgressBar } from "./ProgressBar";
import { TaskCheckbox } from "./TaskCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WeekSectionProps {
  week: Week;
  progress: number;
  onToggleTask: (weekId: string, taskId: string) => void;
  onToggleProjectTask: (weekId: string, taskId: string) => void;
  onAddDailyTask?: (weekId: string, topic: string, day?: string) => void;
  onRemoveDailyTask?: (weekId: string, taskId: string) => void;
  onAddProjectTask?: (weekId: string, description: string) => void;
  onRemoveProjectTask?: (weekId: string, taskId: string) => void;
}

export const WeekSection = ({
  week,
  progress,
  onToggleTask,
  onToggleProjectTask,
  onAddDailyTask,
  onRemoveDailyTask,
  onAddProjectTask,
  onRemoveProjectTask,
}: WeekSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newTaskTopic, setNewTaskTopic] = useState("");
  const [newTaskDay, setNewTaskDay] = useState("");
  const [newProjectTask, setNewProjectTask] = useState("");
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);

  const projectProgress =
    (week.project.tasks.filter((t) => t.completed).length / week.project.tasks.length) * 100;

  const handleAddDailyTask = () => {
    if (newTaskTopic.trim() && onAddDailyTask) {
      onAddDailyTask(week.id, newTaskTopic.trim(), newTaskDay.trim() || "Custom");
      setNewTaskTopic("");
      setNewTaskDay("");
      setShowAddTaskDialog(false);
    }
  };

  const handleAddProjectTask = () => {
    if (newProjectTask.trim() && onAddProjectTask) {
      onAddProjectTask(week.id, newProjectTask.trim());
      setNewProjectTask("");
      setShowAddProjectDialog(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border transition-all duration-200",
        week.isCapstone
          ? "border-accent/40 bg-accent/5"
          : "border-border/50 bg-secondary/30"
      )}
    >
      {/* Week Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-3"
      >
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-90"
          )}
        />

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Week {week.weekNumber}
            </span>
            {week.isCapstone && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Capstone
              </span>
            )}
          </div>
          <h4 className="font-medium text-foreground">{week.title}</h4>
        </div>

        <div className="hidden sm:block w-32">
          <ProgressBar progress={progress} size="sm" />
        </div>

        <span className="text-sm font-medium text-foreground">{progress}%</span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 animate-slide-in">
          {/* Daily Tasks */}
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Daily Tasks
              </h5>
              {onAddDailyTask && (
                <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Daily Task</DialogTitle>
                      <DialogDescription>
                        Add a new custom task to Week {week.weekNumber}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="topic" className="text-sm font-medium">
                          Task Topic
                        </label>
                        <Input
                          id="topic"
                          placeholder="Enter task topic..."
                          value={newTaskTopic}
                          onChange={(e) => setNewTaskTopic(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddDailyTask()}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="day" className="text-sm font-medium">
                          Day (optional)
                        </label>
                        <Input
                          id="day"
                          placeholder="e.g., Mon, Tue, or Custom"
                          value={newTaskDay}
                          onChange={(e) => setNewTaskDay(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddDailyTask()}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddDailyTask} disabled={!newTaskTopic.trim()}>
                        Add Task
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="grid gap-1">
              {week.dailyTasks.map((task) => (
                <div key={task.id} className="group flex items-center">
                  <div className="flex-1">
                    <TaskCheckbox
                      checked={task.completed}
                      onChange={() => onToggleTask(week.id, task.id)}
                      label={task.topic}
                      sublabel={task.day}
                    />
                  </div>
                  {onRemoveDailyTask && task.id.includes('custom') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => onRemoveDailyTask(week.id, task.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-primary" />
                <h5 className="font-medium text-foreground">{week.project.title}</h5>
              </div>
              {onAddProjectTask && (
                <Dialog open={showAddProjectDialog} onOpenChange={setShowAddProjectDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Project Task</DialogTitle>
                      <DialogDescription>
                        Add a new task to the project: {week.project.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="projectTask" className="text-sm font-medium">
                          Task Description
                        </label>
                        <Input
                          id="projectTask"
                          placeholder="Enter task description..."
                          value={newProjectTask}
                          onChange={(e) => setNewProjectTask(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddProjectTask()}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddProjectDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddProjectTask} disabled={!newProjectTask.trim()}>
                        Add Task
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <ProgressBar progress={projectProgress} size="sm" className="mb-3" />
            <div className="space-y-1">
              {week.project.tasks.map((task) => (
                <div key={task.id} className="group flex items-center">
                  <div className="flex-1">
                    <TaskCheckbox
                      checked={task.completed}
                      onChange={() => onToggleProjectTask(week.id, task.id)}
                      label={task.description}
                    />
                  </div>
                  {onRemoveProjectTask && task.id.includes('custom') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => onRemoveProjectTask(week.id, task.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              📁 {week.project.savePath}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
