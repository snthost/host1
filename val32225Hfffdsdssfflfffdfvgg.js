simpleCart.bind( 'beforeCheckout' , function( data ){
data.firstname1 = document.getElementById("firstname1").value;
data.email1 = document.getElementById("email1").value;
data.phone1 = document.getElementById("phone1").value;
data.comments1 = document.getElementById("comments1").value;
emailval1 = /\w+@\w+\.+[a-z]/;
if(data.firstname1 === "" ||  data.email1 === "" || 
   data.phone1 === "" || data.comments1 === "" ){
                              alert("Todos los campos deben llenarse");
                                 return false;
                          }
else if(data.firstname1.length>20){
                              alert("nombre muy largo");  
                                 return false;                           
                          }
          else if(!isNaN(data.firstname1)){
                              alert("nombre invalido");  
                                 return false;                           
                          }
else if(data.lastname1.length>20){
                              alert("Apellido muy largo");  
                                 return false;                           
                          }
          else if(!isNaN(data.lastname1)){
                              alert("Apellido invalido");  
                                 return false;                           
                          }
else if(data.address1.length>50){
                              alert("direccion de entrega muy largo");  
                                 return false;                           
                          }
else if(data.email1.length>27){
                              alert("Email muy largo");  
                                 return false;                           
                          }
          else if(!emailval.test(data.email1)){
                              alert("Email no valido");  
                                 return false;                           
                          }
else if(data.phone1.length>11){
                              alert("telefono  muy largo");  
                                 return false;                           
                          }
else if(data.phone1.length<8){
                              alert("telefono  muy corto");  
                                 return false;                           
                          }
         else if(isNaN(data.phone1)){
                              alert("ingrese un numero telefonico valido");  
                                 return false;                           
                          }
else if(data.comments1.length>60){
                              alert("comentario  muy largo");  
                                 return false;                           
                          }
});
