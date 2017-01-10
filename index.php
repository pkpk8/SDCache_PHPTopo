<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<!--<meta http-equiv="refresh" content="10"> --> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>SDM2Cast</title>

<!-- CSS Files -->
<link type="text/css" href="base.css" rel="stylesheet" />
<link type="text/css" href="Other.css" rel="stylesheet" />

<!--[if IE]><script language="javascript" type="text/javascript" src="../../Extras/excanvas.js"></script><![endif]-->

<!-- JIT Library File -->
<script language="javascript" type="text/javascript" src="jit.js"></script>
<script language="javascript" type="text/javascript" src='jquery-2.1.1.min.js'></script>


<script language="javascript" type="text/javascript" src="plotNode.js"></script>
<script language="javascript" type="text/javascript" src="main.js"></script>
<script language="javascript" type="text/javascript" src="animate.js"></script>  

	<script language="javascript" type="text/javascript">
	    setInterval(function(){
		getJSON();
	    },3)
	</script>


</head>


<body onload="onloadInit();">



<script>
    function onloadInit(){
	getJSON();
         init();
        // getStr();
       
       
    }
</script>



<div id="insert"></div>
<div id="container">

<div id="center-container">
    <div id="infovis"></div>
    
    <div id="" class="node" style="position: absolute; font-size: 2em; color: red; cursor: pointer;  top:0px">SDCache</div>  
    
    
    
    
    <script language="javascript" type="text/javascript">
	function getJSON()
	{
	    var xmlhttp;
	    
	    if (window.XMLHttpRequest)
	    {// code for IE7+, Firefox, Chrome, Opera, Safari
	      xmlhttp=new XMLHttpRequest();
	    }
	    else
	    {// code for IE6, IE5
	      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange=function()
	    {
	      if (xmlhttp.readyState==4 && xmlhttp.status==200)
	      {
		document.getElementById("jsonString").innerHTML=xmlhttp.responseText;
	      }
	    }
	    //xmlhttp.open("GET","/ajax/gethint.asp?q="+str,true);
	    xmlhttp.open("GET","adj.txt",true);       
            xmlhttp.send();
        
	}

 

    </script>

<div id="jsonString" >{"id":"Loading","name":""}</div>
<script>
    $("#jsonString").hide();
</script>

<?php
	ignore_user_abort();
	set_time_limit(0);
	$interval =1 ;
	include 'getadj.php';
	sleep($interval);
    ?>





</body>
</html>
 
