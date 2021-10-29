//DECLARATION GENERALES
let positionnageCardItem = document.getElementById("cart__items");
let panierLocalStorage = JSON.parse(localStorage.getItem("produitDansLocalS"));
let resultatSousTotal = [];

//FONCTION SERVANT TRIER LE PANIER SI LE PANIER NEST PANIER EXISTE 
if (panierLocalStorage) {
  panierLocalStorage.sort(function trie(a, b) {
    if (a.nomProduit < b.nomProduit) {
      return -1;
    }
    if (a.nomProduit > b.nomProduit) {
      return 1;
    }
    return 0;
  });
}
//FONCTION SERVANT A INJECTER DU CONTENU DANS LE DOM
async function injectionDansLeDom(positionDom, contenu) {
  positionDom.innerHTML += contenu;
}

for (choix in panierLocalStorage) {
  //RECUPERATION DES SOUS TOTAUX
  let sousTotalPrix =
    panierLocalStorage[choix].prixProduit * panierLocalStorage[choix].quantity;
  resultatSousTotal.push(sousTotalPrix);

  //***INJECTION DES PRODUITS DU PANIER
  contenuCartItems = `
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

  injectionDansLeDom(positionnageCardItem, contenuCartItems);
}

//***INJECTION: QTE ToTale
let positionnageQteTotalArticle = document.getElementById("totalQuantity");
let contenuQteTotalArticle = `${resultatSousTotal.length}`;
injectionDansLeDom(positionnageQteTotalArticle, contenuQteTotalArticle);

//***FONCTION CALCUL PRIX TT
let totalFinal = 0;
resultatSousTotal.forEach((sousTotal) => {
  totalFinal += sousTotal;
});

//***INJECTION: PRIX TT

let positionnagePrixTotal = document.getElementById("totalPrice");
let contenuPrixTotal = `${totalFinal}`;
injectionDansLeDom(positionnagePrixTotal, contenuPrixTotal);

//POSSIBILITE DE MODIFIER LA QUANTITE
let items = document.querySelectorAll("[data-id]");

items.forEach((item) => {
  let positionnageInput = item.querySelector("article input");
  positionnageInput.addEventListener("change", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // CONTROLE DE SIMILARITE
    for (let indice in panierLocalStorage) {
      // Ici on cherche si l'objet que l'on veut ajouter existe déjà. Si c'est le cas on met indiceProduit à l'indice adéquat et on sort
      let prod = panierLocalStorage[indice];
      if (
        prod.productId == item.dataset.id &&
        prod.couleur == item.dataset.couleur
      ) {
        panierLocalStorage[indice].quantity = JSON.parse(
          positionnageInput.value
        );
        break;
      }
    }

    localStorage.setItem(
      "produitDansLocalS",
      JSON.stringify(panierLocalStorage)
    );
      
    // modif du totale
    //let resultatSousTotal = [];
    let totalFinal = 0;
    for (choix of panierLocalStorage) {
      totalFinal += choix.prixProduit * choix.quantity;
    }

    // affichage modification DU TT
    positionnagePrixTotal.innerHTML = `${totalFinal}`;
  });
});

// bouton supprimer
let btnSupprimer = document.querySelectorAll(".deleteItem");

for (let i = 0; i < btnSupprimer.length; i++) {
  btnSupprimer[i].addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let idProduitASupprimer = panierLocalStorage[i].productId;
    let couleurProduitASupprimer = panierLocalStorage[i].couleur;

    panierLocalStorage = panierLocalStorage.filter(
      (el) =>
        el.productId !== idProduitASupprimer ||
        el.couleur !== couleurProduitASupprimer
    );
    
    localStorage.setItem(
      "produitDansLocalS",
      JSON.stringify(panierLocalStorage)
    );
    alert("ce produit a été supprimé du panier");
    window.location.href = "cart.html";
  });
}
// ENVOIE FORMULAIRE
let btnEnvoiFormulaire = document.querySelector("#order");

btnEnvoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  //VERIFICATION DU FORMULAIRE  
  
  // Verification: Le panier contient au moins un produit
  
  
  if (!panierLocalStorage == null || panierLocalStorage.length>0) {

    // Filtre pour empecher les articles avec quantité nulle
    let quantitevide = panierLocalStorage.filter((el) => el.quantity == 0);  
    if (quantitevide.length > 0) {
      alert(
        "Merci de d'abord selectionner et d'indiquer une quantité pour chaque produit 169"
      );
    } else {
      
      //Recup Valeur Formulaire+ Locale storage
      let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      };

      //--------------------------------
      //REGEX
      let firstName = contact.firstName;
      let lastName = contact.lastName;
      let address = contact.address;
      let city = contact.city;
      let email = contact.email;

      function isValidNameAndLast(value) {
        return /^[A-Z - a-z][^0-9-@]{2,20}$/.test(value);
      }

      function isValidCity(value) {
        return /^[\W\w][^0-9-@]{3,20}$/.test(value);
      }

      function isValidAddress(value) {
        return /^[\W\w][^@]{5,50}$/.test(value);
      }
      // function isValidCity(value) {
      // return /^e[0-9]{3,}$/.test(value);
      //}
      function isValidEmail(value) {
        return /^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(
          value
        );
      }
      // controle input firstName
      if (isValidNameAndLast(firstName)) {
        document.querySelector("#firstNameErrorMsg").textContent = "";
      } else {
        document.querySelector("#firstNameErrorMsg").textContent =
          "Chiffres et symboles ne sont pas autorisés. Merci de bien remplir ce champs. Entre 3 et 20 charactères.";
      }

      // controle input lastName
      if (isValidNameAndLast(lastName)) {
        document.querySelector("#lastNameErrorMsg").textContent = "";
      } else {
        document.querySelector("#lastNameErrorMsg").textContent =
          "Chiffres et symboles ne sont pas autorisés. Merci de bien remplir ce champs. Entre 3 et 20 charactères.";
      }

      // controle input address
      if (isValidAddress(address)) {
        document.querySelector("#addressErrorMsg").textContent = "";
      } else {
        document.querySelector("#addressErrorMsg").textContent =
          "Merci de bien remplir ce champs address";
      }

      // controle input city
      if (isValidCity(city)) {
        document.querySelector("#cityErrorMsg").textContent = "";
      } else {
        document.querySelector("#cityErrorMsg").textContent =
          "Chiffres et symboles ne sont pas autorisés. Merci de bien remplir ce champs. Entre 3 et 20 charactères.";
      }

      // controle input email
      if (isValidEmail(email)) {
        document.querySelector("#emailErrorMsg").textContent = "";
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
        //----------------------
        //Formulaire a mettre dans un objet
        localStorage.setItem("contact", JSON.stringify(contact));
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
            
            localStorage.setItem("orderId", data.orderId);

            //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
            document.location.href = "confirmation.html";
          })
          .catch((err) => {
            alert("Il y a eu une erreur : " + err);
          });
      } else {
        alert("Merci de remplir correctement le formulaire");
      }
    }
  } else {
    alert("merci de selectionner un produit 312!");
  }
});
