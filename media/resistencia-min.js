var languageSelect = 1;  
var templanguage = 0;
var optBand5;
var multiplierArray = [0,1,2,3,4,5,6,7,8,9,-1,-2];
var bandValue = [-1,-1,-1,-1,-1]

var colorNameArray = new Array();
var colorBandArray = new Array();
var namesArray = new Array();


colorNameArray[0]=["black","brown","red","orange","yellow","green","blue","violet","grey","white","gold","silver"];
colorNameArray[1]=["negro +0","marron +1","roja +2 ","naranja +3","amarilla +4","verde +5","azul +6","violeta +7","gris +8","blanca +9","dorada -1","plateada -2"];


var cart = String.fromCharCode(109, 101, 100, 105, 97, 47);
var est = String.fromCharCode(46, 112, 110, 103);

colorBandArray[0]=[0,1,2,3,4,5,6,7,8,9];
colorBandArray[1]=[0,1,2,3,4,5,6,7,8,9];
colorBandArray[2]=[0,1,2,3,4,5,6,7,8,9];
colorBandArray[3]=[0,1,2,3,4,5,6,7,10,11];
colorBandArray[4]=[1,10,11];

namesArray[1]=["calc,calc"];

var vuoto = cart + "band_blank" + est;
var cart_pref = cart + "band_";
// -------------------------------------------------------------------------------
// Agregar bandas de color de opción en el campo de selección
// -------------------------------------------------------------------------------
function optColorBands(){

var comboSelect;
var txt = namesArray[languageSelect][0];

for (var index = 1; index <= colorBandArray.length; index++)
	{
	comboSelect = document.getElementById("band" + index);
	selectAddOptions(comboSelect, colorBandArray[index - 1], colorNameArray[languageSelect])	
	document.getElementById("titBand" + index).innerHTML = txt + " " + index + ": ";
	}

txt = namesArray[languageSelect][1]
document.getElementById("lblTitCalc").innerHTML = txt;
	
bandChange()

document.getElementById("cmbResToler")[0].selected = true;

LanguageShowHide()

}
// seleccion de bandas
// -------------------------z
function selectAddOptions(selectObj, arrayItem, arrayName ){

for (var index = 0; index < arrayItem.length; index++)	
	{ 
	var option = document.createElement('option');
	option.text = arrayName[arrayItem[index]];
	selectObj.add(option);
	}
}
// -------------------------------------------------------------------------------
// cambiar color
// -------------------------------------------------------------------------------
function colorChange(){
	var img_name;
	var bandSelected = 0;
	var indexInColorNameArray ;

	for (var bandSelectIndex = 1; bandSelectIndex <= 5; bandSelectIndex++){
		bandSelected = document.getElementById("band" + bandSelectIndex)
		itemSelected = bandSelected.selectedIndex

		if (itemSelected > 0){
			indexInColorNameArray = colorBandArray[bandSelectIndex-1][itemSelected - 1]
			bandValue[bandSelectIndex -1] = indexInColorNameArray;
			img_name = cart_pref + colorNameArray[0][indexInColorNameArray] + est;
			}
		else {
			bandValue[bandSelectIndex -1] = -1;
			img_name = vuoto;
			}
	
		if (!optBand5 && bandSelectIndex == 3 )
			document.getElementById("imgBand" + (bandSelectIndex + 1)).src = img_name;
		else
			document.getElementById("imgBand" + bandSelectIndex ).src = img_name;

		if (bandSelectIndex == 5){
			document.getElementById("cmbResToler")[itemSelected ].selected = true;	
			}
	}
	document.getElementById("txtResValue").value = ohmsFormat(ResCalc());
}
// -------------------------------------------------------------------------------
// cambiar tolerancia
// -------------------------------------------------------------------------------		
function changeToler(choice){
	var img_name;
	var itemSelected;
	if (choice.selectedIndex > 0)
		{
		itemSelected = colorBandArray[4][choice.selectedIndex - 1];	
	  	img_name= cart_pref + colorNameArray[0][itemSelected] + est;
		}
	else
		img_name = vuoto;
	
	document.getElementById("imgBand5").src = img_name;
	document.getElementById("band5").selectedIndex = choice.selectedIndex ;		
}
// -------------------------------------------------------------------------------
// valor de resistencias en texto
// -------------------------------------------------------------------------------
function returnResValue(event) {
if (event.keyCode == 13) valueToColors();
}
// -------------------------------------------------------------------------------
// valor de los colores
// -------------------------------------------------------------------------------
function valueToColors(){

var multiplier = 1 ;
var ohms = 0;
var img_name;
var rounded = 0;

var txtOhms = document.getElementById("txtResValue").value
txtOhms = txtOhms.toUpperCase();
txtOhms = txtOhms.replace(",", ".");
txtOhms = txtOhms.replace("OHM", "");
txtOhms = txtOhms.replace("S", "");


if (txtOhms.search("K") >= 0) 	multiplier = 1000;
else if (txtOhms.search("M") >= 0) multiplier = 1000000;

txtOhms = txtOhms.replace(/[ KM]/g, "");
ohms = txtOhms * multiplier;

multiplier = 0;

if (!optBand5)
	{
	while( ohms >= 100)
		{
		ohms = ohms / 10
		multiplier++;
		
		if (ohms < 100 && Math.round(ohms) != ohms)
			{
			ohms = Math.round(ohms)
			rounded = 1;
			}
		}
		if (ohms < 1)
			{ ohms *= 100;
			  multiplier = 11;
			}
		else if (ohms < 10)		
			{ ohms *= 10;
			  multiplier = 10;
			}
		ohms = "" + ohms;
		
		if (ohms.length < 2) ohms = "0" + ohms;
		
		img_name = cart_pref + colorNameArray[0][ohms[0]] + est;
		document.getElementById("imgBand1").src = img_name;	
		document.getElementById("band1").selectedIndex = parseInt(ohms[0]) + 1;	
		
		img_name = cart_pref + colorNameArray[0][ohms[1]] + est;
		document.getElementById("imgBand2").src = img_name;
		document.getElementById("band2").selectedIndex = parseInt(ohms[1]) + 1;	;		
		
		img_name = cart_pref + colorNameArray[0][multiplier] + est;
		document.getElementById("imgBand4").src = img_name;
		if (parseInt(multiplier) < 10) document.getElementById("band4").selectedIndex = parseInt(multiplier) + 1;	
		else document.getElementById("band4").selectedIndex = parseInt(multiplier) -1;
	}
else
	{
	while( ohms >= 1000)
		{
		ohms = ohms / 10
		multiplier++;
		
		if (ohms < 1000 && Math.round(ohms) != ohms)
			{
			ohms = Math.round(ohms)
			rounded = 1;
			}
		}
		if (ohms < 10)
			{ ohms *= 100;
			  multiplier = 11;
			}
		else if (ohms < 100)		
			{ ohms *= 10;
			  multiplier = 10;
			}
		ohms = "" + ohms;
		
		while(ohms.length < 3) ohms = "0" + ohms;
		
		img_name = cart_pref + colorNameArray[0][ohms[0]] + est;
		document.getElementById("imgBand1").src = img_name;	
		document.getElementById("band1").selectedIndex = parseInt(ohms[0]) + 1;	
		
		
		img_name = cart_pref + colorNameArray[0][ohms[1]] + est;
		document.getElementById("imgBand2").src = img_name;
		document.getElementById("band2").selectedIndex = parseInt(ohms[1]) + 1;	;

		img_name = cart_pref + colorNameArray[0][ohms[2]] + est;
		document.getElementById("imgBand3").src = img_name;		
		document.getElementById("band3").selectedIndex = parseInt(ohms[2]) + 1;	;
		
		img_name = cart_pref + colorNameArray[0][multiplier] + est;
		document.getElementById("imgBand4").src = img_name;	
		if (parseInt(multiplier) < 10) document.getElementById("band4").selectedIndex = parseInt(multiplier) + 1;	
		else document.getElementById("band4").selectedIndex = parseInt(multiplier) -1;		
	}
}

// -------------------------------------------------------------------------------
// cambio de 4 o 5 bandas
// -------------------------------------------------------------------------------
function bandChange(){

optBand5 = document.getElementById("optBand5").checked;

if (!optBand5)
	{
	document.getElementById("titBand3").innerHTML = "";
	document.getElementById("titBand4").innerHTML = namesArray[languageSelect][0] + " 3: ";	
	document.getElementById("titBand5").innerHTML = namesArray[languageSelect][0] + " 4: ";
	document.getElementById("riga3").style.display = "none";
	document.getElementById("imgBand4").src = vuoto;
	}
else
	{
	document.getElementById("titBand3").innerHTML = namesArray[languageSelect][0] + " 3: ";
	document.getElementById("titBand4").innerHTML = namesArray[languageSelect][0] + " 4: ";		
	document.getElementById("titBand5").innerHTML = namesArray[languageSelect][0] + " 5: ";
	document.getElementById("riga3").style.display = "table-row";		
	}

document.getElementById("txtResValue").value=ohmsFormat(ResCalc());
resetData();
}

// -------------------------------------------------------------------------------
// reinicio
// -------------------------------------------------------------------------------
function resetData(){
	
	document.getElementById("band1").selectedIndex = 0;
	document.getElementById("band2").selectedIndex = 0;
	document.getElementById("band3").selectedIndex = 0;
	document.getElementById("band4").selectedIndex = 0;
	document.getElementById("band5").selectedIndex = 0;
	document.getElementById("cmbResToler").selectedIndex = 0;
	document.getElementById("txtResValue").value = "";

	document.getElementById("imgBand1").src = vuoto;
	document.getElementById("imgBand2").src = vuoto;
	document.getElementById("imgBand3").src = vuoto;
	document.getElementById("imgBand4").src = vuoto;
	document.getElementById("imgBand5").src = vuoto;
	
	bandValue = [-1,-1,-1,-1,-1]
}

// -------------------------------------------------------------------------------
// calculo de resistencias
// -------------------------------------------------------------------------------
function ResCalc(){

var ohms = 0;

if (optBand5)
	{
	if (bandValue[0] > -1 && bandValue[1] > -1 && bandValue[2] > -1 && bandValue[3] > -1)
		{
		ohms = (bandValue[0] * 100) + bandValue[1] * 10 + bandValue[2];
		ohms = eval("" + ohms + "e" + multiplierArray[bandValue[3]]);
		}
	}
else		
	{	
	if (bandValue[0] > -1 && bandValue[1] > -1 && bandValue[3] > -1)
		{	
		ohms = (bandValue[0] * 10) + bandValue[1];
		ohms = eval("" + ohms + "e" + multiplierArray[bandValue[3]]);
		}
	}

return ohms;	
}

// -------------------------------------------------------------------------------
// formato de ohm
// -------------------------------------------------------------------------------
function ohmsFormat(ohmsValue){
	if (ohmsValue >= 1e9){
		ohmsValue /=1e9;
		return ""+ ohmsValue + " Gohms";
		}
	else if (ohmsValue >= 1e6){
		ohmsValue /=1e6
		return ""+ ohmsValue + " Mohms";
		}

	else if (ohmsValue >= 1e3){
		ohmsValue /=1e3
		return ""+ ohmsValue + " Kohms";
		}
	else if (ohmsValue == 0){
		 return ""	
		}
	else {
		return "" + ohmsValue + " ohms";
		}
}		

// -------------------------------------------------------------------------------
window.onload = optColorBands;

