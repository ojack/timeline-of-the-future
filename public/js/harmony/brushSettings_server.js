function BrushSettings()
{	
	this.init();

}

BrushSettings.prototype = 
{
	container: null,
	foregroundColor: null,
	backgroundColor: null,
	
	selector: null,
	save: null,
	exportImage: null,
	clear: null,
	about: null,
	
	init: function()
	{
		var option, space, separator, color_width = 48, color_height = 20;

		this.container = document.createElement("div");
		//this.container.className = 'gui menu';
		this.container.style.position = 'absolute';

		
		
		this.brushSelector = document.createElement("div");
		this.brushSelector.setAttribute("id", "brush-container");
		
		
		this.container.appendChild(this.brushSelector);
		
		this.container.style.top = '0px';
		this.container.style.left = '0px';
		

		//this.setBackgroundColor( BACKGROUND_COLOR );
		
		
		
	/*	this.selector = document.createElement("select");
		this.selector.style.marginRight = '30px';

		for (i = 0; i < BRUSHES.length; i++)
		{
			option = document.createElement("option");
			option.id = i;
			option.innerHTML = BRUSHES[i].toUpperCase();
			this.selector.appendChild(option);
		}

		this.container.appendChild(this.selector);
		space = document.createTextNode(" ");
		this.container.appendChild(space);*/
		this.label = document.createElement("div");
		this.label.setAttribute("id", "label-1");
		this.label.style.width = '100px';
		this.label.style.height = '40px';
		this.label.className = 'label';
		this.label.innerHTML = "Drawing Tools";
		document.body.appendChild(this.label);


		this.holder = document.createElement("div");
		this.holder.setAttribute("id", "color-holder");
		this.holder.style.width = '100px';
		this.holder.style.height = '60px';
		this.holder.className = 'brush-select';
		this.brushSelector.appendChild(this.holder);

		this.spectrum = document.createElement("input");
		this.spectrum.setAttribute("id", "colorpicker");
		/*this.spectrum.style.width = '60px';
		this.spectrum.style.height = '60px';*/
		this.holder.appendChild(this.spectrum);
			
		this.sketchy = document.createElement("div"); //getElementById('save');
		this.sketchy.style.width = '60px';
		this.sketchy.style.height = '60px';
		this.sketchy.setAttribute("id", "sketchy");
		this.sketchy.className = 'brush-select';
		this.sketchy.style.backgroundImage="url('././images/brush-sketchy.png')";
		this.sketchy.addEventListener('click', selectSketchy, false);
		this.brushSelector.appendChild(this.sketchy);

		this.web = document.createElement("div"); //getElementById('save');
		this.web.style.width = '60px';
		this.web.style.height = '60px';
		this.web.setAttribute("id", "web");
		this.web.className = 'brush-select';
		this.web.style.backgroundImage="url('././images/brush-web.png')";
		this.web.addEventListener('click', selectWeb, false);
		this.brushSelector.appendChild(this.web);

	

		this.pen = document.createElement("div"); //getElementById('save');
		this.pen.style.width = '60px';
		this.pen.style.height = '60px';
		this.pen.setAttribute("id", "pen");
		this.pen.className = 'brush-select';
		this.pen.style.backgroundImage="url('././images/brush-pen.png')";
		this.pen.addEventListener('click', selectPen, false);
		this.brushSelector.appendChild(this.pen);

		

		this.spray = document.createElement("div"); //getElementById('save');
		this.spray.style.width = '60px';
		this.spray.setAttribute("id", "spray");
		this.spray.style.height = '60px';
		this.spray.className = 'brush-select';
		this.spray.style.backgroundImage="url('././images/brush-spray.png')";
		this.spray.addEventListener('click', selectSpray, false);
		this.brushSelector.appendChild(this.spray);
		

		

		

		this.eraser = document.createElement("div"); //getElementById('save');
		this.eraser.className = 'brush-select';
		this.eraser.setAttribute("id", "eraser");
		this.eraser.style.width = '60px';
		this.eraser.style.height = '60px';
		this.eraser.style.backgroundImage="url('././images/brush-eraser.png')";
		this.eraser.addEventListener('click', selectEraser, false);
		this.brushSelector.appendChild(this.eraser);

		this.clearCanvas = document.createElement("div"); //getElementById('save');
		this.clearCanvas.className = 'brush-select';
		this.clearCanvas.setAttribute("id", "clearCanvas");
		this.clearCanvas.style.width = '60px';
		this.clearCanvas.style.height = '60px';
		this.clearCanvas.style.backgroundImage="url('././images/button-clear.png')";
		this.clearCanvas.addEventListener('click', clearCanvas, false);
		this.brushSelector.appendChild(this.clearCanvas);

	
		this.holder2 = document.createElement("div");
		this.holder2.setAttribute("id", "color-holder-2");
		this.holder2.style.width = '100px';
		this.holder2.style.height = '60px';
		this.holder2.className = 'brush-select';
		this.brushSelector.appendChild(this.holder2);

		this.spectrum2 = document.createElement("input");
		this.spectrum2.setAttribute("id", "backgroundpicker");
		/*this.spectrum.style.width = '60px';
		this.spectrum.style.height = '60px';*/
		this.holder2.appendChild(this.spectrum2);
			
		this.label2 = document.createElement("div");
		this.label2.setAttribute("id", "label-2");
		this.label2.style.width = '100px';
		this.label2.style.height = '40px';
		this.label2.className = 'label';
		this.label2.innerHTML = "Background Filters";
		document.body.appendChild(this.label2);
	},
	
	setForegroundColor: function( color )
	{
		/*
		var context = this.foregroundColor.getContext("2d");
		context.fillStyle = 'rgb(' + color[0] + ', ' + color[1] +', ' + color[2] + ')';
		context.fillRect(0, 0, this.foregroundColor.width, this.foregroundColor.height);
		context.fillStyle = 'rgba(0, 0, 0, 0.1)';
		context.fillRect(0, 0, this.foregroundColor.width, 1);
		*/
		this.foregroundColor.style.backgroundColor = 'rgb(' + color[0] + ', ' + color[1] +', ' + color[2] + ')';
	},
	
	setBackgroundColor: function( color )
	{
		/*
		var context = this.backgroundColor.getContext("2d");
		context.fillStyle = 'rgb(' + color[0] + ', ' + color[1] +', ' + color[2] + ')';
		context.fillRect(0, 0, this.backgroundColor.width, this.backgroundColor.height);
		context.fillStyle = 'rgba(0, 0, 0, 0.1)';
		context.fillRect(0, 0, this.backgroundColor.width, 1);		
		*/
		this.backgroundColor.style.backgroundColor = 'rgb(' + color[0] + ', ' + color[1] +', ' + color[2] + ')';
	}
}

function selectSpray( evt )
{

	brush.destroy();
	EXTENT = 6, 
	$('.brush-select').removeClass("selected");
	$('#spray').addClass("selected");
	 brush = eval("new marker(context)");
	// socket.emit('update draw', {'event': 'changeBrush', brush: 'marker'});
	 
}

function selectSketchy( evt )
{
	EXTENT = 3;

	brush.destroy();
	$('.brush-select').removeClass("selected");
	$('#sketchy').addClass("selected");
	//brushSettings.spray.className += ' selected';
	 brush = new sketchy(context);
	 //socket.emit('update draw', {'event': 'changeBrush', brush: 'sketchy'});
	
}

function selectWeb( evt )
{

	brush.destroy();
	EXTENT = 3;
	$('.brush-select').removeClass("selected");
	$('#web').addClass("selected");
	//socket.emit('update draw', {'event': 'changeBrush', brush: 'web'});
	 brush = eval("new web(context)");
	
}

function selectPen( evt )
{

	brush.destroy();
	EXTENT = 5;
	$('.brush-select').removeClass("selected");
	$('#pen').addClass("selected");
	
	// brush = eval("new pen(context)");
	brush = eval("new pen(context)");
	
}



function clearCanvas( evt )
{
	if (!confirm("Clear drawing --- Are you sure?"))
		return;
		
	context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	
	/*brush.destroy();
	
	$('.brush-select').removeClass("selected");
	$('#eraser').addClass("selected");
	 brush = eval("new eraser(context)");*/
}
function selectEraser( evt )
{
	brush.destroy();
	EXTENT = 7;
	$('.brush-select').removeClass("selected");
	$('#eraser').addClass("selected");
	 brush = eval("new eraser(context)");
	// socket.emit('update draw', {'event': 'changeBrush', brush: 'eraser'});
	
}
