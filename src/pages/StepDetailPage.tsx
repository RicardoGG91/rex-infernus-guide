import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Heart, Lightbulb, MapPin, TriangleAlert, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyContent } from "@/components/EmptyContent";
import { useProgress } from "@/context/ProgressContext";
import { getOrderedSteps, getStepById } from "@/data/guide";
import { cn } from "@/lib/utils";

export default function StepDetailPage() {
  const { stepId = "" } = useParams();
  const step = getStepById(stepId);
  const steps = getOrderedSteps();
  const { completedIds, favoriteIds, toggleCompleted, toggleFavorite, setLastVisitedStepId } = useProgress();

  useEffect(() => {
    if (step) setLastVisitedStepId(step.id);
  }, [step?.id]);

  if (!step) return <EmptyContent />;

  const index = steps.findIndex((item) => item.id === step.id);
  const previous = steps[index - 1];
  const next = steps[index + 1];
  const completed = completedIds.includes(step.id);
  const favorite = favoriteIds.includes(step.id);

  return (
    <article className="space-y-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Paso {step.number} de {steps.length}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{step.title}</h1>
        </div>
        <button onClick={() => toggleFavorite(step.id)} aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-white text-primary">
          <Heart className={cn("h-5 w-5", favorite && "fill-current")} />
        </button>
      </header>

      <img src={step.mainImage ?? "/assets/image-placeholder.png"} alt={step.mainImage ? `Captura del paso ${step.number}` : "Captura real pendiente"} className="aspect-video w-full rounded-3xl border bg-slate-50 object-cover" />

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Objetivo</p>
        <p className="mt-2 text-xl font-black leading-7 text-slate-950">{step.objective}</p>
        {step.location && <p className="mt-4 flex items-start gap-2 text-sm font-bold text-slate-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{step.location}</p>}
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Instrucciones</h2>
        <ol className="mt-4 space-y-3">{step.instructions.map((instruction, itemIndex) => <li key={instruction} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-primary">{itemIndex + 1}</span>{instruction}</li>)}</ol>
      </section>

      <div className="grid gap-3">
        {step.tip && <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-950"><p className="mb-1 flex items-center gap-2 font-black"><Lightbulb className="h-4 w-4" /> Consejo</p>{step.tip}</div>}
        {step.warning && <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-950"><p className="mb-1 flex items-center gap-2 font-black"><TriangleAlert className="h-4 w-4" /> Advertencia</p>{step.warning}</div>}
        {step.commonError && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-950"><p className="mb-1 flex items-center gap-2 font-black"><XCircle className="h-4 w-4" /> Error común</p>{step.commonError}</div>}
      </div>

      {step.approximateDuration && <p className="flex items-center gap-2 text-sm font-bold text-slate-600"><Clock className="h-4 w-4 text-primary" /> Duración aproximada: {step.approximateDuration}</p>}

      <button onClick={() => toggleCompleted(step.id)} className={cn("flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl px-5 text-base font-black", completed ? "bg-emerald-600 text-white" : "bg-primary text-white")}>
        <Check className="h-6 w-6" /> {completed ? "✓ COMPLETADO" : "○ MARCAR COMO COMPLETADO"}
      </button>

      <div className="grid grid-cols-2 gap-3">
        {previous ? <Link to={`/guia/${previous.id}`} className="flex min-h-13 items-center justify-center gap-2 rounded-2xl border-2 bg-white font-black text-slate-800"><ArrowLeft className="h-5 w-5" /> Anterior</Link> : <span className="flex min-h-13 items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-400">Anterior</span>}
        {next ? <Link to={`/guia/${next.id}`} className="flex min-h-13 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-white font-black text-primary">Siguiente <ArrowRight className="h-5 w-5" /></Link> : <span className="flex min-h-13 items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-400">Siguiente</span>}
      </div>
    </article>
  );
}
