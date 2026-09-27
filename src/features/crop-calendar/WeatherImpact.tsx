import { CloudRain, Droplets, ThermometerSun } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CropSchedule } from './types';

export function WeatherImpact({ weather }: { weather: CropSchedule['weather'] }) {
  const metrics = [[ThermometerSun, `${weather.temperature}°C`, 'Temperature'], [Droplets, `${weather.humidity}%`, 'Humidity'], [CloudRain, `${weather.rainProbability}%`, 'Rain probability']] as const;
  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-white/90 to-emerald-50/80 p-5 shadow-[0_16px_45px_-28px_rgba(16,100,58,.55)] backdrop-blur-xl dark:border-emerald-900/70 dark:from-slate-900/90 dark:to-emerald-950/50">
    <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-600">Weather impact</p><h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Field conditions</h3></div><span className="text-2xl" aria-hidden="true">🌤</span></div>
    <div className="grid grid-cols-3 gap-2">{metrics.map(([Icon, value, label]) => <div key={label} className="rounded-2xl bg-white/75 p-3 text-center dark:bg-slate-950/30"><Icon className="mx-auto mb-2 h-4 w-4 text-emerald-600" /><strong className="block text-sm text-slate-900 dark:text-white">{value}</strong><span className="text-[11px] text-slate-500">{label}</span></div>)}</div>
    <p className="mt-4 rounded-2xl border border-amber-200/70 bg-amber-50/75 p-3 text-sm leading-6 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">{weather.suggestion}</p>
  </motion.section>;
}
