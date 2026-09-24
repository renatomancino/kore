# Il sito com'e' su Aruba

Dal 15 settembre 2026 il sito vive sull'hosting Aruba di `www.korestudioadv.it`
come export statico di Next (`output: "export"`), non piu' su Netlify.

Alcune modifiche sono state fatte direttamente sul File Manager di Aruba,
sui file gia' compilati, e non passano da questo repository. Per non
perderle, `sito/` e' la copia esatta di cio' che il server serviva il
25/09/2026 (ultima build caricata: 24/09/2026 05:57).

## Cosa c'e' e dove

| Sul server | Nel repository |
|---|---|
| pagine compilate (`*.html`, `*.txt`, `__next.*`, `_next/`, `opengraph-image`) | `aruba/sito/` |
| immagini, video, favicon, manifest | `public/` (uguali byte per byte) |
| `.htaccess`, `api/.htaccess`, `api/brief.php` | `public/` |
| `api/config-posta.php` (password della casella) | **mai nel repository** — modello in `aruba/config-posta.esempio.php` |

`sito/` e' un riferimento, non codice sorgente: i testi e le pagine nuove
(home, servizi, progetti, idea, privacy, menu e footer) vanno riportati nei
file di `app/` perche' una nuova build li contenga. Finche' non succede, una
build fatta da questo repository **cancellerebbe** quelle modifiche dal sito.

Per rimettere online esattamente questa versione: caricare su Aruba il
contenuto di `sito/` piu' quello di `public/`, e ricreare a mano
`api/config-posta.php`.
