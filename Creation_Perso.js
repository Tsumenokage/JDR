VOYELLE  = ["a","e","y","u","i","o"];
CONSONNE = ["z","r","t","p","q","s","d","f","g","h","j","k","l","m","w","x","c","v","b","n"];

//// Fonction qui lance un dé
function LancerDeDe(typeDe){

	var resultat = Math.random();

	resultat = resultat*1000;
	resultat = resultat%typeDe;
	resultat++;
	return parseInt(resultat);
}

//// Charge tout alétoirement
function Aleatoire_Bi_Atche(){
	//Le Nom
	nom     	  = ""+CONSONNE[LancerDeDe(20)-1]+VOYELLE[LancerDeDe(6)-1]+CONSONNE[LancerDeDe(20)-1]+CONSONNE[LancerDeDe(20)-1]+VOYELLE[LancerDeDe(6)-1]+CONSONNE[LancerDeDe(20)-1];
	element 	  = document.getElementById("Pseudo");
	element.value = nom;

	//Les points de Destin
	element 	  = document.getElementById("PointDestin");
	element.value = ""+(LancerDeDe(4)-1);

	//Les carac
	for(var i=1;i<7;i++){
		for(var j=1;j<5;j++){
			element = document.getElementById("Carac_" + i + "_Valeur_De_" + j);
			element.value = ""+LancerDeDe(6);
		}
		CalculCarac(i);
	}
}

//// Gère la selection de la Race
function SelectionRace(){

	ma_race 	   = document.getElementById("Race");
	mon_texte_race = document.getElementById("Race_Bonus");

	if (ma_race.value == "Null"){
		mon_texte_race.innerHTML = "";
	}else{
		mon_texte_race.innerHTML = ma_race.value;
	}
}

//// Calcule le total des 3 meileurs lancé de Dé
function CalculCarac(x){

	//Récupération des valeurs
	liste_valeur_de=[];

	for(var i=1;i<5;i++){
		element_valeur_de = document.getElementById("Carac_" + x + "_Valeur_De_" + i);
		liste_valeur_de[i-1]=parseInt(element_valeur_de.value);
	}
	//Recherche du minimum
	valeur_minimum=liste_valeur_de[0];
	position_valeur_minimum=0;
	for(var i=1;i<4;i++){
		if(valeur_minimum > liste_valeur_de[i]){
			valeur_minimum=liste_valeur_de[i];
			position_valeur_minimum = i;
		}
	}
	//calcul du total
	valeur_total=0;
	for(var i=0;i<4;i++){
		if(i != position_valeur_minimum){
			valeur_total=valeur_total+liste_valeur_de[i];
		}
	}
	//Affichage du résultat
	span_total = document.getElementById("Total_"+x);
	span_total.innerHTML = valeur_total;
	MAJImageVerification(x);
	MAJApparenceBouton();
}

//// Met a jour l'image de Vérifiacation
function MAJImageVerification(x){

	var verif   = VerificationCaracRemplie(x);
	var element = document.getElementById("Validation_"+x);

	if(verif){
		element.setAttribute("src","Validation.png");
	}else{
		element.setAttribute("src","Refus.png");
	}
}

//// Met à jour l'apparence du bouton 
function MAJApparenceBouton(){
	var verif   = VerificationNouveauLance();
	var element = document.getElementById("Deuxieme_Relance");
	if(verif){
		element.setAttribute("style","");
	}else{
		element.setAttribute("style","Display:none;");
	}
}

//// Fonction qui retourne si les 4 lancées sont remplis pour une carac x
function VerificationCaracRemplie(x){

	var verif = true;

	for(var i=1;i<5;i++){
		var element = document.getElementById("Carac_" + x + "_Valeur_De_" + i);
		if(parseInt(element.value)===0){
			verif=false;
		}
	}
	return verif;
}

//// Fonction qui retourne si toute les carac sont remplis
function VerificationToutesCaracRemplies(){

	var verif = true;

	for(var i=1;i<7;i++){
		tmp=VerificationCaracRemplie(i);
		if(!tmp){
			verif=tmp;
		}
	}
	return verif;
}
//// Fonction qui remet les lancé à 0 ainsi que le total et la vérif
function ReinitialisationCarac(){
	for(var i=1;i<7;i++){
		for(var j=1;j<5;j++){
			element = document.getElementById("Carac_" + i + "_Valeur_De_" + j);
			element.value = 0;
		}
		element=document.getElementById("Validation_"+i);
		element.setAttribute("src","Refus.png");
		element=document.getElementById("Total_"+i);
		element.innerHTML="";
	}
}

//// Fonction qui renvoie si un nouveau lancé est possible
function VerificationNouveauLance(){

	var verif = true;

	if(VerificationToutesCaracRemplies()){
		somme=10;
		for(var i=1;i<7;i++){
			var element=document.getElementById("Total_"+i);
			valeur=parseInt(element.innerHTML);
			somme=somme+(valeur-10);
		}
		if(somme>=10){
			verif=false;
		}
	}else{
		verif=false;
	}
	return verif;
}

//// Fonction qui execute le nouveau lancée
function NouveauLance(){
	var element=document.getElementById("Nouveau_Lance");
	element.setAttribute("style","");
}