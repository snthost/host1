/*$("input#atributoaletras1").keypress(function(t){
  return t.which<48||t.which>57||2===this.value.length?(atributoaletras1.value="",!1):void 0});*/

$(document).ready(function () {
  $('input#atributoaletras1')
    .keypress(function (event) {
      if (event.which < 48 || event.which > 57 || this.value.length === 2) {
        document.getElementById("atributoaletras1").value = "";
        return false;
      }
    });
});
