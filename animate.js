var arg;
var leftStart;
var topStart;
var leftEnd;
var topEnd;
var time = 1000;
var color = 'blue';
var txt;
var matchRemove = "a[id^=point]";

var pair = new Array();
pair[0] = {'start':'11-11-11-11-11-06', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':0};
pair[1] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':0};
pair[2] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-04', 'speed':25, 'pathID':0};
pair[3] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-00-11-06', 'speed':25, 'pathID':0};
pair[4] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-11-11-12', 'speed':25, 'pathID':0};
pair[5] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-11-11-10', 'speed':25, 'pathID':0};
pair[6] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-11-11-11', 'speed':25, 'pathID':0};


var pair2 = new Array();
pair2[0] = {'start':'11-11-11-11-11-06', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':0};
pair2[1] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':0};
pair2[2] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-04', 'speed':25, 'pathID':0};
pair2[3] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-00-11-06', 'speed':25, 'pathID':0};
pair2[4] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-11-11-12', 'speed':25, 'pathID':0};
pair2[5] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-11-11-10', 'speed':25, 'pathID':0};
pair2[6] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-11-11-11', 'speed':25, 'pathID':0};


pair2[7] = {'start':'00-00-00-11-11-12', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':3};
pair2[8] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-02', 'speed':25, 'pathID':3};
pair2[9] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-00-11-01', 'speed':25, 'pathID':3};
pair2[10] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-11-11-13', 'speed':25, 'pathID':3};



var pair3 = new Array();
pair3[0] = {'start':'11-11-11-11-11-06', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':0};
pair3[1] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':0};
pair3[2] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-04', 'speed':25, 'pathID':0};
pair3[3] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-00-11-06', 'speed':25, 'pathID':0};
pair3[4] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-11-11-12', 'speed':25, 'pathID':0};
pair3[5] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-11-11-10', 'speed':25, 'pathID':0};
pair3[6] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-11-11-11', 'speed':25, 'pathID':0};


pair3[7] = {'start':'00-00-00-11-11-12', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':3};
pair3[8] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-02', 'speed':25, 'pathID':3};
pair3[9] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-00-11-01', 'speed':25, 'pathID':3};
pair3[10] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-11-11-13', 'speed':25, 'pathID':3};


pair3[11] = {'start':'00-00-00-11-11-10', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':3};
pair3[12] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-05', 'speed':25, 'pathID':3};
pair3[13] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-00-11-05', 'speed':25, 'pathID':3};
pair3[14] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-11-11-14', 'speed':25, 'pathID':3};
pair3[15] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-11-04', 'speed':25, 'pathID':3};


var pair4 = new Array();
pair4[0] = {'start':'11-11-11-11-11-06', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':0};
pair4[1] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':0};
pair4[2] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-04', 'speed':25, 'pathID':0};
pair4[3] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-00-11-06', 'speed':25, 'pathID':0};
pair4[4] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-11-11-12', 'speed':25, 'pathID':0};
pair4[5] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-11-11-10', 'speed':25, 'pathID':0};
pair4[6] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-11-11-11', 'speed':25, 'pathID':0};


pair4[7] = {'start':'00-00-00-11-11-12', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':3};
pair4[8] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-02', 'speed':25, 'pathID':3};
pair4[9] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-00-11-01', 'speed':25, 'pathID':3};
pair4[10] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-11-11-13', 'speed':25, 'pathID':3};


pair4[11] = {'start':'00-00-00-11-11-10', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':3};
pair4[12] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-05', 'speed':25, 'pathID':3};
pair4[13] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-00-11-05', 'speed':25, 'pathID':3};
pair4[14] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-11-11-14', 'speed':25, 'pathID':3};
pair4[15] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-11-04', 'speed':25, 'pathID':3};

pair4[16] = {'start':'00-00-00-11-11-14', 'end':'00-00-00-00-00-05', 'speed':25, 'pathID':2};
pair4[17] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-00-11-03', 'speed':25, 'pathID':2};



var pair5 = new Array();
pair5[0] = {'start':'11-11-11-11-11-06', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':0};
pair5[1] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':0};
pair5[2] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-04', 'speed':25, 'pathID':0};
pair5[3] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-00-11-06', 'speed':25, 'pathID':0};
pair5[4] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-11-11-12', 'speed':25, 'pathID':0};
pair5[5] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-11-11-10', 'speed':25, 'pathID':0};
pair5[6] = {'start':'00-00-00-00-00-04', 'end':'00-00-00-11-11-11', 'speed':25, 'pathID':0};


pair5[7] = {'start':'00-00-00-11-11-12', 'end':'00-00-00-00-00-01', 'speed':25, 'pathID':3};
pair5[8] = {'start':'00-00-00-00-00-01', 'end':'00-00-00-00-00-02', 'speed':25, 'pathID':3};
pair5[9] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-00-11-01', 'speed':25, 'pathID':3};
pair5[10] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-11-11-13', 'speed':25, 'pathID':3};


pair5[11] = {'start':'00-00-00-11-11-10', 'end':'00-00-00-00-00-03', 'speed':25, 'pathID':3};
pair5[12] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-00-05', 'speed':25, 'pathID':3};
pair5[13] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-00-11-05', 'speed':25, 'pathID':3};
pair5[14] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-11-11-14', 'speed':25, 'pathID':3};


pair5[15] = {'start':'00-00-00-00-00-03', 'end':'00-00-00-00-11-04', 'speed':25, 'pathID':3};

pair5[16] = {'start':'00-00-00-11-11-14', 'end':'00-00-00-00-00-05', 'speed':25, 'pathID':2};
pair5[17] = {'start':'00-00-00-00-00-05', 'end':'00-00-00-00-11-03', 'speed':25, 'pathID':2};



pair5[18] = {'start':'00-00-00-11-11-13', 'end':'00-00-00-00-00-02', 'speed':25, 'pathID':2};
pair5[19] = {'start':'00-00-00-00-00-02', 'end':'00-00-00-00-11-02', 'speed':25, 'pathID':2};

/*
var str = document.getElementById("myDiv").innerHTML;

 document.write(str);

var pair=str.split("|");
*/
function ani(pair){
	matchRemove = "a[id^=point]";
	$(matchRemove).remove();
	//$("iii").remover();
	gotostart(pair);
	arg = pair;
	setInterval("gotoend(arg)", 400);
	//gotoend(arg);
}
function transx(x){
	 //return x+document.documentElement.clientWidth/2;	
         return x+800;
}
function transy(y){
	//return y+document.documentElement.clientHeight/2;
         return y+403.5
}
function gotoend(pair){	
	for(i=0; i<pair.length; i++){
		leftStart = transx(point[pair[i].start].x);
		topStart = transy(point[pair[i].start].y);
		leftEnd = transx(point[pair[i].end].x);
		topEnd = transy(point[pair[i].end].y);
		
		time = 2000;
		
		
		if(pair[i].speed < 25)
			time = 2000;
		else if(pair[i].speed < 50)
			time = 1600;
		else if(pair[i].speed < 75)
			time = 1200;
		else if(pair[i].speed < 100)
			time = 800;
		else
			time = 400;
		
		$("#point"+(i)).animate({'left':(leftEnd - 6) +'px', 'top':(topEnd - 6) +'px'}, time).animate({'left':(leftStart - 6) +'px', 'top':(topStart - 6) +'px'}, 0);
	}
}
function gotostart(pair)
{
	for(i=0; i<pair.length; i++){
		switch(pair[i].pathID){
		  case 0:
		    color = 'purple';break;
		  case 1:
		    color = 'yellow';break;
		  case 2:
		    color = 'orange';break;
		  case 3:
		    color = 'green';break;
		  case 4:
		    color = 'lawngreen';break;
		  case 5:
		    color = 'tan';break;
		  case 6:
		    color = 'violet';break;
		  case 7:
		    color = 'gold';break;
		  case 8:
		    color = 'darkturquoise';break;
		  case 9:
		    color = 'darkorange';break;
		}
		
		leftStart = transx(point[pair[i].start].x);
		topStart = transy(point[pair[i].start].y);
		txt = "<a id = \"point" + i + "\" style=\"background:" + color +";left:" + (leftStart - 6) +"px;top:"+ (topStart - 6) +"px; height:12px; width:12px; border-radius:50px; position:absolute;\">";
		$("body").append(txt);
		
		//txt = "<img id = \"iii" + "\" src=\"img/imac.gif\" width=\"50\" height=\"50\" align=\"middle\" style=\"background:"  +";left:" + (leftStart-25) +"px;top:"+ (topStart-25) +"px; position:absolute;\">";
		//$("body").append(txt);
	}
}
