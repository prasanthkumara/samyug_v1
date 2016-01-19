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

	public function addNews($data)
	{
		extract($data);
		$query="INSERT INTO news(title,description,created) VALUES('%s','%s',NOW())";
		$result=$this->insertRow($query,array($title,$description));

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}

	public function deleteNews($data)
	{
		extract($data);
		$query="UPDATE news SET deleted=1 WHERE id='%s'";
		$result=$this->insertRow($query,array($news_id));

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}
}
?>