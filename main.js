
/*********************************map*****************************************/
var labelType, useGradients, nativeTextSupport, animate;

var point = {};
var nodePos = 0;

var count = 0;
var idNumber = 0;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};







function init() {

    //init data
    var json = document.getElementById("jsonString").innerHTML;
    idNumber = (json.length-json.replace(/\"id\"/g,'').length)/4;
    var jsonBefore = json;
    json = JSON.parse(json);
    //end
    
    //init nodetypes
    //Here we implement custom node rendering types for the RGraph
    //Using this feature requires some javascript and canvas experience.
    $jit.RGraph.Plot.NodeTypes.implement({
        //This node type is used for plotting pie-chart slices as nodes
        'nodepie': {
          'render': function(node, canvas) {
            var span = node.angleSpan, begin = span.begin, end = span.end;
            var polarNode = node.pos.getp(true);
            var polar = new $jit.Polar(polarNode.rho, begin);
            var p1coord = polar.getc(true);
            polar.theta = end;
            var p2coord = polar.getc(true);

            var ctx = canvas.getCtx();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(p1coord.x, p1coord.y);
            ctx.moveTo(0, 0);
            ctx.lineTo(p2coord.x, p2coord.y);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, polarNode.rho, begin, end, false);
            ctx.fill();
          }
        },
        //Create a new node type that renders an entire RGraph visualization
        //as node
        'piechart': {
          'render': function(node, canvas, animating) {
            var ctx = canvas.getCtx(), pos = node.pos.getc(true);
	    
            ctx.save();
            ctx.translate(pos.x, pos.y);
            pie.plot();
            ctx.restore();
          }
         }
    });
    //end
    
    //init pie
    //This RGraph instance will be used as the node for 
    //another RGraph instance.
    var pie = new $jit.RGraph({
        'injectInto': 'infovis',
        //Optional: create a background canvas and plot
        //concentric circles in it.
        'background': {
          CanvasStyles: {
            strokeStyle: 'orange' /*圆线颜色*/
          }
        },
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        Node: {
            'overridable': true,
             'type':'nodepie'
        },
	Navigation: {
	    enable: false,
	    //type: 'Native',
	    //Enable panning events only if we're dragging the empty
	    //canvas (and not a node).
	    //panning: 'avoid nodes',
	    //zooming: 300 //zoom speed. higher is more sensible
	},
        Edge: {
            'type':'none'
        },
        //Parent-children distance
        levelDistance: 20,
        //Don't create labels in this visualization
        withLabels: false,
        //Don't clear the entire canvas when plotting
        //this visualization
        clearCanvas: false
    });
    //load graph.
    //pie.loadJSON(jsonpie);
    //pie.compute();
    //end

    //init rgraph
    var rgraph = new $jit.RGraph({
        useCanvas: pie.canvas,
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        /*Node: {
          color: '#416D9C',
	  type: 'circle',
	  dim: 20,
	  overridable: true,
        },
	Navigation: {
	    enable: false,
	    type: 'Native',
	    //Enable panning events only if we're dragging the empty
	    //canvas (and not a node).
	    panning: 'avoid nodes',
	    zooming: 300 //zoom speed. higher is more sensible
	},*/
        Edge: {
            color: 'grey',//连接线颜色
	    lineWidth: 2 
        },
        //Parent-children distance
        levelDistance: 100,
        //Duration
        duration: 1500,
        //Add styles to node labels on label creation
        onCreateLabel: function(domElement, node){
            /*domElement.innerHTML = node.name;
            var style = domElement.style;
            style.fontSize = "0.8em";
            style.color = "#fff";
            style.cursor = "pointer";
            /*domElement.onclick = function() {
              rgraph.onClick(node.id, {
                  hideLabels: false
              });
            };*/
	    
	    //todo:
	    nodePos = node.pos.getc(true);
	    var nodeLeft = transx(nodePos.x);
	    var nodeTop = transy(nodePos.y);
            
            if (node.id.match("00-00-00-00-00-")){
                var txt = ("<img id = \"node" + node.id + "\" src=\"img/sw.png\" width=\"55\" height=\"45\" align=\"middle\" style=\"left:" + (nodeLeft-25) +"px;top:"+ (nodeTop-25) +"px; position:absolute;\"><h4 id = \"node" + node.id + "\" style=\"color:black; background:; left:" + (nodeLeft - 30) +"px; top:"+ (nodeTop + 10) +"px; position:absolute;\">" + "OFSwitch" + "</h4>");
            }

            
            else if (node.id.match("00-00-00-00-")){
                 txt = ("<img id = \"node" + node.id + "\" src=\"img/terminals.png\" width=\"60\" height=\"60\" align=\"middle\" style=\"left:" + (nodeLeft-25) +"px;top:"+ (nodeTop-25) +"px; position:absolute;\"><h4 id = \"node" + node.id + "\" style=\"color:black; background:; left:" + (nodeLeft - 26) +"px; top:"+ (nodeTop + 15) +"px; position:absolute;\">" +"Terminal" + "</h4>");
            }
           
            else if (node.id.match("00-00-00-")){
                 txt = ("<img id = \"node" + node.id + "\" src=\"img/cache.png\" width=\"40\" height=\"40\" align=\"middle\" style=\"left:" + (nodeLeft-25) +"px;top:"+ (nodeTop-25) +"px; position:absolute;\"><h4 id = \"node" + node.id + "\" style=\"color:black; background:; left:" + (nodeLeft - 26) +"px; top:"+ (nodeTop + 3) +"px; position:absolute;\">" +"Cache"+ "</h4>");
            }
	    else if (node.id.match("11-11-11-11-11-06")){
                 txt = ("<img id = \"node" + node.id + "\" src=\"img/server.png\" width=\"100\" height=\"60\" align=\"middle\" style=\"left:" + (nodeLeft-25) +"px;top:"+ (nodeTop-25) +"px; position:absolute;\"><h4 id = \"node" + node.id + "\" style=\"color:black; background:; left:" + (nodeLeft - 60) +"px; top:"+ (nodeTop + 20) +"px; position:absolute;\">" +"Media Streaming Server"+ "</h4>");
            }

	     $("body").append(txt);
	  
	     $("img#node" + node.id).bind('click', function(){
		rgraph.onClick(node.id, {
		  hideLabels: false
		});
	    });
	     
            
	  
	    /*$("img#node" + node.id).bind('click', function(){
		rgraph.onClick(node.id, {
		  hideLabels: false
		});
	    });*/
	    
	    /*$("img#node" + node.id).click(function(){
		rgraph.onClick(node.id);
	    });*/
	},
        
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
            style.display = '';
	    
	    
	    nodePos = node.pos.getc(true);
	    point[node.id] = {'x':nodePos.x, 
			      'y':nodePos.y};
	    count++;
	    
	    /*if(count == idNumber){
		plotHS();
	    }	 
	    var clickImg = document.getElementById('node'+node.id);
	    clickImg.onclick = function(){
	      rgraph.onClick(node.id, {
		  hideLabels: false
	      });
	    };*/
	    
	    if(count == 3*idNumber){
		  plotHS();   //点击拓扑改变
		  ani(pair5);  //点击之后加载流量动画
                 
		  count = 0;
	    }
        }
    });
    //load graph.
    rgraph.loadJSON(json);
    rgraph.refresh();
   


 

setInterval(function(){
  
	json = document.getElementById("jsonString").innerHTML;
	
	idNumber = (json.length-json.replace(/\"id\"/g,'').length)/4;
        
	if(json != jsonBefore){
	// $("img#nodeLoading").remove();
	// $("h4#nodeLoading").remove();
       $("img").remove();
       $("h4").remove();
	    jsonBefore = json;
	    json = JSON.parse(json);
	    rgraph.loadJSON(json);    
 
	    rgraph.refresh();
     
    
	    ani(pair); //流量动画
            setTimeout("ani(pair2)",10000); //流量动画
 	    setTimeout("ani(pair3)",20000); //流量动画
 	    setTimeout("ani(pair4)",25000); //流量动画
 	    setTimeout("ani(pair5)",30000); //流量动画


	}
   },0)



    //end


}



