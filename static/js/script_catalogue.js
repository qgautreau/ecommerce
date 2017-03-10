$(document).ready(function() {
    displayProducts(catalog, 0);
    setupPagination();

    $('.pagination li > a').click(function(event) {
        var needUpdate = false;

        if ($(this).attr('aria-label') == 'Previous' && curntPagination > 0) {
            curntPagination -= 10;
            needUpdate = true;

        } else if ($(this).attr('aria-label') == 'Next' && curntPagination+10 <= maxPagination) {
            curntPagination += 10;
            needUpdate = true;
        }

        if(needUpdate){
            setupPagination();
            displayProducts(catalog, curntPagination);
        }

        event.preventDefault();
    });

    $("#tri").click(function(event) {
        order = $("#tri_item").val();
        var result = catalog;

        if($('#search_query').val() != ""){
            result = searchProduct(catalog, $('#search_query').val() );
        }

        displayProducts(result, curntPagination);
        event.preventDefault();
    });
});
