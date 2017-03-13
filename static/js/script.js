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
        addToLocalStorage($(this).attr('id'));
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

var GET_PARAM = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
};

function setToLocalStorage(id, qty) {
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
    updatePanierCount();
}

function addToLocalStorage(id) {
    var panier = localStorage.getItem('panier');

    if (panier == null) {
        panier = {};
        panier[id] = 1;
        localStorage.setItem('panier', JSON.stringify(panier));

    } else {
        panier = JSON.parse(panier);
        if (panier[id]) {
            panier[id] = parseInt(panier[id]) + 1;

        } else {
            panier[id] = 1;
        }
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    updatePanierCount();
}

function removeFromLocalStorage(id) {
    var panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    delete panier[id];
    localStorage.setItem('panier', JSON.stringify(panier));
    updatePanierCount();
}

function updatePanierCount() {
    var total = 0;
    var panier = localStorage.getItem('panier');
    if (panier != null) {
        panier = JSON.parse(panier);
        for (var id in panier) {
            total += parseInt(panier[id]);
            console.log(total);
        }
    }
    $('#item_count').html('( ' + total + ' )');
}

$(document).ready(function() {
    updatePanierCount();
});
