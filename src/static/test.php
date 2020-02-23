<?php

    $EMAIL = 'ivan_kalita90@mail.ru';
    $API_KEY = 'g0nXohzRLFSwnz3TsKln44YaCuu';
    $baseURL = "https://$EMAIL:${API_KEY}@gate.smsaero.ru/v2/sms";

    $api = $_GET['api'];

    if ($api == 'send') {
        $code = $_GET['secret'];
        $phone = $_GET['phone'];
        $resultURL = "$baseURL/$api?number=$phone&sign=SMS+Aero&text=$code&channel=DIRECT";
    }
    else {
        $id = $_GET['id'];
        $resultURL = "$baseURL/$api?id=$id";
    }

    $ctx = file_get_contents($resultURL);
    
    echo $ctx;
?>