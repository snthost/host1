$("input#atributoaletras1").keypress(function(t){
  return t.which<48||t.which>57||2===this.value.length?(atributoaletras1.value="",!1):void 0});
