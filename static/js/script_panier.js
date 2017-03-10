$(document).ready(function() {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    genPanier(panier, $('#panier > tbody'));

    $('#clear_panier').click(function() {
        localStorage.clear();
        $('#panier > tbody').empty();
    });
});
