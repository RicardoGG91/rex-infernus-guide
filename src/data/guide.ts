export interface MapMarkerCoordinates {
  x: number;
  y: number;
}

export interface GuideSource {
  id: string;
  name: string;
  url: string;
  kind: "official" | "editorial" | "tool" | "map";
  note: string;
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
  mainImageAlt: string | null;
  imageCredit: string | null;
  imageSourceUrl: string | null;
  additionalImages: string[];
  mapImage: string | null;
  markerCoordinates: MapMarkerCoordinates | null;
  tip: string | null;
  warning: string | null;
  commonError: string | null;
  approximateDuration: string | null;
  relatedStepIds: string[];
  searchTags: string[];
  sourceIds: string[];
  verificationStatus: "official" | "cross-checked";
  lastVerified: string;
}

export interface GuideContent {
  id: string;
  title: string;
  game: string;
  version: string;
  lastVerified: string;
  reviewNote: string;
  sources: GuideSource[];
  steps: GuideStep[];
}

const OFFICIAL_ART = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-05-reloaded/BO7-S05RELOADED-ANNOUNCEMENT-007.png";
const OFFICIAL_MAP_ART = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-05-reloaded/BO7-S05RELOADED-ANNOUNCEMENT-008.webp";
const OFFICIAL_CLAW_ART = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-05-reloaded/BO7-S05RELOADED-ANNOUNCEMENT-010.webp";
const OFFICIAL_ENEMY_ART = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/season-05-reloaded/BO7-S05RELOADED-ANNOUNCEMENT-009.webp";
const OFFICIAL_URL = "https://www.callofduty.com/blog/2026/08/call-of-duty-black-ops-7-warzone-season-05-reloaded-announcement";

const image = (url: string, alt: string) => ({
  mainImage: url,
  mainImageAlt: alt,
  imageCredit: "Imagen promocional oficial © Activision",
  imageSourceUrl: OFFICIAL_URL,
});

const common = {
  additionalImages: [] as string[],
  mapImage: null,
  markerCoordinates: null,
  verificationStatus: "cross-checked" as const,
  lastVerified: "2026-09-22",
};

export const guideContent: GuideContent = {
  id: "rex-infernus",
  title: "Rex Infernus",
  game: "Call of Duty: Black Ops 7 Zombies",
  version: "Season 05 Reloaded · misión principal estándar",
  lastVerified: "2026-09-22",
  reviewNote: "Ruta redactada en español y contrastada entre la publicación oficial, Game8 y KeenGamer. Los acertijos aleatorios se resuelven con los datos visibles en tu propia partida.",
  sources: [
    { id: "cod-official", name: "Call of Duty — Season 05 Reloaded", url: OFFICIAL_URL, kind: "official", note: "Fuente primaria para lanzamiento, mapa, misión y recompensas." },
    { id: "game8-main", name: "Game8 — Rex Infernus Easter Egg Walkthrough", url: "https://game8.co/games/Call-of-Duty-Black-Ops-7/archives/616417", kind: "editorial", note: "Recorrido detallado y actualizado el 24 de agosto de 2026. Sus imágenes no se reproducen por restricción expresa del sitio." },
    { id: "keengamer", name: "KeenGamer — Complete Easter Egg Guide", url: "https://www.keengamer.com/articles/guides/black-ops-7-rex-infernus-complete-easter-egg-guide/", kind: "editorial", note: "Segunda guía usada para contrastar orden, requisitos y jefe." },
    { id: "game8-dravakar", name: "Game8 — Dravakar Pillars", url: "https://game8.co/games/Call-of-Duty-Black-Ops-7/archives/616418", kind: "editorial", note: "Cuatro acertijos y pulsaciones desde la posición inicial." },
    { id: "game8-veytharion", name: "Game8 — Veytharion Blocks", url: "https://game8.co/games/Call-of-Duty-Black-Ops-7/archives/616419", kind: "editorial", note: "Orden final y secuencia de transferencia de bloques." },
    { id: "game8-boss", name: "Game8 — Warden Boss Fight", url: "https://game8.co/games/Call-of-Duty-Black-Ops-7/archives/616550", kind: "editorial", note: "Fases, puntos débiles, cárcel y amenazas del combate." },
    { id: "community-solver", name: "COD Zombies Solver", url: "https://codzombiessolver.com/rex-infernus", kind: "tool", note: "Referencia independiente para comprobar Dravakar y la rotación del Nexus." },
    { id: "interactive-map", name: "COD Zombies Guides — mapa interactivo", url: "https://codzombiesguides.com/maps/rex-infernus/", kind: "map", note: "Mapa externo para ubicaciones; no se copia al proyecto al no constar una licencia de reutilización." },
  ],
  steps: [
    {
      ...common, ...image(OFFICIAL_ART, "Arte promocional oficial de Rex Infernus"),
      id: "llegar-nexus", number: 1, title: "Llega al Nexus Forge", description: "Abandona Her House y entra en la zona central del mapa.", objective: "Contesta el teléfono y atraviesa el portal al Nexus Forge.", location: "Her House → Nexus Forge", requirements: ["Alcanzar la ronda 3"],
      instructions: ["Sobrevive dentro de Her House hasta que suene el teléfono de la planta baja.", "Contesta el teléfono; un wisp abrirá la salida bloqueada.", "Sal de la casa y entra en el portal que conduce al Nexus Forge."],
      tip: "Puedes tocar la secuencia correcta del piano junto a Quick Revive para esencia e intel, pero no es parte obligatoria de la misión principal.", warning: null, commonError: "Buscar el portal antes de contestar el teléfono.", approximateDuration: "5–8 min", relatedStepIds: ["activar-forja"], searchTags: ["casa", "teléfono", "portal", "ronda 3"], sourceIds: ["cod-official", "game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Entornos oficiales de los templos de Rex Infernus"),
      id: "activar-forja", number: 2, title: "Reactiva la Forja y Pack-a-Punch", description: "Recupera las dos Usurped Flames de los Dread Skulls.", objective: "Enciende los dos braseros y baja la plataforma central.", location: "Nexus Forge y templos", requirements: ["World Seed disponible en el pedestal central"],
      instructions: ["Coloca la World Seed en la plataforma central para invocar dos Dread Skulls.", "Sigue y dispara a cada skull cuando sea sólido hasta destruirlo en su templo.", "Recoge cada Usurped Flame y llévala a uno de los dos braseros centrales.", "Con ambos braseros encendidos, mantén interactuar en las dos ruedas para bajar la Forja y activar Pack-a-Punch."],
      tip: "Cada jugador solo puede transportar una Usurped Flame a la vez.", warning: "Los skulls son invulnerables mientras están translúcidos.", commonError: "Disparar al skull durante su fase transparente o dejar una llama en el templo.", approximateDuration: "6–10 min", relatedStepIds: ["llegar-nexus", "preparar-casa", "llama-astral"], searchTags: ["pack a punch", "world seed", "dread skull", "usurped flame"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_ART, "Her House dentro del arte oficial de Rex Infernus"),
      id: "preparar-casa", number: 3, title: "Inicia la secuencia de Her House", description: "Empieza pronto el puzzle que necesita cuatro cambios de ronda.", objective: "Registra los cuatro símbolos azules en el orden en que aparecen.", location: "Nexus Forge, mirando hacia Her House", requirements: ["Acceso al Nexus Forge", "Arma con precisión o mira"],
      instructions: ["Dispara al balón encajado en la grieta de Her House hasta que caiga.", "Al inicio de cada una de las cuatro rondas siguientes aparecerá un símbolo azul.", "Registra el orden exacto con el anotador de símbolos de la sección Solvers.", "Continúa otros objetivos mientras esperas una ronda de Exfil."],
      tip: "Hazlo justo al llegar al Nexus para no empujar la misión a rondas altas.", warning: "La secuencia es aleatoria en cada intento.", commonError: "Confundir la posición física de la ventana con el orden temporal de aparición.", approximateDuration: "4 rondas en paralelo", relatedStepIds: ["mejorar-garra"], searchTags: ["her house", "balón", "símbolos", "exfil"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_CLAW_ART, "Imagen oficial de un arma y equipo de Rex Infernus"),
      id: "llama-astral", number: 4, title: "Consigue Void Claw y Astral Flame", description: "Activa el equipo que mueve orbes y cristales.", objective: "Genera Astral Flame en los braseros del Nexus.", location: "Debajo y alrededor de Pack-a-Punch", requirements: ["Pack-a-Punch activo"],
      instructions: ["Recoge una Void Claw del pedestal de orbe verde bajo la plataforma.", "Usa la garra para arrastrar un orbe morado flotante al centro de Pack-a-Punch.", "En cuanto el orbe gire dentro de los anillos, acciona una rueda.", "Recoge la Astral Flame morada de uno de los dos braseros."],
      tip: "Los pedestales se refrescan con la ronda; hay varios repartidos por el mapa.", warning: "La garra y la Astral Flame son temporales.", commonError: "Tocar el orbe morado: se disuelve en botín en vez de entrar en la Forja.", approximateDuration: "2–4 min", relatedStepIds: ["abrir-nyxara"], searchTags: ["void claw", "grappler", "orbe morado", "astral flame"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Ruinas y templos en el material oficial de Rex Infernus"),
      id: "abrir-nyxara", number: 5, title: "Abre el Inner Sanctum de Nyxara", description: "Recupera la fractura y completa el puzzle de reflectores.", objective: "Redirige el proyectil morado hasta la puerta sellada.", location: "Dravakar Main Chamber → Nyxara Sanctuary", requirements: ["Void Claw", "Explosivo", "Astral Flame"],
      instructions: ["En Dravakar, sube a la plataforma sobre la entrada y rompe la pared lateral con un explosivo.", "Recoge la Fracture of Nyxara y colócala en el hueco de la pared noroeste de Nyxara Main Chamber.", "Dispara una Astral Flame al gran ojo situado al fondo de Nyxara Sanctuary.", "Usa la Void Claw sobre cada cristal alto para encadenar el rayo hasta la puerta sellada del sur."],
      tip: "Apunta la Astral Flame un poco por encima del ojo porque el proyectil cae.", warning: "El recorrido del rayo es cronometrado; si se apaga, fabrica otra Astral Flame.", commonError: "Intentar activar los cristales antes de colocar la Fracture of Nyxara.", approximateDuration: "5–8 min", relatedStepIds: ["piezas-blight"], searchTags: ["nyxara", "fracture", "cristales", "ojo", "rayo"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_ENEMY_ART, "Criaturas oficiales de Rex Infernus"),
      id: "piezas-blight", number: 6, title: "Recoge las piezas de Warden’s Blight", description: "Entra en el Hidden Forest y localiza tres restos.", objective: "Vuelve del bosque con las tres piezas de la Wonder Weapon.", location: "Nyxara Inner Sanctum → Hidden Forest", requirements: ["Ronda 8 o superior", "Acceso al Inner Sanctum"],
      instructions: ["Interactúa con el orbe de la cámara oculta para caer junto a la enredadera.", "Activa y defiende la enredadera mientras absorbe salud; cuando produzca fruto, cómelo.", "En el bosque, recoge la pieza junto al cadáver frente a la caja de munición central.", "Busca el cadáver de la cabaña destruida y golpea las tablas del suelo para revelar otra pieza.", "Recoge la tercera pieza junto al cadáver cercano a la cueva antes de que acabe el límite de tres minutos."],
      tip: "Solo entra un jugador; si se agota el tiempo, vuelve a alimentar la enredadera en otra ronda.", warning: "El teletransporte al bosque no funciona antes de la ronda 8.", commonError: "Marcharse de la cabaña sin golpear las tablas junto al cuerpo.", approximateDuration: "3–6 min", relatedStepIds: ["puzzle-dravakar"], searchTags: ["hidden forest", "bosque", "cabaña", "cueva", "wonder weapon"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Templos oficiales de Rex Infernus"),
      id: "puzzle-dravakar", number: 7, title: "Resuelve los pilares de Dravakar", description: "El acertijo elige una de cuatro configuraciones.", objective: "Orienta Runner, Moon, Galaxy y Star con tres palancas.", location: "Dravakar Sanctuary", requirements: ["Tres piezas de Warden’s Blight", "Pilares en posición inicial"],
      instructions: ["Interactúa con la escritura azul de la pared y escucha el acertijo completo.", "Abre Solvers y selecciona la frase que has oído.", "Pulsa las palancas izquierda, trasera y derecha las veces indicadas.", "Acciona la palanca del pilar central para validar y abrir el techo."],
      tip: "La palanca izquierda está junto a Armor Wall Buy; la trasera se identifica frente al Novaline Wall Buy; la derecha queda opuesta a Armor Wall Buy.", warning: "Las cuentas del solver parten de todos los símbolos mirando al pilar central.", commonError: "Si los pilares ya estaban movidos, golpear el central los reinicia pero obliga a esperar a la ronda siguiente.", approximateDuration: "1–3 min", relatedStepIds: ["fabricar-blight"], searchTags: ["dravakar", "pilares", "acertijo", "runner", "moon", "galaxy", "star", "solver"], sourceIds: ["game8-dravakar", "community-solver", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_CLAW_ART, "Material oficial del equipamiento de Rex Infernus"),
      id: "fabricar-blight", number: 8, title: "Fabrica Warden’s Blight", description: "Monta la Wonder Weapon necesaria para los rituales.", objective: "Crea y mejora Warden’s Blight.", location: "Dravakar Inner Sanctum → Nexus Forge", requirements: ["Puzzle de pilares resuelto", "Tres piezas reunidas"],
      instructions: ["Usa la Void Claw para subir por el techo abierto al Inner Sanctum.", "Interactúa con Dravakar’s Anvil para fabricar Warden’s Blight.", "Lleva el arma a Pack-a-Punch; su disparo cargado mejorado será obligatorio más adelante."],
      tip: "Si luego vuelves a Her House, recibirás un cristal de nivel I que puede usarse en Warden’s Blight.", warning: null, commonError: "Entrar en las purificaciones sin haber mejorado el arma.", approximateDuration: "2–3 min", relatedStepIds: ["ofrendas", "mejorar-garra"], searchTags: ["warden blight", "wonder weapon", "anvil", "yunque"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Vista oficial de las áreas de Rex Infernus"),
      id: "ofrendas", number: 9, title: "Reúne las cuatro ofrendas", description: "Consigue el objeto de corrupción de cada Shadowsmith.", objective: "Obtén Scroll, Hammer, Sash y Shimmering Thread.", location: "Hidden Forest, Dravakar, Veytharion y orbes del Nexus", requirements: ["Shadow Rift", "Shatter Blast", "Void Claw", "Acceso al puzzle de Veytharion"],
      instructions: ["Nyxara: mata zombis en el Hidden Forest con activaciones de Shadow Rift hasta que caiga Ancient Scroll.", "Dravakar: mata zombis pegados a los cuatro escudos del Inner Sanctum con activaciones de Shatter Blast; uno oculta Blacksmith’s Hammer.", "Veytharion: completa primero los bloques, activa el pozo para forzar lluvia en la siguiente ronda y busca Woven Sash en Spira Insula o Ruinas Insula.", "Caltheris: atrae orbes morados con la Void Claw e interactúa con ellos hasta que aparezca Shimmering Thread."],
      tip: "El generador opcional de Caltheris crea cuatro orbes por ronda después de superar sus cuatro baldosas y grupos de orbes amarillos.", warning: "Ancient Scroll y Shimmering Thread son drops aleatorios; puede requerir varios intentos.", commonError: "Matar al zombi lejos del escudo: Shatter Blast debe detonar junto a él.", approximateDuration: "8–15 min", relatedStepIds: ["bloques-veytharion", "mejorar-garra"], searchTags: ["ancient scroll", "hammer", "woven sash", "shimmering thread", "shatter blast", "shadow rift"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_ART, "Her House en el arte promocional oficial"),
      id: "mejorar-garra", number: 10, title: "Regresa a Her House y crea Void Talon", description: "Completa la secuencia del Exfil y recupera Eye of the Forge.", objective: "Convierte un pedestal de Void Claw en Void Talon.", location: "Her House y Nexus Forge", requirements: ["Cuatro símbolos registrados", "Ronda de Exfil: 11, 16, 21…", "Warden’s Blight mejorada"],
      instructions: ["Durante una ronda de Exfil, dispara a los cuatro símbolos azules en el mismo orden en que aparecieron.", "Activa el teléfono de Exfil, acepta con todo el equipo y derrota al HVT.", "Usa el portal de Exfil para volver a Her House.", "Sube al baño y dispara un tiro cargado de Warden’s Blight al estante sobre el inodoro.", "Recoge Eye of the Forge, sobrevive al ataque, vuelve al Nexus y colócalo en un pedestal verde para crear Void Talon."],
      tip: "El anotador de símbolos guarda la secuencia en el dispositivo aunque cambies de pantalla.", warning: "Si fallas la secuencia, elimina los símbolos restantes y espera otras cuatro rondas más el siguiente Exfil.", commonError: "Disparar al estante con un tiro normal o con Warden’s Blight sin mejorar.", approximateDuration: "5–8 min más espera de ronda", relatedStepIds: ["reparar-nexus"], searchTags: ["eye of forge", "void talon", "exfil", "baño", "símbolos"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_CLAW_ART, "Void Claw en material promocional oficial"),
      id: "reparar-nexus", number: 11, title: "Reconstruye el Nexus Core", description: "Libera los engranajes y activa los controles de alineación.", objective: "Deja operativa la rotación de los tres monolitos.", location: "Nexus Forge y nivel inferior del Nexus Core", requirements: ["Void Talon", "Explosivos, Astral Flame o Warden’s Blight"],
      instructions: ["Extrae con Void Talon las placas con ojos de los tres monolitos exteriores.", "Baja al Core y extrae las doce placas cuadradas: seis en cada pared.", "Destruye las telarañas de los seis engranajes expuestos.", "Acciona una rueda de la Forja y, mientras acelera, pulsa la palanca del suelo del Core.", "Comprueba que los engranajes brillen en azul y que los monolitos tengan controles activos."],
      tip: "En cooperativo, una persona puede girar la rueda mientras otra espera junto a la palanca inferior.", warning: null, commonError: "Dejar una placa o una telaraña sin retirar en uno de los dos lados.", approximateDuration: "4–7 min", relatedStepIds: ["purificar-veytharion"], searchTags: ["nexus core", "monolitos", "engranajes", "telarañas", "void talon"], sourceIds: ["game8-main", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Templos de Rex Infernus en material oficial"),
      id: "bloques-veytharion", number: 12, title: "Completa los bloques de Veytharion", description: "Transfiere cuatro bloques sin provocar una reacción elemental.", objective: "Forma a la derecha: Agua → Planta → Mano → Fuego, de abajo arriba.", location: "Ala oeste de Veytharion Temple", requirements: ["Cuatro bloques del templo", "Death Perception recomendado"],
      instructions: ["Encuentra los cuatro bloques: pilar noreste junto a Gobblegum; spawn bajo Crafting Table; dintel junto a Speed Cola; borde del acantilado junto al puzzle.", "Identifica sus símbolos: Water, Plant, Hand y Fire; las posiciones son fijas pero los símbolos cambian.", "Abre el solver de Veytharion y sigue las diez operaciones de transferencia.", "Cuando la columna derecha quede Agua, Planta, Mano y Fuego de abajo arriba, recoge la ventaja aleatoria y activa el pozo cuando necesites lluvia."],
      tip: "Los bloques se transportan físicamente manteniendo interactuar; no entran en el inventario.", warning: "Fuego quema Planta y Agua apaga Fuego si haces una combinación inválida; tendrás que avanzar de ronda.", commonError: "Seguir la apariencia del bloque en vez del símbolo, que cambia entre partidas.", approximateDuration: "4–7 min", relatedStepIds: ["ofrendas", "purificar-veytharion"], searchTags: ["veytharion", "bloques", "agua", "planta", "mano", "fuego", "lluvia", "solver"], sourceIds: ["game8-veytharion", "keengamer"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Entorno oficial de los templos de Rex Infernus"),
      id: "purificar-veytharion", number: 13, title: "Purifica Veytharion", description: "Alinea la Forja, sacrifica el zombi marcado y completa el reflector.", objective: "Haz que un rayo purifique la cabeza de Veytharion.", location: "Veytharion Main Chamber y Passage", requirements: ["Woven Sash", "Astral Flame", "Warden’s Blight mejorada", "Void Talon", "Lluvia"],
      instructions: ["Usa el solver del Nexus para alinear los tres monolitos con Veytharion.", "Coloca Woven Sash en el brasero y préndelo con Astral Flame.", "Impregna un zombi y llévalo al brazo izquierdo del Titan Trap de Veytharion; activa la trampa.", "Salta repetidamente durante cerca de un minuto sobre la baldosa de la cara para revelar el disco.", "Activa el disco con un tiro cargado, orienta el láser a la pequeña ventana izquierda, carga el soulbox y elimina cuatro Shadow Souls.", "Dispara a la cara interior; fuera, eleva un orbe morado hasta la cabeza con un tiro cargado y, durante la lluvia, impacta la frente con Astral Flame."],
      tip: "Prueba el apuntado del láser con unas pocas bajas: deben aparecer grietas amarillas en la pared.", warning: "Los cuatro rituales pueden hacerse en cualquier orden; esta ruta reduce giros del Nexus.", commonError: "Usar el brazo incorrecto del Titan Trap o intentar la descarga final sin lluvia.", approximateDuration: "6–10 min", relatedStepIds: ["purificar-caltheris"], searchTags: ["veytharion", "titan trap", "soulbox", "shadow souls", "rayo"], sourceIds: ["game8-main", "keengamer", "community-solver"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Ruinas oficiales de Rex Infernus"),
      id: "purificar-caltheris", number: 14, title: "Purifica Caltheris", description: "Repite el ritual con la ofrenda y condición de placa de Caltheris.", objective: "Rompe la pared del templo y electrifica la cabeza de Caltheris.", location: "Caltheris Main Chamber y Passage", requirements: ["Shimmering Thread", "Equipo de purificación", "Lluvia"],
      instructions: ["Alinea los monolitos con Caltheris usando el solver.", "Quema Shimmering Thread en el brasero con Astral Flame y lleva el zombi imbuido a su Titan Trap.", "Túmbate sobre la baldosa, apunta con la mira y permanece quieto cerca de un minuto.", "Activa el disco, orienta el láser a la pared superior izquierda, carga el soulbox y destruye las cuatro Shadow Souls.", "Daña la cara revelada; eleva un orbe morado hasta la cabeza exterior y, con lluvia, lanza Astral Flame a la frente."],
      tip: "Un T.E.D.D. Task puede proporcionar zombis de ojos morados para cargar el soulbox sin avanzar ronda.", warning: null, commonError: "Moverse o dejar de apuntar mientras se activa la baldosa.", approximateDuration: "6–10 min", relatedStepIds: ["purificar-dravakar"], searchTags: ["caltheris", "shimmering thread", "ads", "placa", "laser"], sourceIds: ["game8-main", "keengamer", "community-solver"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Arquitectura oficial de Rex Infernus"),
      id: "purificar-dravakar", number: 15, title: "Purifica Dravakar", description: "Completa el ritual del martillo y la baldosa de daño.", objective: "Libera y purifica la cabeza interior y exterior de Dravakar.", location: "Dravakar Main Chamber y Titan Trap de Caltheris", requirements: ["Blacksmith’s Hammer", "Equipo de purificación", "Armadura suficiente", "Lluvia"],
      instructions: ["Alinea los monolitos con Dravakar.", "Quema Blacksmith’s Hammer en su brasero con Astral Flame.", "Lleva el zombi marcado al brazo derecho del Titan Trap de Caltheris y actívalo.", "Túmbate sobre la baldosa de Dravakar y recibe daño hasta que se abra; conserva salud y armadura.", "Activa el disco y dirige el láser a la esquina sureste de la segunda planta; carga el soulbox y elimina cuatro Shadow Souls, incluida la del techo.", "Daña la cara, eleva el orbe a la cabeza exterior y termina con Astral Flame durante la lluvia."],
      tip: "La apertura de la baldosa puede consumir algo más de tres placas; controla tu salud.", warning: "No te dejes abatir mientras cargas la baldosa.", commonError: "Llevar el zombi al Titan de Dravakar: la referencia contrastada indica el brazo derecho del Titan de Caltheris.", approximateDuration: "6–10 min", relatedStepIds: ["purificar-nyxara"], searchTags: ["dravakar", "hammer", "daño", "placa", "shadow soul techo"], sourceIds: ["game8-main", "keengamer", "community-solver"],
    },
    {
      ...common, ...image(OFFICIAL_MAP_ART, "Templos oficiales del mapa Rex Infernus"),
      id: "purificar-nyxara", number: 16, title: "Purifica Nyxara", description: "Completa la última ofrenda y el ritual de la cabeza.", objective: "Finaliza la purificación de los cuatro Shadowsmiths.", location: "Nyxara Main Chamber y Titan Trap de Veytharion", requirements: ["Ancient Scroll", "Equipo de purificación", "Lluvia"],
      instructions: ["Alinea los monolitos con Nyxara.", "Quema Ancient Scroll en el brasero con Astral Flame.", "Lleva el zombi marcado al brazo derecho del Titan Trap de Veytharion y activa la trampa.", "Túmbate quieto sobre la baldosa cerca de un minuto para revelar el disco.", "Activa el disco, orienta el láser a la pared sur junto a la lava, carga el soulbox y elimina las cuatro Shadow Souls.", "Daña la cara revelada; eleva el orbe cercano hasta la cabeza exterior y lanza Astral Flame a la frente durante la lluvia."],
      tip: "Usa la Void Claw para alcanzar una roca flotante y tener un tiro limpio de Astral Flame.", warning: null, commonError: "Confundir el Titan de destino: el zombi de Nyxara va al brazo derecho de Veytharion.", approximateDuration: "6–10 min", relatedStepIds: ["warden"], searchTags: ["nyxara", "ancient scroll", "lava", "titan", "purificación"], sourceIds: ["game8-main", "keengamer", "community-solver"],
    },
    {
      ...common, ...image(OFFICIAL_ENEMY_ART, "Enemigo de Rex Infernus en material oficial"),
      id: "warden", number: 17, title: "Derrota al Warden", description: "Completa varias ventanas de daño y sobrevive a la resurrección.", objective: "Destruye los Dread Skulls, abre el punto débil y elimina al Warden.", location: "Arena final, activada bajo Pack-a-Punch", requirements: ["Cuatro templos purificados", "Warden’s Blight mejorada", "Armadura, ventajas y munición completas"],
      instructions: ["Baja al Nexus Core y haz que todos los jugadores ocupen los círculos azules.", "En la arena, mantente en movimiento y usa Void Claw para evitar cargas, ondas y caídas.", "Destruye los Dread Skulls para exponer durante unos segundos el punto crítico del aguijón; concentra ahí todo el daño.", "En las fases inmunes elimina primero Shadow Souls y destruye los Stingers cuando carguen su ataque de área.", "Tras la primera derrota, el Warden resucita con menos de media vida: repite Souls → Skulls → aguijón hasta acabar."],
      tip: "Si mueres por primera vez, derrota al HVT de la cárcel para volver con una bendición temporal; fallar devuelve una maldición y una segunda muerte elimina definitivamente.", warning: "Los Stingers pueden completar un ataque de área devastador si no los cortas al cargar.", commonError: "Gastar munición en el cuerpo mientras el aguijón no está expuesto.", approximateDuration: "8–15 min", relatedStepIds: [], searchTags: ["warden", "boss", "jefe", "dread skull", "stinger", "aguijón", "recompensas"], sourceIds: ["cod-official", "game8-boss", "keengamer"],
    },
  ],
};

export const getOrderedSteps = () =>
  [...guideContent.steps].sort((a, b) => a.number - b.number);

export const getStepById = (id: string) =>
  guideContent.steps.find((step) => step.id === id);

export const getSourcesForStep = (step: GuideStep) =>
  guideContent.sources.filter((source) => step.sourceIds.includes(source.id));
