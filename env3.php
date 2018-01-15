<?php
function form_mail($sPara, $sAsunto, $sTexto, $sDe)
{
$bHayFicheros = 0;
$sCabeceraTexto = "";
$sAdjuntos = "";
if ($sDe)$sCabeceras = "From:".$sDe."\n";
else $sCabeceras = "";
$sCabeceras .= "MIME-version: 1.0\n";
foreach ($_POST as $sNombre => $sValor)
$sTexto = $sTexto."\n".$sNombre." = ".$sValor;

foreach ($_FILES as $vAdjunto)
{
if ($bHayFicheros == 0)
{
$bHayFicheros = 1;
$sCabeceras .= "Content-type: multipart/mixed;";
$sCabeceras .= "boundary=\"--_Separador-de-mensajes_--\"\n";

$sCabeceraTexto = "----_Separador-de-mensajes_--\n";
$sCabeceraTexto .= "Content-type: text/plain;charset=iso-8859-1\n";
$sCabeceraTexto .= "Content-transfer-encoding: 7BIT\n";

$sTexto = $sCabeceraTexto.$sTexto;
}
if ($vAdjunto["size"] > 0)
{
$sAdjuntos .= "\n\n----_Separador-de-mensajes_--\n";
$sAdjuntos .= "Content-type: ".$vAdjunto["type"].";name=\"".$vAdjunto["name"]."\"\n";;
$sAdjuntos .= "Content-Transfer-Encoding: BASE64\n";
$sAdjuntos .= "Content-disposition: attachment;filename=\"".$vAdjunto["name"]."\"\n\n";

$oFichero = fopen($vAdjunto["tmp_name"], 'r');
$sContenido = fread($oFichero, filesize($vAdjunto["tmp_name"]));
$sAdjuntos .= chunk_split(base64_encode($sContenido));
fclose($oFichero);
}
}
if ($bHayFicheros)
$sTexto .= $sAdjuntos."\n\n----_Separador-de-mensajes_----\n";
return(mail($sPara, $sAsunto, $sTexto, $sCabeceras));
}
if (form_mail("info@electronicasnt.site", $_POST[asunto],
"Los datos introducidos en el formulario son:\n\n", $_POST[email]))
/*#################################################################################33*/
$body = $_POST;
$subir = $POST["subir"];
$comments = $_POST["comments"]; 
$nombre = $_FILES['subir']['name'];
$tipo =   $_FILES['subir']['type'];
$tamM =   $_FILES['subir']['size'];
$temp=   $_FILES["subir"]["tmp_name"];
if (!((strpos($tipo, "pdf") || strpos($tipo, "jpeg") || strpos ($tipo, "png") ))) {
    header("location: //www.electronicasnt.site/p/formualriovacio-error-formulario-vacio.html?error1");
                                       return false;   
}else{
if (!($tamM < 1572864)) {
    header("location: //www.electronicasnt.site/p/formualriovacio-error-formulario-vacio.html?error2");
                                       return false;     
}else{
    if (move_uploaded_file($_FILES['subir']['tmp_name'], $nombre)){
    }else{
    header("location: //www.electronicasnt.site/?m=1/intnetelo_mas_tarde");
                                       return false;     
    }
}
} 
$body .= '<==================================>'."\n";
$body .= "Comentario:\n" .$comments."\n";
$body .= '<==================================>'."\n";
    $subject    = "Archivo_enviado";
header("Location: https://www.electronicasnt.site?m=1"); 
?>
