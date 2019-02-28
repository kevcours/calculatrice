// Bar�me:

//Calculette
// affichage des boutons et mise en place d'un �couteur sur chacun d'eux: 3 points
// Affichage de la croix et mise en place de l'�couteur permettant d'effacer la calculette et de supprimer l' objet correspondant: 2 points
// Traitement en fonction de la touche pr�ss�e : 0.5 point par contrainte respect�e

//Calculette2
// drag de la calculette : 4
// �viter la propagation des �v�nements pour ne pas pouvoir d�placer la calculette � partie des boutons ou de l'afficheur: 1

//Calculette3   + 1 point moyenne JS si fonctionne.

class Calculette {
  constructor(color){
	    this.color=color; // couleur de la calculette
	    this.formule="";  // formule de calcul saisie dans l'afficheur

	    this.pO=0;        // indique le nombre de parenth�ses encore ouverte
	   	  

		if (typeof(Calculette.zi)=="undefined" )  Calculette.zi=0;    
		// la propri�t� statique Calculette.zi permettra de mettre en premier plan les nouvelles calculettes ou les calculettes en cours de d�placement
 	}

	// M�thode pour afficher la calculette et mettre en place les �couteurs
	display(x,y){ 
				Calculette.zi++;

				// la classe String est �tendue avec la m�thode right(n) qui permet d'extraire le n caract�res de droite d'une chaine
				String.prototype.right= function(n){
					return this.substring(this.length-n)
				}

				// mise en place de la div contenant la calculette
				this.div= document.createElement("div");
				let div =this.div;
					div.style.borderRadius="10px";
					div.style.zIndex=Calculette.zi;
					div.style.position ="absolute";										
					div.style.left=x+"px";
					div.style.top=y+"px";
					div.style.width="260px";										
					div.style.height="350px";
					div.style.backgroundColor=this.color;
				document.querySelector("body").appendChild(div);

				// Mise en place de la croix permettant d'effacer la calculette et de supprinmer l'objet correspondant en m�moire
				// Il faut mettre en place un �couteur
				this.croix = document.createElement("img");
				let croix= this.croix;
					croix.src="croix.jpg";
					croix.style.borderRadius="10px";
					croix.style.position="absolute";
					croix.style.left="235px";
					croix.style.top="8px";
					croix.style.width="18px";
					croix.style.height="18px";
					croix.addEventListener('click',(e)=>{
						document.querySelector("body").removeChild(this.div);
						e.stopPropagation();
					});
					croix.addEventListener('mouseover',(e)=>{
						croix.style.cursor="pointer";
					})
					croix.addEventListener('mousedown',(e)=>{
						e.stopPropagation();
					})

				div.appendChild(croix);

		
				// Mise en place de l'afficheur qui contiendra la formule saisie ou le r�sultat du calcul
				this.afficheur=document.createElement("input");
				let afficheur= this.afficheur;
					afficheur.type="text";
					afficheur.readOnly="readonly";
					afficheur.style.borderRadius="10px";
					afficheur.style.fontSize="large";	
					afficheur.style.textAlign="right";	
					afficheur.style.position="absolute";
					afficheur.style.left="5px";										
					afficheur.style.top="35px";
					afficheur.style.width="245px";
					afficheur.style.height="50px";
					afficheur.style.size="30";
					afficheur.style.maxlength="30";	
				div.appendChild(afficheur);

				// tableau permettant de g�n�rer les boutons de la calculette
				let t=["1","2","3","(","/","4","5","6",")","*","7","8","9","E","-",".","0","=","C","+"];

				// Mise en place du clavier qui contiendra les bouton
				this.clavier=document.createElement("div");
				let clavier=this.clavier;
					clavier.style.display='flex';
					clavier.style.flexWrap='wrap';
					clavier.style.position="absolute"
					clavier.style.left="5px";
					clavier.style.top="105px";
				div.appendChild(clavier);

				
				this.button=[];

				// boucle permettant de mettre en place les 20 boutons de la calculette
				// Il faut compl�ter cette cr�ation de boutons et mettre en place les �couteurs
				// Chaque bouton aura une largeur et une hauteur de 50px
				for(let i=0;i<=19;i++){
					this.button[i]=document.createElement("input");
					this.button[i].value=t[i];
					this.button[i].readOnly="readonly";
					this.button[i].style.textAlign="center";
					this.button[i].style.width="16%";
					this.button[i].style.height="40px";
					this.button[i].style.padding="1%";
					this.button[i].addEventListener('click',(e)=>{
						this.affiche(this.button[i].value);
						e.stopPropagation();

					});
					this.button[i].addEventListener('mousedown',(e)=>{
						e.stopPropagation();
					});
					this.button[i].onmouseover=()=>{
						this.button[i].style.cursor="pointer";
					}
					clavier.appendChild(this.button[i]);
				}		
	}

	// Methode pour faire les traitements en fonction de la touche s�lectionn�e sur le clavier
	affiche(c){
		let lastNb=this.formule.right(1);
		if(this.formule=="Error")
		this.formule="";
		switch (c) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				this.formule+=c;
				break;
			case "(":
				if(isNaN(parseInt(lastNb)) && (lastNb!=".") && (lastNb !="."))
				{
					this.formule+=c;
					this.pO++;
				}
				break;
			case ")":
				if((this.formule!="")&&((lastNb==")" || (!isNaN(parseInt(lastNb)))))&&(this.pO>0))
				{
					this.formule+=c;
				}
				break;
			case "+":
				if((lastNb=="+")||(lastNb=="-")||(lastNb=="/")||(lastNb=="*")||(lastNb=="."))
				{
					this.formule=this.formule.substring(0,this.formule.length-1);
					this.formule+=c;
				}
				else
				{
					this.formule+=c;
				}
				break;
			case "-":
				if((lastNb=="+")||(lastNb=="-")||(lastNb=="/")||(lastNb=="*")||(lastNb=="."))
				{

					this.formule=this.formule.substring(0,this.formule.length-1);
					this.formule+=c;
				}
				else
				{
					this.formule+=c;
				}
				break;
			case "/":
				if((lastNb=="")||(lastNb=="("))
				{

				}
				else if((lastNb=="+")||(lastNb=="-")||(lastNb=="/")||(lastNb=="*")||(lastNb=="."))
				{

					this.formule=this.formule.substring(0,this.formule.length-1);
					this.formule+=c;
				}
				else
				{
					this.formule+=c;
				}
				break;

			case "E":
				if(this.formule!="")
				{
					this.formule=this.formule.substring(0,this.formule.length-1);
				}
				else{
					this.formule="Error";
				}
				break;
			case "C":
				this.formule="";
				break;
			case ".":
				if((lastNb!==".")||(lastNb!=")"))
				{
					this.formule+=c;
					
				}
				break;
			case "*":
				if((lastNb=="")||(lastNb=="("))
				{

				}
				else if((lastNb=="+")||(lastNb=="-")||(lastNb=="/")||(lastNb=="*")||(lastNb=="."))
				{

					this.formule=this.formule.substring(0,this.formule.length-1);
					this.formule+=c;
				}
				else
				{
					this.formule+=c;
				}
				break;
			case "=":
				if(eval(this.formule))
				{
					this.formule=eval(this.formule);
				}
				else{
					this.formule="Error";
				}
				break;
		
		}
		this.afficheur.value=this.formule;
	}
}

class Calculette2 extends Calculette {
	display(x,y)
	{
		super.display(x,y);
		this.div.style.cursor="move";
		this.div.addEventListener('mousedown',(e)=>{
            let dx=e.clientX-parseInt(this.div.style.left);
            let dy=e.clientY-parseInt(this.div.style.top);
            let dmousemove;
            window.addEventListener('mousemove',dmousemove=(e)=>
            {
                this.div.style.left=e.clientX-dx+"px";
                this.div.style.top=e.clientY-dy+"px";
            }
            )
            
            this.div.style.top=dy;
            this.div.style.left=dx;
        
            this.div.addEventListener('mouseup',(e)=>{
                window.removeEventListener('mousemove',dmousemove);
            })
        
            
        });
	}

  
}

class Calculette3 extends Calculette2 {
	display(x,y)
	{
		super.display(x,y)
		this.croix.addEventListener('click',(e)=>{
			document.getElementById('test').value="";
			if(eval(this.formule))
			{
				document.getElementById('test').value=eval(this.formule);
			}
			else{
				document.getElementById('test').value="Error";
			}

		})
	}
}
