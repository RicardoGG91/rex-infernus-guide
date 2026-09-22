import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="rounded-3xl border bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-black uppercase tracking-widest text-primary">Error 404</p>
      <h1 className="mt-3 text-3xl font-black text-slate-950">Página no encontrada</h1>
      <p className="mt-3 text-sm font-medium text-slate-600">La sección que buscas no existe.</p>
      <Link to="/" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-primary px-5 font-black text-white"><Home className="h-5 w-5" /> Ir al inicio</Link>
    </div>
  );
}
