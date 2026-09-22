import { BookOpen, Home, Map, Play, Target } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/guia", label: "Guía", icon: BookOpen },
  { to: "/partida", label: "Partida", icon: Play },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/progreso", label: "Progreso", icon: Target },
];

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-4">
          <img
            src="/assets/rex-infernus-logo.png"
            alt="Rex Infernus Guide"
            className="h-11 w-11 rounded-xl border border-blue-100 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">Guía móvil</p>
            <p className="truncate text-lg font-black tracking-tight text-slate-950">Rex Infernus</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-5">
        <Outlet />
      </main>

      <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-50 border-t bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
        <div className="mx-auto grid h-[72px] max-w-3xl grid-cols-5 px-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold transition-colors",
                  isActive ? "text-primary" : "text-slate-500 hover:text-slate-800",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn("grid h-8 w-11 place-items-center rounded-xl", isActive && "bg-blue-50")}>
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.8 : 2.2} />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
