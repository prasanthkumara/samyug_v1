<?php
Class News extends helper
{
	public function listNews($data)
	{
		extract($data);
		$result=$this->listTable(sprintf("SELECT * FROM news WHERE category='%s' AND deleted=0",$category));

		if(empty($result))
		{
			return $this->formatError("No news found");
		}

		return $result;
	}
}
?>