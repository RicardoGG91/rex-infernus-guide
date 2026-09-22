import { Camera, FilePlus2 } from "lucide-react";
import { Link } from "react-router-dom";

export function EmptyContent({ compact = false }: { compact?: boolean }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
      {!compact && (
        <img
          src="/assets/image-placeholder.png"
          alt="Espacio reservado para una captura real"
          className="aspect-video w-full bg-slate-50 object-cover"
        />
      )}
      <div className="p-5 text-center">
        <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-primary">
          {compact ? <FilePlus2 className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
        </span>
        <h2 className="text-lg font-black text-slate-950">Contenido real pendiente</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-6 text-slate-600">
          No hay pasos publicados. Esta sección mostrará únicamente información y capturas verificadas.
        </p>
        <Link to="/" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-extrabold text-primary hover:bg-blue-50">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
