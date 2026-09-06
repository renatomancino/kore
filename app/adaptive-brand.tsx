"use client";

import { useEffect } from "react";

/* Le due tinte in cui esiste il marchio: ogni file e' lo stesso disegno in un
   colore solo su canale alfa, quindi basta scoprire l'uno o l'altro. */
const CORALLO = [254, 64, 66];
const PANNA = [255, 236, 197];

/* Quante altezze si campionano lungo il logo, piu' i passi di bisezione con
   cui si stringe sul punto esatto in cui lo sfondo cambia. */
const CAMPIONI = 16;
const AFFINAMENTI = 4;

function luminanza([r, g, b]: number[]) {
  const c = (v: number) => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
}

function contrasto(a: number[], b: number[]) {
  const [x, y] = [luminanza(a), luminanza(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/* Il gradino fra la testata e la sezione che ha sotto.
   Non una percentuale fissa: spostare del 9% verso il nero stacca bene una
   carta chiara (1.23) e quasi per niente il corallo (1.07), perche' su un
   tono medio quello spostamento vale poco. Qui si cresce finche' il
   contrasto arriva dove serve, cosi' il gradino si vede uguale su ogni
   fondo — poco, ma sempre.
   Il verso lo decide la luminanza: sopra la meta' percettiva si scurisce,
   sotto si schiarisce. */
const STACCO = 1.25;

function scosta(fondo: number[]) {
  const verso = luminanza(fondo) > 0.18 ? 0 : 255;
  let ultimo = fondo;
  for (let quanto = 0.06; quanto <= 0.62; quanto += 0.02) {
    ultimo = fondo.map((c) => Math.round(c + (verso - c) * quanto));
    if (contrasto(ultimo, fondo) >= STACCO) return ultimo;
  }
  return ultimo;
}

/**
 * Il marchio in testata prende il colore da cio' che ha sotto.
 *
 * Non una tinta sola scelta per tutto il logo: lo sfondo viene campionato a
 * piu' altezze, e quando cambia a meta' del marchio anche il marchio cambia a
 * meta'. E' il caso che capita a ogni confine fra due sezioni, dove un logo
 * monocolore sparisce per meta'.
 *
 * Nessun elenco di sezioni scritto a mano: il colore lo si misura, quindi
 * funziona anche sulle sezioni che ancora non esistono.
 *
 * Sta in un componente suo e non dentro ScrollEffects perche' quello si spegne
 * quando il sistema chiede meno movimento: qui non e' movimento, e' leggere il
 * marchio, e va fatto per tutti.
 */
export function AdaptiveBrand() {
  useEffect(() => {
    /* Si parte dal marchio e si risale alla testata che lo contiene: la
       stessa logica serve su quattro pagine con tre testate diverse. */
    const marchio = document.querySelector<HTMLElement>(".header-brand");
    const testata = marchio?.closest<HTMLElement>("header");
    const corallo = marchio?.querySelector<HTMLElement>(".brand-corallo");
    if (!testata || !marchio || !corallo) return;

    /* Il colore di un elemento, se ne dipinge uno abbastanza coprente.
       Non basta backgroundColor: diverse sezioni sono dipinte con gradienti,
       e li' backgroundColor resta trasparente mentre il colore vero sta nelle
       fermate. Senza questo la misura scivola fino al body. */
    const coloreDi = (n: Element) => {
      const stile = getComputedStyle(n);
      const pieno = stile.backgroundColor.match(/[\d.]+/g)?.map(Number);
      if (pieno && (pieno[3] === undefined || pieno[3] > 0.5)) return pieno.slice(0, 3);

      const fermate = [...stile.backgroundImage.matchAll(/rgba?\(([^)]+)\)/g)]
        .map((m) => m[1].split(",").map(Number))
        .filter((c) => c[3] === undefined || c[3] > 0.5);
      if (!fermate.length) return null;
      return [0, 1, 2].map((i) => Math.round(fermate.reduce((t, c) => t + c[i], 0) / fermate.length));
    };

    /* Il colore dipinto a una certa altezza. elementsFromPoint da' tutto cio'
       che sta nel punto dal davanti all'indietro: si salta la testata,
       altrimenti misura se stessa — e ora che ha un fondo pieno, misurarsi
       vorrebbe dire restare per sempre del colore in cui e' partita. */
    const sfondoIn = (x: number, y: number) => {
      for (const trovato of document.elementsFromPoint(x, y)) {
        if (testata.contains(trovato)) continue;
        for (let n: Element | null = trovato; n; n = n.parentElement) {
          const c = coloreDi(n);
          if (c) return c;
        }
      }
      return null;
    };

    /* Il fondo della regione, non dell'oggetto che ci sta sopra.
       `sfondoIn` restituisce il primo colore che incontra venendo dal
       davanti, ed e' quello che serve al marchio: il marchio deve leggersi
       su cio' che ha davvero sotto, fosse anche una fotografia.
       Alla testata serve l'opposto. Da quando l'archivio ha le pellicole,
       sotto al marchio passano schede a fondo nero: la testata seguiva
       quelle e lampeggiava fra la carta della sezione e il nero a ogni
       riquadro che le scorreva dietro. Qui si sale percio' alla sezione che
       contiene il punto e si misura da li' in su: il colore diventa quello
       del campo, non quello della scheda appoggiata sopra.
       Non il piu' esterno in assoluto: quello sarebbe il fondo della pagina,
       uguale dalla prima all'ultima sezione, e la testata smetterebbe di
       cambiare colore del tutto. */
    const fondoRegione = (x: number, y: number) => {
      for (const trovato of document.elementsFromPoint(x, y)) {
        if (testata.contains(trovato)) continue;
        const regione = trovato.closest("section, footer") ?? trovato;
        for (let n: Element | null = regione; n && n !== document.body; n = n.parentElement) {
          const c = coloreDi(n);
          if (c) return c;
        }
      }
      return null;
    };

    /* Vero se a quell'altezza il corallo si legge meglio della panna. */
    const vinceCorallo = (x: number, y: number) => {
      const c = sfondoIn(x, y);
      return c ? contrasto(CORALLO, c) > contrasto(PANNA, c) : false;
    };

    let ultima = "";
    const aggiorna = () => {
      const r = marchio.getBoundingClientRect();
      if (!r.height) return;
      const x = r.left + r.width / 2;
      const altezzaDi = (i: number) => r.top + (i / (CAMPIONI - 1)) * (r.height - 1);

      const primo = vinceCorallo(x, altezzaDi(0));
      let corrente = primo;
      const confini: number[] = [];

      for (let i = 1; i < CAMPIONI; i++) {
        const y = altezzaDi(i);
        if (vinceCorallo(x, y) === corrente) continue;
        /* Fra questo campione e il precedente c'e' un confine: lo si stringe
           per bisezione, cosi' il taglio cade dov'e' davvero e non a scalini. */
        let sopra = altezzaDi(i - 1);
        let sotto = y;
        for (let k = 0; k < AFFINAMENTI; k++) {
          const mezzo = (sopra + sotto) / 2;
          if (vinceCorallo(x, mezzo) === corrente) sopra = mezzo;
          else sotto = mezzo;
        }
        confini.push((sotto - r.top) / r.height);
        corrente = !corrente;
      }

      /* Una maschera a fasce nette: opaca dove vince il corallo, trasparente
         dove sotto deve restare la panna. */
      const fasce: string[] = [];
      let tinta = primo;
      let da = 0;
      for (const b of confini) {
        fasce.push(`${tinta ? "#000" : "transparent"} ${(da * 100).toFixed(2)}% ${(b * 100).toFixed(2)}%`);
        tinta = !tinta;
        da = b;
      }
      fasce.push(`${tinta ? "#000" : "transparent"} ${(da * 100).toFixed(2)}% 100%`);
      const maschera = `linear-gradient(to bottom, ${fasce.join(",")})`;

      /* La testata prende il colore della sezione che ha sotto, ma scostato.
         Identico non andava: diventava lo stesso campo del fondo, e una riga
         di testo che le passava dietro sembrava tagliata a meta' invece che
         coperta da una fascia. Serve un gradino — piccolo, quanto basta a
         dire "qui finisce la barra" — non un colore estraneo.
         Il verso lo decide la luminosita': un fondo chiaro si scurisce, uno
         scuro si schiarisce, cosi' lo scalino si vede su entrambi.
         Si campiona al centro del marchio, cioe' dove il marchio deve
         leggersi — se due sezioni si incontrano a meta' testata vince quella
         sotto al marchio, che e' l'unica che conta per la leggibilita'. */
      const fondo = fondoRegione(x, r.top + r.height / 2) ?? sfondoIn(x, r.top + r.height / 2);
      if (fondo) testata.style.setProperty("--fondo-testata", `rgb(${scosta(fondo).join(",")})`);

      if (maschera === ultima) return;
      corallo.style.maskImage = maschera;
      corallo.style.webkitMaskImage = maschera;
      ultima = maschera;
    };

    /* Da qui in poi comanda la misura: il corallo e' sempre acceso e a
       scoprirlo e' la maschera. Senza JS resta la panna, che e' la tinta
       giusta sull'hero rosso da cui la pagina parte. */
    marchio.dataset.logo = "misurato";

    let inCoda = 0;
    const suEvento = () => {
      if (inCoda) return;
      inCoda = requestAnimationFrame(() => {
        inCoda = 0;
        aggiorna();
      });
    };

    aggiorna();
    addEventListener("scroll", suEvento, { passive: true });
    addEventListener("resize", suEvento);
    return () => {
      cancelAnimationFrame(inCoda);
      removeEventListener("scroll", suEvento);
      removeEventListener("resize", suEvento);
    };
  }, []);

  return null;
}
