$(document).ready(function () {
  $('input#atributoaletras1')
    .keypress(function (event) {
      if (event.which < 46 || event.which > 57 || this.value.length === 2) {
        document.getElementById("atributoaletras1").value = "";
        return false;
      }
    });
  
function qty(val){
pqty = $('#atributoaletras1').val();
if (val == "plus") {
      var newVal = parseFloat(pqty) + 1;
    } else {
    if (pqty > 1) {
      var newVal = parseFloat(pqty) - 1;
    } else {
      newVal = 1;
    }
}
$('#atributoaletras1').val(newVal);
}
});
