var arrayResStandard1 = new Array();
var arrayResStandard2 = new Array();
var Rin = 0;
var Rout = 0;
var R1out = 0;  
var R2out = 0;	

// -------------------------------------------------------------------------------
// Clear Data
// -------------------------------------------------------------------------------
function ClearData() {
		document.getElementById("txtTension").value = "";
		document.getElementById("txtCorriente").value = "";
		document.getElementById("txtResistencia").value = "";
		document.getElementById("txtPotencia").value = "";
		document.getElementById("mensaje").style.color = 'black';
		document.getElementById("cmbTension").selectedIndex = 0;
		document.getElementById("cmbCorriente").selectedIndex = 0;
		document.getElementById("cmbResistencia").selectedIndex = 0;
		document.getElementById("cmbPotencia").selectedIndex = 0;
		document.getElementById("mensaje").style.color = '#c2c9eb';
		document.getElementById("mensaje").innerHTML = "<i>Introducir solo dos parámetros para efectuar el cálculo.</i>";
}
// -------------------------------------------------------------------------------
// Clear Data
// -------------------------------------------------------------------------------
function CalcFormula() {

	var tension = 0;
	var corriente = 0;
	var resistencia = 0;
	var potencia = 0;
	var param_counter = 0;
	
	if (document.getElementById("txtTension").value > 0) param_counter = 1;
	if (document.getElementById("txtCorriente").value > 0) param_counter++;
	if (document.getElementById("txtResistencia").value > 0) param_counter++;
	if (document.getElementById("txtPotencia").value > 0) param_counter++;
	if (param_counter > 2 )
		{
			document.getElementById("mensaje").style.color = 'red';
			document.getElementById("mensaje").innerHTML = "<i><b>Error: has introducido más de dos parámetros y el cálculo no puede ser efectuado.</b></i>";    
			return
		}
	if (document.getElementById("txtTension").value > 0)
		{
			tension = document.getElementById("txtTension").value;
			if (document.getElementById("cmbTension").selectedIndex == 1)tension = tension * 1000;
			if (document.getElementById("txtCorriente").value > 0)
				{
				corriente = document.getElementById("txtCorriente").value;
				if (document.getElementById("cmbCorriente").selectedIndex == 1)corriente = corriente / 1000;
				wattFormat(corriente * tension);
				ohmsFormat(tension / corriente);
				
				}
			else if (document.getElementById("txtResistencia").value > 0)
				{
				resistencia = document.getElementById("txtResistencia").value;
				if (document.getElementById("cmbResistencia").selectedIndex == 1) resistencia = resistencia * 1000;
				else if (document.getElementById("cmbResistencia").selectedIndex == 2) resistencia = resistencia * 1000 * 1000;
				
				wattFormat(tension * tension / resistencia );
				ampFormat(tension / resistencia);
				
				}
			else if (document.getElementById("txtPotencia").value > 0)
				{
				potencia = document.getElementById("txtPotencia").value;
				if (document.getElementById("cmbPotencia").selectedIndex == 1) potencia = potencia / 1000;
				else if (document.getElementById("cmbPotencia").selectedIndex == 2) potencia = potencia * 1000;
				ampFormat(potencia / tension);
				ohmsFormat(tension * tension / potencia);				
				
				}
		}

	else if (document.getElementById("txtCorriente").value > 0)
		{
			corriente = document.getElementById("txtCorriente").value;
			if (document.getElementById("cmbCorriente").selectedIndex == 1)corriente = corriente / 1000;

			if (document.getElementById("txtResistencia").value > 0)
				{
				resistencia = document.getElementById("txtResistencia").value;
				if (document.getElementById("cmbResistencia").selectedIndex == 1) resistencia = resistencia * 1000;
				else if (document.getElementById("cmbResistencia").selectedIndex == 2) resistencia = resistencia * 1000 * 1000;				
				voltsFormat(corriente * resistencia );
				wattFormat(corriente * corriente * resistencia);
				
				}
			else if (document.getElementById("txtPotencia").value > 0)
				{
				potencia = document.getElementById("txtPotencia").value;
				if (document.getElementById("cmbPotencia").selectedIndex == 1) potencia = potencia / 1000;
				else if (document.getElementById("cmbPotencia").selectedIndex == 2) potencia = potencia * 1000;				
				voltsFormat(potencia / corriente);
				ohmsFormat(potencia / corriente / corriente);				
				
				}
		}

	else if (document.getElementById("txtResistencia").value > 0)
		{
			resistencia = document.getElementById("txtResistencia").value;
			if (document.getElementById("cmbResistencia").selectedIndex == 1) resistencia = resistencia * 1000;
			else if (document.getElementById("cmbResistencia").selectedIndex == 1) resistencia = resistencia * 1000 * 1000;			

			if (document.getElementById("txtPotencia").value > 0)
				{
				potencia = document.getElementById("txtPotencia").value;
				if (document.getElementById("cmbPotencia").selectedIndex == 1) potencia = potencia / 1000;
				else if (document.getElementById("cmbPotencia").selectedIndex == 2) potencia = potencia * 1000;				
				voltsFormat(Math.sqrt(potencia * resistencia ));
				ampFormat(Math.sqrt(potencia / resistencia));
				}
		}		
}

// -------------------------------------------------------------------------------
// Ohms Format
// -------------------------------------------------------------------------------
function ohmsFormat(ohmsValue){
	if (ohmsValue >= 1e6)
		{
		ohmsValue /=1e6;
		document.getElementById("txtResistencia").value = roundTo(ohmsValue, 2);
		document.getElementById("cmbResistencia").selectedIndex = 2;	
		}
	else if (ohmsValue >= 1e3)
		{
		ohmsValue /=1e3
		document.getElementById("txtResistencia").value = roundTo(ohmsValue, 2);
		document.getElementById("cmbResistencia").selectedIndex = 1;	
		}
	else if (ohmsValue === undefined)
		{
		document.getElementById("txtResistencia").value = "";
		document.getElementById("cmbResistencia").selectedIndex = 0;	
		}
	else 
		{
		document.getElementById("txtResistencia").value = roundTo(ohmsValue, 2);
		document.getElementById("cmbResistencia").selectedIndex = 0;	
		}
}		

// -------------------------------------------------------------------------------
// Volts Format
// -------------------------------------------------------------------------------
function voltsFormat(voltsValue){
	if (voltsValue >= 1e3)
		{
		voltsValue /=1e3
		document.getElementById("txtTension").value = roundTo(voltsValue, 2);
		document.getElementById("cmbTension").selectedIndex = 1;	
		}
	else if (voltsValue === undefined)
		{
		document.getElementById("txtTension").value = "";
		document.getElementById("cmbTension").selectedIndex = 0;	
		}
	else 
		{
		document.getElementById("txtTension").value = roundTo(voltsValue, 2);
		document.getElementById("cmbTension").selectedIndex = 0;	
		}
}		

// -------------------------------------------------------------------------------
// Current Format
// -------------------------------------------------------------------------------
function ampFormat(ampsValue){
	if (ampsValue < 0.1)
		{
		ampsValue *=1e3
		document.getElementById("txtCorriente").value = roundTo(ampsValue, 2);
		document.getElementById("cmbCorriente").selectedIndex = 1;	
		}
	else if (ampsValue === undefined)
		{
		document.getElementById("txtCorriente").value = "";
		document.getElementById("cmbCorriente").selectedIndex = 0;	
		}
	else 
		{
		document.getElementById("txtCorriente").value = roundTo(ampsValue, 2);
		document.getElementById("cmbCorriente").selectedIndex = 0;	
		}
}		

// -------------------------------------------------------------------------------
// Watt Format
// -------------------------------------------------------------------------------
function wattFormat(wattsValue){
	if (wattsValue >= 1e3)
		{
		wattsValue /=1e3
		document.getElementById("txtPotencia").value = roundTo(wattsValue, 2);
		document.getElementById("cmbPotencia").selectedIndex = 2;	
		}
	else if (wattsValue < 0.1)
		{
		wattsValue *=1e3
		document.getElementById("txtPotencia").value = roundTo(wattsValue, 2);
		document.getElementById("cmbPotencia").selectedIndex = 1;			
		}
	else if (wattsValue === undefined)
		{
		document.getElementById("txtPotencia").value = "";
		document.getElementById("cmbPotencia").selectedIndex = 0;	
		}
	else 
		{
		document.getElementById("txtPotencia").value = roundTo(wattsValue, 2);
		document.getElementById("cmbPotencia").selectedIndex = 0;	
		}
}		

// -------------------------------------------------------------------------------
// Redondea a X decimal
// -------------------------------------------------------------------------------
function roundTo(value, quantos_decimales)
{
    var i = value * Math.pow(10,quantos_decimales);
    i = Math.round(i);
    return i / Math.pow(10,quantos_decimales);
}
