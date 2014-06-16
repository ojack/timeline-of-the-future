//drawing.js


function DrawingView(gallery){
	this.init(gallery);
}

DrawingView.prototype =
{
	drawingContainer : null,
	drawingBackground:  null,
	gallery: null,
	infoForm: null,
	parent_id: null,
	drawing_fields: ['vision', 'year', 'inspiration', 'name', 'tags'],
	//galleryHolder: null,

	init: function(gallery){
		this.drawingContainer =  $('#drawing-container');
		this.drawingBackground =  $('#drawing').get(0).contentWindow;
		this.gallery = gallery;
		this.infoForm = $('#moreInfo');
		
		//this.addGalleryThumbs(this.gallery, ul);
		 var ul = document.createElement('ul');
		ul.id = "background-images";
		 this.addGalleryThumbs(this.gallery, ul);
		this.initForm();
		var form = this.infoForm;
		var dC = this.drawingContainer;
		$("#back").click(function(){
			dC.removeClass('show');
			hideKeyboard();
			clearForm();
			    form.removeClass('show');
			     $('#new-side-bar').removeClass('show');
		});
		
		
		//this.galleryHolder = document.getElementById('#drawing-side-bar');
	},

	addNewDrawing: function(){
		//this.addGalleryThumbs(this.gallery, ul);
	},

	addToTimeline: function(){
		 $('#side-bar').addClass('show');
		   $('#drawing-side-bar').removeClass('show');
		     $('#new-side-bar').addClass('show');
	/*	 var ul = document.createElement('ul');
		ul.id = "background-images";
		 this.addGalleryThumbs(this.gallery, ul);*/
		 this.drawingBackground.resetDrawing(null);
			 this.drawingContainer.addClass('show');
			   $("#timeline-date").removeClass("show");
			   this.parent_id = "null";
	},

	showDrawing: function(url, parent_id){
		clearForm();
		 $("#timeline-date").removeClass("show");
		$('#new-side-bar').removeClass('show');
		 $('#side-bar').addClass('show');
   $('#detail-side-bar').removeClass('show');
    $('#drawing-side-bar').addClass('show');
		this.drawingBackground.resetDrawing(url);
			 this.drawingContainer.addClass('show');

		if(parent_id){
		  this.drawingBackground.setBackgroundImage(url);
		  console.log("PARENT ID ID "+ parent_id)
		  this.parent_id = parent_id;
		 } else {
		 	//clear drawing

		 	this.parent_id = "null";
		 }
	},

	initForm : function(){
		var form = this.infoForm;
		var thisObj = this;
		$('#next').click(function(){
			console.log("clicked next");
			form.addClass('show');
		});
		/* add years to dropdown*/
		  var myselect = document.getElementById('year'), year = new Date().getFullYear()-1;
    var gen = function(max){do{
      year++; 
      var selected = false; 
        myselect.add(new Option(year,max--, false, selected),null);}while(max>0);}(100);
        $("#Edit").click(function(){
        	form.removeClass('show');
        });
        var dc = this.drawingContainer;
        var form = this.infoForm;
        $("#Submit").click(function(){
        	thisObj.submitForm();
        	dc.removeClass('show');
			hideKeyboard();
			
			//$("#inspiration").val("");
		
			form.removeClass('show');
			$('#new-side-bar').removeClass('show');
			clearForm();

        	
        });
		//document.body.appendChild(ul);
	},

	addGalleryThumbs: function(imageData, ul){
		var holder = document.getElementById('new-side-bar');
		holder.appendChild(ul);
		/*create gallery of background images*/
		console.log("gallery is "+ JSON.stringify(imageData));
 	for(var i = 0; i < imageData.length; i++){
 			this.addThumb(imageData[i].smallPath, imageData[i].imgPath, imageData[i]._id, ul);
 	}
 	 

	},

	submitForm: function(){
		 $("#timeline-date").addClass("show");
		this.drawingBackground.flatten();
        var iFrameCanvas = this.drawingBackground.flattenCanvas;

        var iFrameDrawing =  this.drawingBackground.canvas;
        var imageCanvas =  this.drawingBackground.baseCanvas;
       console.log("INSPIRATION IS "+ $("#inspiration").val());
	var params = {};
     for(var i = 0; i < this.drawing_fields.length; i++){
       //$( "#"+admin_fields[i] ).val(visionData[admin_fields[i]]);
        params[this.drawing_fields[i]] =  $( "#"+this.drawing_fields[i] ).val();

    }
    var year = $("#year").children(':selected').text();
    
    if(year=="Tomorrow"){
    	params["year"] = 2014;
    } else {
    	params["year"] = year;
    }
      params['date'] = new Date();
      params['newVision']= "true";
      params['backgroundPath'] =iFrameCanvas.toDataURL('image/png');
       params['imgPath'] = imageCanvas.toDataURL('image/png');
       params['drawingPath'] = iFrameDrawing.toDataURL('image/png');
  	params["show_rating"] = true;
  	params["show_timeline"] = true;
  	params["show_projection"] = true;
  	params["always_visible"] = false;
  	params["parent"]= this.parent_id;
  	params["museum"] = false;
  	params["eventArray"] = this.drawingBackground.eventArray;
    /*if($( "#show_timeline").is(':checked')){
      console.log(" checked ");
  } else {
    console.log(" NOT checked ");
  }*/
  //alert(document.URL);
  socket.emit('addNewDrawing', params);

    console.log("submit button clicked, id is " + JSON.stringify(params));
    hideDetails();
    clearForm();
	//alert("submit called");

	},

	addThumb: function(path, largePath, id, ul){
		 var li=document.createElement('li');
 	li.setAttribute("data-id", id);
 	li.setAttribute("data-path", largePath);
    ul.appendChild(li);
    li.style.backgroundImage="url("+path+")";
    var background = this.drawingBackground;
   $(li).on('click', function () { 
   	 background.setBackgroundImage($(this).data("path"));
   	});
   	//console.log("CLICKED THE THUMB");/* do stuff */alert(" id is " + JSON.stringify($(this).data()))});
   //li.addEventListener('click', function(event) { /* do stuff here*/alert(); }, false);

	}



};

function clearForm(){
		$("#inputForm")[0].reset();
		$("#visionForm")[0].reset();
		// textarea(id="vision", class = "keyboard")
	/*  for(var i = 0; i < drawingView.drawing_fields.length; i++){

       //$( "#"+admin_fields[i] ).val(visionData[admin_fields[i]]);
       if(drawingView.drawing_fields[i]!="year"){
       		console.log("clearing form at " + $( "#"+ drawingView.drawing_fields[i]).val());
         $( "#"+drawingView.drawing_fields[i] ).val(function( index, value ) {
  return "";
});
         console.log("cleared to " + $( "#"+drawingView.drawing_fields[i] ).val());
    } 
    
    }*/
    //}
}

    function hideKeyboard(){
     $('#osk-container').hide();
      $('#invisibleClick').hide();
  }

function addGalleryThumbs(imageData, ul){
	
 }

 