<?php
$content = $_POST; 
$body = $_POST; 
$firstname = $_POST["firstname"]; 
$lastname = $_POST["lastname"]; 
$email = $_POST["email"]; 
$address = $_POST["address"];
$phone .= $_POST["phone"]; 
$comments = $_POST["comments"]; 
$body .= '<==================================>'."\n";
$body .= "Nombre: ".$firstname."\n"; 
$body .= "apellidos: ".$lastname."\n"; 
$body .= "Direccion: ".$address."\n"; 
$body .= "Email: ".$email."\n"; 
$body .= "numero de telefono: ".$phone."\n"; 
$body .= '<==================================>'."\n";
$body .= 'LISTADO DE LOS SIGUIENTES ARTICULOS:'."\n";
$body .= '<==================================>'."\n";

for($i=1; $i < $content['itemCount'] + 1; $i++) {
$name = 'item_name_'.$i; 
$quantity = 'item_quantity_'.$i; 
$price = 'item_price_'.$i; 
$total = $content[$quantity]*$content[$price];
$cant = $content[$quantity];
$simpleCart_quantity += $cant;
$grandTotal += $total; 
$body .= 'Articulo No  '.$i.':'."\n". 
'nombre:'.$content[$name]."\n".
'Precio Por unidad Q  '.number_format($content[$price], 2, '.', '')."\n".
'Cantidad:   '.$content[$quantity]. "\n".
'Subtotal:  Q  '.number_format($total, 2, '.', '')."\n"; 
$body .= '<==================================>'."\n";
}
if($firstname === "" || $lastname === "" || $address === "" || $email === "" || 
   $phone === "" || $comments === "" ){
       header("Location: //www.electronicasnt.site/p/blog-page_61.html");  
                                        return false;
}
if($total === "0"){
       header("Location: //www.electronicasnt.site/carrito_vacio");  
                                        return false;    
}
/* parte final del listado */
$body .= 'total de articulos:  '.number_format($simpleCart_quantity)."\n";/*total de articulos*/
$body .= 'Total: Q  '.number_format($grandTotal, 2, '.', '')."\n"; /* cantidad total */
$body .= '<==================================>'."\n";
$body .= "comentario:\n" .$comments."\n";
$body .= '<==================================>'."\n";
    $headers    = "Content-Type: text/plain; charset=iso-8859-1\n";
    $headers = "From: ".$content[$firstname]." ".$content[$lastname]." <".$content[$email].">\n";
    $recipient  = "info@electronicasnt.site";
    $subject    = "Pedidos de articulos";
mail($recipient, $subject, $body, $headers); 
header("Location: //www.electronicasnt.site/p/gracias.html");  
?>