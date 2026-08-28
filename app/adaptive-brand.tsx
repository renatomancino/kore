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

      /* Lo stesso colore misurato tinge la testata: cosi' non e' una fascia
         sopra la pagina ma il bordo alto della sezione in cui ci si trova.
         Si campiona al centro del marchio, cioe' dove il marchio deve
         leggersi — se due sezioni si incontrano a meta' testata vince quella
         sotto al marchio, che e' l'unica che conta per la leggibilita'. */
      const fondo = sfondoIn(x, r.top + r.height / 2);
      if (fondo) testata.style.setProperty("--fondo-testata", `rgb(${fondo.join(",")})`);

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
