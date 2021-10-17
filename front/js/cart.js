let positionnageCardItem = document.getElementById("cart__items");
let panierLocalStorage = JSON.parse(localStorage.getItem("produitDansLocalS"));
console.log(
  "recapitulatif du localStorage :type ",
  typeof panierLocalStorage,
  "contenu ",
  panierLocalStorage
);
let resultatSousTotal = [];
for (choix in panierLocalStorage) {
  console.log(
    "le choix n° " + choix,
    "est celui ci : ",
    panierLocalStorage[choix]
  );
  let sousTotalPrix =panierLocalStorage[choix].prixProduit * panierLocalStorage[choix].quantity;
  console.log("le sous total n° " + choix, sousTotalPrix, " €");
  resultatSousTotal.push(sousTotalPrix);
  positionnageCardItem.innerHTML += `
            <article class="cart__item" data-id="${panierLocalStorage[choix].productId}" data-couleur="${panierLocalStorage[choix].couleur}">
                <div class="cart__item__img">
                  <img src="${panierLocalStorage[choix].image}" alt="${panierLocalStorage[choix].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${panierLocalStorage[choix].nomProduit} (couleur: ${panierLocalStorage[choix].couleur})</h2>
                    <p>${panierLocalStorage[choix].prixProduit} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity"  min="1" max="100" value="${panierLocalStorage[choix].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>

    `;
}
// prix total

console.log("CALCUL DU PRIX TT");
let positionnageQteTotalArticle = document.getElementById("totalQuantity");
positionnageQteTotalArticle.innerHTML += `${resultatSousTotal.length}`;
let positionnagePrixTotal = document.getElementById("totalPrice");
console.log("resultatSousTotal", resultatSousTotal);

//const reducer = (previousValue, currentValue) => previousValue + currentValue;
//let prixTotal = resultatSousTotal.reduce(reducer);

let totalFinal=0;
resultatSousTotal.forEach((sousTotal) => {
  
  totalFinal+=sousTotal;
  console.log(" totalFinal",parseInt(totalFinal));
});

//console.log(resultatSousTotal.reduce(reducer));
positionnagePrixTotal.innerHTML += `${totalFinal}`;

//methode 1
//let positionnagetest = document.getElementsByClassName("itemQuantity");
//console.log(positionnagetest);
//positionnagetest.addEventListener("change",showProduct);

//async function showProduct() {
//  let quantitye=this.options[this.selectedIndex].value;
//   console.log( quantitye);
//   return showProduct;
//}
//let valeur= showProduct();
//console.log("va", valeur)

//methode 2
//let positionnagetest = document.getElementsByClassName("itemQuantity");
//console.log(positionnagetest);
//let v = positionnagetest.value;
//console.log("valeur", v);

//console.log(positionnagetest[0].value);
//console.log(prixTotal);
//let testcalcul = prixTotal * positionnagetest.value;
//positionnagePrixTotal.innerHTML = `${testcalcul}`;

console.log(
  "Il y a " + resultatSousTotal.length + " articles dans le panier et "
);
console.log("voici les sous totaux", resultatSousTotal);
console.log(resultatSousTotal.indexOf(26994));

//console.log(JSON.parse(window.localStorage.getItem("produitDansLocalS")));

//console.log("recapitulatif du local storale : ")
//console.log(appelProduitLocaleSt);

//let positionnageBoutonQuantité = document.querySelectorAll('[data-id]');
//positionnageBoutonQuantité.addEventListener("click", function (event) {
//  event.preventDefault();
//  event.stopPropagation();
//let v = positionnagetest.value;
//console.log("valeur", v);

//});

//POSSIBILITE DE MODIFIER LA QUANTITE
let items = document.querySelectorAll("[data-id]");
console.log("toute les datat-id ", items);
items.forEach((item) => {
  console.log(" chaque article", item);
  console.log("interieur de linput ", item.querySelector("input.itemQuantity"));
  let positionnageInput = item.querySelector("article input");
  positionnageInput.addEventListener("change", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let inputValue = item.value;
    console.log("la nouvelle valeur est : ", parseInt(inputValue));
    console.log(
      "la nouvelle valeur ",
      positionnageInput.value,
      "type",
      typeof parseInt(positionnageInput.value)
    );
    let positionnagePrix = item.querySelector(
      "div.cart__item__content__titlePrice p"
    );
    let prix = positionnagePrix;
    console.log("prix ", parseInt(prix.textContent));

    // CONTROLE DE SIMILARITE
    for (let indice in panierLocalStorage) {
      // Ici on cherche si l'objet que l'on veut ajouter existe déjà. Si c'est le cas on met indiceProduit à l'indice adéquat et on sort
      let prod = panierLocalStorage[indice];
      if (
        prod.productId == item.dataset.id &&
        prod.couleur == item.dataset.couleur
      ) {
        indiceProduit = indice; // indiceProduit=indice;
        console.log("etape 1/2 indice similarite trouvé ", indiceProduit);
        break;
      }
    }

    if (indiceProduit > -1) {
      // Si l'indice n'est plus -1 alors notre produit existe déjà

      console.log(
        "etape 2/2 jadditionne indice similarite trouvé n° ",
        indiceProduit
      );

      console.log(
        "type ds le panier",
        typeof panierLocalStorage[indiceProduit]
      );
      //---------
      console.log("test des types");
      ///modifs: ligne supprimer ce option parseInt ligne 112 +=?
      ///panierLocalStorage[indiceProduit].quantity = JSON.parse(
      /// panierLocalStorage[indiceProduit].quantity
      ///);
      console.log(
        "panierLocalStorage[indiceProduit].quantity : ",
        panierLocalStorage[indiceProduit].quantity,
        "type : ",
        typeof panierLocalStorage[indiceProduit].quantity
      );
      // console.log(typeof produit.quantity);
      console.log(
        "choixselection : ",
        positionnageInput.value,
        "type de choixselection.quantity : ",
        typeof positionnageInput.value
      );
      //console.log(typeof choixProduitSelection.quantity);
      panierLocalStorage[indiceProduit].quantity = JSON.parse(
        positionnageInput.value
      );
      console.log(
        "type de panierLocalStorage[indiceProduit].quantity apres modif : ",
        typeof panierLocalStorage[indiceProduit].quantity
      );
      //------------

      // panierLocalStorage[indiceProduit].quantity = JSON.parse(
      //  panierLocalStorage[indiceProduit].quantity
      //  );

      //  produitDansPanier[indiceProduit].quantity +=
      //   choixProduitSelection.quantity;
      console.log("modification du panierLocalStorage ", panierLocalStorage);
      console.log("type du panier", typeof panierLocalStorage);
    }

    localStorage.setItem(
      "produitDansLocalS",
      JSON.stringify(panierLocalStorage)
    );

    let loCAlS = localStorage.getItem("produitDansLocalS");

    console.log("affichage du localstorage", JSON.parse(loCAlS));

    // modif du totale
    let resultatSousTotal = [];
    let totalFinal = 0;
    for (choix of panierLocalStorage) {
      console.log("affichage panier ", panierLocalStorage);
      console.log("article concerné ", choix);

      console.log("soustotale initial  ", totalFinal);
      totalFinal += choix.prixProduit * choix.quantity;
      console.log("le sous total est ", totalFinal, "type ", typeof totalFinal);
    }

    // affichage modification DU TT
    positionnagePrixTotal.innerHTML = `${totalFinal}`;
  });
});

//
function show(element) {
  console.log(element);
}
// bouton supprimer
let btnSupprimer = document.querySelectorAll(".deleteItem");
show(btnSupprimer);

for (let i = 0; i < btnSupprimer.length; i++) {
  btnSupprimer[i].addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    show("test btnSupprimer");
    let idProduitASupprimer = panierLocalStorage[i].productId;
    let couleurProduitASupprimer = panierLocalStorage[i].couleur;
    show(idProduitASupprimer);
    panierLocalStorage = panierLocalStorage.filter(
      (el) =>
        el.productId !== idProduitASupprimer ||
        el.couleur !== couleurProduitASupprimer
    );
    show("nouveau tableau suite a la suppression");
    show(panierLocalStorage);
    localStorage.setItem(
      "produitDansLocalS",
      JSON.stringify(panierLocalStorage)
    );
    alert("ce produit a été supprimé du panier");
    window.location.href = "cart.html";
  });
}

//REMPLISSAGE FORMULAIRE
//let listeInput=document.querySelectorAll(".cart__order__form__question input");
//let inputFirstName = document.getElementById(
//  "firstName"
//);
//console.log(inputFirstName);
//console.log("nom de linput " ,inputFirstName.getAttribute("name"));

/*
console.log(listeInput);

for (let input of listeInput) {
  let nomInput = input.name;
  
  console.log(input.value);
  input.addEventListener("change", function (e) {
    e.preventDefault();
    e.stopPropagation();

    donneeRecu=this.value;



    messageError = `${nomInput}ErrorMsg`;
    document.getElementById(messageError).textContent += `${donneeRecu}`;
  });
}*/



// ENVOIE FORMULAIRE
let btnEnvoiFormulaire = document.querySelector("#order");

btnEnvoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  //VERIFICATION DU FORMULAIRE

  //Recup Valeur Formulaire+ Locale storage
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  console.log("contact", contact);

  //--------------------------------
  //REGEX
  let firstName = contact.firstName;
  let lastName = contact.lastName;
  let address = contact.address;
  let city = contact.city;
  let email = contact.email;

  function isValidNameAndLast(value) {
    return /^[A-Za-z\s-]{3,20}$/.test(value);
  }

  function isValidCity(value) {
    return /^[A-Za-z\s]{3,20}$/.test(value);
  }

  function isValidAddress(value) {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  }
 // function isValidCity(value) {
   // return /^e[0-9]{3,}$/.test(value);
  //}
  function isValidEmail(value) {
    return /^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
  }
  // controle input firstName
  if (isValidNameAndLast(firstName)) {
    document.querySelector("#firstNameErrorMsg").textContent =
    "";
  } else {
    document.querySelector("#firstNameErrorMsg").textContent =
      "Chiffres et symboles ne sont pas autorisés. Merci de bien remplir ce champs. Entre 3 et 20 charactères.";
  }

  // controle input lastName
  if (isValidNameAndLast(lastName)) {
    document.querySelector("#lastNameErrorMsg").textContent =
    "";
  } else {
    document.querySelector("#lastNameErrorMsg").textContent =
      "Chiffres et symboles ne sont pas autorisés. Merci de bien remplir ce champs. Entre 3 et 20 charactères.";
  }

  // controle input address
  if (isValidAddress(address)) {
    document.querySelector("#addressErrorMsg").textContent =
      "";
  } else {
    document.querySelector("#addressErrorMsg").textContent =
      "Merci de bien remplir ce champs address";
  }

  // controle input city
  if (isValidCity(city)) {
    document.querySelector("#cityErrorMsg").textContent =
    "";
  } else {
    document.querySelector("#cityErrorMsg").textContent =
      "Chiffres et symboles ne sont pas autorisés. Merci de bien remplir ce champs. Entre 3 et 20 charactères.";
  }

  // controle input email
  if (isValidEmail(email)) {
    document.querySelector("#emailErrorMsg").textContent =
    "";
  } else {
    document.querySelector("#emailErrorMsg").textContent =
      "Merci de bien remplir ce champs email";
  }

  

  // controle finale
  if (
    isValidNameAndLast(firstName) &&
    isValidNameAndLast(lastName) &&
    isValidAddress(address) &&
    isValidCity(city) &&
    isValidEmail(email)
  ) {
    console.log("ok pour envoie formulaire");

    //----------------------
    //Formulaire a mettre dans un objet
    localStorage.setItem("contact", JSON.stringify(contact));
    // Valeur Formulaire + produit sélectionné mis ds Objet pour le serveur
    //let product_ID = JSON.stringify(panierLocalStorage);
    let product_ID = [];
    for (let produit of panierLocalStorage) {
      product_ID.push(produit.productId);
    }

    let pourEnvoi = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      },
      products: product_ID,
    };

    console.log("Pour envoi", pourEnvoi);

    // -------  Envoi de la requête POST au back-end --------
    // Création de l'entête de la requête
    const options = {
      method: "POST",
      body: JSON.stringify(pourEnvoi),
      headers: { "Content-Type": "application/json" },
    };

    // Préparation du prix formaté pour l'afficher sur la prochaine page
    //let priceConfirmation = document.querySelector(".total").innerText;
    //priceConfirmation = priceConfirmation.split(" :");

    // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        console.log(data);
        localStorage.setItem("orderId", data.orderId);
        //localStorage.setItem("total", priceConfirmation[1]);

        console.log("orderID", data);

        //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Il y a eu une erreur : " + err);
      });
  } else {
    console.log("Ne pas envoyer formulaire");
    alert("Merci de remplir correctement le formulaire");
  }

  //----------------------
  //Formulaire a mettre dans un objet
  /*localStorage.setItem("contact", JSON.stringify(contact));*/
  // Valeur Formulaire + produit sélectionné mis ds Objet pour le serveur
  //let product_ID = JSON.stringify(panierLocalStorage);
  /*let product_ID = [];
  for (let produit of panierLocalStorage) {
    product_ID.push(produit.productId);
  }

  let pourEnvoi = {
    contact: {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    },
    products: product_ID,
  };

  console.log("Pour envoi", pourEnvoi);*/

  // -------  Envoi de la requête POST au back-end --------
  // Création de l'entête de la requête
  /*const options = {
    method: "POST",
    body: JSON.stringify(pourEnvoi),
    headers: { "Content-Type": "application/json" },
  };*/

  // Préparation du prix formaté pour l'afficher sur la prochaine page
  //let priceConfirmation = document.querySelector(".total").innerText;
  //priceConfirmation = priceConfirmation.split(" :");

  // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
  /*fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      localStorage.clear();
      console.log(data);
      localStorage.setItem("orderId", data.orderId);
      //localStorage.setItem("total", priceConfirmation[1]);

      console.log("orderID", data);*/

  //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
   /*document.location.href = "confirmation.html";
    })
    .catch((err) => {
      alert("Il y a eu une erreur : " + err);
    });*/
});

