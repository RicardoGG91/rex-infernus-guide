import { Heart } from "lucide-react";
import { EmptyContent } from "@/components/EmptyContent";
import { StepCard } from "@/components/StepCard";
import { useProgress } from "@/context/ProgressContext";
import { getOrderedSteps } from "@/data/guide";

export default function FavoritesPage() {
  const { favoriteIds } = useProgress();
  const allSteps = getOrderedSteps();
  const favorites = allSteps.filter((step) => favoriteIds.includes(step.id));

  return (
    <div className="space-y-5">
      <header>
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"><Heart className="h-4 w-4" /> Acceso rápido</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Favoritos</h1>
      </header>
      {!allSteps.length ? <EmptyContent compact /> : favorites.length ? <div className="grid gap-3">{favorites.map((step) => <StepCard key={step.id} step={step} />)}</div> : <div className="rounded-3xl border bg-white p-8 text-center"><Heart className="mx-auto h-8 w-8 text-primary" /><h2 className="mt-3 font-black text-slate-950">Aún no hay favoritos</h2><p className="mt-2 text-sm text-slate-600">Marca un paso con el icono de corazón para guardarlo aquí.</p></div>}
    </div>
  );
}
