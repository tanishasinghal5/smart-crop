import { motion } from 'framer-motion';

export function CropProgressRing({ value }: { value: number }) {
  const radius = 42; const circumference = 2 * Math.PI * radius;
  return <div className="relative grid h-28 w-28 place-items-center" aria-label={`${value}% of crop duration complete`}>
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90"><circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-emerald-100 dark:text-emerald-950" />
      <motion.circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="8" className="text-emerald-500" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: circumference * (1 - value / 100) }} transition={{ duration: 1.15, ease: 'easeOut' }} />
    </svg><div className="absolute text-center"><strong className="block text-xl font-bold text-slate-900 dark:text-white">{value}%</strong><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">complete</span></div>
  </div>;
}
