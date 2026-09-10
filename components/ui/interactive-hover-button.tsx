"use client";

import React from "react";
import Link from "next/link";
import { Freccia } from "@/app/freccia";

/**
 * Il pulsante con la pastiglia che attraversa: la freccia sta in un cerchio a
 * destra e al passaggio del mouse scivola fino al bordo sinistro ruotando di
 * 45 gradi, mentre lo spazio interno si ribalta e il testo si sposta.
 *
 * Nasce da un componente shadcn, ma qui non poteva entrare com'era. Quello si
 * appoggia al `Button` di shadcn e ai token `bg-background`, `text-foreground`,
 * `bg-primary`: in questo progetto non esiste nessuno dei due — niente
 * `components.json`, niente `lib/utils`, niente `clsx`. La palette di Kore e'
 * un'altra e il sito e' scritto in CSS proprio, quindi l'aspetto sta in
 * `.pulsante-vivo` e qui c'e' solo la struttura.
 *
 * La freccia e' quella del sito e non `ArrowUpRight` di lucide: e' lo stesso
 * segno, e' gia' disegnata come vettoriale — proprio per non finire in balia
 * del font di sistema — e non vale una dipendenza in piu' in un progetto che
 * ne ha due in tutto.
 *
 * Rende un `<Link>` quando gli si passa `href`, perche' i due punti dove serve
 * portano a /idea e un `<button>` non naviga: si perderebbero apertura in
 * scheda nuova, anteprima del bersaglio e il collegamento agli occhi di un
 * motore di ricerca.
 */

type Comuni = { text: string; className?: string };
type ComeLink = Comuni & { href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
type ComeBottone = Comuni & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function Interno({ text }: { text: string }) {
  return (
    <>
      <span className="pulsante-vivo-testo">{text}</span>
      {/* Decorativa: il nome del collegamento e' gia' nel testo accanto. */}
      <span className="pulsante-vivo-pastiglia" aria-hidden="true">
        <Freccia />
      </span>
    </>
  );
}

function classi(className?: string) {
  return ["pulsante-vivo", className].filter(Boolean).join(" ");
}

export function InteractiveHoverButton(props: ComeLink | ComeBottone) {
  if (props.href !== undefined) {
    const { text, className, href, ...resto } = props as ComeLink;
    return (
      <Link href={href} className={classi(className)} {...resto}>
        <Interno text={text} />
      </Link>
    );
  }

  const { text, className, ...resto } = props as ComeBottone;
  return (
    <button type="button" className={classi(className)} {...resto}>
      <Interno text={text} />
    </button>
  );
}
