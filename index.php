<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Accueil - E-commerce</title>

        <link rel="stylesheet" href="static/external/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="static/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <?php include "header.php";?>
            <main>
                <p id="presentation">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <section>
                    <h2>Meilleures ventes</h2>
                </section>
            </main>

            <footer>
                <p>Made by <em>Quentin</em> & <em>Léon</em></p>
            </footer>
        </div>

        <script src="static/external/jquery/dist/jquery.min.js"></script>
        <script src="static/external/bootstrap/dist/js/bootstrap.min.js"></script>

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

            while ($row = $result->fetch_assoc()) {
                echo $row['name']." ".$row['description']." ".$row['price']."<br>";
            }

            $result->free();
            $mysql->close();
        ?>
    </body>
</html>