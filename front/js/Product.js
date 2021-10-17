//---------Product_GH_MNV
// Déclaration variables generales
let positionnageImage;
let positionnageTitle;
let positionnagePrice;
let positionnageDescription;
let positionnageColors;
let urlPageActuelle;
let idProductChoisi;
let urlApiGlobale = "http://localhost:3000/api/products";
let urlApiChoisi;
let productChoisi;
let produitDansPanier = JSON.parse(
  window.localStorage.getItem("produitDansLocalS")
); //JAVASCRIPT

if (produitDansPanier === null) {
  console.log("Etat du panier", produitDansPanier);
  produitDansPanier = [];
  console.log(
    "initiatilsation du panier: Création d'un tableau",
    produitDansPanier
  );
} else {
  console.log("Initialisé", typeof produitDansPanier, produitDansPanier);
}

// Recherche de l'id du produit choisi
parametreUrlPage = window.location.search;
console.log("parametre du lien URL ?+id", parametreUrlPage);
let urlConstructor = new URLSearchParams(parametreUrlPage);
console.log(urlConstructor);
idProductChoisi = urlConstructor.get("id");
console.log("valeur id de la page", idProductChoisi);

// Appel de l'Api avec le bon id

urlApiChoisi = urlApiGlobale + "/" + idProductChoisi;
console.log("création URL pour produit choisi", urlApiChoisi);
fetchContent = fetch(urlApiChoisi)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (value) {
    console.log("verification type des infos API_id", typeof value);
    console.log("infos API_id", value);
    // Fonction de conversion prix
    function convertir(prixApi) {
      let conversion = prixApi / 100;
      return conversion;
    } //--

    productChoisi = value;
    console.log(
      "le type du produit choisi est: " + typeof productChoisi.colors
    );
    console.log("la couleur du produit choisi est: ", productChoisi.colors);

    // REPARTITION DES INFOS DU PRODUIT CHOISI
    // INFOS IMAGE
    //positionnageImage = document.getElementById("imageUrl");
    positionnageImage = document.querySelector("div.item__img");

    positionnageImage.innerHTML = `<img src="${productChoisi.imageUrl}" alt="${productChoisi.altTxt}">`;
    //console.log(positionnageImage);
    //INFOS TITRE
    positionnageTitle = document.getElementById("title");
    positionnageTitle.innerHTML = productChoisi.name;
    //console.log(productChoisi.imageUrl);
    //INFOS PRIX
    positionnagePrice = document.getElementById("price");
    positionnagePrice.innerHTML = productChoisi.price;
    //INFOS DESCRIPTION
    positionnageDescription = document.getElementById("description");
    positionnageDescription.innerHTML = productChoisi.description;
    //INFOS COLORS
    positionnageColors = document.getElementById("colors");

    for (option of productChoisi.colors) {
      positionnageColors.innerHTML += `<option id="values" value="${option}">${option}</option>`;
      console.log(option);
    }

    // PREPARATION AVANT MISE DANS LOCALSTORAGE

    let positionnageBoutonPanier = document.getElementById("addToCart");
    positionnageBoutonPanier.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      //testf a

      let productColors;
      positionnageColors = document.getElementById("colors");
      productColors = positionnageColors.value;
      console.log("la couleur est : ", productColors);

      let productQuantity;
      let positionnageQuantity = document.getElementById("quantity");
      
      productQuantity = positionnageQuantity.value;
      console.log("la quantité est bien : ", productQuantity);

      let choixProduitSelection = {
        nomProduit: productChoisi.name,
        productId: idProductChoisi,
        image: productChoisi.imageUrl,
        //quantite mis en number
        quantity: parseInt(productQuantity,10),
        couleur: productColors,
        prixProduit: productChoisi.price,
      };
      console.log(
        "ChoixProduitSelectionné est ",
        choixProduitSelection,
        "type : ",
        typeof choixProduitSelection
      );

      //B-------

      //--------
      confirm("etes vous sûr de votre choix ?");

      // Obligation du choix de couleur et quantité

      if (
        choixProduitSelection.couleur != "" &&
        choixProduitSelection.quantity > 0
      ) {
        console.log(
          "produit dans le panier est de type: ",
          typeof produitDansPanier,
          "il contient ",
          produitDansPanier
        );

        // Le panier est il vide ?
        if (produitDansPanier.length > 0) {
            //INTEGRATION SOLUTION DE LIONNEL MANIVEL
                    console.log("le panier nest pas vide")
                 let indiceProduit = -1;
                 console.log(
                   "etape 0 indice initial  ",
                   indiceProduit
                 );

                 for (let indice in produitDansPanier) {
                   // Ici on cherche si l'objet que l'on veut ajouter existe déjà. Si c'est le cas on met indiceProduit à l'indice adéquat et on sort
                   let prod = produitDansPanier[indice];
                   if (
                     prod.productId == choixProduitSelection.productId &&
                     prod.couleur == choixProduitSelection.couleur
                   ) {
                     indiceProduit = indice; // indiceProduit=indice;
                     console.log("etape 1/2 indice similarite trouvé ", indiceProduit);
                     break;
                   }
                 }

                 if (indiceProduit > -1) {
                   // Si l'indice n'est plus -1 alors notre produit existe déjà

                   console.log("etape 2/2 jadditionne indice similarite trouvé n° ", indiceProduit);
                   
                   console.log("type ds le panier",typeof produitDansPanier[indiceProduit]);
                   //---------
                   console.log("test des types");
                   ///modifs: ligne supprimer ce option parseInt ligne 112 +=?
                   ///produitDansPanier[indiceProduit].quantity = JSON.parse(
                    /// produitDansPanier[indiceProduit].quantity
                   ///);
                   console.log(
                     "produitDansPanier[indiceProduit].quantity : ",
                     produitDansPanier[indiceProduit].quantity,
                     "type : ",
                      typeof produitDansPanier[indiceProduit].quantity
                   );
                   // console.log(typeof produit.quantity);
                   console.log(
                     "choixselection : ",
                     choixProduitSelection.quantity,
                     "type de choixselection.quantity : ",
                     typeof choixProduitSelection.quantity
                   );
                   //console.log(typeof choixProduitSelection.quantity);
                   produitDansPanier[indiceProduit].quantity += JSON.parse(
                     choixProduitSelection.quantity
                   );
                   console.log(
                     "type de produitDansPanier[indiceProduit].quantity apres modif : ",
                     typeof produitDansPanier[indiceProduit].quantity
                   );
                    //------------



                            // produitDansPanier[indiceProduit].quantity = JSON.parse(
                            //  produitDansPanier[indiceProduit].quantity
                          //  );
                            
                          //  produitDansPanier[indiceProduit].quantity +=
                            //   choixProduitSelection.quantity;
                     console.log(
                       "modification du produitDansPanier ",
                       produitDansPanier
                     );
                     console.log(
                       "type du panier",
                       typeof produitDansPanier
                     );

                 } //Si c'est toujours -1 alors c'est le cas précédent
                 else {
                     console.log(
                       "pas de similarite trouvé ",
                       produitDansPanier
                     );
                   produitDansPanier.push(choixProduitSelection);
                   console.log(
                     "nouveau produit dans le produitDansPanier ",
                     produitDansPanier
                   );
                 }

                 
                 
                 localStorage.setItem(
                   "produitDansLocalS",
                   JSON.stringify(produitDansPanier)
                 );

                 let loCAlS = localStorage.getItem(
                   "produitDansLocalS"                   
                 );

                 console.log(
                   "affichage du localstorage",JSON.parse(loCAlS)                   
                 );


           



         // console.log("panier exist ");
         // produitDansPanier.push(choixProduitSelection);
         // localStorage.setItem(
          //  "produitDansLocalS",
         //   JSON.stringify(produitDansPanier)
         // );
         // console.log(
         //   "d autres  produit Dans le Panier : ",
         //   produitDansPanier,
          //  "de type : ",
          //  typeof produitDansPanier
         // );
        } else {
            // INTEGRATION SOLUTION DE LIONNEL MANIVEL








            
          // Le panier est vide : on le rempli et on crée une clé pour le locaStorage
         console.log(
            "le panier est vide : 1/On y met un produit-2/on crée une zone ds local storage et on y met notre panier"
          );
          //1/
          produitDansPanier.push(choixProduitSelection);
          //2/
          localStorage.setItem(
            "produitDansLocalS",
            JSON.stringify(produitDansPanier)
          );
          console.log(
            "1ier produitDansPanier déposé : ",
            produitDansPanier,
            "de type: ",
            typeof produitDansPanier
          );
        }
      } else {
        alert("Merci d'indiquer votre choix de couleur et la quantité");
      }
    });
  })

  .catch(function (err) {
    console.log("Une erreur est survenue");
  });
