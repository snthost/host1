var codigosTension = ["  ","0G","0L","0J","1A","1C","1E",
					 "1H","1J","1K","2A","2Q","2B","2C",
					 "2Z","2D","2P","2E","2F","2V","2G",
					 "2W","2H","2J","3A"]

var txtCodigosTolerancia = " BCDEFGHJKMNPZ";

// -------------------------------------------------------------------------------
// Code to Value
// -------------------------------------------------------------------------------					 
function codeToValue() {

	var txtTolerancia = "";
	var tolerancia = 0
	var txtTension = "";
	var tension = 0
	var multiplicador = 1 ;
	var codeCap = document.getElementById("txtCapCode").value;
	
	codeCap = codeCap.toUpperCase();
        codeCap = codeCap.replace(/ /g,'');
	 
	if (codeCap.length == 3)
		// ------------------------------------------
		// Solo capacidad
		// ------------------------------------------
		{
		MuestraCapacidad(codeCap);
		document.getElementById("cmbTolerancia").selectedIndex = 0;   // Default tolerancia
		document.getElementById("cmbTensionMax").selectedIndex = 0;   // Default tension		
		}
	else if (codeCap.length == 4)
		// ------------------------------------------
		// Capacidad y tolerancia
		// ------------------------------------------	
		{
		MuestraCapacidad(codeCap.substr(0,3));
		
		// Tolerancia
		// -----------		
		txtTolerancia = codeCap.substr(3,1);
		tolerancia = txtCodigosTolerancia.indexOf(txtTolerancia);
		document.getElementById("cmbTolerancia").selectedIndex = tolerancia;
		
		// Tension
		// --------		
		document.getElementById("cmbTensionMax").selectedIndex = 0;   // Default tension			
		}
	
	else if (codeCap.length == 5)
		// ------------------------------------------
		// Capacidad y tensión
		// ------------------------------------------	
		{
		MuestraCapacidad(codeCap.substr(2,3));
		document.getElementById("cmbTolerancia").selectedIndex = 0;   // Default tolerancia
		
		// Tension
		// --------
		txtTension = codeCap.substr(0,2);
		tension = codigosTension.indexOf(txtTension);		
		document.getElementById("cmbTensionMax").selectedIndex = tension;			
		}

	else if (codeCap.length == 6)
		// -----------------------------------------
		// Capacidad, tensión y tolerancia
		// -----------------------------------------	
		{
		MuestraCapacidad(codeCap.substr(2,3));
		
		// Tolerancia
		// -----------
		txtTolerancia = codeCap.substr(5,1);
		tolerancia = txtCodigosTolerancia.indexOf(txtTolerancia);
		document.getElementById("cmbTolerancia").selectedIndex = tolerancia;
		
		// Tension
		// --------
		txtTension = codeCap.substr(0,2);
		tension = codigosTension.indexOf(txtTension);		
		document.getElementById("cmbTensionMax").selectedIndex = tension;		
		}
}

// -------------------------------------------------------------------------------
// Value to Code
// -------------------------------------------------------------------------------
function valueToCode() {
	var codeCap = "";
	var multiplicador = 0;
	var picos = 0;
	var indice = document.getElementById("cmbTensionMax").selectedIndex;
	// Compone en el código la tensión
	// -----------------------------------
	if (indice != 0) codeCap = codigosTension[indice];
		
	// Compone en el código el valor
	// -----------------------------------
	picos = parseInt(document.getElementById("txtCapValue").value);
	indice = document.getElementById("cmbMultiplo").selectedIndex;
	
	if (indice == 1) picos = picos * 1000;
	else if (indice == 2) picos = picos * 1000000;
	
	if (picos < 10)
		{ 
		document.getElementById("txtCapCode").value = "-----";
		return; 
		}
		
	while( picos >= 100)
		{picos = picos / 10;
		multiplicador++;
		if (picos < 100 && Math.round(picos) != picos) picos = Math.round(ohms);
		}
	
	codeCap = codeCap + picos + multiplicador;
	
	// Compone en el código la tolerancia
	// -----------------------------------
	indice =  document.getElementById("cmbTolerancia").selectedIndex;
	if (indice != 0)
		{
		codeCap = codeCap + txtCodigosTolerancia[indice];
		}
	
	
	document.getElementById("txtCapCode").value = codeCap;		
		
}

// -------------------------------------------------------------------------------
// Muesta valor del capacitor
// -------------------------------------------------------------------------------
function MuestraCapacidad(codeCap){
	
	var txtPrefijo = "";
	var txtMultiplicador = "";	
	var capValor = 0;
	
	txtPrefijo = codeCap.substr(0,2);
	txtMultiplicador = codeCap.substr(2,1);
	capValor = parseInt(txtPrefijo) * Math.pow(10,parseInt(txtMultiplicador))

	if (capValor >= 1e6)
		{
		capValor /=1e6;
		document.getElementById("txtCapValue").value = capValor;
		document.getElementById("cmbMultiplo").selectedIndex = 2;	
		}

	else if (capValor >= 1e3)
		{
		capValor /=1e3;
		document.getElementById("txtCapValue").value = capValor;
		document.getElementById("cmbMultiplo").selectedIndex = 1;	
		}		
		
	else 
		{
		document.getElementById("txtCapValue").value = capValor;
		document.getElementById("cmbMultiplo").selectedIndex = 0;	
		}
}		
