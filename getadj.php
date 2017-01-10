<?php

$adjFile = 'adjfile.txt';
$adjFileHandle = fopen($adjFile,'r');

$macmapFile = 'macmapfile.txt';
$macmapFileHandle = fopen($macmapFile, 'r');

$map = fgets($adjFileHandle);
fclose($adjFileHandle);

$macmap = fgets($macmapFileHandle);
fclose($macmapFileHandle);

//处理路由器之间的邻接关系
//print_r($map);
$map = preg_replace("/\ |\(|\)/","",$map);//去除所有空格
//print_r($map);
$map = preg_replace("/defaultdict\<function\<lambda\>at..........\>,/", "", $map);//处理defaultdict(<function <lambda> at *>,
$map = preg_replace("/defaultdict\<function\<lambda\>at.........\>,/", "", $map);//处理defaultdict(<function <lambda> at *>,
//$map = preg_replace("/\ /","",$map);//去除所有空格括号
$map = preg_replace("/\:/","\":",$map);//添加双引号
$map = preg_replace("/\None/","\"None\"",$map);//添加双引号
$map = preg_replace("/{00-00-00-00-00-/","{\"00-00-00-00-00-",$map);//添加双引号
$map = preg_replace("/,00-00-00-00-00-/",",\"00-00-00-00-00-",$map);//添加双引号
//print_r($map);
$json = array();
$json = json_decode($map, true);
//print_r($json);



$jsonMap = $json; //jsonMap是一个数组，用jsonMap保存转换为json的邻接关系
$countJson = count($json);
$i = 0;
$router = array();
foreach($json as $r => $json)
  $router[$i++] = $r;

$routerInfo = array(
    "id" => "",
    "name" => "",
    "adjacency" => ""
	);
$routerAll = array();

foreach($jsonMap as $jsonMapElement => $arr){
    $routerInfo["id"] = $jsonMapElement;
    $routerInfo["name"] = str_replace('00-00-00-00-00-','ofsw ', $jsonMapElement);
    $adjacencyInfo = array();
    foreach($arr as $arrElement){
	    if($arrElement != 'None'){
	    $arrKey = array_keys($arr,$arrElement);
	    array_push($adjacencyInfo,$arrKey[0]);
	}
    }
    $routerInfo["adjacency"] = $adjacencyInfo;
    $routerAll[$jsonMapElement] = $routerInfo;
}
//print_r($routerAll);

//处理host与router之间的邻接关系
$macmap = preg_replace("/\ |\'/","",$macmap);//去除空格
$macmap = preg_replace("/\,.\)/", ")", $macmap);//去除端口号
$macmap = preg_replace("/\)/", "\"", $macmap);//将)替换为"
$macmap = preg_replace("/\:\(/", ":\"", $macmap);//将(替换为"
$macmap = preg_replace("/EthAddr\(/", "\"", $macmap);//将)替换为"
//print_r($macmap);
$macmapArr = array();
$macmapArr = json_decode($macmap, true);
//print_r($macmapArr);

//获取根节点
function getRoot(){
	global $routerAll;	
	foreach ($routerAll as $rtKey => $rtVal){
		$root = $rtKey;
		break;
	}
	return $root;
}

$matchedArr = array();//存储已匹配到的节点

//将图转化为树
function mapToTree($router, $parent){
	global $matchedArr;
	global $routerAll;
	
	foreach($router['adjacency'] as $child){
		if(in_array($child, $matchedArr))
			continue;
		else{
			array_push($matchedArr, $child);
			
			/*****去除$router中 id name adjacency 等信息*****/
			unset($router['id']);
			unset($router['name']);
			unset($router['adjacency']);
			/**********************************************/
			
			$parent[$child] = mapToTree($routerAll[$child], $router);
		}
	}
	return $parent;
}

$jsonRoot = getRoot();
array_push($matchedArr, $jsonRoot);
$tree = array();
$tree[$jsonRoot] = mapToTree($routerAll[$jsonRoot],$tree);
//print_r($tree);
$jsonString = '';
function treeToJson($tree, $treeRoot){
	global $routerAll;
	global $macmapArr;

	$string = '{"id":"' . $routerAll[$treeRoot]['id'] . '","name":"' . $routerAll[$treeRoot]['name'] . '","children":[';
	/**********添加host与router的关系**********/
	/**********添加host与router根节点的关系**********/
	foreach($macmapArr as $mmKey => $mmVal){
		if($mmVal == $treeRoot){
			                        
			$string .= '{"id":"' . $mmKey . '","name":"' . $mmKey . '","data":{"overridable": true,"$type": "square","$dim":10, "$color":"#70A35E"}}';
				}	
}

	foreach($tree as $rtKey => $rtArr)	{
              
		$string .= treeToJson($rtArr, $rtKey);
		/**********添加host与router根节点以下的关系**********/
		foreach($macmapArr as $mmKey => $mmVal){


			if($mmVal == $rtKey){
                                
				$string .= '{"id":"' . $mmKey . '","name":"' . $mmKey . '","data":{"overridable": true,"$type": "square","$dim":10, "$color":"#70A35E"}}';
			}			
		}
		/**************************************/
		$string .= ']}';
	}
	return $string;
}

$jsonString .= treeToJson($tree[$jsonRoot], $jsonRoot);

$jsonString .= ']}';

$jsonString = str_replace("}{","},{",$jsonString);
$jsonString = str_replace(":","-",$jsonString);
$jsonString = str_replace("\"-","\":",$jsonString);
//print_r($jsonString);
//print_r(json_decode($jsonString, true));

//print_r(treeToJson($tree[$jsonRoot], $jsonRoot));
$adjFile = 'adj.txt';
$adjFileHandle = fopen($adjFile, 'w');
fwrite($adjFileHandle, $jsonString);
fclose($adjFileHandle);
?>
