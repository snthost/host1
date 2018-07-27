/*$("input#atributoaletras1").keypress(function(t){
  return t.which<46||t.which>57||2===this.value.length?(atributoaletras1.value="",!1):void 0});*/

$('input#atributoaletras1')
  .keypress(function (event) {
    // El código del carácter 0 es 48
    // El código del carácter 9 es 57
    if (event.which < 48 || event.which > 57 || this.value.length === 2) {
      return false;
    }
  });

$(document).ready(function () {
  $('input#atributoaletras1')
    .keypress(function (event) {
      if (event.which < 48 || event.which > 57 || this.value.length === 2) {
        return false;
      }
    });
});
