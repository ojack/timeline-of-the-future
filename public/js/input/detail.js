
//detail.js
/*
*
*Prototype function for handling the "detailed view of each vision on the timeline
*
*
*
*/

  var num_thumbs = 5;
        var thumb_width = 233;
        var thumb_height = 136;
        var thumb_offset = 283;
        var thumb_array = [];
        var currURL = "";
        var currID;
        var childOffset = 343;
var visionObj = "";
function DetailView(){
	this.init();
}

DetailView.prototype =
{
	socket: null,
  id: null,
  detailContainer: null,
  detailbackdrop: null,
  detail_image: null,
  detail_h1: null,
  detail_created_by: null, 
  thumbs: null,
  thumb_images: null,
  thumb_text: null,
  

	init: function(socket){
		this.socket=socket;
		
    this.detailContainer =  $('#detail'); 
    this.detailbackdrop = $('#detail-backdrop');
    //console.log("backdrop i s" + JSON.stringify(this.detailbackdrop));
    this.detail_image = $('#detail-image');
    this.detail_h1 = $( "#detail-h1" );
		     this.detail_created_by =   $( "#detail-created-by" );
     this.addClickHandlers();
      initThumbs();
       this.thumbs = $('.thumb');
       this.thumb_images = $('.related');
       this.thumb_text = $('.related_text');
       $('#detail-back').click(function(){hideDetails()});
       $('.keyboard').onScreenKeyboard();
                 $('.keyboard').click(function(){
                    $('#invisibleClick').show();//when on screen keyboard appears, show invisible layer. when layer is clicked, hide keyboard
                  });
                  $('#invisibleClick').click(function(){hideKeyboard(); });

	},

	addClickHandlers: function(){
    var _id = this.id;
		$('#build-button').click(function(e) {//TODO: move this funtion out of here/ stop adding extra event listeners
           //$('#detail-backdrop').removeClass('show');
            //goToDraw();
            console.log("clicked drawing");
           // $('#detail').removeClass('show');
        
           
            drawingView.showDrawing(currURL,currID);
            showDrawingThumb(visionObj, 0);
      });
		this.detailbackdrop.click(function(){
     // setAnimation();
			hideDetails();

		});
	}, 

	showPopupData: function(data){
       $("#timeline-date").removeClass("show");
    //console.log(JSON.stringify(this.test));
   // $('#side-bar').addClass('show');
		detailView.detailbackdrop.addClass('show');
  // $('#detail-side-bar').addClass('show');
   // $('#drawing-side-bar').removeClass('show');
  
		visionObj = jQuery.parseJSON(data);
    currID= visionObj._id;
    currURL = visionObj.imgPath;
		 resetThumbs();
     $(".label").hide();
                if(visionObj.parent){
                  showParentThumb(visionObj.parent, 0);
                  $("#inspiration-label").show();
                  //TODO resize detail container
                }
                if(visionObj.children){
                  $("#prediction-label").show();
                  for(var i = 0; i < visionObj.children.length; i++){
                    showChildThumb(visionObj.children[i], i);
                  }
                }

         
         
         console.log("received" + data);
         //
         detailView.detail_image.css('background', 'url('+visionObj.imgPath+')');
         detailView.detail_image.css('background-size', 'auto 100%');
         if(visionObj.vision){
            detailView.detail_h1.html(visionObj.vision);
          } else {
             detailView.detail_h1.html("");
          }
        if(visionObj.name){ 
          detailView.detail_created_by.html("by "+visionObj.name);
        } else {
          detailView.detail_created_by.html("by anonymous");
        }
        if(visionObj.date){
        console.log("date is : "+ visionObj.date);
        var date = new Date(visionObj.date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        $( "#detail-created-date" ).html(month+"."+day+ "."+ year);
      } else {
        $( "#detail-created-date" ).html("");
      }
        $("#detail-date").html(Math.round(visionObj.year));
        if((!visionObj.inspiration) || visionObj.inspiration==""){
           $("#detail-details").html("");
        } else {
           $("#detail-details").html('"'+visionObj.inspiration+'"');
        }
         detailView.detailContainer.addClass('show');
        // this.updateDetailInfo(); TODO: rwrite these functions
        // this.openPopup();
	}
}

function initThumbs(){
	addThumb(0, '#detail-parent', 0);
  addDrawingThumb("#drawing-parent");
// addThumb(0, '#drawing-parent', 0);
    for(var i = 0; i < num_thumbs; i++){
      addThumb(i, '#detail-child-container', i*thumb_offset);
    }
  }

  function resetThumbs(){
   detailView.thumbs.css({
          background: 'none'
        });
     detailView.thumb_images.data('id',  "");
     detailView.thumb_text.html("");
   /* $('.thumb')
    $('.related').data('id',  "");
     $('.related_text').html("");*/
  }

  function addDrawingThumb(container){
     var relatedVision = jQuery('<div/>', {
     
      'id': 'drawing-thumb',
    });
    relatedVision.css({ position: "absolute",
          }).appendTo(container);
     var newDiv = jQuery('<div/>', {
      'id': 'draw-thumb',
      'class': 'thumb',
     
      });
      newDiv.appendTo(relatedVision);

       var related_text = jQuery('<div/>', {
      'class': 'related_text',
      
      });
      related_text.appendTo(relatedVision);
     
 
    
  }

 
  function addThumb(index, container, offset){
    var relatedVision = jQuery('<div/>', {
      'class': 'related'});
    relatedVision.css({ position: "absolute",
          left: offset + "px",
          }).appendTo(container);
     var newDiv = jQuery('<div/>', {
      'class': 'thumb',
      width: thumb_width,
      height: thumb_height,
      });
      newDiv.appendTo(relatedVision);

       var related_text = jQuery('<div/>', {
      'class': 'related_text',
      width: thumb_width,
      height: thumb_height,
      });
      related_text.appendTo(relatedVision);
      thumb_array[index] = relatedVision;
 
      relatedVision.mousedown(function() {
        // alert("thumb clicked");
        if($(this).data('id')!=""){
          _id = $(this).data('id');
                currId =  "?id="+ _id;
               socket.emit('findById', _id);
               console.log(" data of clicked " + JSON.stringify($(this).data('id')));
          }
      });
    }
               // document.getElementById('form').src = _id;
             
          //alert($(this).children().length);
          //selectDeveloper();
  //alert( "Handler for .mousedown() called." );
  //});
 // }

    function showChildThumb(child, index){
       // console.log("ADDING ThiS! "+ JSON.stringify(child));
        //var thisChild = $('#detail-child-container').children().get(index);
        var thisChild = thumb_array[index];
        $(thisChild).find('.thumb').css({
          background: 'url('+child.smallPath+')',
          'background-size': '100% auto'
        });
        $(thisChild).find('.related_text').html(child.vision);
         $(thisChild).data('id',  child._id);
      }

     function showParentThumb(child, index){
     //   console.log("ADDING ThiS! "+ JSON.stringify(child));
        var thisChild = $('#detail-parent').children().get(index);
        $(thisChild).find('.thumb').css({
          background: 'url('+child.smallPath+')',
          'background-size': '100% auto'
        });
        $(thisChild).find('.related_text').html(child.vision);
         $(thisChild).data('id',  child._id);
      }

      function showDrawingThumb(child, index){
      //  console.log("ADDING ThiS! "+ JSON.stringify(child));
        var thisChild = $('#drawing-parent').children().get(index);
        console.log(" PARNET IS "+ JSON.stringify(child));
        $(thisChild).find('.thumb').css({
          background: 'url('+child.smallPath+')',
         // background: "#00f",
          
        });
        $(thisChild).find('.related_text').html(child.vision);
         $(thisChild).data('id',  child._id);
      }

 function hideDetails(){
      $('#detail').removeClass('show');
        $("#timeline-date").addClass("show");
         // $('#shade').hide();
          $('#detail-backdrop').removeClass('show');
           $("timeline-date").show();
           //$('#detail').hide();
    }