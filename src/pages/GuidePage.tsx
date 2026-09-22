import { BookOpen } from "lucide-react";
import { EmptyContent } from "@/components/EmptyContent";
import { StepCard } from "@/components/StepCard";
import { getOrderedSteps } from "@/data/guide";

export default function GuidePage() {
  const steps = getOrderedSteps();

  return (
    <div className="space-y-5">
      <header>
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"><BookOpen className="h-4 w-4" /> Recorrido completo</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Guía paso a paso</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">17 fases contrastadas para la misión principal estándar de Black Ops 7 Zombies.</p>
      </header>
      {steps.length ? <div className="grid gap-3">{steps.map((step) => <StepCard key={step.id} step={step} />)}</div> : <EmptyContent />}
    </div>
  );
}
