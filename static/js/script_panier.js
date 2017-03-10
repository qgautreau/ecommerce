// function addToCart() {
//
// }

$(document).ready(function() {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    for(var id in panier){
        var qty = panier[id];
        console.log(qty);
    }
});
