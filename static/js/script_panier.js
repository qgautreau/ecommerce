function genPanier(panier, container) {
    if (panier == null) {
        return;
    }

    container.empty();

    for (var id in panier) {
        var produit = catalog[parseInt(id)];

        var changeQty = $('<input>').attr({
            type: 'number',
            min: 1,
            max: 999,
            class: 'itemqty'
        }).val(panier[id]);

        changeQty.change(function() {
            var id = $(this).parent().parent().attr('id');
            if ($(this).val() > 999) {
                $(this).val(999);
            } else if ($(this).val() < 1) {
                $(this).val(1);
            }
            setToLocalStorage(id, $(this).val())
            panier = JSON.parse(localStorage.getItem('panier'));
            genPanier(panier, $('#panier > tbody'));
        });

        var removeItem = $('<span>').attr({
            'class': "glyphicon glyphicon-remove-sign",
            'aria-hidden': "true"
        })

        removeItem.click(function() {
            var id = $(this).parent().parent().attr('id');
            removeFromLocalStorage(id);
            panier = JSON.parse(localStorage.getItem('panier'));
            genPanier(panier, $('#panier > tbody'));
        });

        var row = $('<tr>').append(
            $('<td>').html(produit.name),
            $('<td>').html(parseInt(produit.price) + '€'),
            $('<td>').append(changeQty, removeItem),
            $('<td>').html((parseInt(produit.price) * parseInt(panier[id])) + '€')
        ).attr('id', id);

        container.append(row);
    }
    genTotalPanier(panier);
}

function genTotalPanier(panier) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    var totalPrice = 0;

    var totalArticles = 0;
    for( var id in panier) {
        var produit = catalog[parseInt(id)];
        var qty = parseInt(panier[id]);
        var prix = parseInt(produit.price);
        totalPrice += qty * prix;
        totalArticles += qty;
    }

    var totalPriceHt = Math.round(totalPrice / 1.2 * 100)/100;
    var tva = totalPrice - totalPriceHt;
    tva = Math.round(tva * 100)/100;

    $('#recap_qty').html(totalArticles);
    $('#recap_tva').html(tva + "€");
    $('#recap_total_ht').html(totalPriceHt + '€');
    $('#recap_total_ttc').html(totalPrice + '€');
};

$(document).ready(function() {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    genPanier(panier, $('#panier > tbody'));

    $('#clear_panier').click(function() {
        $('#panier > tbody').empty();

        $('#recap_qty').html('0');
        $('#recap_tva').html('0€');
        $('#recap_total_ht').html('0€');
        $('#recap_total_ttc').html('0€');
        localStorage.clear();
        updatePanierCount();
    });
});
