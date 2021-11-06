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
	
	$data = $_GET['query_data'];
	$data = json_decode($data,true);

		$query = $data['query']; 
		$aDoor = $data['selectColumns'];
		$N = count($aDoor);

		if($N>0)
		$isChekcked=true;
		$colNames = "";
		for($i=0; $i < $N-1; $i++){
		$aDoor[$i] = rtrim($aDoor[$i], "/ ");
			$colNames .=$aDoor[$i];
			$colNames.= ",";
		}
		$aDoor[$N-1] = rtrim($aDoor[$N-1], "/ ");
		$colNames.=$aDoor[$N-1];

			$result = mysqli_query($connect, $query);
			$str_arr = explode (",", $colNames); 

			// file creation
			$filename = "users_" . date('Y-m-d') . time() . ".csv";
			$f = fopen('php://memory', 'w');
			$delimiter = ",";
			fputcsv($f, $str_arr, $delimiter);

			while($record = mysqli_fetch_assoc($result)){
				$arr=array();
				for($i=0;$i<count($str_arr);$i++)
				{
					array_push($arr,$record[$str_arr[$i]]);
				}
				fputcsv($f, $arr, $delimiter);

			} 
		//move back to beginning of file
		fseek($f, 0);

		//set headers to download file rather than displayed
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="' . $filename . '";');

		//output all remaining data on a file pointer
		fpassthru($f);
		// exit();
		exit;



		

?>