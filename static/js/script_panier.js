$(document).ready(function() {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    genPanier(panier, $('#panier > tbody'));
});
