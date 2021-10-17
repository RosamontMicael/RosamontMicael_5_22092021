let confirmationCommande = localStorage.getItem("orderId");
console.log("orderId ", confirmationCommande);

//affichage
let positionnageOrderId = document.getElementById("orderId");
positionnageOrderId.innerHTML=`${confirmationCommande}`;