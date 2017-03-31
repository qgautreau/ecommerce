<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Panier - E-commerce</title>
        <link rel="stylesheet" href="static/external/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="static/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <?php include "header.php";?>
            <main>
                <h2>Votre panier</h2>
                    <div class="row">
                        <div class="col-xs-12">
                            <table id="panier">
                                <thead>
                                    <tr>
                                        <th>article</th>
                                        <th>prix unitaire</th>
                                        <th>quantité</th>
                                        <th>montant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div class="col-md-5 col-md-offset-7">
                                <table id="recap">
                                    <tbody>
                                        <tr>
                                            <td>total articles</td>
                                            <td id="recap_qty">0</td>
                                        </tr>
                                        <tr>
                                            <td>total ht</td>
                                            <td id="recap_total_ht">0€</td>
                                        </tr>
                                        <tr>
                                            <td>tva 20%</td>
                                            <td id="recap_tva">0€</td>
                                        </tr>
                                        <tr>
                                            <td>total ttc</td>
                                            <td id="recap_total_ttc">0€</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="cartbuttonsbar">
                        <a href="catalogue.php" class="btn btn-default">retour catalogue</a>
                        <button id='clear_panier' class="btn btn-danger">vider le panier</button>
                        <button class="btn btn-default btn-panier">valider panier</button>
                    </div>
            </main>
            <?php include "footer.php";?>
        </div>

        <script src="static/external/jquery/dist/jquery.min.js"></script>
        <script src="static/external/bootstrap/dist/js/bootstrap.min.js"></script>
    </body>
</html>
