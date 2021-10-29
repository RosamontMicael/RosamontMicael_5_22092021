let confirmationCommande = localStorage.getItem("orderId");


//AFFICHAGE
let positionnageOrderId = document.getElementById("orderId");
positionnageOrderId.innerHTML=`${confirmationCommande}`;

// ON VIDE LE LOCAL STORAGE POUR NE PAS CONSERVER LE N° DE COMMANDE
setTimeout(localStorage.clear(),5000);