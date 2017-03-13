function getRandomProducts(catalog) {
    var randomProducts = [];
    var randomIndexes = [];

    var max = catalog.length > 5 ? 5 : catalog.length;

    var i=0;
    while (i < max) {
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

$(document).ready(function() {
    displayProducts(getRandomProducts(catalog), 0);
});
