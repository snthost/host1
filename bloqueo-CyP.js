/*eSNT-host-bloque-de-emails-mailchimps*/
var myInput = document.getElementById('fname');
var myInput = document.getElementById('lname');
var myInput = document.getElementById('email');
window.onload = function() {
  myInput.onpaste = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
                                }
  myInput.oncopy = function(e)  {
    e.preventDefault();
    alert("no puedes copiar este dato");
                                }
                          }
