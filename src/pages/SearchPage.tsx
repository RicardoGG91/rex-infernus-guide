import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EmptyContent } from "@/components/EmptyContent";
import { StepCard } from "@/components/StepCard";
import { getOrderedSteps } from "@/data/guide";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const steps = getOrderedSteps();
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    if (!normalized) return steps;
    return steps.filter((step) => [step.title, step.description, step.objective, step.location, ...step.requirements, ...step.instructions, ...step.searchTags].join(" ").toLocaleLowerCase("es").includes(normalized));
  }, [query, steps]);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Consulta rápida</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Buscar</h1>
      </header>
      <label className="flex h-14 items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 focus-within:border-primary">
        <Search className="h-5 w-5 shrink-0 text-primary" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Paso, ubicación, objeto..." className="h-full min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-slate-400" />
      </label>
      {!steps.length ? <EmptyContent compact /> : results.length ? <div className="grid gap-3">{results.map((step) => <StepCard key={step.id} step={step} />)}</div> : <div className="rounded-3xl border bg-white p-8 text-center"><p className="font-black text-slate-950">Sin resultados</p><p className="mt-2 text-sm text-slate-600">Prueba con otra palabra clave.</p></div>}
    </div>
  );
}
