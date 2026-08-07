import { CalendarDays, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { buildFallbackSchedule } from './fallbackSchedule';
import { CropProgressRing } from './CropProgressRing';
import { FarmingTips } from './FarmingTips';
import { StageTimeline } from './StageTimeline';
import { TodaysTasks } from './TodaysTasks';
import { WeatherImpact } from './WeatherImpact';
import type { CropCalendarProps, CropSchedule } from './types';

function CalendarSkeleton() { return <div className="animate-pulse space-y-5 rounded-3xl bg-emerald-50/70 p-6 dark:bg-slate-900"><div className="h-28 rounded-3xl bg-emerald-100 dark:bg-slate-800" /><div className="h-64 rounded-3xl bg-emerald-100 dark:bg-slate-800" /><div className="h-28 rounded-3xl bg-emerald-100 dark:bg-slate-800" /></div>; }

export function CropCalendar({ cropName, startDate, apiUrl, className = '', onTaskChange }: CropCalendarProps) {
  const [schedule, setSchedule] = useState<CropSchedule>();
  const [tasks, setTasks] = useState<CropSchedule['todayTasks']>([]);
  useEffect(() => { let cancelled = false; const fallback = buildFallbackSchedule(cropName, startDate ? new Date(startDate) : new Date()); async function load() { try { const response = apiUrl ? await fetch(`${apiUrl}?crop=${encodeURIComponent(cropName)}`) : null; const remote = response?.ok ? await response.json() as CropSchedule : fallback; if (!cancelled) { setSchedule(remote); setTasks(remote.todayTasks); } } catch { if (!cancelled) { setSchedule(fallback); setTasks(fallback.todayTasks); } } } load(); return () => { cancelled = true; }; }, [apiUrl, cropName, startDate]);
  if (!schedule) return <CalendarSkeleton />;
  const updateTask = (task: CropSchedule['todayTasks'][number]) => { setTasks(current => current.map(item => item.id === task.id ? task : item)); onTaskChange?.(task); };
  return <section aria-labelledby="crop-calendar-title" className={`rounded-[28px] border border-emerald-100/80 bg-white/80 p-4 shadow-[0_24px_80px_-45px_rgba(15,94,50,.45)] backdrop-blur-xl sm:p-6 dark:border-emerald-900/60 dark:bg-slate-950/75 ${className}`}>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"><div className="space-y-6"><motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between dark:from-emerald-950/50 dark:to-slate-900"><div className="flex gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none"><Sprout className="h-6 w-6" /></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-600">Selected crop</p><h1 id="crop-calendar-title" className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{schedule.cropName}</h1><p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><CalendarDays className="h-4 w-4" />Expected duration: {schedule.expectedDurationDays} days</p></div></div><CropProgressRing value={schedule.progress} /></motion.header><WeatherImpact weather={schedule.weather} /><StageTimeline stages={schedule.stages} /><FarmingTips tips={schedule.tips} /></div><div className="xl:pt-0"><TodaysTasks tasks={tasks} onChange={updateTask} /></div></div>
  </section>;
}
