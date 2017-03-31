<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Contact - E-commerce</title>

        <link rel="stylesheet" href="static/external/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="static/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Kaushan+Script" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <?php include "header.php";?>
            <main id="contact_main">
                <h2>Contact</h2>
                <form id="contact_form">
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input type="text" class="form-control" id="name" placeholder="Nom">
                    </div>
                    <div class="form-group">
                        <label for="email">Adresse mail</label>
                        <input type="email" class="form-control" id="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="subject">Sujet du message</label>
                        <input type="text" class="form-control" id="subject" placeholder="Sujet">
                    </div>
                    <div class="form-group">
                        <label for="msg">Votre message :</label>
                        <textarea id="msg" rows="10"></textarea>
                    </div>
                    <button type="submit" class="btn btn-default">Envoyer</button>
                </form>
            </main>
            <?php include "footer.php";?>
        </div>

        <script src="static/external/jquery/dist/jquery.min.js"></script>
        <script src="static/external/bootstrap/dist/js/bootstrap.min.js"></script>
    </body>
</html>
