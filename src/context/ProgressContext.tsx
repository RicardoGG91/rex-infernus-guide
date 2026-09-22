import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getOrderedSteps } from "@/data/guide";

type ProgressContextValue = {
  completedIds: string[];
  favoriteIds: string[];
  lastVisitedStepId: string | null;
  toggleCompleted: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setLastVisitedStepId: (id: string) => void;
  resetProgress: () => void;
  completionPercent: number;
  pendingCount: number;
  nextPendingStepId: string | null;
};

type StoredProgress = {
  completedIds: string[];
  favoriteIds: string[];
  lastVisitedStepId: string | null;
};

const STORAGE_KEY = "rex-infernus-progress-v1";
const initialState: StoredProgress = {
  completedIds: [],
  favoriteIds: [],
  lastVisitedStepId: null,
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readStoredProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    return {
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
      favoriteIds: Array.isArray(parsed.favoriteIds) ? parsed.favoriteIds : [],
      lastVisitedStepId:
        typeof parsed.lastVisitedStepId === "string" ? parsed.lastVisitedStepId : null,
    };
  } catch {
    return initialState;
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<StoredProgress>(readStoredProgress);
  const steps = getOrderedSteps();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const value = useMemo<ProgressContextValue>(() => {
    const validIds = new Set(steps.map((step) => step.id));
    const completedIds = progress.completedIds.filter((id) => validIds.has(id));
    const pendingSteps = steps.filter((step) => !completedIds.includes(step.id));

    return {
      completedIds,
      favoriteIds: progress.favoriteIds.filter((id) => validIds.has(id)),
      lastVisitedStepId: progress.lastVisitedStepId,
      toggleCompleted: (id) =>
        setProgress((current) => ({
          ...current,
          completedIds: current.completedIds.includes(id)
            ? current.completedIds.filter((item) => item !== id)
            : [...current.completedIds, id],
        })),
      toggleFavorite: (id) =>
        setProgress((current) => ({
          ...current,
          favoriteIds: current.favoriteIds.includes(id)
            ? current.favoriteIds.filter((item) => item !== id)
            : [...current.favoriteIds, id],
        })),
      setLastVisitedStepId: (id) =>
        setProgress((current) => ({ ...current, lastVisitedStepId: id })),
      resetProgress: () => setProgress(initialState),
      completionPercent:
        steps.length === 0 ? 0 : Math.round((completedIds.length / steps.length) * 100),
      pendingCount: pendingSteps.length,
      nextPendingStepId: pendingSteps[0]?.id ?? null,
    };
  }, [progress, steps]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
