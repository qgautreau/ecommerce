$(document).ready(function() {
    var page = GET_PARAM('page');

    if (!page) {
        page = 0;
    } else {
        page--;
    }

    if (sessionStorage.getItem('order')) {
        $("#tri_item").val(sessionStorage.getItem('order'));
    }

    if (sessionStorage.getItem('search_query')) {
        $('#search_query').val(sessionStorage.getItem('search_query'))
    }

    displayProducts(catalog, page*10);
    setupPagination(page);

    $("#tri").click(function(event) {
        sessionStorage.setItem('order', $("#tri_item").val())

        sessionStorage.setItem('search_query', $('#search_query').val());

        displayProducts(result, page*10);
        event.preventDefault();
    });
});
