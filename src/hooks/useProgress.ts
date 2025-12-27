import { useState, useEffect, useCallback, useRef } from 'react';
import { LearningProgress, initialCurriculumData, DailyTask, ProjectTask } from '@/data/curriculumData';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<LearningProgress>(initialCurriculumData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const skipNextSave = useRef(false);

  // Load progress from database
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setProgress(initialCurriculumData);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('progress_data')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error loading progress:', error);
          toast.error('Failed to load your progress');
          setProgress(initialCurriculumData);
        } else if (data?.progress_data) {
          setProgress(data.progress_data as unknown as LearningProgress);
        } else {
          setProgress(initialCurriculumData);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        setProgress(initialCurriculumData);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save progress to database
  const saveProgress = useCallback(async (newProgress: LearningProgress) => {
    if (!user) return;

    setSaving(true);
    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      let error;
      if (existing) {
        // Update existing record
        const result = await supabase
          .from('user_progress')
          .update({
            progress_data: JSON.parse(JSON.stringify(newProgress)),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);
        error = result.error;
      } else {
        // Insert new record
        const result = await supabase
          .from('user_progress')
          .insert([{
            user_id: user.id,
            progress_data: JSON.parse(JSON.stringify(newProgress)),
          }]);
        error = result.error;
      }

      if (error) {
        console.error('Error saving progress:', error);
        toast.error('Failed to save progress');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setSaving(false);
    }
  }, [user]);

  // Debounced save effect
  useEffect(() => {
    if (!user || loading) return;

    // Skip save if flag is set (after reset)
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      saveProgress(progress);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [progress, user, loading, saveProgress]);

  const toggleDailyTask = (weekId: string, taskId: string) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              dailyTasks: week.dailyTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
            : week
        ),
      })),
    }));
  };

  const toggleProjectTask = (weekId: string, taskId: string) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              project: {
                ...week.project,
                tasks: week.project.tasks.map((task) =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
              },
            }
            : week
        ),
      })),
    }));
  };

  const toggleMilestoneItem = (milestoneId: string, itemId: string) => {
    setProgress((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
            ...milestone,
            items: milestone.items.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
          }
          : milestone
      ),
    }));
  };

  const updateDailyHours = (weekId: string, taskId: string, hours: number) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              dailyTasks: week.dailyTasks.map((task) =>
                task.id === taskId ? { ...task, hours } : task
              ),
            }
            : week
        ),
      })),
    }));
  };

  const updateNotes = (weekId: string, taskId: string, notes: string) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              dailyTasks: week.dailyTasks.map((task) =>
                task.id === taskId ? { ...task, notes } : task
              ),
            }
            : week
        ),
      })),
    }));
  };

  const updateReflection = (
    weekId: string,
    field: 'whatWentWell' | 'whatToImprove' | 'keyInsights',
    value: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              reflection: {
                ...week.reflection,
                [field]: value,
              },
            }
            : week
        ),
      })),
    }));
  };

  const getWeekProgress = (weekId: string): number => {
    for (const month of progress.months) {
      const week = month.weeks.find((w) => w.id === weekId);
      if (week) {
        const completed = week.dailyTasks.filter((t) => t.completed).length;
        return Math.round((completed / week.dailyTasks.length) * 100);
      }
    }
    return 0;
  };

  const getMonthProgress = (monthId: string): number => {
    const month = progress.months.find((m) => m.id === monthId);
    if (!month) return 0;

    const totalTasks = month.weeks.reduce((acc, week) => acc + week.dailyTasks.length, 0);
    const completedTasks = month.weeks.reduce(
      (acc, week) => acc + week.dailyTasks.filter((t) => t.completed).length,
      0
    );

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const getOverallProgress = (): number => {
    const totalTasks = progress.months.reduce(
      (acc, month) =>
        acc + month.weeks.reduce((wAcc, week) => wAcc + week.dailyTasks.length, 0),
      0
    );
    const completedTasks = progress.months.reduce(
      (acc, month) =>
        acc +
        month.weeks.reduce(
          (wAcc, week) => wAcc + week.dailyTasks.filter((t) => t.completed).length,
          0
        ),
      0
    );

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const getTotalHours = (): number => {
    let total = 0;

    // 1. Calculate hours from daily tasks & weekly project tasks
    progress.months.forEach((month) => {
      month.weeks.forEach((week) => {
        // Daily tasks: use logged hours or default 0.5h for completed tasks
        week.dailyTasks.forEach((task) => {
          if (task.completed) {
            total += task.hours > 0 ? task.hours : 0.5;
          } else {
            total += task.hours; // Add logged hours even if not complete
          }
        });

        // Weekly project tasks: default 0.5h for completed tasks
        week.project.tasks.forEach((task) => {
          if (task.completed) {
            total += 0.5;
          }
        });
      });
    });

    // 2. Calculate hours from Course Projects
    if (progress.courseProjects) {
      progress.courseProjects.forEach((project) => {
        if (project.completed) {
          total += project.estimatedHours;
        }
      });
    }

    return Math.round(total * 10) / 10;
  };

  const getMonthStatus = (monthId: string): 'not-started' | 'in-progress' | 'complete' => {
    const monthProgress = getMonthProgress(monthId);
    if (monthProgress === 0) return 'not-started';
    if (monthProgress === 100) return 'complete';
    return 'in-progress';
  };

  const resetProgress = async () => {
    // Set flag to skip the next debounced save
    skipNextSave.current = true;
    setProgress(initialCurriculumData);

    if (user) {
      try {
        await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', user.id);
        toast.success('Progress reset successfully');
      } catch (error) {
        console.error('Error resetting progress:', error);
        toast.error('Failed to reset progress');
      }
    }
  };

  // Toggle Course Project completion
  const toggleCourseProject = (projectId: string) => {
    setProgress((prev) => {
      if (!prev.courseProjects) return prev;

      return {
        ...prev,
        courseProjects: prev.courseProjects.map((project) =>
          project.id === projectId
            ? { ...project, completed: !project.completed }
            : project
        ),
      };
    });
  };

  // Add a new daily task to a week
  const addDailyTask = (weekId: string, topic: string, day: string = 'Custom') => {
    const newTask: DailyTask = {
      id: `task-custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      day,
      topic,
      hours: 0,
      completed: false,
      notes: '',
    };

    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? { ...week, dailyTasks: [...week.dailyTasks, newTask] }
            : week
        ),
      })),
    }));
    toast.success('Task added successfully');
  };

  // Remove a daily task from a week
  const removeDailyTask = (weekId: string, taskId: string) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? { ...week, dailyTasks: week.dailyTasks.filter((t) => t.id !== taskId) }
            : week
        ),
      })),
    }));
    toast.success('Task removed successfully');
  };

  // Add a new project task to a week
  const addProjectTask = (weekId: string, description: string) => {
    const newTask: ProjectTask = {
      id: `project-task-custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      description,
      completed: false,
    };

    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              project: {
                ...week.project,
                tasks: [...week.project.tasks, newTask],
              },
            }
            : week
        ),
      })),
    }));
    toast.success('Project task added successfully');
  };

  // Remove a project task from a week
  const removeProjectTask = (weekId: string, taskId: string) => {
    setProgress((prev) => ({
      ...prev,
      months: prev.months.map((month) => ({
        ...month,
        weeks: month.weeks.map((week) =>
          week.id === weekId
            ? {
              ...week,
              project: {
                ...week.project,
                tasks: week.project.tasks.filter((t) => t.id !== taskId),
              },
            }
            : week
        ),
      })),
    }));
    toast.success('Project task removed successfully');
  };

  // Add a new milestone
  const addMilestone = (title: string, month: number) => {
    const newMilestone = {
      id: `milestone-custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      month,
      title,
      items: [],
    };

    setProgress((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }));
    toast.success('Milestone added successfully');
  };

  // Remove a milestone
  const removeMilestone = (milestoneId: string) => {
    setProgress((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== milestoneId),
    }));
    toast.success('Milestone removed successfully');
  };

  // Add a new item to a milestone (subtask)
  const addMilestoneItem = (milestoneId: string, text: string) => {
    const newItem = {
      id: `milestone-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      completed: false,
    };

    setProgress((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, items: [...milestone.items, newItem] }
          : milestone
      ),
    }));
    toast.success('Milestone item added successfully');
  };

  // Remove an item from a milestone
  const removeMilestoneItem = (milestoneId: string, itemId: string) => {
    setProgress((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, items: milestone.items.filter((item) => item.id !== itemId) }
          : milestone
      ),
    }));
    toast.success('Milestone item removed successfully');
  };

  // Update milestone title
  const updateMilestoneTitle = (milestoneId: string, title: string) => {
    setProgress((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, title }
          : milestone
      ),
    }));
  };

  return {
    progress,
    loading,
    saving,
    toggleDailyTask,
    toggleProjectTask,
    toggleMilestoneItem,
    toggleCourseProject,
    updateDailyHours,
    updateNotes,
    updateReflection,
    getWeekProgress,
    getMonthProgress,
    getOverallProgress,
    getTotalHours,
    getMonthStatus,
    resetProgress,
    // Customization functions
    addDailyTask,
    removeDailyTask,
    addProjectTask,
    removeProjectTask,
    addMilestone,
    removeMilestone,
    addMilestoneItem,
    removeMilestoneItem,
    updateMilestoneTitle,
  };
};
