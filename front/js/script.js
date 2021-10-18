//DECLARATIONS GENERALES

let urlApiGlobale = "http://localhost:3000/api/products";
let fetchValue = [];
let positionnageItems;
let contenuDesItems;
let messageError = `Une erreur est survenue. Veuillez vous reconnecter`;

affichageArticles(urlApiGlobale);

//FONCTION SERVANT A INJECTER DU CONTENU DANS LE DOM
async function injectionDansLeDom(positionDom, contenu) {
  positionDom.innerHTML += contenu;
}

// FONCTION PERMETTANT LA RECUPERATION DES PRODUIT DE L'API + MESSAGE ERREUR
async function affichageArticles(paramsUrl) {
  positionnageItems = document.getElementById("items");
  
  fetch(paramsUrl)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {      
      for (let i = 0; i < value.length; i++) {       
        let product;
        product = value[i];        

        // APPEL DE LA FONCTION INJECTION
        contenuDesItems =`
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
          `;

        injectionDansLeDom(positionnageItems, contenuDesItems);

      }
      
    })
    .catch(function (err) {
      // APPEL DE LA FONCTION INJECTION
      injectionDansLeDom(positionnageItems, messageError);
    });

}
