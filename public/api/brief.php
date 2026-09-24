<?php
/**
 * Riceve il brief dal modulo di /idea, lo spedisce alla casella di Kore e manda
 * a chi ha scritto una conferma con testo fisso.
 *
 * Prende il posto di app/api/brief/route.ts: il sito ora vive su un hosting
 * Aruba che serve file e esegue PHP, non Node. Il comportamento e' lo stesso.
 *
 * La password della casella NON sta qui e non sta nel repository: sta in
 * config-posta.php, accanto a questo file, creato a mano sul server partendo
 * da aruba/config-posta.esempio.php. Un .htaccess in questa cartella vieta di
 * scaricarlo. Senza quel file lo script prova la funzione mail() di PHP.
 *
 * Non salva niente: niente database, niente file, e nei registri finisce solo
 * che la spedizione e' fallita, mai il contenuto. La pagina privacy lo
 * promette: se questo cambia, va cambiata anche lei.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const CASELLA = 'info@korestudioadv.it';
/* Un brief vero sta in pochi KB; in byte, perche' lettere accentate ed emoji
   ne occupano piu' d'uno. Oltre e' qualcuno che usa il modulo per altro. */
const MASSIMO_BYTE = 60000;
/* Lo stesso nome del campo nascosto in app/idea/brief-testo.ts. */
const TRAPPOLA = 'kore_controllo';

function esito(string $nome, int $stato): void
{
    http_response_code($stato);
    echo json_encode(['esito' => $nome]);
    exit;
}

function taglia(string $testo, int $massimo): string
{
    return function_exists('mb_substr') ? mb_substr($testo, 0, $massimo, 'UTF-8') : substr($testo, 0, $massimo);
}

function campo(array $dati, string $chiave, int $massimo): string
{
    $valore = $dati[$chiave] ?? '';
    return is_string($valore) ? taglia(trim($valore), $massimo) : '';
}

/* Intestazioni in UTF-8: senza, "Città" arriva come "CittÃ ". */
function codifica(string $testo): string
{
    return '=?UTF-8?B?' . base64_encode($testo) . '?=';
}

/* Mai un a capo dentro un'intestazione: e' il modo in cui un modulo diventa un
   megafono per lo spam, aggiungendo destinatari che nessuno ha scelto. */
function senzaACapo(string $testo): string
{
    return trim(str_replace(["\r", "\n"], ' ', $testo));
}

/** La conferma per chi ha scritto: testo fisso, approvato dal cliente il 14/09/2026. */
function testoConferma(string $nome): string
{
    /* Nel nome restano solo lettere, spazi, apostrofi e trattini, al massimo 30
       caratteri: un nome vero ci sta, un indirizzo web o una frase no. Nel
       modulo chiunque puo' scrivere l'indirizzo di un altro, e la conferma non
       deve poter portare a quella persona testi scelti da chi scrive. */
    $pulito = preg_replace("/[^\\p{L}\\s'’-]/u", '', $nome) ?? '';
    $pulito = trim(taglia(trim((string) preg_replace('/\s+/u', ' ', $pulito)), 30));
    $saluto = $pulito !== '' ? "Ciao {$pulito}," : 'Ciao,';
    return implode("\n", [
        "{$saluto} il tuo brief è arrivato e lo leggiamo con attenzione. Ti rispondiamo presto a questo indirizzo.",
        'Se vuoi aggiungere qualcosa, rispondi pure a questa mail.',
        '',
        'Kore Studio — Torre del Greco / Casoria / Ovunque',
    ]);
}

/* Il messaggio intero: intestazioni e corpo in base64, che ha righe corte e non
   comincia mai con un punto, quindi passa intatto dal protocollo SMTP. */
function messaggio(string $nomeMittente, string $a, ?string $rispondiA, string $oggetto, string $corpo): string
{
    $righe = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . codifica($nomeMittente) . ' <' . CASELLA . '>',
        'To: <' . $a . '>',
        'Subject: ' . codifica($oggetto),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@korestudioadv.it>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    if ($rispondiA !== null) {
        $righe[] = 'Reply-To: <' . $rispondiA . '>';
    }
    return implode("\r\n", $righe) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($corpo), 76, "\r\n"));
}

/* Spedisce dal server di posta di Aruba autenticandosi con la casella, come
   faceva il sito su Node: il mittente resta info@ e la mail e' firmata. */
function spedisciSmtp(array $conf, string $nomeMittente, string $a, ?string $rispondiA, string $oggetto, string $corpo): bool
{
    $contesto = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $flusso = @stream_socket_client('ssl://' . $conf['host'] . ':' . (int) $conf['porta'], $numero, $errore, 15, STREAM_CLIENT_CONNECT, $contesto);
    if ($flusso === false) {
        return false;
    }
    stream_set_timeout($flusso, 15);

    $leggi = static function () use ($flusso): string {
        $risposta = '';
        while (($riga = fgets($flusso, 1024)) !== false) {
            $risposta .= $riga;
            /* Le risposte su piu' righe hanno un trattino dopo il codice; l'ultima uno spazio. */
            if (strlen($riga) < 4 || $riga[3] === ' ') {
                break;
            }
        }
        return $risposta;
    };
    $scambio = static function (?string $comando, string $atteso) use ($flusso, $leggi): bool {
        if ($comando !== null) {
            fwrite($flusso, $comando . "\r\n");
        }
        return strncmp($leggi(), $atteso, 3) === 0;
    };

    $ok = $scambio(null, '220')
        && $scambio('EHLO korestudioadv.it', '250')
        && $scambio('AUTH LOGIN', '334')
        && $scambio(base64_encode((string) $conf['utente']), '334')
        && $scambio(base64_encode((string) $conf['password']), '235')
        && $scambio('MAIL FROM:<' . CASELLA . '>', '250')
        && $scambio('RCPT TO:<' . $a . '>', '250')
        && $scambio('DATA', '354')
        && $scambio(messaggio($nomeMittente, $a, $rispondiA, $oggetto, $corpo) . "\r\n.", '250');

    fwrite($flusso, "QUIT\r\n");
    fclose($flusso);
    return $ok;
}

/* Il piano B se sul server manca config-posta.php. Aruba potrebbe cambiare il
   mittente con la casella postmaster del dominio: la mail arriva lo stesso. */
function spedisciMail(string $nomeMittente, string $a, ?string $rispondiA, string $oggetto, string $corpo): bool
{
    $intestazioni = [
        'From: ' . codifica($nomeMittente) . ' <' . CASELLA . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    if ($rispondiA !== null) {
        $intestazioni[] = 'Reply-To: <' . $rispondiA . '>';
    }
    return mail($a, codifica($oggetto), chunk_split(base64_encode($corpo)), implode("\r\n", $intestazioni));
}

function spedisci(?array $conf, string $nomeMittente, string $a, ?string $rispondiA, string $oggetto, string $corpo): bool
{
    return $conf !== null
        ? spedisciSmtp($conf, $nomeMittente, $a, $rispondiA, $oggetto, $corpo)
        : spedisciMail($nomeMittente, $a, $rispondiA, $oggetto, $corpo);
}

/* ------------------------------------------------------------------------- */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    esito('metodo-non-ammesso', 405);
}

$corpoRichiesta = file_get_contents('php://input', false, null, 0, MASSIMO_BYTE + 1);
if ($corpoRichiesta === false || strlen($corpoRichiesta) > MASSIMO_BYTE) {
    esito('troppo-lungo', 413);
}

$dati = json_decode($corpoRichiesta, true);
if (!is_array($dati)) {
    esito('illeggibile', 400);
}

/* La trappola piena e' un programma: gli si risponde che e' andato tutto bene
   e non si spedisce niente, cosi' non impara ad aggirarla. */
if (campo($dati, TRAPPOLA, 500) !== '') {
    esito('spedito', 200);
}

/* Il testo del brief lo compone il modulo (lo stesso che chi scrive vede in
   "Quello che ci arriva"): arriva solo alla casella di Kore, quindi qui si
   controllano le cose che servono a rispondere e che finiscono nelle
   intestazioni, non la prosa. */
$nome = senzaACapo(campo($dati, 'nome', 120));
$azienda = senzaACapo(campo($dati, 'azienda', 160));
$email = campo($dati, 'email', 200);
$brief = campo($dati, 'brief', 20000);
$consenso = ($dati['consenso'] ?? false) === true;

if ($nome === '' || $brief === '' || !$consenso || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    esito('incompleto', 422);
}

$percorsoConfig = __DIR__ . '/config-posta.php';
$conf = null;
if (is_file($percorsoConfig)) {
    $letta = require $percorsoConfig;
    if (is_array($letta) && !empty($letta['host']) && !empty($letta['utente']) && !empty($letta['password'])) {
        $conf = $letta + ['porta' => 465];
    }
}

$oggetto = 'Nuovo brief — ' . ($azienda !== '' ? $azienda : $nome);
if (!spedisci($conf, 'Sito Kore Studio', CASELLA, $email, $oggetto, $brief)) {
    /* Solo che e' fallita, e con quale strada: il messaggio del server di posta
       puo' citare gli indirizzi, e i registri non sono il posto dei dati. */
    error_log('brief non spedito (' . ($conf !== null ? 'smtp' : 'mail') . ')');
    esito('non-spedito', 502);
}

/* La conferma. Se non parte, il brief e' arrivato comunque e chi scrive vede
   "spedito" lo stesso. */
if (!spedisci($conf, 'Kore Studio', $email, null, 'Abbiamo ricevuto il tuo brief — Kore Studio', testoConferma($nome))) {
    error_log('conferma non spedita (' . ($conf !== null ? 'smtp' : 'mail') . ')');
}

esito('spedito', 200);
