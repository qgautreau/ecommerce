// Génération produit
function genProduct(dico, id, isProductPage) {
    var img = $('<img>').attr({
        src: dico.thumb,
        alt: "Item thumb"
    });

    var title = $('<h3>').html(dico.name);
    var description = $('<p>').html(dico.description);
    var firstDiv = $('<div>').append(img, title, description);

    if (!isProductPage) {
        var linkVoir = $('<a>').attr({
            'class': 'btn btn-default',
            href: 'produit.html?id='+ id,
        }).html('Voir');

    } else {
        var linkVoir = $('<a>').attr({
            'class': 'btn btn-default',
            href: 'catalogue.html',
        }).html('Retour catalogue');
    }

    var addCart = $('<button>').attr({
        'class': 'btn btn-default btn-panier',
        'id': id
    }).html('Ajouter au panier')
    .popover({
        content: 'Ce produit à été ajouté au panier.',
        placement: 'bottom',
        trigger: 'manual'
    })
    .click(function() {
        addToLocalStorage($(this).attr('id'), '1');
        $(this).popover('show');
        $(this).addClass('popover_tmp');
        setTimeout(function() {
            $('.popover_tmp').popover('hide');
            $('.popover_tmp').removeClass('popover_tmp');
        }, 1500);

    });

    var price = $('<span>').html('Prix : ' + dico.price + '€');
    var lastDiv = $('<div>').append(linkVoir, addCart, price);

    return $('<article>').append(firstDiv, lastDiv);
}
// Affichage des produits
function displayProducts(products, startIndex) {
    $('article').parent().parent().remove();

    var i = startIndex;
    var max = startIndex+10;
    var container = $('main > section');

    while (i<products.length && i<max) {
        var j=0;
        var row = $('<div>').addClass('row');

        while (j<2 && i < products.length) {
            var col = $('<div>').addClass('col-md-6');
            var productId = products[i].name.split(' ')[1];
            col.append(genProduct(products[i], productId, false));
            row.append(col);
            j++;
            i++;
        }

        container.append(row);
    }

    if (products.length > 10) {
        setupPagination(startIndex/10, products.length);
    }
}
// Affichage top produits en page d'accueil (produits aléatoires)
function getRandomProducts(catalog) {
    var randomProducts = [];
    var randomIndexes = [];

    var i=0;
    while (i < 5) {
        randomIndex = Math.floor(Math.random() * catalog.length);

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
// Créer la barre de pagination
function setupPagination(page, nbProduct) {
    var curntPagination = page*10
    $('.paginationItem').parent().remove();
    var maxPagination = nbProduct-10;

    var startPag = 0;
    if (curntPagination > 20) {
        startPag = curntPagination/10 -2;

        if (startPag+4 >= maxPagination/10) {
            startPag = maxPagination/10 - 4;
        }
    }

    var paginationUl = $('#pagination_nav ul');

    var pagiPrevious = $('<li>').append($('<a>').attr({
        href: page > 0 ? '?page=' + (parseInt(page)) : '',
        'aria-label': 'Previous'
    }).html('<span aria-hidden="true">&laquo;</span>'));
    paginationUl.append(pagiPrevious);

    for(var i = startPag; i < nbProduct / 10 && i<startPag+5; i++){
        var link = $('<a>').attr({
            'href': '?page=' + (i+1),
            'class': 'paginationItem'
        }).html(i+1);

        var listElement = $('<li>').append(link);
        paginationUl.append(listElement);
    }

    var pagiNext = $('<li>').append($('<a>').attr({
        href: page < maxPagination/10 ? '?page=' + (parseInt(page)+2) : '',
        'aria-label': 'Next'
    }).html('<span aria-hidden="true">&raquo;</span>'));
    paginationUl.append(pagiNext);
}
// récupartion id produits pour panier
var GET_PARAM = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
};
// Trier par prix décroissant
function orderPriceDecrease(catalog) {
    var result = [];

    for (var i = 0; i < catalog.length; i++) {
        var j = 0;

        while (j < result.length && catalog[i].price < result[j].price) {
            j++;
        }

        result.splice(j, 0, catalog[i]);
    }
    return result;
}
// Trier par prix croissant
function orderPriceIncrease(catalog){
    var result = [];

    for (var i = 0; i < catalog.length; i++) {
        var j = 0;

        while (j < result.length && catalog[i].price > result[j].price) {
            j++;
        }

        result.splice(j, 0, catalog[i]);
    }
    return result;
}
// Rechercher un produit
function searchProduct(catalog, searchStr) {
    var result = [];

    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].name.indexOf(searchStr) != -1) {
            result.push(catalog[i]);

        } else if (catalog[i].description.indexOf(searchStr) != -1) {
            result.push(catalog[i]);
        }
    }
    return result;
}
// Génération du panier
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
        }).val(panier[id]);

        changeQty.change(function() {
            var id = $(this).parent().parent().attr('id');
            addToLocalStorage(id, $(this).val())
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
// Stockage des informations pour le panier
function addToLocalStorage(id, qty) {
    var panier = localStorage.getItem('panier');

    if (panier == null) {
        panier = {};
        panier[id] = qty;
        localStorage.setItem('panier', JSON.stringify(panier));

    } else {
        panier = JSON.parse(panier);
        panier[id] = qty;
        localStorage.setItem('panier', JSON.stringify(panier));
    }
}
// Vider le panier
function removeFromLocalStorage(id) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    delete panier[id];
    localStorage.setItem('panier', JSON.stringify(panier));
}
// Génarer le panier total
function genTotalPanier(panier) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    var totalPrice = 0;

    for( var id in panier) {
        var produit = catalog[parseInt(id)];
        var qty = parseInt(panier[id]);
        var prix = parseInt(produit.price);
        totalPrice += qty * prix;
    }

    var totalArticles = Object.keys(panier).length;
    var totalPriceHt = Math.round(totalPrice / 1.2 * 100)/100;
    var tva = totalPrice - totalPriceHt;
    tva = Math.round(tva * 100)/100;

    $('#recap_qty').html(totalArticles);
    $('#recap_tva').html(tva + "€");
    $('#recap_total_ht').html(totalPriceHt + '€');
    $('#recap_total_ttc').html(totalPrice + '€');
};
