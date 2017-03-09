function genProduct(dico) {
    var img = $('<img>').attr({
        src: dico.thumb,
        alt: "Item thumb"
    });
    var title = $('<h3>').html(dico.name);
    var description = $('<p>').html(dico.description);

    var firstDiv = $('<div>').append(img, title, description);

    var linkVoir = $('<a>').attr({
        'class': 'btn btn-default',
        href: 'produit.html',
    }).html('Voir');

    var addCart = $('<button>').attr({
        'class': 'btn btn-default btn-panier',
    }).html('Ajouter au panier');

    var price = $('<span>').html('Prix : ' + dico.price + '€');

    var lastDiv = $('<div>').append(linkVoir, addCart, price);

    return $('<article>').append(firstDiv, lastDiv);
}

function displayProducts(products) {
    var container = $('main > section');

    var i=0;
    while (i<products.length) {
        var j=0;
        var row = $('<div>').addClass('row');
        while (j<2 && i < products.length) {
            console.log('testki');
            var col = $('<div>').addClass('col-md-6');
            col.append(genProduct(products[i]));
            row.append(col);
            j++;
            i++;
        }
        container.append(row);
    }
}

$(document).ready(function() {
    console.log('start');
    if ($('#curnt_page').find('a').html() == 'Catalogue') {
        console.log('catalogue page');
        console.log(catalog);
        displayProducts(catalog);
    }
});
