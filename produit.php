<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Produit - E-commerce</title>

        <link rel="stylesheet" href="static/external/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="static/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <header>
                <h1>E-Commerce</h1>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <ul class="nav navbar-nav">
                            <li><a href="index.php">Accueil</a></li>
                            <li><a href="catalogue.php">Catalogue</a></li>
                            <li><a href="panier.html">Panier <em id="item_count">(0)</em></a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
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

                    $row = $result->fetch_array();
                    echo "<div class='row'>";
                    echo "<div class='col-md-12 col-lg-12'>";
                    echo "<article>";
                    echo "<div>";
                    echo "<img src='http://placehold.it/140x140' alt='image produit' $row[id]>";
                    echo "<h3>$row[name]</h3>";
                    echo "<p>$row[description]</p>";
                    echo "</div>";
                    echo "<div class='pictures'>";
                    echo "<img src='http://placehold.it/200x200' alt='image produit $row[id]' class='product-picture'>";
                    echo "</div>";
                    echo "<div>";
                    echo "<a class='btn btn-default' href='produit.php'>Voir</a>";
                    echo "<button class='btn btn-default btn-panier'>Ajouter au panier</button>";
                    echo "<span>Prix\n$row[price]€</span>";
                    echo "</div>";
                    echo "</article>";
                    echo "</div>";
                    echo "</div>";

                    $result->free();
                    $mysql->close();
                ?>

            </main>

            <footer>
                <p>Made by <em>Quentin</em> & <em>Léon</em></p>
            </footer>
        </div>

        <script src="static/external/jquery/dist/jquery.min.js"></script>
        <script src="static/external/bootstrap/dist/js/bootstrap.min.js"></script>
    </body>
</html>
