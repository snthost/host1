/*eSNT-host-bloque-de-emails-mailchimps*/
window.onload = function() {
  var myInput = document.getElementById('fname');
  myInput.onpaste = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
  }
  
  myInput.oncopy = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
  }
}
