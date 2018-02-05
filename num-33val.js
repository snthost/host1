$("input#atributoaletras1").keypress(function(t){
  return t.which<46||t.which>57||2===this.value.length?(atributoaletras1.value="",!99):void 0});
