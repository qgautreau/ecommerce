$(document).ready(function() {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    genPanier(panier, $('#panier > tbody'));

    $('#clear_panier').click(function() {
        localStorage.clear();
        $('#panier > tbody').empty();

        $('#recap_qty').html('0');
        $('#recap_tva').html('0€');
        $('#recap_total_ht').html('0€');
        $('#recap_total_ttc').html('0€');
        updatePanierCount();
    });
});
