let positionnageCardItem = document.getElementById("cart__items");
let panierLocalStorage = JSON.parse(localStorage.getItem("produitDansLocalS"));
console.log("recapitulatif du localStorage : ", typeof panierLocalStorage);
let resultatSousTotal = [];
for (choix in panierLocalStorage) {
  console.log("le choix n° " + choix, panierLocalStorage[choix]);
  let sousTotalPrix =
    panierLocalStorage[choix].prixProduit * panierLocalStorage[choix].quantity;
  console.log("le sous total n° " + choix, sousTotalPrix, " €");
  resultatSousTotal.push(sousTotalPrix);
  positionnageCardItem.innerHTML += `
            <article class="cart__item" data-id="${panierLocalStorage[choix].idProduit}">
                <div class="cart__item__img">
                  <img src="${panierLocalStorage[choix].image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${panierLocalStorage[choix].nomProduit}</h2>
                    <p>${panierLocalStorage[choix].prixProduit} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" name="itemQuantity"  min="1" max="100" value="${panierLocalStorage[choix].quantity}">
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
const reducer = (previousValue, currentValue) => previousValue + currentValue;
let prixTotal = resultatSousTotal.reduce(reducer);
console.log(resultatSousTotal.reduce(reducer));
positionnagePrixTotal.innerHTML += `${prixTotal}`;

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
console.log(resultatSousTotal.indexOf(3698));

//console.log(JSON.parse(window.localStorage.getItem("produitDansLocalS")));

//console.log("recapitulatif du local storale : ")
//console.log(appelProduitLocaleSt);
