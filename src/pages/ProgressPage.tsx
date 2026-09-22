import { RotateCcw, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressSummary } from "@/components/ProgressSummary";
import { useProgress } from "@/context/ProgressContext";
import { guideContent } from "@/data/guide";

export default function ProgressPage() {
  const { completedIds, pendingCount, nextPendingStepId, resetProgress } = useProgress();

  return (
    <div className="space-y-5">
      <header>
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"><Target className="h-4 w-4" /> Estado de la partida</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Tu progreso</h1>
      </header>
      <ProgressSummary />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border bg-white p-4"><p className="text-3xl font-black text-emerald-600">{completedIds.length}</p><p className="mt-1 text-sm font-bold text-slate-600">Completados</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="text-3xl font-black text-primary">{pendingCount}</p><p className="mt-1 text-sm font-bold text-slate-600">Pendientes</p></div>
      </div>
      {nextPendingStepId ? <Link to={`/partida/${nextPendingStepId}`} className="flex min-h-16 items-center justify-center rounded-2xl bg-primary px-5 text-base font-black text-white">CONTINUAR</Link> : <div className="flex min-h-16 items-center justify-center rounded-2xl bg-slate-200 px-5 text-center text-sm font-black text-slate-500">{guideContent.steps.length ? "Todos los pasos completados" : "Sin pasos disponibles"}</div>}
      <button onClick={resetProgress} disabled={!completedIds.length} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-200 bg-white font-black text-red-700 disabled:cursor-not-allowed disabled:opacity-40"><RotateCcw className="h-5 w-5" /> Reiniciar Easter Egg</button>
      <p className="text-center text-xs font-semibold text-slate-500">El progreso se guarda automáticamente en este dispositivo.</p>
    </div>
  );
}
