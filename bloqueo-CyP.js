window.onload = function() {
  var myInput = document.getElementById('fname');
  var myInput = document.getElementById('lname');
  var myInput = document.getElementById('email');
  myInput.onpaste = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
  }
  
  myInput.oncopy = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
  }
}
