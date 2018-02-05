$("input#atributoaletras1").keypress(function(t){
  return t.which<46||t.which>57||2===this.value.length?(atributoaletras1.value=""):void 0});
