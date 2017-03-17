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

$(document).ready(function() {
    var page = GET_PARAM('page');

    if (!page) {
        page = 0;
    } else {
        page--;
    }


    var products = catalog;
    if (sessionStorage.getItem('order')) {
        $("#tri_item").val(sessionStorage.getItem('order'));

        switch(sessionStorage.getItem('order')){
            case "increase":
                products = orderPriceIncrease(products);
                break;

            case "decrease":
                products = orderPriceDecrease(products);
                break;
        }
    }

    if (sessionStorage.getItem('search_query')) {
        $('#search_query').val(sessionStorage.getItem('search_query'));
        products = searchProduct(products, sessionStorage.getItem('search_query'));
    }

    displayProducts(products, page*10);

    $("#tri").click(function(event) {
        sessionStorage.setItem('order', $("#tri_item").val())

        sessionStorage.setItem('search_query', $('#search_query').val());

        window.location.href = "catalogue.html";
        event.preventDefault();
    });
});


$(document).ready(function(){
    $.ajax({
        url: "https://codi-e-commerce.herokuapp.com/",
        type: "GET",
        dataType: "json",
        success: function(objects, status){
            for(var key in objects){
                var product = objects[key];
                var productContainer= $("<div class ='panel panel-default'></div>");
                var productThumb = $("<img>").html(product.thumb);
                var productName = $("<h3 class='panel-title'></h3>").html(product.name).css({
                    "textTransform": "capitalize"
                });
                var productDescription = $("<p></p>").html(product.description);
                var productPrice = $("").html(product.price);
                var productQty = $("").html(product.quantity);
                var productPictures = "";
                for(var i = 0; i < product.pictures.length; i++){
                    productPictures += $("<img>").attr({
                        src : product.pictures
                    });
                }

            }
        }
    });
});
