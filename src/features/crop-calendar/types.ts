export type CropStageStatus = 'completed' | 'active' | 'upcoming';

export type CropStage = {
  id: string;
  title: string;
  date: string;
  description: string;
  status: CropStageStatus;
};

export type CalendarTask = {
  id: string;
  title: string;
  dueTime: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
};

export type CropSchedule = {
  cropName: string;
  expectedDurationDays: number;
  progress: number;
  weather: { temperature: number; humidity: number; rainProbability: number; suggestion: string };
  stages: CropStage[];
  todayTasks: CalendarTask[];
  tips: string[];
};

export type CropCalendarProps = {
  cropName: string;
  startDate?: string | Date;
  apiUrl?: string;
  className?: string;
  onTaskChange?: (task: CalendarTask) => void;
};
