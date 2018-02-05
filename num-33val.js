/*$("input#atributoaletras1").keypress(function(t){
  return t.which ===0||t.which<48||t.which>57||2===this.value.length?(atributoaletras1.value="",!1):void 0});
*/
$("input#atributoaletras1").keypress(function(t){
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
        return true;
    }
        
    // Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}
