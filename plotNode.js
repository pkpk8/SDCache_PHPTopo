var txt;
var nodeLeft;
var nodeTop;


var nodeOfsw = new Array("00-00-00-00-00-01","00-00-00-00-00-02","00-00-00-00-00-03","00-00-00-00-00-04","00-00-00-00-00-05");
var nodeHost = new Array("11-11-11-11-11-06","00-00-00-00-11-01","00-00-00-00-11-02","00-00-00-00-11-03","00-00-00-00-11-04","00-00-00-00-11-05","00-00-00-00-11-06","00-00-00-11-11-10","00-00-00-11-11-11","00-00-00-11-11-12","00-00-00-11-11-13","00-00-00-11-11-14");

//"30-0e-d5-c1-6c-d0","00-e0-4c-36-01-9b","00-e0-4c-36-00-10","30-0e-d5-c1-6b-20",
//1,

function plotHS(){
	//matchRemove = "img[id^=node]";
	//$(matchRemove).remove();
	//$("h4").remove();
	for(var i=0; i<nodeHost.length; i++){
		nodeLeft = transx(point[nodeHost[i]].x);
		nodeTop = transy(point[nodeHost[i]].y);
	  
		
		$("img#node" + nodeHost[i]).animate({'left':(nodeLeft-25) +'px', 'top':(nodeTop-25) +'px'}, 0);
		$("h4#node" + nodeHost[i]).animate({'left':(nodeLeft-60) +'px', 'top':(nodeTop+10) +'px'}, 0);
		  
	}
	for(var i=0; i<nodeOfsw.length; i++){
		nodeLeft = transx(point[nodeOfsw[i]].x);
		nodeTop = transy(point[nodeOfsw[i]].y);
	  
		$("img#node" + nodeOfsw[i]).animate({'left':(nodeLeft-25) +'px', 'top':(nodeTop-25) +'px'}, 0);		
		$("h4#node" + nodeOfsw[i]).animate({'left':(nodeLeft-60) +'px', 'top':(nodeTop+10) +'px'}, 0);
		
	}
	
	
}

