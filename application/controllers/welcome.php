<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {
	
	public function index()
	{
		$this->load->view('index');
	}
	public function simple_search()
	{
		$this->load->view('simple');
	}
	public function advance_search()
	{
		$this->load->view('adv');
	}
	public function advance_search_joins()
	{
		$this->load->view('join');
	}
}
