import { Briefcase, Code, Database, Table } from "lucide-react";
import { CourseProject } from "@/data/curriculumData";
import { TaskCheckbox } from "./TaskCheckbox";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
    projects: CourseProject[];
    onToggleProject: (projectId: string) => void;
}

export const ProjectsSection = ({ projects, onToggleProject }: ProjectsSectionProps) => {
    // Group projects by category
    const groupedProjects = projects.reduce((acc, project) => {
        if (!acc[project.category]) {
            acc[project.category] = [];
        }
        acc[project.category].push(project);
        return acc;
    }, {} as Record<string, CourseProject[]>);

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'power bi':
            case 'tableau':
            case 'excel':
                return <Table className="w-4 h-4" />;
            case 'snowflake':
            case 'sql':
                return <Database className="w-4 h-4" />;
            case 'ai tools':
            case 'python':
                return <Code className="w-4 h-4" />;
            default:
                return <Briefcase className="w-4 h-4" />;
        }
    };

    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <div className="p-6 rounded-2xl bg-gradient-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-accent" />
                <h2 className="font-display font-semibold text-lg text-foreground">
                    Course Projects Portfolio
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
                    <div key={category} className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                            {getCategoryIcon(category)}
                            {category}
                        </h3>
                        <div className="space-y-3">
                            {categoryProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all duration-200",
                                        project.completed
                                            ? "border-success/40 bg-success/5"
                                            : "border-border/50 bg-secondary/30"
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1 space-y-2">
                                            <TaskCheckbox
                                                checked={project.completed}
                                                onChange={() => onToggleProject(project.id)}
                                                label={project.title}
                                                sublabel={project.description}
                                            />
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground pl-7">
                                                <span className="bg-secondary px-2 py-0.5 rounded text-xs border border-border/50">
                                                    {project.estimatedHours}h
                                                </span>
                                                <div className="flex gap-1 flex-wrap">
                                                    {project.tools.slice(0, 3).map((tool) => (
                                                        <span key={tool} className="text-xs opacity-70">
                                                            • {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
