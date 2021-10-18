//---------Product_GH_MNV
// DECLARATION GENERALES
let positionnageImage;
let positionnageTitle;
let positionnagePrice;
let positionnageDescription;
let positionnageColors;
let urlPageActuelle;
let urlApiGlobale = "http://localhost:3000/api/products";
let urlApiChoisi;
let productChoisi;
let produitDansPanier = JSON.parse(window.localStorage.getItem("produitDansLocalS"));

//***DEFINITION FONCTION injectionDansLeDom : INJECTER DU CONTENU DANS LE DOM
async function injectionDansLeDom(positionDom, contenu) {
  positionDom.innerHTML = contenu;
}

//***OPTION PERMETTANT DE VERIFIER ET/OU INITIALISER LE PANIER 
if (produitDansPanier === null) {
  produitDansPanier = [];
}

//***FONCTION POUR RECUPERER L'ID DE LA PAGE ACTUELLE

let idProductChoisi=()=> {
  let parametreUrlPage = window.location.search;  
  let urlConstructor = new URLSearchParams(parametreUrlPage);  
  let idChoisi = urlConstructor.get("id");
  return idChoisi;
};

//***COMPOSITION DE L'URL AVEC LE BON ID
urlApiChoisi = urlApiGlobale + "/" + idProductChoisi();

//***PERMETTRE LA RECUPERATION DES PRODUIT AVEC LES BONS + MESSAGE ERREUR
fetchContent = fetch(urlApiChoisi)
  .then(function (res) {  //*** TEST DE LA REPONSE + TRANSFORMATION EN JSON
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (value) {    
    productChoisi = value;
    
    //***INJECTION DE LIMAGE

    positionnageImage = document.querySelector("div.item__img");
    contenuImage = `<img src="${productChoisi.imageUrl}" alt="${productChoisi.altTxt}">`;
    injectionDansLeDom(positionnageImage, contenuImage);

    //--------------------------------------------------

    //***INJECTION INFOS TITRE
    positionnageTitle = document.getElementById("title");
    contenuTitre = productChoisi.name;
    injectionDansLeDom(positionnageTitle, contenuTitre);

    //---------------------------------------------------
    //***INJECTION INFOS PRIX
    positionnagePrice = document.getElementById("price");
    contenuPrice = productChoisi.price;
    injectionDansLeDom(positionnagePrice, contenuPrice);

    //---------------------------------------------------

    //***INJECTION INFOS DESCRIPTION

    positionnageDescription = document.getElementById("description");
    contenuDescription = productChoisi.description;
    injectionDansLeDom(positionnageDescription, contenuDescription);
   
    //----------------------------------------------------

    //***INJECTION INFOS COLORS
    positionnageColors = document.getElementById("colors");

    for (option of productChoisi.colors) {
      positionnageColors.innerHTML += `<option id="values" value="${option}">${option}</option>`;
    }
    // ---------------------------------------------------

    // PREPARATION AVANT MISE DANS LOCALSTORAGE

    let positionnageBoutonPanier = document.getElementById("addToCart");
    positionnageBoutonPanier.addEventListener("click", function (event) {
      //ECOUTE D'EVENEMENT SUR BOUTON "AJOUT DANS PANIER"
      event.preventDefault();
      event.stopPropagation();

      //RECUPERATION DES DETAILS DU PRODUIT CHOISI

      let productColors;
      positionnageColors = document.getElementById("colors");
      productColors = positionnageColors.value;

      let productQuantity;
      let positionnageQuantity = document.getElementById("quantity");
      productQuantity = positionnageQuantity.value;

      // CREATION DUN OBJET POUR LE PRODUIT SELECTIONNE

      let choixProduitSelection = {
        nomProduit: productChoisi.name,
        productId: idProductChoisi(),
        image: productChoisi.imageUrl,
        //quantite mis en number
        quantity: parseInt(productQuantity, 10),
        couleur: productColors,
        prixProduit: productChoisi.price,
      };

      //FENETRE DE CONFIRMATION
      confirm("etes vous sûr de votre choix ?");

      //FILTRE POUR OBLIGER LUTILISATEUR DE METTRE UN CHOIX DE COULEUR ET QUANTITE
      // Condition1_True: A ton selectionné une couleur et une quantté?
      if (
        choixProduitSelection.couleur != "" &&
        choixProduitSelection.quantity > 0
      ) {
        // Condition2_True: Le tableau representant Le panier a til deja un produit?
        if (produitDansPanier.length > 0) {
          
          
          // Condition3_True: Permet de savoir l'index du produit deja existant
          let indiceProduit = -1;
          for (let indice in produitDansPanier) {
            // Ici on cherche si l'objet que l'on veut ajouter existe déjà. Si c'est le cas on met indiceProduit à l'indice adéquat et on sort
            let prod = produitDansPanier[indice];
            if (
              prod.productId == choixProduitSelection.productId &&
              prod.couleur == choixProduitSelection.couleur
            ) {
              indiceProduit = indice; // indiceProduit=indice;
              break;
            }
          }
          //Condition4_True: si le Produit est identique (couleur+id) on change la quantité uniquement
          if (indiceProduit > -1) {
            produitDansPanier[indiceProduit].quantity += JSON.parse(
              choixProduitSelection.quantity
            );

            //Condition4_False: si le Produit n'est pas identique  on push ds le tableau
          } else {
            produitDansPanier.push(choixProduitSelection);
          }
          // MISE A JOUR DU LOCALSTORAGE
          localStorage.setItem(
            "produitDansLocalS",
            JSON.stringify(produitDansPanier)
          );

          //let loCAlS = localStorage.getItem("produitDansLocalS");
          //Condition2_False: Le tableau representant Le panier a til deja un produit?
        } else {         
          //1/
          produitDansPanier.push(choixProduitSelection);
          //2/
          localStorage.setItem(
            "produitDansLocalS",
            JSON.stringify(produitDansPanier)
          );
        }
        // Condition1_False: A ton selectionné une couleur et une quantté?
      } else {
        // MESSAGE POUR CONTRAINDRE CHOIX COULEUR ET QUANTITE
        alert("Merci d'indiquer votre choix de couleur et la quantité");
      }
    });
  })

  .catch(function (err) {
    console.log("Une erreur est survenue");
  });
