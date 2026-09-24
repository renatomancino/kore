import type { ServizioPagina } from "./servizi-pagina";

/**
 * Un disegno di costruzione per ogni servizio.
 *
 * Non illustrazioni: tavole. Ognuna mostra una fase del lavoro mentre e'
 * ancora impalcatura — le guide del marchio prima delle curve, i formati
 * prima dei contenuti, la pianta prima della serata. E' cio' che un cliente
 * non vede mai e che dice, meglio di qualsiasi frase, che dietro c'e' un
 * metodo.
 *
 * In SVG e non in fotografia: pesano quanto niente, restano nitidi a ogni
 * misura, e soprattutto prendono i colori dell'atto in cui stanno —
 * `currentColor` per le linee, `--accento-atto` per il corallo, che
 * sull'atto corallo diventa inchiostro perche' corallo su corallo non e' un
 * accento.
 */

/* Il reticolo di fondo: e' la carta millimetrata su cui si costruisce. */
function Reticolo() {
  return (
    <g opacity=".16">
      {Array.from({ length: 15 }, (_, i) => (
        <line key={`v${i}`} x1={40 * i} y1="0" x2={40 * i} y2="480" stroke="currentColor" strokeWidth=".5" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`o${i}`} x1="0" y1={40 * i} x2="600" y2={40 * i} stroke="currentColor" strokeWidth=".5" />
      ))}
    </g>
  );
}

/* Una quota, come sulle tavole: due barrette e la linea in mezzo. */
function Quota({ x1, y, x2, testo }: { x1: number; y: number; x2: number; testo: string }) {
  return (
    <g stroke="var(--accento-atto)" strokeWidth="1" fontSize="9" fill="var(--accento-atto)">
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} />
      <line x1={x1} y1={y} x2={x2} y2={y} strokeDasharray="3 3" />
      <text x={(x1 + x2) / 2} y={y - 9} textAnchor="middle" stroke="none" letterSpacing="1.4">{testo}</text>
    </g>
  );
}

function Etichetta({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fontSize="9" letterSpacing="1.6" fill="currentColor" opacity=".65">{children}</text>
  );
}

/* 01 — il marchio prima delle curve: griglia aurea, assi, il segno che nasce
   dalle guide invece che da un'idea calata dall'alto. */
function Branding() {
  return (
    <>
      <circle cx="300" cy="230" r="128" fill="none" stroke="currentColor" strokeWidth="1" opacity=".45" />
      <circle cx="300" cy="230" r="79" fill="none" stroke="currentColor" strokeWidth="1" opacity=".45" />
      <circle cx="300" cy="230" r="49" fill="none" stroke="var(--accento-atto)" strokeWidth="1.5" />
      <line x1="300" y1="62" x2="300" y2="398" stroke="currentColor" strokeWidth=".75" strokeDasharray="6 4" opacity=".6" />
      <line x1="132" y1="230" x2="468" y2="230" stroke="currentColor" strokeWidth=".75" strokeDasharray="6 4" opacity=".6" />
      {/* Il segno: due archi che si chiudono su un asse, come la K di Kore. */}
      <path d="M244 160 L244 300 M244 232 L340 160 M244 232 L340 300" fill="none" stroke="var(--accento-atto)" strokeWidth="14" strokeLinecap="square" />
      <rect x="172" y="102" width="256" height="256" fill="none" stroke="currentColor" strokeWidth=".75" opacity=".5" />
      <Quota x1={172} y={392} x2={428} testo="1 : 1" />
      <Etichetta x={16} y={28}>ASSI E PROPORZIONI</Etichetta>
      <Etichetta x={16} y={462}>FASE 02 — COSTRUZIONE DEL SEGNO</Etichetta>
    </>
  );
}

/* 02 — dal piano alla relazione: il post nel telefono, il calendario
   editoriale della settimana da cui arriva, e la conversazione che apre. */
const GIORNI = ["L", "M", "M", "G", "V", "S", "D"];
const COLONNA = 260 / 7;
const RIGA = 44;
/* Il centro della colonna e della riga: le uscite si disegnano da li'. */
const centroColonna = (c: number) => 300 + ((2 * c + 1) * COLONNA) / 2;
const centroRiga = (r: number) => 96 + RIGA * r + RIGA / 2;
/* Riga, colonna e formato di ogni uscita del piano. */
const USCITE: [number, number, "post" | "reel" | "story"][] = [
  [0, 0, "post"], [0, 2, "reel"], [0, 4, "story"], [0, 5, "post"],
  [1, 1, "story"], [1, 3, "post"], [1, 6, "reel"],
  [2, 0, "reel"], [2, 2, "post"], [2, 4, "story"], [2, 5, "reel"],
];

function Uscita({ cx, cy, formato }: { cx: number; cy: number; formato: "post" | "reel" | "story" }) {
  if (formato === "post") {
    return <rect x={cx - 7} y={cy - 7} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.25" />;
  }
  const pieno = formato === "reel";
  return (
    <rect
      x={cx - 5}
      y={cy - 10}
      width="10"
      height="20"
      fill={pieno ? "var(--accento-atto)" : "none"}
      stroke={pieno ? undefined : "var(--accento-atto)"}
      strokeWidth={pieno ? undefined : "1.25"}
    />
  );
}

function Social() {
  return (
    <>
      {/* Il telefono, col post in 4:5 e la sua gabbia di sicurezza. */}
      <rect x="56" y="60" width="190" height="360" rx="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="121" y="72" width="60" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1" opacity=".6" />
      <circle cx="84" cy="108" r="9" fill="none" stroke="var(--accento-atto)" strokeWidth="1.25" />
      <line x1="100" y1="104" x2="170" y2="104" stroke="currentColor" strokeWidth="2" opacity=".55" />
      <line x1="100" y1="113" x2="140" y2="113" stroke="currentColor" strokeWidth="2" opacity=".3" />
      <rect x="68" y="128" width="166" height="208" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <rect x="80" y="140" width="142" height="184" fill="none" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="151" cy="232" r="34" fill="var(--accento-atto)" opacity=".22" />
      <circle cx="151" cy="232" r="34" fill="none" stroke="var(--accento-atto)" strokeWidth="1.25" />
      <text x="151" y="236" textAnchor="middle" fontSize="11" letterSpacing="1.6" fill="var(--accento-atto)">4:5</text>
      <g fill="none" stroke="currentColor" strokeWidth="1.25" opacity=".8">
        <circle cx="80" cy="354" r="6" />
        <rect x="96" y="348" width="14" height="12" rx="3" />
        <path d="M122 360 L134 348 M126 348 L134 348 L134 356" />
        <rect x="216" y="347" width="10" height="14" />
      </g>
      <line x1="68" y1="378" x2="214" y2="378" stroke="currentColor" strokeWidth="2" opacity=".45" />
      <line x1="68" y1="390" x2="170" y2="390" stroke="currentColor" strokeWidth="2" opacity=".25" />

      {/* Il piano editoriale della settimana. */}
      <text x={300} y={62} fontSize="9" letterSpacing="1.6" fill="currentColor" opacity=".65">PIANO EDITORIALE</text>
      {GIORNI.map((giorno, i) => (
        <text key={i} x={centroColonna(i)} y="88" textAnchor="middle" fontSize="8.5" fill="currentColor" opacity=".6">{giorno}</text>
      ))}
      <rect x="300" y="96" width="260" height="132" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <g stroke="currentColor" strokeWidth=".75" opacity=".35">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`c${i}`} x1={300 + COLONNA * (i + 1)} y1="96" x2={300 + COLONNA * (i + 1)} y2="228" />
        ))}
        <line x1="300" y1="140" x2="560" y2="140" />
        <line x1="300" y1="184" x2="560" y2="184" />
      </g>
      {USCITE.map(([riga, colonna, formato]) => (
        <Uscita key={`${riga}-${colonna}`} cx={centroColonna(colonna)} cy={centroRiga(riga)} formato={formato} />
      ))}
      <g fontSize="8.5" letterSpacing="1.4" fill="currentColor" opacity=".7">
        <rect x="300" y="243" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <text x="316" y="252">POST</text>
        <rect x="370" y="241" width="7" height="14" fill="var(--accento-atto)" />
        <text x="384" y="252">REEL</text>
        <rect x="438" y="241" width="7" height="14" fill="none" stroke="var(--accento-atto)" strokeWidth="1.25" />
        <text x="452" y="252">STORY</text>
      </g>
      <path d="M300 118 C 274 118 270 150 246 150" fill="none" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="300" cy="118" r="2.5" fill="var(--accento-atto)" />

      {/* La conversazione: un commento e la risposta. */}
      <text x={300} y={284} fontSize="9" letterSpacing="1.6" fill="currentColor" opacity=".65">COMMUNITY</text>
      <rect x="300" y="294" width="176" height="36" rx="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <line x1="314" y1="308" x2="440" y2="308" stroke="currentColor" strokeWidth="2" opacity=".55" />
      <line x1="314" y1="318" x2="400" y2="318" stroke="currentColor" strokeWidth="2" opacity=".3" />
      <rect x="384" y="342" width="176" height="36" rx="12" fill="none" stroke="var(--accento-atto)" strokeWidth="1.5" />
      <line x1="398" y1="356" x2="524" y2="356" stroke="var(--accento-atto)" strokeWidth="2" />
      <line x1="398" y1="366" x2="486" y2="366" stroke="var(--accento-atto)" strokeWidth="2" opacity=".5" />
      <path d="M246 354 C 272 354 276 312 300 312" fill="none" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="246" cy="354" r="2.5" fill="var(--accento-atto)" />

      <Quota x1={56} y={446} x2={560} testo="DAL PIANO ALLA RELAZIONE" />
      <Etichetta x={16} y={28}>STRATEGIA, CONTENUTO, CONVERSAZIONE</Etichetta>
      <Etichetta x={16} y={462}>FASE 02 — DAL CALENDARIO AL PRIMO COMMENTO</Etichetta>
    </>
  );
}

/* 03 — la linea di montaggio: sei inquadrature, i punti di attacco e stacco,
   la traccia audio sotto. */
function Video() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={40 + i * 88} y="110" width="76" height="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1={40 + i * 88} y1="136" x2={116 + i * 88} y2="136" stroke="currentColor" strokeWidth=".5" opacity=".4" />
          <text x={44 + i * 88} y="104" fontSize="9" letterSpacing="1.4" fill="currentColor" opacity=".6">0{i + 1}</text>
        </g>
      ))}
      {/* La barra di montaggio con i due punti di taglio. */}
      <rect x="40" y="214" width="520" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="128" y="214" width="216" height="34" fill="var(--accento-atto)" opacity=".22" />
      <line x1="128" y1="200" x2="128" y2="262" stroke="var(--accento-atto)" strokeWidth="2" />
      <line x1="344" y1="200" x2="344" y2="262" stroke="var(--accento-atto)" strokeWidth="2" />
      <text x="128" y="194" fontSize="9" letterSpacing="1.4" fill="var(--accento-atto)">IN</text>
      <text x="344" y="194" fontSize="9" letterSpacing="1.4" fill="var(--accento-atto)">OUT</text>
      {/* La traccia audio. */}
      <g stroke="currentColor" strokeWidth="2" opacity=".55">
        {Array.from({ length: 60 }, (_, i) => {
          const h = 4 + Math.abs(Math.sin(i * 0.7) * 22) + (i % 5) * 1.5;
          return <line key={i} x1={44 + i * 8.6} y1={330 - h} x2={44 + i * 8.6} y2={330 + h} />;
        })}
      </g>
      <Quota x1={128} y={392} x2={344} testo="IL TAGLIO" />
      <Etichetta x={16} y={28}>STORYBOARD E MONTAGGIO</Etichetta>
      <Etichetta x={16} y={462}>FASE 03 — SELEZIONE DELLE INQUADRATURE</Etichetta>
    </>
  );
}

/* 04 — la pagina prima della grafica: dodici colonne, le grondaie, i blocchi
   che prendono posto. */
function Web() {
  return (
    <>
      <g opacity=".3">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={40 + i * 44} y="70" width="30" height="330" fill="var(--accento-atto)" opacity=".3" />
        ))}
      </g>
      <rect x="40" y="70" width="514" height="46" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="40" y="132" width="294" height="150" fill="none" stroke="var(--accento-atto)" strokeWidth="2" />
      <rect x="348" y="132" width="206" height="150" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={40 + i * 176} y="298" width="162" height="102" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ))}
      <line x1="40" y1="70" x2="40" y2="420" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="554" y1="70" x2="554" y2="420" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="4 4" />
      <Quota x1={40} y={440} x2={554} testo="12 COLONNE" />
      <Etichetta x={16} y={28}>GABBIA E GERARCHIA</Etichetta>
      <Etichetta x={16} y={462}>FASE 01 — STRUTTURA PRIMA DELLA GRAFICA</Etichetta>
    </>
  );
}

/* 05 — un'idea sola declinata: lo stesso segno che cambia misura senza
   cambiare peso, dal 6x3 alla storia. */
function Advertising() {
  const tagli: [number, number, number, number, string][] = [
    [40, 96, 244, 122, "6 X 3"],
    [304, 96, 118, 168, "MUPI"],
    [442, 96, 112, 112, "FEED"],
    [304, 284, 118, 116, "STORY"],
    [442, 228, 112, 172, "BANNER"],
    [40, 240, 244, 160, "AFFISSIONE"],
  ];
  return (
    <>
      {tagli.map(([x, y, w, h, nome], i) => (
        <g key={nome}>
          <rect x={x} y={y} width={w} height={h} fill="none" stroke="currentColor" strokeWidth={i === 0 ? 2 : 1.25} />
          {/* Lo stesso segno, in scala: e' la prova che l'idea regge. */}
          <circle cx={x + w * 0.26} cy={y + h * 0.5} r={Math.min(w, h) * 0.16} fill="var(--accento-atto)" />
          <line x1={x + w * 0.44} y1={y + h * 0.42} x2={x + w * 0.86} y2={y + h * 0.42} stroke="currentColor" strokeWidth="2" opacity=".55" />
          <line x1={x + w * 0.44} y1={y + h * 0.58} x2={x + w * 0.7} y2={y + h * 0.58} stroke="currentColor" strokeWidth="2" opacity=".3" />
          <text x={x + 4} y={y - 7} fontSize="8.5" letterSpacing="1.4" fill="currentColor" opacity=".6">{nome}</text>
        </g>
      ))}
      <Etichetta x={16} y={28}>UNA DECLINAZIONE PER SUPPORTO</Etichetta>
      <Etichetta x={16} y={462}>FASE 02 — TENUTA DELL’IDEA SUI FORMATI</Etichetta>
    </>
  );
}

/* 06 — la pianta della serata: palco, platea, regia, bar, e i passaggi che
   devono restare liberi. */
function Eventi() {
  return (
    <>
      <rect x="40" y="60" width="514" height="356" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="120" y="86" width="354" height="76" fill="var(--accento-atto)" opacity=".2" />
      <rect x="120" y="86" width="354" height="76" fill="none" stroke="var(--accento-atto)" strokeWidth="2" />
      <text x="297" y="130" textAnchor="middle" fontSize="11" letterSpacing="2.4" fill="var(--accento-atto)">PALCO</text>
      {/* La platea, a file. */}
      <g opacity=".6">
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 14 }, (_, c) => (
            <rect key={`${r}-${c}`} x={124 + c * 25} y={200 + r * 26} width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1" />
          )),
        )}
      </g>
      <rect x="66" y="200" width="42" height="126" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <text x="87" y="268" textAnchor="middle" fontSize="8.5" letterSpacing="1.4" fill="currentColor" opacity=".7" transform="rotate(-90 87 268)">BAR</text>
      <rect x="486" y="200" width="42" height="126" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <text x="507" y="268" textAnchor="middle" fontSize="8.5" letterSpacing="1.4" fill="currentColor" opacity=".7" transform="rotate(-90 507 268)">REGIA</text>
      {/* Le vie di passaggio: si disegnano prima delle sedie, non dopo. */}
      <line x1="118" y1="352" x2="476" y2="352" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="6 5" />
      <line x1="297" y1="180" x2="297" y2="376" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="6 5" />
      <Quota x1={120} y={396} x2={474} testo="PASSAGGI LIBERI" />
      <Etichetta x={16} y={28}>PIANTA DI ALLESTIMENTO</Etichetta>
      <Etichetta x={16} y={462}>FASE 01 — PRIMA CHE ARRIVI NESSUNO</Etichetta>
    </>
  );
}

const TAVOLE: Record<ServizioPagina["id"], () => React.JSX.Element> = {
  branding: Branding,
  social: Social,
  video: Video,
  web: Web,
  advertising: Advertising,
  eventi: Eventi,
};

export function MockupServizio({ servizio }: { servizio: ServizioPagina }) {
  const Tavola = TAVOLE[servizio.id];
  return (
    <svg
      className="tavola"
      viewBox="0 0 600 480"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Disegno di costruzione: una fase del lavoro di ${servizio.name.toLowerCase()}`}
    >
      <Reticolo />
      <Tavola />
      {/* Le squadrature agli angoli: il segno che distingue una tavola da un
          disegno, e che il sito usa gia' altrove. */}
      <g stroke="currentColor" strokeWidth="1.25" opacity=".8">
        <path d="M8 26 L8 8 L26 8 M574 8 L592 8 L592 26 M592 454 L592 472 L574 472 M26 472 L8 472 L8 454" fill="none" />
      </g>
    </svg>
  );
}
