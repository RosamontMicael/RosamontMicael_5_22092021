//let myStorage =window.localStorage;
//console.log(myStorage.getItem("panier"));

//déclaration variable generales

let urlApiGlobale = "http://localhost:3000/api/products";
let fetchValue = [];
let positionnageItems;
let fetchContent;

//console.log("positionnageItems");
positionnageItems = document.getElementById("items");
console.log(positionnageItems);
fetchContent = fetch(urlApiGlobale)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value.length);
    console.log(value);

   
    fetchValue = value;
    console.log(fetchValue.length);
    console.log(fetchValue);

    console.log(`contenue de l'API-CANAPE: ${fetchValue.length}`);

    for (let i = 0; i < value.length; i++) {
      function convertir(prixApi) {
        let conversion = prixApi / 100;
        return conversion;
      }

      let product;

      product = value[i];
      //console.log("la" + product.name);

      // MAP NOUVEAU PROJET
      
      positionnageItems.innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
          
          //console.log("positionnageItems.innerHTML");
    }
    // alert(content.innerHTML);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });


  // LOCAL STORAGE

  //let myStorage = window.localStorage;
  //let panier = new Array(idProduct, "micael");
  //console.log(panier);
  //myStorage.setItem("panier", panier);
