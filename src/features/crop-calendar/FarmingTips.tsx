import { Lightbulb } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FarmingTips({ tips }: { tips: string[] }) {
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setTipIndex(index => (index + 1) % tips.length), 6000); return () => window.clearInterval(timer); }, [tips.length]);
  return <section aria-label="Farming tips" className="rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-600 p-5 text-white shadow-[0_18px_45px_-28px_rgba(5,95,52,.75)]"><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/15"><Lightbulb className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-100">Farming tip</p><AnimatePresence mode="wait"><motion.p key={tipIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 text-base font-medium leading-6">{tips[tipIndex]}</motion.p></AnimatePresence></div></div></section>;
}
