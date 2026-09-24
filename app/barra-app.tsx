"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

/* L'accento delle icone: il pezzo pieno di ogni disegno. */
const ACCENTO = "var(--red)";

type Voce = { href: string; numero?: string; nome: string; icona: ReactNode };

const VOCI: Voce[] = [
  {
    href: "/",
    nome: "Home",
    icona: (
      <>
        <path d="M4 11.2 12 4.6l8 6.6V20H4z" />
        <rect x="9.6" y="13" width="4.8" height="7" fill={ACCENTO} stroke="none" />
      </>
    ),
  },
  {
    href: "/servizi",
    numero: "02",
    nome: "Servizi",
    icona: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.6" fill={ACCENTO} stroke="none" />
        <rect x="13" y="4" width="7" height="7" rx="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="1.6" />
        <rect x="13" y="13" width="7" height="7" rx="1.6" />
      </>
    ),
  },
  {
    href: "/progetti",
    numero: "03",
    nome: "Progetti",
    icona: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2.4" />
        <path d="m3.5 16.5 5-5 4 4 2.6-2.6 5.4 5.4" />
        <circle cx="15.6" cy="9.4" r="1.9" fill={ACCENTO} stroke="none" />
      </>
    ),
  },
  {
    href: "/idea",
    numero: "04",
    nome: "Idea",
    icona: (
      <>
        <circle cx="12" cy="12" r="9.5" fill={ACCENTO} stroke="none" />
        <path d="M9 15 15 9M10.2 9H15v4.8" stroke="var(--ink)" strokeWidth="1.9" />
      </>
    ),
  },
];

/**
 * La barra in basso, come quella di un'app: le quattro pagine a portata di
 * pollice. Si nasconde mentre si scrive in un campo, quando la tastiera del
 * telefono le passerebbe sopra.
 */
export function BarraApp() {
  const percorso = usePathname();
  const [nascosta, setNascosta] = useState(false);

  useEffect(() => {
    const suFocus = (evento: FocusEvent) => {
      const bersaglio = evento.target;
      if (
        bersaglio instanceof HTMLElement &&
        (bersaglio.matches("input, textarea, select") || bersaglio.isContentEditable)
      ) {
        setNascosta(true);
      }
    };
    const suUscita = () => setNascosta(false);
    document.addEventListener("focusin", suFocus);
    document.addEventListener("focusout", suUscita);
    return () => {
      document.removeEventListener("focusin", suFocus);
      document.removeEventListener("focusout", suUscita);
    };
  }, []);

  return (
    <nav className="barra-app" aria-label="Navigazione principale" data-nascosta={nascosta ? "" : undefined}>
      {VOCI.map((voce) => (
        <Link
          key={voce.href}
          href={voce.href}
          aria-current={percorso === voce.href ? "page" : undefined}
          data-transizione=""
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {voce.icona}
          </svg>
          <span>{voce.nome}</span>
        </Link>
      ))}
    </nav>
  );
}
