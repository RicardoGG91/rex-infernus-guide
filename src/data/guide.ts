export interface MapMarkerCoordinates {
  x: number;
  y: number;
}

export interface GuideStep {
  id: string;
  number: number;
  title: string;
  description: string;
  objective: string;
  location: string;
  requirements: string[];
  instructions: string[];
  mainImage: string | null;
  additionalImages: string[];
  mapImage: string | null;
  markerCoordinates: MapMarkerCoordinates | null;
  tip: string | null;
  warning: string | null;
  commonError: string | null;
  approximateDuration: string | null;
  relatedStepIds: string[];
  searchTags: string[];
}

export interface GuideContent {
  id: string;
  title: string;
  version: string;
  steps: GuideStep[];
}

// Fuente única de contenido. Añade aquí únicamente información verificada.
// La interfaz funciona con este array vacío y se actualizará automáticamente
// al añadir, editar o eliminar pasos.
export const guideContent: GuideContent = {
  id: "rex-infernus",
  title: "Rex Infernus",
  version: "sin-contenido",
  steps: [],
};

export const getOrderedSteps = () =>
  [...guideContent.steps].sort((a, b) => a.number - b.number);

export const getStepById = (id: string) =>
  guideContent.steps.find((step) => step.id === id);
