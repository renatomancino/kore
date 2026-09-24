<?php
/* Modello di api/config-posta.php, il file che api/brief.php legge per spedire
   con la casella di Kore. Si copia a mano sul server, in api/, accanto a
   brief.php, e si riempie la' con i dati veri: non va mai nel repository. */
return [
    'host' => 'smtps.aruba.it',
    'porta' => 465,
    'utente' => 'info@korestudioadv.it',
    'password' => '',
];
