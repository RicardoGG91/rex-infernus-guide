import { BookOpen, ChevronRight, Heart, Map, Play, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressSummary } from "@/components/ProgressSummary";
import { useProgress } from "@/context/ProgressContext";
import { getOrderedSteps } from "@/data/guide";

const secondaryActions = [
  { to: "/guia", label: "Guía completa", icon: BookOpen },
  { to: "/solvers", label: "Solvers", icon: Sparkles },
  { to: "/mapa", label: "Mapa externo", icon: Map },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
];

export default function Index() {
  const steps = getOrderedSteps();
  const { nextPendingStepId, lastVisitedStepId } = useProgress();
  const startId = nextPendingStepId ?? steps[0]?.id;
  const continueId = lastVisitedStepId ?? startId;

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] border border-blue-100 bg-blue-50 p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <img src="/assets/rex-infernus-logo.png" alt="" className="h-20 w-20 rounded-3xl border-4 border-white object-cover shadow-sm" />
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Contenido verificado
            </span>
            <h1 className="mt-2 text-3xl font-black leading-none tracking-tight text-slate-950">Rex Infernus<br />Guide</h1>
          </div>
        </div>
        <p className="mt-5 max-w-md text-base font-semibold leading-6 text-slate-700">
          Guía de la misión principal de Black Ops 7 Zombies, con 17 fases, fuentes auditables y cuatro herramientas de puzzle.
        </p>
      </section>

      <ProgressSummary />

      <section className="grid gap-3">
        {startId ? (
          <Link to={`/partida/${startId}`} className="flex min-h-16 items-center justify-between rounded-2xl bg-primary px-5 text-base font-black text-white shadow-[0_8px_24px_rgba(21,101,192,0.22)]">
            <span className="flex items-center gap-3"><Play className="h-6 w-6 fill-current" /> Empezar</span>
            <ChevronRight className="h-6 w-6" />
          </Link>
        ) : (
          <div className="flex min-h-16 items-center rounded-2xl bg-slate-200 px-5 text-base font-black text-slate-500" aria-disabled="true">
            <Play className="mr-3 h-6 w-6" /> Empezar — sin pasos
          </div>
        )}
        {continueId ? (
          <Link to={`/partida/${continueId}`} className="flex min-h-14 items-center justify-between rounded-2xl border-2 border-primary bg-white px-5 text-base font-black text-primary">
            Continuar partida <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <div className="flex min-h-14 items-center rounded-2xl border-2 border-slate-200 bg-white px-5 text-base font-black text-slate-400" aria-disabled="true">Continuar partida</div>
        )}
      </section>

      <section className="grid grid-cols-2 gap-3" aria-label="Accesos rápidos">
        {secondaryActions.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex min-h-24 flex-col justify-between rounded-2xl border bg-white p-4 font-extrabold text-slate-900 shadow-sm hover:border-blue-200 hover:bg-blue-50/40">
            <Icon className="h-6 w-6 text-primary" />
            <span className="flex items-center justify-between gap-2">{label}<ChevronRight className="h-4 w-4 text-slate-400" /></span>
          </Link>
        ))}
      </section>

      <p className="px-2 text-center text-xs font-semibold leading-5 text-slate-500">
        Información contrastada el 22/09/2026. Las imágenes son material promocional oficial atribuido; las capturas editoriales de terceros no se reproducen.
      </p>
    </div>
  );
}
