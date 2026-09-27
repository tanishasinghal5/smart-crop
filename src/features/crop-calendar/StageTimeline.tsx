import { Check, CircleDot, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CropStage } from './types';

const stageIcon = (status: CropStage['status']) => status === 'completed' ? Check : status === 'active' ? CircleDot : Sprout;

export function StageTimeline({ stages }: { stages: CropStage[] }) {
  return <section aria-labelledby="calendar-timeline" className="relative"><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-600">Growing journey</p><h2 id="calendar-timeline" className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Crop timeline</h2></div><span className="text-sm text-slate-500">Scroll to explore →</span></div>
    <div className="relative overflow-x-auto pb-5"><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.25, ease: 'easeOut' }} className="absolute left-12 right-12 top-8 h-px origin-left bg-emerald-300 dark:bg-emerald-800" />
      <ol className="relative flex min-w-max gap-4 px-1">{stages.map((stage, index) => { const Icon = stageIcon(stage.status); const active = stage.status === 'active'; return <motion.li key={stage.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }} className="w-60 pt-2"><motion.article whileHover={{ y: -5, scale: 1.03 }} className={`relative min-h-56 rounded-3xl border p-5 shadow-[0_14px_35px_-24px_rgba(20,82,45,.7)] backdrop-blur ${active ? 'border-emerald-400 bg-emerald-50/85 ring-4 ring-emerald-100 dark:border-emerald-500 dark:bg-emerald-950/60 dark:ring-emerald-900/50' : 'border-white/80 bg-white/75 dark:border-slate-700/60 dark:bg-slate-900/75'}`}>
        <span className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl ${stage.status === 'completed' ? 'bg-emerald-600 text-white' : active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-300/60' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'}`}><Icon className="h-5 w-5" /></span>
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{stage.date}</p><h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">{stage.title}</h3><p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{stage.description}</p><span className={`absolute bottom-4 right-4 text-xs font-bold ${active ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-400'}`}>{stage.status === 'completed' ? 'Completed' : active ? 'In progress' : 'Upcoming'}</span>
      </motion.article></motion.li>; })}</ol>
    </div>
  </section>;
}
