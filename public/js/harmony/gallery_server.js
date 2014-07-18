const REV = 6,
      // BRUSHES = ["web", "vmirrorweb", "hmirrorweb", "", "sketchy", "vmirrorsketchy", "hmirrorsketchy", "", "shaded", "vmirrorshaded", "hmirrorshaded", "", "simple", "vmirrorsimple", "hmirrorsimple", "", "chrome", "fur", "longfur", "", "squares", "ribbon", "", "circles", "grid"],
       BRUSHES = ["web", "sketchy", "shaded", "marker", "simple", "eraser", "pen", "chrome", "fur", "longfur", "ribbon"],


       USER_AGENT = navigator.userAgent.toLowerCase();

var //SCREEN_WIDTH = window.innerWidth,
   // SCREEN_HEIGHT = window.innerHeight,
 /*  SCREEN_WIDTH = 1400,
     SCREEN_HEIGHT = 820,*/
     SCREEN_WIDTH = 1380,
     SCREEN_HEIGHT = 800,
   TEXT_WIDTH = 360,
   TEXT_HEIGHT = 100,
   socket,
   CANVAS_OFFSET_X = 10,
   CANVAS_OFFSET_Y = 78,
   MAX_EXTENT = 20,
   drawingURL,
   canvasURL,
   vision_input,
   FULL_WIDTH = window.innerWidth,
   FULL_HEIGHT = window.innerHeight,
    BRUSH_SIZE = 1,
    BRUSH_PRESSURE = 1,
    EXTENT = 1,
    COLOR = [0, 0, 0],
    BACKGROUND_COLOR = [250, 250, 250],
    brush,
    saveTimeOut,
    wacom,
    i,
    mouseX = 0,
    mouseY = 0,
    container,
    brushSettings,
    canvas,
    markerCanvas, //canvas for drawing fills (behind main line canvas)
    fabricCanvas,
    flattenCanvas,
    fCanvas,
    fabricContext,
    markerContext,
    context,
    isFgColorSelectorVisible = false,
    isBgColorSelectorVisible = false,
    shiftKeyIsDown = false,
    altKeyIsDown = false,
	brushSizeTouchStart = 1,
	brushSizeTouchReference = 0.0,
	z = 1,
	img,
	currMode = 'source-over',
	backgroundURL,
	thumb_canvas = new Array(),
	THUMB_WIDTH = 80,
	THUMB_HEIGHT = 40,
	thumb_mode = ['source-over', 'lighten', 'multiply'];

//var eventArray = [];
var endBool = true;

$( document ).ready(function() {
	/* var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  var socketLoc = str.substring(0, extra);
  socket = io.connect(socketLoc);*/
  //socket.emit("init drawing", "");
	//socket = io.connect('http://10.10.16.43');
	initDrawing();
	
});



function initDrawing()
{

	var hash, palette, embed, localStorageImage;
	
	
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundPosition = 'center center';	
	

	/*
	 * TODO: In some browsers a naste "Plugin Missing" window appears and people is getting confused.
	 * Disabling it until a better way to handle it appears.
	 * 
	 * embed = document.createElement('embed');
	 * embed.id = 'wacom-plugin';
	 * embed.type = 'application/x-wacom-tablet';
	 * document.body.appendChild(embed);
	 *
	 * wacom = document.embeds["wacom-plugin"];
	 */
	

	container = document.createElement('div');
	document.body.appendChild(container);

	canvas = document.createElement("canvas");
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	canvas.style.cursor = 'crosshair';
	
	
	flattenCanvas = document.createElement("canvas");
	flattenCanvas.width = SCREEN_WIDTH;
	flattenCanvas.height = SCREEN_HEIGHT;

	baseCanvas = document.createElement("canvas");
	baseCanvas.width = SCREEN_WIDTH;
	baseCanvas.height = SCREEN_HEIGHT;

	//container.appendChild(baseCanvas);
	container.appendChild(flattenCanvas);
	container.appendChild(canvas);
	
	//container.appendChild(fabricCanvas);
	for(var i = 0; i < 3; i++){
		var this_canvas = document.createElement("canvas");
	
		this_canvas.width = THUMB_WIDTH;
		this_canvas.height = THUMB_HEIGHT;
		document.body.appendChild(this_canvas);
		var thumb_offset = 1060 + i*100;
		this_canvas.style.position = 'absolute';
		this_canvas.style.top = '10px';
		this_canvas.style.left =  thumb_offset +'px';
		this_canvas.style.zIndex = 300;
		this_canvas.setAttribute("id", thumb_mode[i]);
		this_canvas.setAttribute("class","thumb");
		thumb_canvas[i]= this_canvas;
		this_canvas.addEventListener("click", function(){ changeBackgroundMode(this.id);});
		
	}
var noScroll = function(event) {event.preventDefault()};
	
	brushSettings = new BrushSettings();
	container.appendChild(brushSettings.container);
	
	
	canvas.style.position = 'absolute';
	canvas.style.top = CANVAS_OFFSET_Y+'px';
	canvas.style.left = CANVAS_OFFSET_X+'px';
	flattenCanvas.style.position = 'absolute';
	flattenCanvas.style.top = CANVAS_OFFSET_Y+'px';
	flattenCanvas.style.left = CANVAS_OFFSET_X+'px';
	flattenCanvas.setAttribute("id", "flattenCanvas");
	canvas.setAttribute("id", "drawingCanvas");
	context = canvas.getContext("2d");
	canvas.style.zIndex = 30;
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('mouseout', onDocumentMouseOut, false);
	document.addEventListener("dragenter", onDocumentDragEnter, false);  
	document.addEventListener("dragover", onDocumentDragOver, false);
	document.addEventListener("drop", onDocumentDrop, false);  
	
	canvas.addEventListener('mousedown', onCanvasMouseDown, false);
	canvas.addEventListener('touchstart', onCanvasTouchStart, false);
	var colorVal = 'hsv('+ Math.floor(Math.random()*100)+', 80 , 80)';
	 $("#colorpicker").spectrum({
        color: colorVal,
        clickoutFiresChange: true,
        change: function(color) {
   	setForegroundColor(color.toRgb());
		}
    });
	 var t = $("#colorpicker").spectrum("get");
	 var rgb = t.toRgb();
	 setForegroundColor(rgb);
	console.log("color is : " + JSON.stringify(COLOR) );
	resetDrawing();
}

function setForegroundColor(col){
	COLOR[0] = col.r;
	COLOR[1] = col.g;
	COLOR[2] = col.b;
//onsole.log("setting COlor "+ COLOR); // #ff0000
	context.fillStyle =  "rgba("+COLOR[0]+","+COLOR[1]+","+ COLOR[2]+", 0.1)";
	context.strokeStyle =  "rgba("+COLOR[0]+","+COLOR[1]+","+ COLOR[2]+", 0.1)";
}

function setBackgroundColor(col){
	BACKGROUND_COLOR[0] = col.r;
	BACKGROUND_COLOR[1] = col.g;
	BACKGROUND_COLOR[2] = col.b;
	console.log("updating color " + JSON.stringify(BACKGROUND_COLOR));
}

function resetDrawing(url){
	//chooseRandomColors();
	context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	brush = new marker(context);
	$('#spray').addClass("selected");
	$('#source-over').addClass("selected");
	var bgVal = 'hsv('+ Math.floor(Math.random()*100)+', 80, 80)';
	$("#backgroundpicker").spectrum({
        color: bgVal,
        clickoutFiresChange: true,
        move: function(col) {
        	setBackgroundColor(col.toRgb());
        	updateThumbs();
   			//console.log( col.toHexString()); // #ff0000
			//backgroundToRgb(color);
			},
		change: function(col){
			setBackgroundColor(col.toRgb());
        	updateThumbs();
        	changeBackgroundMode(currMode);
		}
    	});
	 var b = $("#backgroundpicker").spectrum("get");
		var col = b.toRgb();
		setBackgroundColor(col);
	var ftx= flattenCanvas.getContext("2d");
	ftx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
       ftx.globalCompositeOperation = "source-over";
      ftx.fillStyle = "rgba("+BACKGROUND_COLOR[0]+","+BACKGROUND_COLOR[1]+","+ BACKGROUND_COLOR[2]+", 1)";
	if(url!=null){
		setBackgroundImage(url);
	} 

}

function setBackgroundImage(url){
	backgroundURL = url;
	img = new Image; 
	img.src = url;
	img.onload = function(){	
		var ftx= flattenCanvas.getContext("2d");
		ftx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    //  ftx.globalCompositeOperation = 'multiply';
    //  ftx.fillStyle = "rgba("+COLOR[0]+","+COLOR[1]+","+ COLOR[2]+", 1)";
  // ftx.fillRect(0, 0, canvas.width, canvas.height);
 		ftx.drawImage(img, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
 		//console.log("drawing image");
 		var ctx = thumb_canvas[0].getContext("2d");
 		ctx.clearRect(0, 0, THUMB_WIDTH, THUMB_HEIGHT);
 		ctx.drawImage(img, 0, 0, THUMB_WIDTH, THUMB_WIDTH);
 	
    	
 		updateThumbs();
		};

}

function changeBackgroundMode(mode){
	currMode = mode;
	$('.thumb').removeClass("selected");
	$('#'+mode).addClass("selected");
	var ftx= flattenCanvas.getContext("2d");
		ftx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
         ftx.globalCompositeOperation = mode;
         ftx.fillStyle = "rgba("+BACKGROUND_COLOR[0]+","+BACKGROUND_COLOR[1]+","+ BACKGROUND_COLOR[2]+", 1)";
          ftx.fillRect(0, 0, canvas.width, canvas.height);
 		ftx.drawImage(img, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function updateThumbs(){
	for(var i = 1; i < 3; i++){
		var ctx = thumb_canvas[i].getContext("2d");
		ctx.clearRect(0, 0, THUMB_WIDTH, THUMB_HEIGHT);
		//console.log("updating thumbs " + JSON.stringify(BACKGROUND_COLOR));
		ctx.fillStyle = "rgba("+BACKGROUND_COLOR[0]+","+BACKGROUND_COLOR[1]+","+ BACKGROUND_COLOR[2]+", 1)";
		ctx.fillRect(0, 0, THUMB_WIDTH, THUMB_HEIGHT);
		ctx.globalCompositeOperation = thumb_mode[i];
		ctx.drawImage(thumb_canvas[0], 0, 0, THUMB_WIDTH, THUMB_WIDTH);
		
	}

}


/*function backgroundToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

BACKGROUND_COLOR[0] = parseInt(result[1], 16);
BACKGROUND_COLOR[1] = parseInt(result[2], 16);
BACKGROUND_COLOR[2]  = parseInt(result[3], 16);
  
 		console.log("drawing image");
 		updateThumbs();

}*/
// WINDOW


// DOCUMENT



function onDocumentMouseDown( event )
{
	//console.log(" mouse down !");
	
	
}

function onDocumentMouseOut( event )
{
	onCanvasMouseUp();
}

function onDocumentDragEnter( event )
{
	event.stopPropagation();
	event.preventDefault();
}

function onDocumentDragOver( event )
{
	event.stopPropagation();
	event.preventDefault();
}

function onDocumentDrop( event )
{
	event.stopPropagation();  
	event.preventDefault();
	
	var file = event.dataTransfer.files[0];
	
	if (file.type.match(/image.*/))
	{
		/*
		 * TODO: This seems to work on Chromium. But not on Firefox.
		 * Better wait for proper FileAPI?
		 */

		var fileString = event.dataTransfer.getData('text').split("\n");
		document.body.style.backgroundImage = 'url(' + fileString[0] + ')';
	}	
}


// COLOR SELECTORS




// MENU




// CANVAS

function onCanvasMouseDown( event )
{
	
	var data, position;
	//console.log("canvas mouse down");

	
	//getColor();
	
	if (altKeyIsDown)
	{
		flatten();
		
		data = flattenCanvas.getContext("2d").getImageData(0, 0, flattenCanvas.width, flattenCanvas.height).data;
		position = (event.clientX + (event.clientY * canvas.width)) * 4;
		
		
		
		return;
	}
	
	BRUSH_PRESSURE = wacom && wacom.isWacom ? wacom.pressure : 1;
	brush.strokeStart( event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop );
//	socket.emit('update draw', {'event': 'strokeStart', x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop});
	 //var eventObj =  {'event': 'strokeStart', x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop} ;
   //	eventArray.push(eventObj);
	window.addEventListener('mousemove', onCanvasMouseMove, false);
	window.addEventListener('mouseup', onCanvasMouseUp, false);
}

function onCanvasMouseMove( event )
{
	BRUSH_PRESSURE = wacom && wacom.isWacom ? wacom.pressure : 1;
	//console.log("moving "+ event.clientX - canvas.offsetLeft + " y: "+ event.clientY - canvas.offsetTop);
	brush.stroke( event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop );
	
}

function onCanvasMouseUp()
{
	brush.strokeEnd();
	
	//console.log("MOUSE UP!");
	window.removeEventListener('mousemove', onCanvasMouseMove, false);
	window.removeEventListener('mouseup', onCanvasMouseUp, false);
	
	
}


//



function averageTouchPositions(touches) {
	var touchLength = touches.length;
	var average = [0,0];
	
	for (var i = 0; i < event.touches.length; ++i) {
		var touch = event.touches[i];
		average[0] += touch.pageX;
		average[1] += touch.pageY;
	}
	average[0] = average[0] / touches.length;
	average[1] = average[1] / touches.length;
	
	return average;
}

function distance(a, b) {
	var dx=a.pageX-b.pageX;
	var dy=a.pageY-b.pageY;
	return Math.sqrt(dx*dx + dy*dy);
}

function onCanvasTouchStart( event )
{
	clearTimeout(saveTimeOut);
	
	//console.log("event" + event.touches);
	//console.log("original event" + event.originalEvent.touches);
	if(event.touches.length == 1)
	{
		// draw
		event.preventDefault();
		
		brush.strokeStart( event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop );
		
		window.addEventListener('touchmove', onCanvasTouchMove, false);
		window.addEventListener('touchend', onCanvasTouchEnd, false);
	}
	else if (event.touches.length == 2)
	{
		// brush size
		event.preventDefault();
		
		brushSizeTouchReference = distance(event.touches[0], event.touches[1]);
		brushSizeTouchStart = BRUSH_SIZE;
		
		window.addEventListener('touchmove', onBrushSizeTouchMove, false);
		window.addEventListener('touchend', onBrushSizeTouchEnd, false);
	}
	else if (event.touches.length == 3)
	{
		// foreground color
		event.preventDefault();
		
		var loc = averageTouchPositions(event.touches);
		showFGColorPickerAtLocation(loc);
		
		window.addEventListener('touchmove', onFGColorPickerTouchMove, false);
		window.addEventListener('touchend', onFGColorPickerTouchEnd, false);
	}
	else if (event.touches.length == 4)
	{
		// reset brush
		event.preventDefault();
		window.addEventListener('touchend', onResetBrushTouchEnd, false);
	}
}

function onCanvasTouchMove( event )
{
	if(event.touches.length == 1)
	{
		event.preventDefault();
		brush.stroke( event.touches[0].pageX - canvas.offsetLeft, event.touches[0].pageY - canvas.offsetTop );
	}
}

function onCanvasTouchEnd( event )
{
	if(event.touches.length == 0)
	{
		event.preventDefault();
		
		brush.strokeEnd();

		window.removeEventListener('touchmove', onCanvasTouchMove, false);
		window.removeEventListener('touchend', onCanvasTouchEnd, false);
		
		
	}
}

function onResetBrushTouchEnd( event )
{
	if (event.touches.length == 0)
	{
		event.preventDefault();
		brush.destroy();
		brush = eval("new " + BRUSHES[menu.selector.selectedIndex] + "(context)");
		window.removeEventListener('touchend', onResetBrushTouchEnd, false);
		
	}
}



//



function flatten()
{
	//var context = flattenCanvas.getContext("2d");
	var baseContext = baseCanvas.getContext("2d");
      baseContext.globalCompositeOperation = 'source-over';
      baseContext.drawImage(flattenCanvas, 0, 0);
	//context.fillStyle = 'rgb(' + BACKGROUND_COLOR[0] + ', ' + BACKGROUND_COLOR[1] + ', ' + BACKGROUND_COLOR[2] + ')';
	//context.fillRect(0, 0, canvas.width, canvas.height);
	//context.drawImage(fabricCanvas, 0, 0);
	//context.drawImage(markerCanvas, 0, 0);
	baseContext.drawImage(canvas, 0, 0);
}




/* older window functions*/

function onWindowMouseMove( event )
{
	mouseX = event.clientX;
	mouseY = event.clientY;
}





