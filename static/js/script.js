function genProduct(dico, id) {
    var img = $('<img>').attr({
        src: dico.thumb,
        alt: "Item thumb"
    });
    var title = $('<h3>').html(dico.name);
    var description = $('<p>').html(dico.description);

    var firstDiv = $('<div>').append(img, title, description);

    if(id !== null){
        var linkVoir = $('<a>').attr({
            'class': 'btn btn-default',
            href: 'produit.html?id='+ id,
        }).html('Voir');
    }else{
        var linkVoir = $('<a>').attr({
            'class': 'btn btn-default',
            href: 'catalogue.html',
        }).html('Retour catalogue');
    }

    var addCart = $('<button>').attr({
        'class': 'btn btn-default btn-panier',
    }).html('Ajouter au panier');

    var price = $('<span>').html('Prix : ' + dico.price + '€');

    var lastDiv = $('<div>').append(linkVoir, addCart, price);

    return $('<article>').append(firstDiv, lastDiv);
}

var order = "default";
function displayProducts(products, startIndex) {
    console.log("plop "+order);
    switch(order){
        case "increase":
            products = orderPriceIncrease(products);
            break;
        case "decrease":
            products = orderPriceDecrease(products);
            break;
    }
    $('article').parent().parent().remove();
    var container = $('main > section');

    var i = startIndex;
    var max = startIndex+10;
    console.log('Pages : ' + i + ' --> ' + max);
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

    console.log(randomIndexes);

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

function orderPriceDecrease(catalog){
    var result = [];
    for(var i = 0; i < catalog.length; i++){
        var j = 0;
        while(j < result.length && catalog[i].price < result[j].price){
            j++;
        }
        result.splice(j, 0, catalog[i]);
    }
    return result;
}

function orderPriceIncrease(catalog){
    var result = [];
    for(var i = 0; i < catalog.length; i++){
        var j = 0;
        while(j < result.length && catalog[i].price > result[j].price){
            j++;
        }
        result.splice(j, 0, catalog[i]);
    }
    return result;
}
