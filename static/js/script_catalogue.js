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
