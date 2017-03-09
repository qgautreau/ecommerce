$(document).ready(function() {
    var id = GET_PARAM('id');

    if (!id) {
        $('main').append($('<span>').html('Erreur : pas de produit selectionné'));

    } else {
        var product = catalog[parseInt(id)];

        if (product == null) {
            $('main').append($('<span>').html("Erreur : ce produit n'est pas disponible"));

        } else {
            $('main').append(genProduct(product));
        }
    }
});
