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
let produitDansPanier =JSON.parse(window.localStorage.getItem("produitDansLocalS"));//JAVASCRIPT
if (produitDansPanier===null) {
  console.log("initiatilsation");
  produitDansPanier=[];
} else {
  console.log("pourquoi", typeof produitDansPanier);
 
}

// Recherche de l'id du produit choisi
parametreUrlPage = window.location.search;
console.log(parametreUrlPage);
let urlConstructor = new URLSearchParams(parametreUrlPage);
console.log(urlConstructor);
idProductChoisi=urlConstructor.get("id");
console.log(idProductChoisi);


// Appel de l'Api avec le bon id
urlApiChoisi = urlApiGlobale + "/" + idProductChoisi;
console.log(urlApiChoisi);
fetchContent = fetch(urlApiChoisi)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (value) {
    console.log(typeof value);
    console.log(value);
    // Fonction de conversion prix
    function convertir(prixApi) {
      let conversion = prixApi / 100;
      return conversion;
    } //--

    productChoisi = value;
    console.log("le produit choisi est: " + productChoisi.colors);

    // REPARTITION DES INFOS DU PRODUIT CHOISI
    // INFOS IMAGE
    //positionnageImage = document.getElementById("imageUrl");
    positionnageImage = document.querySelector("div.item__img");

    positionnageImage.innerHTML = `<img src="${productChoisi.imageUrl}" alt="Photographie d'un canapé">`;
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
    };
    
    // PREPARATION AVANT MISE DANS LOCALSTORAGE

    
    let positionnageBoutonPanier=document.getElementById("addToCart");
    positionnageBoutonPanier.addEventListener('click',function(event) {
      event.preventDefault();
      event.stopPropagation();

      //testf a

      let productColors;
      positionnageColors = document.getElementById("colors");
      productColors = positionnageColors.value;
      console.log("la couleur est : " + productColors);

      let productQuantity;
      let positionnageQuantity = document.getElementById("quantity");
      productQuantity = positionnageQuantity.value;
      console.log("la quantité est : " + productQuantity);




       let choixProduitSelection = {
         nomProduit: productChoisi.name,
         idProduit: idProductChoisi,
         image: productChoisi.imageUrl,
         quantity: productQuantity,
         couleur: productColors,
         prixProduit: productChoisi.price,
       };
       console.log("test final a ");
      console.log(choixProduitSelection);
      //B-------



      //--------
      confirm("etes vous sur ?")

      
      // verification
      
      if (choixProduitSelection.couleur!=""&&choixProduitSelection.quantity > 0) {
        console.log(typeof produitDansPanier);
        if (produitDansPanier.length > 0) {
          //  for (produit of produitDansPanier) {
          //    console.log("coucou le panier existe mais je fais controle de similarité");
          //  if ( produit.idProduit===choixProduitSelection.idProduit&&produit.couleur===choixProduitSelection.couleur) { // SI un produit est identique: demander l'index et ajouter les quantité
          //    console.log( produitDansPanier.name);
          //   console.log("similarité du produit: " + produitDansPanier.name +" trouvé");
          //    produit.quantity = JSON.parse(produit.quantity);
          //    produit.quantity+=choixProduitSelection.quantity;
          //       console.log(typeof produit.quantity);

          //        localStorage.setItem(
          //   "produitDansLocalS",
          //  JSON.stringify(produitDansPanier));
          // }else {
          // action normale de push
          //console.log("panier exist mais pas de similarité trouvé");
          //produitDansPanier.push(choixProduitSelection);
          //localStorage.setItem(
          //  "produitDansLocalS",
          //   JSON.stringify(produitDansPanier)
          // );
          // console.log("autres  produitDansPanier : ");
          // console.log(produitDansPanier);
          // }
          //    }
          console.log("panier exist ");
          produitDansPanier.push(choixProduitSelection);
          localStorage.setItem(
            "produitDansLocalS",
            JSON.stringify(produitDansPanier)
          );
          console.log("autres  produitDansPanier : ");
          console.log(produitDansPanier);
        } else {
            console.log("panier vide");

            produitDansPanier.push(choixProduitSelection);
            localStorage.setItem(
              "produitDansLocalS",
              JSON.stringify(produitDansPanier)
            );
            console.log("1ier produitDansPanier : ");
            console.log(produitDansPanier);

            // MISE DANS LOCALSTORAGE
            //let produitDansLocalS = JSON.stringify(produitDansPanier);
            //console.log("valeur produitDanLocalS initiale : ", "type : " + typeof (produitDansLocalS));
            //console.log(produitDansLocalS);
            //window.localStorage.setItem("produitDansLocalS", produitDansLocalS);
        }
      } else {
        alert("Merci d'indiquer votre choix de couleur et la quantité");
      }            



    });   


  })
  
  .catch(function (err) {
    console.log("Une erreur est survenue");
  });

