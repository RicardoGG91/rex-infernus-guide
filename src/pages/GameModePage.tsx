import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Lightbulb, MapPin, TriangleAlert } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyContent } from "@/components/EmptyContent";
import { ProgressSummary } from "@/components/ProgressSummary";
import { useProgress } from "@/context/ProgressContext";
import { getOrderedSteps, getStepById } from "@/data/guide";
import { cn } from "@/lib/utils";

export default function GameModePage() {
  const { stepId } = useParams();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const steps = getOrderedSteps();
  const { completedIds, nextPendingStepId, toggleCompleted, setLastVisitedStepId } = useProgress();
  const step = (stepId && getStepById(stepId)) || (nextPendingStepId && getStepById(nextPendingStepId)) || steps[0];

  useEffect(() => {
    if (step) setLastVisitedStepId(step.id);
    setDetailsOpen(false);
  }, [step?.id]);

  if (!step) {
    return (
      <div className="space-y-4">
        <header><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Modo Partida</p><h1 className="mt-2 text-3xl font-black text-slate-950">Listo para jugar</h1></header>
        <EmptyContent />
      </div>
    );
  }

  const index = steps.findIndex((item) => item.id === step.id);
  const previous = steps[index - 1];
  const next = steps[index + 1];
  const completed = completedIds.includes(step.id);

  return (
    <div className="space-y-4 pb-24">
      <header className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Modo Partida</p><h1 className="mt-1 text-xl font-black text-slate-950">Paso {step.number} · {step.title}</h1></div>
          <span className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-primary">{index + 1}/{steps.length}</span>
        </div>
        <div className="mt-4"><ProgressSummary compact /></div>
      </header>

      <section className="rounded-3xl border bg-white p-4 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Objetivo</p>
        <p className="mt-2 text-xl font-black leading-7 text-slate-950">{step.objective}</p>
      </section>

      <img src={step.mainImage ?? "/assets/image-placeholder.png"} alt={step.mainImage ? `Captura del paso ${step.number}` : "Captura real pendiente"} className="aspect-video w-full rounded-3xl border bg-slate-50 object-cover" />

      <section className="rounded-3xl border bg-white p-4 shadow-sm">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-950">Instrucciones esenciales</h2>
        <ol className="mt-3 space-y-3">{step.instructions.map((instruction, itemIndex) => <li key={instruction} className="flex gap-3 text-base font-bold leading-6 text-slate-800"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-black text-white">{itemIndex + 1}</span>{instruction}</li>)}</ol>
      </section>

      <button onClick={() => setDetailsOpen((open) => !open)} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white text-sm font-black text-primary">
        VER DETALLES {detailsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {detailsOpen && <section className="space-y-3 rounded-3xl border bg-white p-4">
        <p className="flex items-start gap-2 text-sm font-bold text-slate-700"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong>Ubicación:</strong> {step.location || "Pendiente de verificar"}</span></p>
        <p className="flex items-start gap-2 text-sm font-bold text-slate-700"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong>Consejo:</strong> {step.tip || "Sin consejo verificado"}</span></p>
        <p className="flex items-start gap-2 text-sm font-bold text-slate-700"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /><span><strong>Advertencia:</strong> {step.warning || "Sin advertencia verificada"}</span></p>
        <Link to={`/guia/${step.id}`} className="inline-flex min-h-11 items-center font-black text-primary">Abrir ficha completa</Link>
      </section>}

      <div className="fixed inset-x-0 bottom-[72px] z-40 border-t bg-white p-2 shadow-[0_-8px_24px_rgba(15,23,42,0.1)]">
        <div className="mx-auto grid max-w-3xl grid-cols-[1fr_1.25fr_1fr] gap-2">
          {previous ? <Link to={`/partida/${previous.id}`} className="flex min-h-14 items-center justify-center gap-1 rounded-2xl bg-slate-100 text-xs font-black text-slate-800"><ArrowLeft className="h-5 w-5" /> ANTERIOR</Link> : <span className="flex min-h-14 items-center justify-center rounded-2xl bg-slate-100 text-xs font-black text-slate-400">ANTERIOR</span>}
          <button onClick={() => toggleCompleted(step.id)} className={cn("flex min-h-14 items-center justify-center gap-1 rounded-2xl px-2 text-xs font-black text-white", completed ? "bg-emerald-600" : "bg-primary")}><Check className="h-5 w-5" /> {completed ? "HECHO" : "MARCAR"}</button>
          {next ? <Link to={`/partida/${next.id}`} className="flex min-h-14 items-center justify-center gap-1 rounded-2xl bg-blue-50 text-xs font-black text-primary">SIGUIENTE <ArrowRight className="h-5 w-5" /></Link> : <span className="flex min-h-14 items-center justify-center rounded-2xl bg-slate-100 text-xs font-black text-slate-400">SIGUIENTE</span>}
        </div>
      </div>
    </div>
  );
}
