import { useState } from "react";
import { Trophy, Plus, Trash2 } from "lucide-react";
import { Milestone } from "@/data/curriculumData";
import { TaskCheckbox } from "./TaskCheckbox";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MilestoneSectionProps {
  milestones: Milestone[];
  onToggleItem: (milestoneId: string, itemId: string) => void;
  onAddMilestone?: (title: string, month: number) => void;
  onRemoveMilestone?: (milestoneId: string) => void;
  onAddMilestoneItem?: (milestoneId: string, text: string) => void;
  onRemoveMilestoneItem?: (milestoneId: string, itemId: string) => void;
}

export const MilestoneSection = ({
  milestones,
  onToggleItem,
  onAddMilestone,
  onRemoveMilestone,
  onAddMilestoneItem,
  onRemoveMilestoneItem,
}: MilestoneSectionProps) => {
  const [showAddMilestoneDialog, setShowAddMilestoneDialog] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneMonth, setNewMilestoneMonth] = useState("1");
  const [addingItemToMilestone, setAddingItemToMilestone] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState("");

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim() && onAddMilestone) {
      onAddMilestone(newMilestoneTitle.trim(), parseInt(newMilestoneMonth));
      setNewMilestoneTitle("");
      setNewMilestoneMonth("1");
      setShowAddMilestoneDialog(false);
    }
  };

  const handleAddItem = (milestoneId: string) => {
    if (newItemText.trim() && onAddMilestoneItem) {
      onAddMilestoneItem(milestoneId, newItemText.trim());
      setNewItemText("");
      setAddingItemToMilestone(null);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-card border border-border shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            Milestone Checklist
          </h2>
        </div>
        {onAddMilestone && (
          <Dialog open={showAddMilestoneDialog} onOpenChange={setShowAddMilestoneDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
                <DialogDescription>
                  Create a new milestone to track your progress
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="milestoneTitle" className="text-sm font-medium">
                    Milestone Title
                  </label>
                  <Input
                    id="milestoneTitle"
                    placeholder="Enter milestone title..."
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddMilestone()}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="milestoneMonth" className="text-sm font-medium">
                    Month
                  </label>
                  <Select value={newMilestoneMonth} onValueChange={setNewMilestoneMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Month 1</SelectItem>
                      <SelectItem value="2">Month 2</SelectItem>
                      <SelectItem value="3">Month 3</SelectItem>
                      <SelectItem value="4">Month 4</SelectItem>
                      <SelectItem value="5">Month 5</SelectItem>
                      <SelectItem value="6">Month 6 (Custom)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddMilestoneDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMilestone} disabled={!newMilestoneTitle.trim()}>
                  Add Milestone
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone) => {
          const completed = milestone.items.filter((item) => item.completed).length;
          const total = milestone.items.length;
          const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isCustom = milestone.id.includes('custom');

          return (
            <div
              key={milestone.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 group",
                progress === 100
                  ? "border-success/40 bg-success/5"
                  : "border-border/50 bg-secondary/30"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Month {milestone.month}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {completed}/{total}
                  </span>
                  {onRemoveMilestone && isCustom && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => onRemoveMilestone(milestone.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-medium text-foreground mb-2">{milestone.title}</h3>

              <ProgressBar progress={progress} size="sm" className="mb-3" />

              <div className="space-y-1">
                {milestone.items.map((item) => (
                  <div key={item.id} className="group/item flex items-center">
                    <div className="flex-1">
                      <TaskCheckbox
                        checked={item.completed}
                        onChange={() => onToggleItem(milestone.id, item.id)}
                        label={item.text}
                      />
                    </div>
                    {onRemoveMilestoneItem && item.id.includes('milestone-item') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        onClick={() => onRemoveMilestoneItem(milestone.id, item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {onAddMilestoneItem && (
                <>
                  {addingItemToMilestone === milestone.id ? (
                    <div className="mt-3 flex gap-2">
                      <Input
                        placeholder="New subtask..."
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddItem(milestone.id);
                          if (e.key === "Escape") setAddingItemToMilestone(null);
                        }}
                        className="h-7 text-xs"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleAddItem(milestone.id)}
                        disabled={!newItemText.trim()}
                      >
                        Add
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => {
                          setAddingItemToMilestone(null);
                          setNewItemText("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-6 px-2 text-xs w-full justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => setAddingItemToMilestone(milestone.id)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Subtask
                    </Button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
