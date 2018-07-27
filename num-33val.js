$(document).ready(function () {
  $('input#atributoaletras1')
    .keypress(function (event) {
      if (event.which < 46 || event.which > 57 || this.value.length === 2) {
        document.getElementById("atributoaletras1").value = "";
        return false;
      }
    });
});
