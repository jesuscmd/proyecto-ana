<?php
if($_POST)
{
    $to_email       = "hello@gruk.me"; //Recipient email, Replace with own email here
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    //$country_code   = filter_var($_POST["country_code"], FILTER_SANITIZE_NUMBER_INT);
    $phone_number   = filter_var($_POST["phone_number"], FILTER_SANITIZE_NUMBER_INT);


    $archivos = "";


    if(isset($_POST["files"])) {
        $archivos = "\r\n" . "Archivos incluidos:" . "\r\n";
        $files   = $_POST["files"];
        foreach ($files as &$value) {
            $archivos = $archivos . "<a href='/partials/files/". $value ."'>" . $value. "</a>" . "\r\n";
        }
    }
    //$subject        = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    //$message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($user_name)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Introduzca un nombre válido'));
        die($output);
    }
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Introduzca un e-mail válido'));
        die($output);
    }
    // if(!filter_var($country_code, FILTER_VALIDATE_INT)){ //check for valid numbers in country code field
    //     $output = json_encode(array('type'=>'error', 'text' => 'Enter only digits in country code'));
    //     die($output);
    // }
    if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
        $output = json_encode(array('type'=>'error', 'text' => 'Introduzca sólo números en el teléfono'));
        die($output);
    }
    // if(strlen($subject)<3){ //check emtpy subject
    //     $output = json_encode(array('type'=>'error', 'text' => 'Subject is required'));
    //     die($output);
    // }
    // if(strlen($message)<3){ //check emtpy message
    //     $output = json_encode(array('type'=>'error', 'text' => 'Mensaje vacío'));
    //     die($output);
    // }
    
    //email body
    $message_body = $user_name."\r\nEmail : ".$user_email."\r\nPhone Number : ". $phone_number;
    
    //proceed with PHP email.
    $headers = 'From: '.$user_name.'' . "\r\n" .
    'Reply-To: '.$user_email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    $send_mail = mail($to_email, "nueva solicitud de carrera", $message_body, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Tu mensaje ha sido enviado con éxito ¿Deseas enviar otro mensaje?'));
        die($output);
    }
}
?>