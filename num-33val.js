/*$("input#atributoaletras1").keypress(function(t){
  return t.which<48||t.which>57||2===this.value.length?(atributoaletras1.value="",!1):void 0});
*/
      function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
 
         return true;
      }
