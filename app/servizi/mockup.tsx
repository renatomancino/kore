import type { Service } from "../service-showcase";

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

/* 02 — i tre formati veri dei social, in scala fra loro, con la gabbia di
   sicurezza dentro cui il contenuto non viene mai tagliato. */
function Social() {
  const formati: [number, number, number, number, string][] = [
    [56, 150, 160, 160, "1:1"],
    [248, 118, 152, 190, "4:5"],
    [440, 84, 118, 210, "9:16"],
  ];
  return (
    <>
      {formati.map(([x, y, w, h, nome], i) => (
        <g key={nome}>
          <rect x={x} y={y} width={w} height={h} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} fill="none" stroke="var(--accento-atto)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={x + w / 2} y={y + h + 22} textAnchor="middle" fontSize="11" letterSpacing="1.6" fill="var(--accento-atto)">{nome}</text>
          <text x={x} y={y - 10} fontSize="9" letterSpacing="1.4" fill="currentColor" opacity=".6">0{i + 1}</text>
        </g>
      ))}
      <Quota x1={56} y={400} x2={558} testo="UNA SOLA IDEA, TRE TAGLI" />
      <Etichetta x={16} y={28}>GABBIE DI SICUREZZA</Etichetta>
      <Etichetta x={16} y={462}>FASE 01 — IMPAGINAZIONE DEI FORMATI</Etichetta>
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

const TAVOLE: Record<Service["id"], () => React.JSX.Element> = {
  branding: Branding,
  social: Social,
  video: Video,
  web: Web,
  advertising: Advertising,
  eventi: Eventi,
};

export function MockupServizio({ servizio }: { servizio: Service }) {
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
