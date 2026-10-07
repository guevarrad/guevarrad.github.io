<?php
$name = isset($_GET['name']) && is_string($_GET['name']) ? $_GET['name'] : '';
$email = isset($_GET['email']) && is_string($_GET['email']) ? $_GET['email'] : '';
$message = isset($_GET['message']) && is_string($_GET['message']) ? $_GET['message'] : '';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }
    </style>
    <link rel="stylesheet" href="../styles.css">
</head>

<body>
    <nav>
        <a href="../index.html">Home</a>
        <a href="form.html">Contact form</a>
        <a href="submit.php">Form submission</a>
    </nav>
    <div class="container">
        <h1>Form Submission Results</h1>
        <div id="result">
            <p><strong>Name:</strong> <code><?= htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></code></p>
            <p><strong>Email:</strong> <code><?= htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></code></p>
            <p><strong>Message:</strong> <code><?= htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></code></p>
        </div>
    </div>
</body>

</html>