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

function getRandomProducts(catalog) {
    var randomProducts = [];
    var randomIndexes = [];

    var i=0;
    while (i < 5) {
        randomIndex = Math.floor(Math.random() * catalog.length-1);

        var j=0;
        while (j<randomIndexes.length && randomIndexes[j] != randomIndex) {
            j++;
        }

        if (randomIndexes.length == 0 || randomIndexes[j] != randomIndex) {
            i++;
            randomIndexes.push(randomIndex);
        }
    }

    for (var i=0; i<randomIndexes.length; i++) {
        randomProducts.push(catalog[randomIndexes[i]]);
    }

    return randomProducts;
}

$(document).ready(function() {
    console.log('start');

    var curntPage = $('#curnt_page').find('a').html();
    console.log('Page : ' + curntPage);

    switch (curntPage) {
        case 'Accueil':
            displayProducts(getRandomProducts(catalog));
            break;

        case 'Catalogue':
            displayProducts(catalog);
            break;
    }
});
