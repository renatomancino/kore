/**
 * La freccia in diagonale delle chiamate all'azione.
 *
 * Era il carattere `↗` (U+2197). Su Mac e Windows i font del sito hanno quel
 * glifo e la freccia esce tipografica; su iOS e Android no, e il sistema
 * ripiega sul font a colori delle emoji — al cliente arrivava un quadrato blu
 * lucido in mezzo a una pillola nera.
 *
 * Il carattere non si puo' "convincere": il selettore di variazione U+FE0E
 * chiede la resa testuale ma non tutti i sistemi lo rispettano, e resterebbe
 * una scommessa su ogni telefono nuovo. Disegnarla e' l'unico modo per sapere
 * cosa vedra' chi guarda.
 *
 * Eredita il colore da chi la contiene (`currentColor`) e la misura dal corpo
 * del testo (`1em`), quindi entra nei cerchi esistenti senza toccarne il CSS:
 * il cerchio continua a ruotare al passaggio del mouse, perche' ruota lui, non
 * la freccia.
 */
export function Freccia() {
  return (
    <svg
      className="freccia"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}
