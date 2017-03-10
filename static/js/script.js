function genProduct(dico, id) {
    var img = $('<img>').attr({
        src: dico.thumb,
        alt: "Item thumb"
    });

    var title = $('<h3>').html(dico.name);
    var description = $('<p>').html(dico.description);
    var firstDiv = $('<div>').append(img, title, description);

    if (id !== null) {
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
    }).html('Ajouter au panier');

    addCart.click(function() {
        addToLocalStorage($(this).attr('id'), '1');
        $(this).html('Produit ajouté');
    });

    var price = $('<span>').html('Prix : ' + dico.price + '€');
    var lastDiv = $('<div>').append(linkVoir, addCart, price);

    return $('<article>').append(firstDiv, lastDiv);
}

var order = "default";
function displayProducts(products, startIndex) {
    $('article').parent().parent().remove();

    switch(order){
        case "increase":
            products = orderPriceIncrease(products);
            break;

        case "decrease":
            products = orderPriceDecrease(products);
            break;
    }


    var i = startIndex;
    var max = startIndex+10;
    var container = $('main > section');

    while (i<products.length && i<max) {
        var j=0;
        var row = $('<div>').addClass('row');

        while (j<2 && i < products.length) {
            var col = $('<div>').addClass('col-md-6');
            col.append(genProduct(products[i], i));
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

var curntPagination = 0;
var maxPagination = catalog.length-10;

function setupPagination() {
    $('.paginationItem').parent().remove();

    var startPag = 0;
    if (curntPagination > 20) {
        startPag = curntPagination/10 -2;

        if (startPag+4 >= maxPagination/10) {
            startPag = maxPagination/10 - 4;
        }
    }

    var lastPaginationItem = $('#pagination_nav ul li:last-child');

    for(var i = startPag; i < catalog.length / 10 && i<startPag+5; i++){
        var link = $('<a>').attr({
            href: '#',
            'class': 'paginationItem'
        }).html(i+1);

        link.click(function(event) {
            curntPagination = (parseInt($(this).html()) - 1)*10;
            displayProducts(catalog, curntPagination);
            setupPagination()
            event.preventDefault();
        });

        var listElement = $('<li>').append(link);
        lastPaginationItem.before(listElement);
    }
}

var GET_PARAM = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
};

function orderPriceDecrease(catalog) {
    var result = [];

    for(var i = 0; i < catalog.length; i++) {
        var j = 0;

        while(j < result.length && catalog[i].price < result[j].price) {
            j++;
        }

        result.splice(j, 0, catalog[i]);
    }
    return result;
}

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

function genPanier(panier, container) {
    container.empty();
    for (var id in panier) {
        var produit = catalog[parseInt(id)];
        var changeQty = $('<input>').attr({
            type: 'number',
            min: 1,
        }).val(panier[id]);

        changeQty.change(function() {
            var id = $(this).parent().parent().attr('id');
            updateLocalStorageQty(id, $(this).val())
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
    genPanier();
}

function addToLocalStorage(id, qty) {
    var panier = localStorage.getItem('panier');

    if(panier == null) {
        panier = {};
        panier[id] = qty;
        localStorage.setItem('panier', JSON.stringify(panier));

    } else {
        panier = JSON.parse(panier);
        panier[id] = qty;
        localStorage.setItem('panier', JSON.stringify(panier));
    }
}

function updateLocalStorageQty(id, qty) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    panier[id] = qty;
    localStorage.setItem('panier', JSON.stringify(panier));
}

function removeFromLocalStorage(id) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    delete panier[id];
    localStorage.setItem('panier', JSON.stringify(panier));
}

function genTotalPanier(panier) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    var totalPrice = 0;
    for(var id in panier) {
        var produit = catalog[parseInt(id)];
        var qty = parseInt(panier[id]);
        var prix = parseInt(produit.price);
        totalPrice += qty * prix;
    }
    var totalArticles = panier.length;
    var totalPriceHt = totalPrice / 1.2;
    var tva = totalPrice - totalPriceHt;

    $('#recap_qty').html(totalArticles);
    $('#recap_tva').html(tva + "€");
    $('#recap_total_ht').html(totalPriceHt + '€');
    $('#recap_total_ttc').html(totalPrice + '€');
};
