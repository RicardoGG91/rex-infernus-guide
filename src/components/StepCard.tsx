import { Check, ChevronRight, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { GuideStep } from "@/data/guide";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

export function StepCard({ step }: { step: GuideStep }) {
  const { completedIds, favoriteIds, toggleFavorite } = useProgress();
  const isCompleted = completedIds.includes(step.id);
  const isFavorite = favoriteIds.includes(step.id);

  return (
    <article className="rounded-3xl border bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-base font-black", isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-primary")}>
          {isCompleted ? <Check className="h-5 w-5" /> : step.number}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Paso {step.number}</p>
          <h2 className="mt-1 text-lg font-black text-slate-950">{step.title}</h2>
          {step.location && <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-600"><MapPin className="h-4 w-4 text-primary" />{step.location}</p>}
        </div>
        <button onClick={() => toggleFavorite(step.id)} aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-primary hover:bg-blue-50">
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </button>
      </div>
      <Link to={`/guia/${step.id}`} className="mt-4 flex min-h-12 items-center justify-between rounded-2xl bg-blue-50 px-4 text-sm font-extrabold text-primary">
        Abrir paso <ChevronRight className="h-5 w-5" />
      </Link>
    </article>
  );
}
