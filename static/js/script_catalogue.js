$(document).ready(function() {
    var page = GET_PARAM('page');
    console.log(page);
    if (!page) {
        page = 0;
    } else {
        page--;
    }
    displayProducts(catalog, page*10);
    setupPagination(page);

    // $('.class="pagination_dir"').click(function(event) {
    //     var needUpdate = false;
    //
    //     if ($(this).attr('aria-label') == 'Previous' && curntPagination > 0) {
    //         curntPagination -= 10;
    //         needUpdate = true;
    //
    //     } else if ($(this).attr('aria-label') == 'Next' && curntPagination+10 <= maxPagination) {
    //         curntPagination += 10;
    //         needUpdate = true;
    //     }
    //
    //     if(needUpdate){
    //         setupPagination();
    //         displayProducts(catalog, curntPagination);
    //     }
    //
    //     // event.preventDefault();
    // });

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
