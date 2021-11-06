<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    // Connect to the MySQL database
	$connect = mysqli_connect('localhost', 'root', '', 'query_final');

	// If the connection did not work, display an error message
	if (!$connect) 
	{
		echo 'Error Code: ' . mysqli_connect_errno() . '<br>';
		echo 'Error Message: ' . mysqli_connect_error() . '<br>';
		exit;
	}

    $data = file_get_contents('php://input');
    $data =json_decode($data);

    $query="SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME =  '$data[0]'";
	$result = mysqli_query($connect, $query);
    $dbdata = array();
    while ( $row = $result->fetch_assoc())  {
      $dbdata[]=$row;
    }

    echo json_encode($dbdata);
    

?>

