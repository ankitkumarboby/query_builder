<?php
	// Connect to the MySQL database
	$connect = mysqli_connect('localhost', 'root', '', 'query_final');

	// If the connection did not work, display an error message
	if (!$connect) 
	{
		echo 'Error Code: ' . mysqli_connect_errno() . '<br>';
		echo 'Error Message: ' . mysqli_connect_error() . '<br>';
		exit;
	}




?>



<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<!-- Option 1: Bootstrap Bundle with Popper -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
		integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
		crossorigin="anonymous"></script>

	<style>
        #simple-search-btn{
            margin: 50px;
        }
        #adv-search-btn{
            margin: 50px;
        }
    </style>
	<title>Document</title>
</head>
<body>
	
	<header>
		<nav class="navbar navbar-light bg-light" >
		<a class="navbar-brand" href="#">
			<img src="assets/images/logo.png" width="50" height="50" class="d-inline-block align-top" alt="">
			IIT(ISM) Dhanbad
		</a>
		</nav>
	</header>
	<section>
    <button id = "simple-search-btn" type="button" class="btn btn-info">Simple Search</button>
    <button id = "adv-search-btn" type="button" class="btn btn-primary">Advance Search</button>
	</section>

    <script>
        $('#simple-search-btn').on('click',function(){
            window.location = `/LabProject/index.php/simple_search`;
        });
        $('#adv-search-btn').on('click',function(){
            window.location = `/LabProject/index.php/advance_search`;            
        });
    </script>

</body>
</html>