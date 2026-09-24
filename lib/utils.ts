import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Le classi di un componente piu' quelle passate da fuori, senza doppioni in conflitto. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
