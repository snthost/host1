class CampoNumerico {
  constructor(selector) {
    this.nodo = document.querySelector(selector);
    this.valor = '';
    this.empezarAEscucharEventos();
  }
  empezarAEscucharEventos() {
    this.nodo.addEventListener('keydown', function(evento) {
      const teclaPresionada = evento.key;
      const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));
      const sePresionoUnaTeclaNoAdmitida = 
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        !teclaPresionadaEsUnNumero;
      const comienzaPorCero = 
        this.nodo.value.length === 1 &&
        teclaPresionada == 1;

      if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault(); 
      } else if (teclaPresionadaEsUnNumero) {
        this.valor += String(teclaPresionada);
      }

    }.bind(this));
    this.nodo.addEventListener('input', function(evento) {
      const cumpleFormatoEsperado = new RegExp(/^[0-9]+/).test(this.nodo.value);

      if (!cumpleFormatoEsperado) {
        this.nodo.value = this.valor;
      } else {
        this.valor = this.nodo.value;
      }
    }.bind(this));
  }
}
new CampoNumerico('#atributoaletras');
simpleCart.bind('beforeAdd', function (newitem) {
simpleCart.each(function (cartitem) {
    if (cartitem.get("name") === newitem.get("name")) {
        cartitem.remove();
      return false;
   }
})
});
