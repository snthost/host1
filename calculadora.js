function solonumeros(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    numeros="0123456789";
    especiales="8-37-39-46";
    tecla_especial=false;
    for(var i in especiales){
        if(key==especiales[i]){
            tecla_especial=true;
        }
    }
    if(numeros.indexOf(teclado)==-1 && !tecla_especial){
        return false;
    }
}
function retornar(num){
    var anterior=document.fo.valores.value;
    document.getElementById("valores").value=anterior+num;
}
function eliminar(){

    var anterior=document.fo.valores.value;

    var nuevovalor=anterior.substring(0,anterior.length-1);

    document.getElementById("valores").value=nuevovalor;
}
function eliminar_todo(){
    document.fo.valores.value="";
}
function comprobar(num){ 
var anterior = document.fo.valores.value;
if(anterior==""){
document.fo.valores.value="";
}else{    
    var anterior = document.fo.valores.value;
    document.getElementById("valores").value=anterior+num;
    esto=document.fo.valores.value;

    record=0; 
    igual=1; 
    var letraRecord 
    var b=0 
    var letra="" 

    for (a=1;a<esto.length;a++){      
    if (esto.charAt(a)=="+" || esto.charAt(a)=="-" || esto.charAt(a)=="*" || esto.charAt(a)=="/" || esto.charAt(a)=="."){ 
    igual=igual+1; 
    letra=esto.charAt(a);
    }else{ 
         if(igual>record){record=igual;letraRecord=letra} 
            igual=1 
         } 
         b=a 
    }   
    if(igual>record){
      record=igual;
      letraRecord=letra;
    } 
    if (record>2){
        var anterior = esto;
        var nuevovalor = anterior.substring(0, anterior.length-1);
        document.getElementById("valores").value=nuevovalor;
        record=0;b=0;igual=1;letra="";letraRecord="";
    }     
} 

}
function calcular(){
    var resultado=eval(document.fo.valores.value);

    if(resultado=="Infinity"){
        document.fo.valores.value="No se puede dividir entre cero";
    }else{
        document.fo.valores.value=resultado;
    }
    
}


