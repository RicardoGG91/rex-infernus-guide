import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, Compass, Flame, RotateCcw, Sparkles } from "lucide-react";
import { guideContent } from "@/data/guide";

const dravakarRiddles = [
  {
    id: "runner-stars",
    quote: "I remember the runner that travels to stars, while moons and galaxies stay true.",
    turns: [0, 2, 3],
    result: "Runner Oeste · Moon Norte · Galaxy Sur · Star Este",
  },
  {
    id: "runner-moons",
    quote: "I drift to the runner that travels moons, who borrow from galaxies when stars stay true.",
    turns: [3, 2, 1],
    result: "Runner Norte · Moon Sur · Galaxy Este · Star Oeste",
  },
  {
    id: "stars-moons",
    quote: "I drift to stars that remember moons, who borrow the runner that travels the galaxy.",
    turns: [1, 2, 2],
    result: "Runner Sur · Moon Este · Galaxy Oeste · Star Norte",
  },
  {
    id: "galaxies-moons",
    quote: "I remember galaxies that drift to moons, who borrow the runner that travels the stars.",
    turns: [2, 0, 2],
    result: "Runner Oeste · Moon Este · Galaxy Norte · Star Sur",
  },
] as const;

const positions = ["Her House", "Caltheris", "Dravakar", "Espacio vacío", "Veytharion", "Nyxara"] as const;
const destinations = ["Veytharion", "Caltheris", "Dravakar", "Nyxara"] as const;
type Position = (typeof positions)[number];
type Destination = (typeof destinations)[number];

const blockMoves = [
  "En la pared izquierda, ordena de abajo arriba: Planta, Agua, Mano y Fuego.",
  "Lleva Fuego a la ranura de transferencia y Mano a su ranura; dispara al círculo para pasar ambos a la derecha.",
  "Deja Fuego a la derecha y devuelve Mano a la izquierda disparando otra vez al círculo.",
  "Añade Agua junto a Mano y transfiere ambos a la derecha.",
  "Reordena a la derecha como Fuego–Mano–Agua; devuelve Fuego y Mano a la izquierda. Agua queda fijada abajo.",
  "Coloca Planta junto a Mano y transfiere ambos a la derecha; pon Planta encima de Agua.",
  "Devuelve Mano a la izquierda, añade Fuego y transfiere Fuego + Mano a la derecha.",
  "Finaliza la columna derecha, de abajo arriba: Agua, Planta, Mano y Fuego.",
];

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return (
    <label className="grid gap-1.5 text-sm font-extrabold text-slate-700">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 rounded-2xl border-2 border-slate-200 bg-white px-3 font-bold text-slate-950 focus:border-primary">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export default function SolversPage() {
  const [riddleId, setRiddleId] = useState("");
  const [outer, setOuter] = useState<Position>("Veytharion");
  const [middle, setMiddle] = useState<Position>("Espacio vacío");
  const [inner, setInner] = useState<Position>("Dravakar");
  const [destination, setDestination] = useState<Destination>("Veytharion");
  const [direction, setDirection] = useState<"Horario" | "Antihorario">("Horario");
  const [symbols, setSymbols] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("rex-house-symbols") ?? "[\"\",\"\",\"\",\"\"]");
    } catch {
      return ["", "", "", ""];
    }
  });

  useEffect(() => {
    localStorage.setItem("rex-house-symbols", JSON.stringify(symbols));
  }, [symbols]);

  const riddle = dravakarRiddles.find((item) => item.id === riddleId);
  const nexusTurns = useMemo(() => {
    const turnsFor = (current: Position) => {
      const from = positions.indexOf(current);
      const to = positions.indexOf(destination);
      return direction === "Antihorario" ? (to - from + positions.length) % positions.length : (from - to + positions.length) % positions.length;
    };
    return [turnsFor(outer), turnsFor(middle), turnsFor(inner)];
  }, [outer, middle, inner, destination, direction]);

  const updateSymbol = (index: number, value: string) => setSymbols((current) => current.map((symbol, itemIndex) => itemIndex === index ? value : symbol));

  return (
    <div className="space-y-5">
      <header>
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-4 w-4" /> Herramientas de partida</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Solvers</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Cálculos locales basados en la configuración visible en tu partida. No usan combinaciones inventadas ni envían datos.</p>
      </header>

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Puzzle 1</p>
        <h2 className="mt-1 text-xl font-black text-slate-950">Pilares de Dravakar</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Selecciona la frase exacta que pronuncia el templo. Las cuentas solo son válidas con todos los símbolos mirando al pilar central.</p>
        <div className="mt-4 grid gap-2">
          {dravakarRiddles.map((item, index) => (
            <button key={item.id} onClick={() => setRiddleId(item.id)} className={`rounded-2xl border-2 p-4 text-left text-sm font-bold leading-5 ${riddleId === item.id ? "border-primary bg-blue-50 text-blue-950" : "border-slate-200 bg-white text-slate-700"}`}>
              <span className="mr-2 text-primary">{index + 1}.</span>{item.quote}
            </button>
          ))}
        </div>
        {riddle && (
          <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-extrabold uppercase tracking-wider text-blue-300">Solución desde posición inicial</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {["Izquierda", "Trasera", "Derecha"].map((label, index) => <div key={label} className="rounded-xl bg-white/10 p-3"><p className="text-xs font-bold text-slate-300">{label}</p><p className="mt-1 text-2xl font-black">×{riddle.turns[index]}</p></div>)}
            </div>
            <p className="mt-3 text-xs font-semibold leading-5 text-slate-300">Resultado: {riddle.result}. Después, acciona el pilar central.</p>
          </div>
        )}
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Puzzle 2</p>
        <h2 className="mt-1 flex items-center gap-2 text-xl font-black text-slate-950"><Compass className="h-5 w-5 text-primary" /> Alineación del Nexus</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Introduce hacia dónde apunta ahora cada monolito y el destino. Usa la misma dirección en todos los giros.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <SelectField label="Monolito exterior" value={outer} onChange={(value) => setOuter(value as Position)} options={positions} />
          <SelectField label="Monolito medio" value={middle} onChange={(value) => setMiddle(value as Position)} options={positions} />
          <SelectField label="Monolito interior" value={inner} onChange={(value) => setInner(value as Position)} options={positions} />
          <SelectField label="Templo de destino" value={destination} onChange={(value) => setDestination(value as Destination)} options={destinations} />
          <SelectField label="Dirección de la palanca inferior" value={direction} onChange={(value) => setDirection(value as "Horario" | "Antihorario")} options={["Horario", "Antihorario"]} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-blue-50 p-3 text-center">
          {["Exterior", "Medio", "Interior"].map((label, index) => <div key={label} className="rounded-xl bg-white p-3 shadow-sm"><p className="text-xs font-bold text-slate-500">{label}</p><p className="mt-1 text-2xl font-black text-primary">×{nexusTurns[index]}</p></div>)}
        </div>
        <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Orden antihorario verificado: Her House → Caltheris → Dravakar → Espacio vacío → Veytharion → Nyxara. El orden de los tres monolitos no importa.</p>
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Puzzle 3</p>
        <h2 className="mt-1 text-xl font-black text-slate-950">Anotador de Her House</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Describe cada símbolo al aparecer. En Exfil, dispáralos de arriba abajo en este mismo orden.</p>
        <div className="mt-4 grid gap-3">
          {symbols.map((symbol, index) => (
            <label key={index} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-black text-white">{index + 1}</span>
              <input value={symbol} onChange={(event) => updateSymbol(index, event.target.value)} placeholder={`Descripción del símbolo de la ronda ${index + 1}`} className="min-h-11 min-w-0 flex-1 rounded-xl border bg-white px-3 text-sm font-bold text-slate-950" />
            </label>
          ))}
        </div>
        <button onClick={() => setSymbols(["", "", "", ""])} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 font-black text-slate-700"><RotateCcw className="h-4 w-4" /> Limpiar secuencia</button>
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-wider text-primary">Puzzle 4</p>
        <h2 className="mt-1 flex items-center gap-2 text-xl font-black text-slate-950"><Flame className="h-5 w-5 text-orange-600" /> Bloques de Veytharion</h2>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-blue-50 p-4 font-black text-blue-950">
          <span>Agua</span><ArrowRight className="h-4 w-4" /><span>Planta</span><ArrowRight className="h-4 w-4" /><span>Mano</span><ArrowRight className="h-4 w-4" /><span>Fuego</span>
        </div>
        <p className="mt-2 text-center text-xs font-bold text-slate-500">Orden final de abajo arriba</p>
        <ol className="mt-4 space-y-3">
          {blockMoves.map((move, index) => <li key={move} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-primary">{index + 1}</span>{move}</li>)}
        </ol>
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-950"><strong>No improvises contactos:</strong> Fuego quema Planta y Agua apaga Fuego; un fallo obliga a avanzar de ronda.</div>
      </section>

      <section className="rounded-3xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-950">
        <p className="flex items-center gap-2 font-black"><BookOpenCheck className="h-5 w-5" /> Trazabilidad</p>
        <p className="mt-2">Soluciones contrastadas el {guideContent.lastVerified} con Game8 y COD Zombies Solver. Revisa los enlaces de fuente en cada paso antes de una publicación comercial.</p>
      </section>
    </div>
  );
}
