import { useRef, useState } from "react";
import { ExternalLink, LocateFixed, Map, Minus, Plus, X } from "lucide-react";
import { getOrderedSteps, GuideStep } from "@/data/guide";

export default function MapPage() {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState<GuideStep | null>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const markers = getOrderedSteps().filter((step) => step.markerCoordinates);

  const reset = () => { setScale(1); setPan({ x: 0, y: 0 }); };

  return (
    <div className="space-y-4">
      <header>
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"><Map className="h-4 w-4" /> Ubicaciones</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Mapa</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">No copiamos mapas de terceros sin licencia. Usa la referencia interactiva externa para ubicaciones exactas; el lienzo inferior sigue siendo solo técnico.</p>
        <a href="https://codzombiesguides.com/maps/rex-infernus/" target="_blank" rel="noreferrer" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-black text-white">Abrir mapa interactivo fiable <ExternalLink className="h-4 w-4" /></a>
      </header>

      <section className="relative overflow-hidden rounded-3xl border-2 border-blue-100 bg-slate-100 shadow-sm">
        <div
          className="relative aspect-square touch-none cursor-grab overflow-hidden active:cursor-grabbing"
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }; }}
          onPointerMove={(event) => { if (drag.current) setPan({ x: drag.current.panX + event.clientX - drag.current.x, y: drag.current.panY + event.clientY - drag.current.y }); }}
          onPointerUp={() => { drag.current = null; }}
          onPointerCancel={() => { drag.current = null; }}
        >
          <div className="absolute inset-0 origin-center" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}>
            <img src="/assets/map-placeholder.png" alt="Lienzo técnico provisional, no es el mapa real del juego" draggable={false} className="h-full w-full select-none object-cover" />
            {markers.map((step) => step.markerCoordinates && <button key={step.id} onClick={(event) => { event.stopPropagation(); setSelected(step); }} className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-primary text-xs font-black text-white shadow-lg" style={{ left: `${step.markerCoordinates.x}%`, top: `${step.markerCoordinates.y}%` }} aria-label={`Ver marcador del paso ${step.number}`}>{step.number}</button>)}
          </div>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-xl bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-red-700 shadow-sm">No es el mapa real</span>
        <div className="absolute bottom-3 right-3 grid gap-2">
          <button onClick={() => setScale((value) => Math.min(3, value + 0.25))} aria-label="Ampliar mapa" className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-md"><Plus className="h-5 w-5" /></button>
          <button onClick={() => setScale((value) => Math.max(0.75, value - 0.25))} aria-label="Reducir mapa" className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-md"><Minus className="h-5 w-5" /></button>
          <button onClick={reset} aria-label="Centrar mapa" className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white shadow-md"><LocateFixed className="h-5 w-5" /></button>
        </div>
      </section>

      <div className="flex items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm"><span className="font-bold text-slate-600">Zoom</span><span className="font-black text-primary">{Math.round(scale * 100)}%</span></div>
      {!markers.length && <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-950"><strong>Sin marcadores.</strong> Aparecerán automáticamente cuando los pasos verificados incluyan coordenadas.</div>}

      {selected && <div className="rounded-3xl border bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-wider text-primary">Paso {selected.number}</p><h2 className="mt-1 text-lg font-black text-slate-950">{selected.title}</h2><p className="mt-2 text-sm font-semibold text-slate-600">{selected.location}</p></div><button onClick={() => setSelected(null)} aria-label="Cerrar información" className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X className="h-5 w-5" /></button></div></div>}
    </div>
  );
}
