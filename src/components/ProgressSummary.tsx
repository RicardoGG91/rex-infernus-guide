import { useProgress } from "@/context/ProgressContext";
import { guideContent } from "@/data/guide";

export function ProgressSummary({ compact = false }: { compact?: boolean }) {
  const { completedIds, completionPercent, pendingCount } = useProgress();

  return (
    <div className={compact ? "space-y-2" : "rounded-3xl border border-blue-100 bg-white p-5 shadow-sm"}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">Progreso total</p>
          {!compact && <p className="mt-1 text-3xl font-black text-slate-950">{completionPercent}%</p>}
        </div>
        <p className="text-sm font-extrabold text-primary">
          {completedIds.length}/{guideContent.steps.length} pasos
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Progreso total" aria-valuenow={completionPercent} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${completionPercent}%` }} />
      </div>
      {!compact && <p className="mt-3 text-sm font-semibold text-slate-600">{pendingCount} pasos pendientes</p>}
    </div>
  );
}
