<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Catalogue - E-commerce</title>

        <link rel="stylesheet" href="static/external/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="static/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <?php include "header.php";?>
            <main>
                <section>
                    <div class="row">
                        <div class="col-md-8">
                            <h2>Catalogue</h2>
                        </div>
                        <div class="col-md-4">
                            <form id="search_form">
                                <input type="search" placeholder="Search" id="search_query"/>
                                <label for="tri_item">
                                    Trier par :
                                    <select id="tri_item">
                                        <option value="default">Défault</option>
                                        <option value="increase">Prix croissant</option>
                                        <option value="decrease">Prix décroissant</option>
                                    </select>
                                </label>
                                <input type="submit" value="GO" id="tri"/>
                            </form>
                        </div>
                    </div>
                    <?php
                    define('MYSQL_SERVEUR', 'localhost');
                    define('MYSQL_UTILISATEUR', 'toto');
                    define('MYSQL_MOTDEPASSE', 'yolo');
                    define('MYSQL_BASE', 'Shop');

                    $mysql = new MySQLi(MYSQL_SERVEUR,
                    MYSQL_UTILISATEUR,
                    MYSQL_MOTDEPASSE,
                    MYSQL_BASE);

                    $mysql->set_charset("utf8");

                    $sql = 'SELECT * FROM Product';

                    $result = $mysql->query($sql);

                    while (NULL !== ($row = $result->fetch_array())) {
                        echo "<div class='row'>";
                        echo "<div class='col-md-6 col-lg-6'>";
                        echo "<article>";
                        echo "<div>";
                        echo "<img src='http://placehold.it/140x140' alt='image produit' $row[id]";
                        echo "<h3>$row[name]</h3>";
                        echo "<p>$row[description]</p>";
                        echo "</div>";
                        echo "<div>";
                        echo "<a class='btn btn-default' href='produit.php?index=$row[id]'>Voir</a>";
                        echo "<button class='btn btn-default btn-panier'>Ajouter au panier</button>";
                        echo "<span>Prix\n$row[price]€</span>";
                        echo "</div>";
                        echo "</article>";
                        echo "</div>";
                        echo "</div>";
                    }

                    $result->free();
                    $mysql->close();
                    ?>
                </section>

                <nav id="pagination_nav" aria-label="Page navigation">
                    <ul class="pagination">
                    </ul>
                </nav>
            </main>
            <?php include "footer.php";?>
        </div>

        <script src="static/external/jquery/dist/jquery.min.js"></script>
        <script src="static/external/bootstrap/dist/js/bootstrap.min.js"></script>


    </body>
</html>
