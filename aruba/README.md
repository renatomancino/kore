# Il sito com'e' su Aruba

Dal 15 settembre 2026 il sito vive sull'hosting Aruba di `www.korestudioadv.it`
come export statico di Next (`output: "export"`), non piu' su Netlify.

Fra il 15 e il 24 settembre il sito e' stato modificato direttamente sul File
Manager di Aruba, sui file gia' compilati, senza passare da questo
repository. Il 25/09/2026 quelle modifiche sono state riportate nel codice
sorgente (`app/`, `components/`, `lib/`, `app/globals.css`): la build di
questo repository ora produce lo stesso sito che c'e' online.

## Pubblicare

```bash
npm ci
npm run build
```

Poi caricare su Aruba **il contenuto** di `out/` nella radice del sito.
`api/config-posta.php` (la password della casella) non e' nel repository e
non va toccato: e' gia' sul server. Se si dovesse ricreare, il modello e'
`aruba/config-posta.esempio.php`.

Conviene caricare `out/` per intero e togliere dal server le cartelle
`_next/static/<id>/` e i file di `_next/static/chunks/` delle build vecchie:
sul server se ne erano accumulati di undici build diverse.

## `sito/`

E' la copia esatta di cio' che il server serviva il 25/09/2026, prima del
riallineamento: resta come riferimento. Non entra nella build (Tailwind la
ignora, vedi `@source not` in `globals.css`).

## Dove il sito online non era coerente con se stesso

I file sul server venivano da momenti diversi, e in alcuni punti l'HTML
diceva una cosa e il JavaScript un'altra. Dopo il riallineamento:

- **Link Instagram**: si apre in una scheda nuova su tutte le pagine.
- **Barra in basso**, terza voce: "Progetti" (scelta del 25/09/2026).
- **/servizi** mostrava ancora i sei mestieri vecchi mentre la home era
  passata agli otto servizi: ora la sezione degli otto servizi sta su
  /servizi, e la home rimanda li' dalla barra dei servizi.
