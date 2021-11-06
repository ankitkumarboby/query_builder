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

	<link rel="stylesheet" href="../css/style.css" type="text/css">
	<title>Document</title>
</head>
<body>
	
	<header>
		<nav class="navbar navbar-light bg-light" >
		<a class="navbar-brand" href="#">
			<img src="../assets/images/logo.png" width="50" height="50" class="d-inline-block align-top" alt="">
			IIT(ISM) Dhanbad
		</a>
		</nav>
	</header>
	<section>
		<div id="main-container">
			<div id="select-table-div">
				Select Table:
				<br>
                <div id="table-picker" class="overflow-auto">
                <?php
                    $query='SHOW TABLES';
                    $result = mysqli_query($connect, $query);
                    $sno = 0;
                    while ($record = mysqli_fetch_assoc($result))
                    {
                        $tableName=$record['Tables_in_query_final'];
                        echo '<div class="form-check"><input class="form-check-input" type="checkbox" value="'. $sno .'" id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault">'.$tableName.'</label></div>';
                        $sno = $sno + 1;   
                    }
                ?>
                </div>

				<button type="button"class="btn btn-success get-feild">Proceed</button>
				<button id="do-join" type="button"class="btn btn-info get-feild"> Do Joins </button>
			</div>

			<div class="collapse collapse1">
			<div id="condition-div">
				Coditions:
				<br>
				<select id="condition-type" class="form-select" aria-label="Default select example">
					<option value="0">No condition</option>
					<option value="1">single condition</option>
					<option value="2">NOT condition</option>
					<option value="3">AND condition</option>
					<option value="4">OR condition</option>
				</select>
				<div class="collapse collapse2">
				<div class="arithmetic-condition">
						<select class="form-select column-dropdown" aria-label="Default select example">
							<option value="0">constant</option>
						</select>
				  <input type="text" class="form-control" aria-describedby="basic-addon2">
						<select class="btn-outline-primary form-select" aria-label="Default select example">
							<option value="0"> = </option>
							<option value="1"> != </option>
							<option value="2"> > </option>
							<option value="3"> >= </option>
							<option value="4"> < </option>
							<option value="5"> <= </option>
						</select>
				  

				  <input type="text" class="form-control" aria-describedby="basic-addon2">
				  		<select class="form-select column-dropdown" aria-label="Default select example">
						  	<option value="0">constant</option>
						</select>

				</div>
				</div>
				<div class="collapse collapse3">
				<div id="condition-name-div"><b>AND</b></div>

				<div class="arithmetic-condition">
						<select class="form-select column-dropdown" aria-label="Default select example">
							<option value="0">constant</option>
						</select>
				  <input type="text" class="form-control" aria-describedby="basic-addon2">
						<select class="btn-outline-primary form-select" aria-label="Default select example">
							<option value="0"> = </option>
							<option value="1"> != </option>
							<option value="2"> > </option>
							<option value="3"> >= </option>
							<option value="4"> < </option>
							<option value="5"> <= </option>
						</select>
				  

				  <input type="text" class="form-control" aria-describedby="basic-addon2">
				  		<select class="form-select column-dropdown" aria-label="Default select example">
						  	<option value="0">constant</option>
						</select>

				</div>
				</div>
			</div>

			<div id="filter-div">
				Choose required columns:
				<br>
				<input id="select-all-column" class="form-check-input" type="checkbox">
				<label class="form-check-label" for="flexCheckDefault">
					Select All
				</label>
				<div id="column-picker" class="overflow-auto">	
				</div>
				Order by:
				<br>
				<select id = "order-column-list" class="form-select" aria-label="Default select example">
					<option value="0"> None </option>

				</select>
				<select id = "order-value" class="form-select" aria-label="Default select example">
					<option value="0"> Ascending </option>
					<option value="1"> Descending </option>
				</select>
			</div>
		<div id="submit-div">
				<button type="button" class="btn btn-success">Download CSV</button>
		</div>
		</div>
		</div>

	</section>

	<script src='../js/adv.js'></script>

</body>
</html>