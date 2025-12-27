export interface DailyTask {
  id: string;
  day: string;
  topic: string;
  hours: number;
  completed: boolean;
  notes: string;
}

export interface ProjectTask {
  id: string;
  description: string;
  completed: boolean;
}

export interface Week {
  id: string;
  weekNumber: number;
  title: string;
  startDate: string;
  endDate: string;
  dailyTasks: DailyTask[];
  project: {
    title: string;
    tasks: ProjectTask[];
    savePath: string;
  };
  reflection: {
    whatWentWell: string;
    whatToImprove: string;
    keyInsights: string;
  };
  isCapstone?: boolean;
}

export interface Month {
  id: string;
  monthNumber: number;
  title: string;
  focusArea: string;
  weeks: Week[];
  summary: {
    totalHours: number;
    skillsMastered: string;
    challengesOvercome: string;
  };
}

export interface Milestone {
  id: string;
  month: number;
  title: string;
  items: { id: string; text: string; completed: boolean }[];
}

export interface SkillAssessment {
  id: string;
  skill: string;
  month: number;
  initial: number;
  final: number;
}

// Course Projects - standalone projects from the course
export interface CourseProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  estimatedHours: number;
  completed: boolean;
  completedDate?: string;
}

export interface LearningProgress {
  startDate: string;
  targetCompletion: string;
  currentWeek: number;
  months: Month[];
  milestones: Milestone[];
  skills: SkillAssessment[];
  weeklyHoursLog: { week: number; target: number; actual: number; focus: string }[];
  courseProjects: CourseProject[];
}

const createDailyTasks = (topics: string[]): DailyTask[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return topics.map((topic, index) => ({
    id: `task-${days[index % 7]}-${Math.random().toString(36).substr(2, 9)}`,
    day: days[index % 7],
    topic,
    hours: 0,
    completed: false,
    notes: '',
  }));
};

const createProjectTasks = (tasks: string[]): ProjectTask[] => {
  return tasks.map((task, index) => ({
    id: `project-task-${index}-${Math.random().toString(36).substr(2, 9)}`,
    description: task,
    completed: false,
  }));
};

// ============================================================================
// Krish Naik - Complete Data Analyst Bootcamp From Basics To Advanced
// 48 sections, 541 lectures, ~89 hours
// Instructor: Krish Naik & KRISHAI Technologies Private Limited
// ============================================================================

export const initialCurriculumData: LearningProgress = {
  startDate: '2025-12-24',
  targetCompletion: '2026-05-31',
  currentWeek: 1,
  months: [
    // ========== MONTH 1: Python Fundamentals (Sections 1-12) ==========
    {
      id: 'month-1',
      monthNumber: 1,
      title: 'Python Programming Fundamentals',
      focusArea: 'Complete Python with Important Libraries',
      weeks: [
        {
          id: 'week-1',
          weekNumber: 1,
          title: 'Course Intro & Python Basics',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Introduction To The Course',
            'Getting Started With Python - Installation',
            'Python Basics - Syntax And Semantics',
            'Variables In Python',
            'Basic Data Types In Python',
            'Operators In Python (Arithmetic, Comparison)',
            'Operators In Python (Logical, Assignment)',
          ]),
          project: {
            title: 'Python Environment Setup',
            tasks: createProjectTasks([
              'Install Python/Anaconda successfully',
              'Set up IDE (VS Code/Jupyter)',
              'Write first Python program',
              'Practice variable assignments',
            ]),
            savePath: 'projects/week-1-python-setup/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-2',
          weekNumber: 2,
          title: 'Control Flow & Loops',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Conditional Statements - if Statement',
            'Conditional Statements - elif Statement',
            'Conditional Statements - else Statement',
            'Loops In Python - For Loops',
            'Loops In Python - While Loops',
            'Loop Control - break & continue',
            'Nested Loops Practice',
          ]),
          project: {
            title: 'Control Flow Projects',
            tasks: createProjectTasks([
              'Build a grade calculator',
              'Create number guessing game',
              'Implement multiplication tables',
              'Pattern printing exercises',
            ]),
            savePath: 'projects/week-2-control-flow/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-3',
          weekNumber: 3,
          title: 'Python Data Structures',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Lists In Python - Basics',
            'List Methods & Operations',
            'List Comprehension In Python',
            'Tuples In Python',
            'Sets In Python',
            'Dictionaries In Python - Basics',
            'Dictionary Methods & Operations',
          ]),
          project: {
            title: 'Data Structures Practice',
            tasks: createProjectTasks([
              'Contact book using dictionaries',
              'Shopping cart using lists',
              'Set operations exercises',
              'Data structure manipulation',
            ]),
            savePath: 'projects/week-3-data-structures/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-4',
          weekNumber: 4,
          title: 'Functions & Data Analysis Libraries',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Getting Started With Functions',
            'Function Parameters & Arguments',
            'Return Values & Scope',
            'Lambda Functions',
            'Data Analysis With Python - Intro',
            'NumPy Basics',
            'Pandas Basics',
          ]),
          project: {
            title: 'Python Fundamentals Capstone',
            tasks: createProjectTasks([
              'Build reusable utility functions',
              'Create data processing scripts',
              'First NumPy array operations',
              'First Pandas DataFrame operations',
            ]),
            savePath: 'projects/week-4-functions/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
          isCapstone: true,
        },
      ],
      summary: { totalHours: 0, skillsMastered: '', challengesOvercome: '' },
    },

    // ========== MONTH 2: Statistics & Feature Engineering (Sections 13-22) ==========
    {
      id: 'month-2',
      monthNumber: 2,
      title: 'Statistics & Feature Engineering',
      focusArea: 'Statistical Analysis & Data Preparation',
      weeks: [
        {
          id: 'week-5',
          weekNumber: 5,
          title: 'Descriptive Statistics',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Getting Started With Statistics',
            'Population vs Sample',
            'Measures of Central Tendency',
            'Mean, Median, Mode in Python',
            'Measures of Dispersion',
            'Variance & Standard Deviation',
            'Quartiles, Percentiles & IQR',
          ]),
          project: {
            title: 'Descriptive Stats Analysis',
            tasks: createProjectTasks([
              'Calculate all central tendencies',
              'Compute dispersion measures',
              'Create statistical summary',
              'Visualize distributions',
            ]),
            savePath: 'projects/week-5-descriptive-stats/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-6',
          weekNumber: 6,
          title: 'Probability & Distributions',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Probability Basics',
            'Probability Distribution Function',
            'Types Of Distribution - Normal',
            'Types Of Distribution - Binomial',
            'Types Of Distribution - Poisson',
            'Central Limit Theorem',
            'Z-scores & Standardization',
          ]),
          project: {
            title: 'Distribution Analysis',
            tasks: createProjectTasks([
              'Analyze data distributions',
              'Apply normal distribution',
              'Calculate probabilities',
              'Visualize different distributions',
            ]),
            savePath: 'projects/week-6-distributions/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-7',
          weekNumber: 7,
          title: 'Inferential Statistics',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Inferential Stats Introduction',
            'Hypothesis Testing Basics',
            'Null & Alternative Hypothesis',
            'Type I & Type II Errors',
            'T-Tests (One-sample, Two-sample)',
            'Chi-Square Tests',
            'ANOVA & P-values Interpretation',
          ]),
          project: {
            title: 'Hypothesis Testing Project',
            tasks: createProjectTasks([
              'Formulate hypotheses',
              'Perform t-tests',
              'Calculate and interpret p-values',
              'Make data-driven decisions',
            ]),
            savePath: 'projects/week-7-hypothesis/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-8',
          weekNumber: 8,
          title: 'Feature Engineering with Python',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Feature Engineering Introduction',
            'Handling Missing Data - Techniques',
            'Handling Missing Data - Implementation',
            'Encoding Categorical Variables',
            'One-Hot & Label Encoding',
            'Feature Scaling & Normalization',
            'Feature Selection Techniques',
          ]),
          project: {
            title: 'Feature Engineering Pipeline',
            tasks: createProjectTasks([
              'Handle missing values properly',
              'Encode all categorical features',
              'Apply feature scaling',
              'Build reusable preprocessing pipeline',
            ]),
            savePath: 'projects/week-8-feature-eng/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
          isCapstone: true,
        },
      ],
      summary: { totalHours: 0, skillsMastered: '', challengesOvercome: '' },
    },

    // ========== MONTH 3: EDA & SQL (Sections 23-33) ==========
    {
      id: 'month-3',
      monthNumber: 3,
      title: 'EDA & SQL Mastery',
      focusArea: 'Exploratory Data Analysis & Database Querying',
      weeks: [
        {
          id: 'week-9',
          weekNumber: 9,
          title: 'Exploratory Data Analysis',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'EDA Introduction & Importance',
            'Univariate Analysis',
            'Bivariate Analysis',
            'Multivariate Analysis',
            'EDA with Matplotlib',
            'EDA with Seaborn',
            'EDA Best Practices',
          ]),
          project: {
            title: 'Complete EDA Project',
            tasks: createProjectTasks([
              'Perform full EDA on dataset',
              'Create comprehensive visualizations',
              'Document key insights',
              'Generate EDA report',
            ]),
            savePath: 'projects/week-9-eda/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-10',
          weekNumber: 10,
          title: 'SQL Fundamentals',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'SQL Course Introduction & Overview',
            'Microsoft SQL Server Basics',
            'SELECT, FROM, WHERE Clauses',
            'ORDER BY & Sorting',
            'SQL Basics Questions Practice',
            'SQL Assignments - Part 1',
            'SQL Assignments - Part 2',
          ]),
          project: {
            title: 'SQL Basics Practice',
            tasks: createProjectTasks([
              'Set up SQL Server',
              'Write SELECT queries',
              'Practice filtering & sorting',
              'Complete SQL assignments',
            ]),
            savePath: 'projects/week-10-sql-basics/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-11',
          weekNumber: 11,
          title: 'SQL Functions & Aggregations',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'SQL Functions - String Functions',
            'SQL Functions - Date Functions',
            'SQL Functions - Numeric Functions',
            'Aggregate Functions (COUNT, SUM)',
            'Aggregate Functions (AVG, MIN, MAX)',
            'GROUP BY & HAVING',
            'SQL Functions Practice',
          ]),
          project: {
            title: 'SQL Functions Project',
            tasks: createProjectTasks([
              'Use string manipulation functions',
              'Work with date functions',
              'Apply aggregate functions',
              'Create grouped reports',
            ]),
            savePath: 'projects/week-11-sql-functions/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-12',
          weekNumber: 12,
          title: 'Advanced SQL',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'JOINs - INNER JOIN',
            'JOINs - LEFT, RIGHT, FULL OUTER',
            'Subqueries & Nested Queries',
            'CTE (Common Table Expressions)',
            'Recursive Common Table Expressions',
            'Stored Procedures & Views',
            'Indexes & Query Optimization',
          ]),
          project: {
            title: 'Advanced SQL Analytics',
            tasks: createProjectTasks([
              'Write complex JOIN queries',
              'Create and use CTEs',
              'Build stored procedures',
              'Optimize query performance',
            ]),
            savePath: 'projects/week-12-advanced-sql/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
          isCapstone: true,
        },
      ],
      summary: { totalHours: 0, skillsMastered: '', challengesOvercome: '' },
    },

    // ========== MONTH 4: Power BI (Sections 34-42) ==========
    {
      id: 'month-4',
      monthNumber: 4,
      title: 'Power BI Mastery',
      focusArea: 'Business Intelligence & Dashboards',
      weeks: [
        {
          id: 'week-13',
          weekNumber: 13,
          title: 'Power BI Fundamentals',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Power BI Course Introduction',
            'Introduction to Power BI',
            'Power BI Desktop Installation',
            'Connecting to Data Sources',
            'Power Query Editor Basics',
            'Data Transformations',
            'Creating Basic Visualizations',
          ]),
          project: {
            title: 'First Power BI Report',
            tasks: createProjectTasks([
              'Install Power BI Desktop',
              'Connect to data sources',
              'Transform data in Power Query',
              'Create basic charts',
            ]),
            savePath: 'projects/week-13-powerbi-basics/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-14',
          weekNumber: 14,
          title: 'Data Visualization & DAX',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Data Visualization Best Practices',
            'Chart Types & When to Use',
            'DAX Introduction',
            'DAX - Calculated Columns',
            'DAX - Measures',
            'DAX Functions (CALCULATE, FILTER)',
            'Time Intelligence in DAX',
          ]),
          project: {
            title: 'DAX Practice Project',
            tasks: createProjectTasks([
              'Create calculated columns',
              'Build custom measures',
              'Use CALCULATE function',
              'Implement time intelligence',
            ]),
            savePath: 'projects/week-14-dax/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-15',
          weekNumber: 15,
          title: 'Power BI Projects 1 & 2',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Power BI Project 1: Sales Data Analysis - Setup',
            'Project 1: Data Modeling',
            'Project 1: Creating Visualizations',
            'Project 1: Building Dashboard',
            'Power BI Project 2: Insurance Data Analysis - Setup',
            'Project 2: Analysis & Visualizations',
            'Project 2: Dashboard Completion',
          ]),
          project: {
            title: 'Sales & Insurance Dashboards',
            tasks: createProjectTasks([
              'Complete Sales Data Analysis dashboard',
              'Complete Insurance Data Analysis dashboard',
              'Apply professional styling',
              'Add interactivity features',
            ]),
            savePath: 'projects/week-15-powerbi-projects/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-16',
          weekNumber: 16,
          title: 'Power BI Project 3 & Advanced',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Power BI Project 3: UPI Transactions - Setup',
            'Project 3: Data Analysis',
            'Project 3: Dashboard Creation',
            'Miscellaneous Section Power BI',
            'Power BI Service & Publishing',
            'Creating GITHUB Account',
            'Uploading Power BI Projects to GITHUB',
          ]),
          project: {
            title: 'UPI Dashboard & Portfolio Setup',
            tasks: createProjectTasks([
              'Complete UPI Transactions dashboard',
              'Publish to Power BI Service',
              'Create GitHub account',
              'Upload all projects to GitHub',
            ]),
            savePath: 'projects/week-16-powerbi-advanced/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
          isCapstone: true,
        },
      ],
      summary: { totalHours: 0, skillsMastered: '', challengesOvercome: '' },
    },

    // ========== MONTH 5: Excel, Tableau, Snowflake & AI Projects (Sections 43-48) ==========
    {
      id: 'month-5',
      monthNumber: 5,
      title: 'Excel, Tableau, Snowflake & AI',
      focusArea: 'Additional BI Tools & Capstone Projects',
      weeks: [
        {
          id: 'week-17',
          weekNumber: 17,
          title: 'Microsoft Excel',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Getting Started with Microsoft Excel',
            'Excel Formulas & Functions',
            'Data Analysis in Excel',
            'Excel Dashboard 1 - Creation',
            'Excel Dashboard 1 - Completion',
            'Excel Dashboard 2',
            'Power Query Editor (MS Excel)',
          ]),
          project: {
            title: 'Excel Dashboards',
            tasks: createProjectTasks([
              'Create Excel Dashboard 1',
              'Create Excel Dashboard 2',
              'Use Power Query in Excel',
              'Connect Excel to SQL Server',
            ]),
            savePath: 'projects/week-17-excel/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-18',
          weekNumber: 18,
          title: 'Tableau',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Tableau Introduction',
            'Tableau Desktop Setup',
            'Connecting to Data in Tableau',
            'Tableau Visualizations',
            'Tableau Dashboard 1',
            'Tableau Dashboard 2',
            'Tableau Prep Builder',
          ]),
          project: {
            title: 'Tableau Dashboards',
            tasks: createProjectTasks([
              'Create Tableau Dashboard 1',
              'Create Tableau Dashboard 2',
              'Use Tableau Prep Builder',
              'SQL + Tableau Project: Student Depression Analysis',
            ]),
            savePath: 'projects/week-18-tableau/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-19',
          weekNumber: 19,
          title: 'Snowflake & Cloud Integration',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'Snowflake Introduction',
            'Getting Started with Snowflake',
            'Connecting Snowflake to Power BI',
            'Connecting Snowflake to Tableau',
            'AWS + Snowflake Integration',
            'AWS + Snowflake + Power BI Project',
            'AWS + Snowflake + Tableau Project',
          ]),
          project: {
            title: 'Cloud Data Analytics',
            tasks: createProjectTasks([
              'Set up Snowflake account',
              'Connect Snowflake to BI tools',
              'Complete AWS + Snowflake + Power BI project',
              'Complete AWS + Snowflake + Tableau project',
            ]),
            savePath: 'projects/week-19-snowflake/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
        },
        {
          id: 'week-20',
          weekNumber: 20,
          title: 'End-to-End Projects & AI Tools',
          startDate: '',
          endDate: '',
          dailyTasks: createDailyTasks([
            'New End to End Power BI Project - Dataflow',
            'Power BI Project - MySQL Database & SQL Server',
            'Power BI Project - Google Big Query',
            'Power BI Project - Azure SQL Database',
            'Projects Using AI Tools - Introduction',
            'AI Tools for Data Analysis',
            'Course Completion & Portfolio Review',
          ]),
          project: {
            title: 'Final Capstone Portfolio',
            tasks: createProjectTasks([
              'Complete Dataflow project',
              'Connect to Google Big Query',
              'Connect to Azure SQL Database',
              'Use AI tools for analysis',
              'Finalize GitHub portfolio',
              'Update resume with projects',
            ]),
            savePath: 'projects/week-20-capstone/',
          },
          reflection: { whatWentWell: '', whatToImprove: '', keyInsights: '' },
          isCapstone: true,
        },
      ],
      summary: { totalHours: 0, skillsMastered: '', challengesOvercome: '' },
    },
  ],
  milestones: [
    {
      id: 'milestone-1',
      month: 1,
      title: 'Python Fundamentals Complete',
      items: [
        { id: 'm1-1', text: 'Comfortable with Python syntax & semantics', completed: false },
        { id: 'm1-2', text: 'Master all Python data structures', completed: false },
        { id: 'm1-3', text: 'Can write functions & use libraries', completed: false },
        { id: 'm1-4', text: 'Started NumPy & Pandas basics', completed: false },
      ],
    },
    {
      id: 'milestone-2',
      month: 2,
      title: 'Statistics & Feature Engineering',
      items: [
        { id: 'm2-1', text: 'Understand descriptive statistics', completed: false },
        { id: 'm2-2', text: 'Can perform hypothesis testing', completed: false },
        { id: 'm2-3', text: 'Master feature engineering techniques', completed: false },
        { id: 'm2-4', text: 'Built preprocessing pipeline', completed: false },
      ],
    },
    {
      id: 'milestone-3',
      month: 3,
      title: 'EDA & SQL Expert',
      items: [
        { id: 'm3-1', text: 'Can perform complete EDA', completed: false },
        { id: 'm3-2', text: 'Proficient with SQL Server', completed: false },
        { id: 'm3-3', text: 'Master advanced SQL (CTEs, procedures)', completed: false },
        { id: 'm3-4', text: 'Completed SQL interview questions', completed: false },
      ],
    },
    {
      id: 'milestone-4',
      month: 4,
      title: 'Power BI Master',
      items: [
        { id: 'm4-1', text: 'Proficient with Power BI Desktop', completed: false },
        { id: 'm4-2', text: 'Master DAX calculations', completed: false },
        { id: 'm4-3', text: 'Completed 3 Power BI projects', completed: false },
        { id: 'm4-4', text: 'Projects uploaded to GitHub', completed: false },
      ],
    },
    {
      id: 'milestone-5',
      month: 5,
      title: 'Full Data Analyst Ready',
      items: [
        { id: 'm5-1', text: 'Proficient with Excel & dashboards', completed: false },
        { id: 'm5-2', text: 'Created Tableau dashboards', completed: false },
        { id: 'm5-3', text: 'Experience with Snowflake & cloud', completed: false },
        { id: 'm5-4', text: 'Portfolio complete & job-ready', completed: false },
      ],
    },
  ],
  skills: [
    { id: 'skill-1', skill: 'Python Basics', month: 1, initial: 0, final: 0 },
    { id: 'skill-2', skill: 'Python Data Structures', month: 1, initial: 0, final: 0 },
    { id: 'skill-3', skill: 'Functions & Libraries', month: 1, initial: 0, final: 0 },
    { id: 'skill-4', skill: 'Descriptive Statistics', month: 2, initial: 0, final: 0 },
    { id: 'skill-5', skill: 'Hypothesis Testing', month: 2, initial: 0, final: 0 },
    { id: 'skill-6', skill: 'Feature Engineering', month: 2, initial: 0, final: 0 },
    { id: 'skill-7', skill: 'EDA', month: 3, initial: 0, final: 0 },
    { id: 'skill-8', skill: 'SQL Basics', month: 3, initial: 0, final: 0 },
    { id: 'skill-9', skill: 'Advanced SQL', month: 3, initial: 0, final: 0 },
    { id: 'skill-10', skill: 'Power BI Basics', month: 4, initial: 0, final: 0 },
    { id: 'skill-11', skill: 'DAX', month: 4, initial: 0, final: 0 },
    { id: 'skill-12', skill: 'Power BI Projects', month: 4, initial: 0, final: 0 },
    { id: 'skill-13', skill: 'Microsoft Excel', month: 5, initial: 0, final: 0 },
    { id: 'skill-14', skill: 'Tableau', month: 5, initial: 0, final: 0 },
    { id: 'skill-15', skill: 'Snowflake & Cloud', month: 5, initial: 0, final: 0 },
  ],
  weeklyHoursLog: Array.from({ length: 20 }, (_, i) => ({
    week: i + 1,
    target: 5, // ~89 hours / 20 weeks ≈ 4.5 hours per week
    actual: 0,
    focus: '',
  })),
  courseProjects: [
    // Power BI Projects
    {
      id: 'project-powerbi-1',
      title: 'Sales Data Analysis Dashboard',
      category: 'Power BI',
      description: 'Complete sales data analysis with interactive visualizations, KPIs, and trend analysis',
      tools: ['Power BI', 'DAX', 'Power Query'],
      estimatedHours: 4,
      completed: false,
    },
    {
      id: 'project-powerbi-2',
      title: 'Insurance Data Analysis Dashboard',
      category: 'Power BI',
      description: 'Insurance claims analysis with customer segmentation and risk assessment visualizations',
      tools: ['Power BI', 'DAX', 'Power Query'],
      estimatedHours: 4,
      completed: false,
    },
    {
      id: 'project-powerbi-3',
      title: 'UPI Transactions Data Analysis',
      category: 'Power BI',
      description: 'Digital payment transaction analysis with volume trends, merchant insights, and user behavior',
      tools: ['Power BI', 'DAX', 'Power Query'],
      estimatedHours: 4,
      completed: false,
    },
    {
      id: 'project-powerbi-dataflow',
      title: 'Power BI Dataflow Project',
      category: 'Power BI',
      description: 'End-to-end project using Power BI Dataflow for data transformation and modeling',
      tools: ['Power BI', 'Dataflow', 'Power Query'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-powerbi-mysql',
      title: 'MySQL & SQL Server Integration',
      category: 'Power BI',
      description: 'Connect Power BI to MySQL Database and SQL Server for live data analysis',
      tools: ['Power BI', 'MySQL', 'SQL Server'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-powerbi-bigquery',
      title: 'Google Big Query Integration',
      category: 'Power BI',
      description: 'Connect Power BI to Google Big Query for cloud data analysis',
      tools: ['Power BI', 'Google Big Query', 'DAX'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-powerbi-azure',
      title: 'Azure SQL Database Integration',
      category: 'Power BI',
      description: 'Connect Power BI to Azure SQL Database for enterprise data analysis',
      tools: ['Power BI', 'Azure SQL', 'DAX'],
      estimatedHours: 3,
      completed: false,
    },
    // Excel Projects
    {
      id: 'project-excel-1',
      title: 'Excel Dashboard 1',
      category: 'Excel',
      description: 'Interactive Excel dashboard with pivot tables, charts, and conditional formatting',
      tools: ['Excel', 'Pivot Tables', 'Charts'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-excel-2',
      title: 'Excel Dashboard 2',
      category: 'Excel',
      description: 'Advanced Excel dashboard with data analysis and visualization',
      tools: ['Excel', 'Power Query', 'Charts'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-excel-sql',
      title: 'Excel Activity: Importing Data From SQL Server',
      category: 'Excel',
      description: 'Connect Excel to SQL Server and create reports with live data',
      tools: ['Excel', 'SQL Server', 'Power Query'],
      estimatedHours: 2,
      completed: false,
    },
    // Tableau Projects
    {
      id: 'project-tableau-1',
      title: 'Tableau Dashboard 1',
      category: 'Tableau',
      description: 'Interactive Tableau dashboard with various chart types and filters',
      tools: ['Tableau Desktop', 'Tableau Public'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-tableau-2',
      title: 'Tableau Dashboard 2',
      category: 'Tableau',
      description: 'Advanced Tableau dashboard with calculated fields and parameters',
      tools: ['Tableau Desktop', 'Tableau Public'],
      estimatedHours: 3,
      completed: false,
    },
    {
      id: 'project-tableau-sql',
      title: 'SQL + Tableau: Student Depression Data Analysis',
      category: 'Tableau',
      description: 'End-to-end analysis combining SQL queries with Tableau visualization',
      tools: ['Tableau', 'SQL Server', 'Data Analysis'],
      estimatedHours: 4,
      completed: false,
    },
    // Snowflake Projects
    {
      id: 'project-snowflake-powerbi',
      title: 'AWS + Snowflake + Power BI Project',
      category: 'Snowflake',
      description: 'Cloud data pipeline from AWS through Snowflake to Power BI visualization',
      tools: ['AWS', 'Snowflake', 'Power BI'],
      estimatedHours: 4,
      completed: false,
    },
    {
      id: 'project-snowflake-tableau',
      title: 'AWS + Snowflake + Tableau Project',
      category: 'Snowflake',
      description: 'Cloud data pipeline from AWS through Snowflake to Tableau visualization',
      tools: ['AWS', 'Snowflake', 'Tableau'],
      estimatedHours: 4,
      completed: false,
    },
    // AI Projects
    {
      id: 'project-ai-tools',
      title: 'Projects Using AI Tools',
      category: 'AI Tools',
      description: 'Data analysis projects leveraging AI tools for automation and insights',
      tools: ['ChatGPT', 'AI Tools', 'Python'],
      estimatedHours: 3,
      completed: false,
    },
    // GitHub Portfolio
    {
      id: 'project-github-portfolio',
      title: 'GitHub Portfolio Setup',
      category: 'Portfolio',
      description: 'Create GitHub account and upload all Power BI, Tableau, and Excel projects',
      tools: ['GitHub', 'Git', 'Documentation'],
      estimatedHours: 2,
      completed: false,
    },
  ],
};
