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
            <?php include "header.php";?>
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
                    $id = $_GET["index"];

                    $sql = 'SELECT * FROM Product WHERE id ='. $id.';';

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
                    echo "<div>";
                    echo "<a class='btn btn-default' href='catalogue.php'>Retour au catalogue</a>";
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
            <?php include "footer.php";?>
        </div>

        <script src="static/external/jquery/dist/jquery.min.js"></script>
        <script src="static/external/bootstrap/dist/js/bootstrap.min.js"></script>
    </body>
</html>
