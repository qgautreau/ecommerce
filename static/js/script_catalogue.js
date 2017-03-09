$(document).ready(function() {
    console.log('start');
    displayProducts(catalog, 0);
    setupPagination();

    $('.pagination li > a').click(function(event) { // TODO
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
        console.log(order);
        displayProducts(catalog, curntPagination);
        event.preventDefault();
    });
});
