import type { CropSchedule, CropStage, CropStageStatus } from './types';

const stageBlueprint = [
  ['land', 'Land Preparation', 0, 'Level the field, add organic matter, and prepare drainage.'],
  ['sowing', 'Seed Sowing', 7, 'Use healthy seed at the recommended spacing and depth.'],
  ['irrigation', 'First Irrigation', 18, 'Maintain even moisture while seedlings establish.'],
  ['fertilizer', 'Fertilizer Application', 30, 'Apply the recommended nutrient dose after checking soil moisture.'],
  ['weed', 'Weed Control', 43, 'Remove competing weeds before they affect crop growth.'],
  ['pest', 'Pest Inspection', 60, 'Scout leaves and stems early for pest or disease symptoms.'],
  ['flowering', 'Flowering Stage', 82, 'Avoid moisture stress and observe pollinator activity.'],
  ['harvest', 'Harvest', 120, 'Harvest at maturity and dry produce before storage.'],
] as const;

const dateLabel = (date: Date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(date);

export function buildFallbackSchedule(cropName: string, startDate: Date = new Date()): CropSchedule {
  const today = new Date();
  const elapsed = Math.max(0, Math.min(120, Math.round((today.getTime() - startDate.getTime()) / 86400000)));
  const stages: CropStage[] = stageBlueprint.map(([id, title, offset, description], index) => {
    const date = new Date(startDate); date.setDate(date.getDate() + offset);
    const status: CropStageStatus = elapsed >= offset + 7 ? 'completed' : elapsed >= offset ? 'active' : 'upcoming';
    return { id, title, date: dateLabel(date), description, status };
  });
  return {
    cropName,
    expectedDurationDays: 120,
    progress: Math.max(4, Math.round((elapsed / 120) * 100)),
    weather: { temperature: 29, humidity: 71, rainProbability: 68, suggestion: 'Rain expected tomorrow. Delay fertilizer application until the field is not waterlogged.' },
    stages,
    todayTasks: [
      { id: 'irrigate', title: 'Irrigate field', dueTime: '06:30 AM', priority: 'High', completed: false },
      { id: 'pests', title: 'Inspect for pests', dueTime: '08:00 AM', priority: 'Medium', completed: false },
      { id: 'nitrogen', title: 'Apply nitrogen fertilizer', dueTime: '04:30 PM', priority: 'High', completed: false },
    ],
    tips: [
      'Irrigating early in the morning reduces evaporation losses.',
      'Inspect the underside of leaves—early pest signs often appear there first.',
      'Record each field activity; it makes the next season’s plan more accurate.',
    ],
  };
}
