 var galleryList; 
 var otherImages;
 var socket;
 var table; 

 $(function() {
 	//connectToSocket();

 
   /* $( "#sortable1, #sortable2" ).sortable({
connectWith: ".connectedSortable"
}).disableSelection();*/
    /* $( "#save" ).click(function(){
        var sortedIDs = $( "#sortable1" ).sortable( "toArray" );
        socket.emit("update gallery", sortedIDs);
         console.log(JSON.stringify(sortedIDs));
     });*/
  /* 	var visionData = jQuery.parseJSON($('#visionData').val());*/
   
   	var visionData = jQuery.parseJSON($('#visionData').val());
   	console.log(" vision data is " + JSON.stringify(visionData));
   	var imageData = jQuery.parseJSON($('#imageData').val());
   	console.log(" image data is " + JSON.stringify(imageData));
   //	addGalleryThumbs(imageData);
   	addOtherThumbs(visionData);
});

 
 function addOtherThumbs(data){
  for(var i = 0; i < 40; i++){
 	//for(var i = 0; i < data.length; i++){
 			addOtherThumb(data[i].smallPath, data[i].date, data[i].vision, data[i]._id, data[i].show_timeline);
      console.log("adding "+ i);
 	}
 }


  function addOtherThumb(path, date, vision, id, show_timeline){
     var thisDate =  new Date(date);
 	  var row = $('<tr></tr>').addClass('row');
    var date = $('<td></td>').text(thisDate.toLocaleString()).addClass('date');
    var thumb = $('<td></td>').css('background-image', "url("+path+")").addClass('thumb');
    var vision = $('<td></td>').text(vision).addClass('vision');
    var checkbox = $('<td></td>');
    $('<input />', { type: 'checkbox' }).prop('checked', show_timeline).appendTo(checkbox);
    row.append(date).append(thumb).append(vision).append(checkbox);
    $('#table').append(row);
 //	 var li=document.createElement('li');
 /* var li=document.createElement('div');
 	li.setAttribute("id", id);
    otherImages.appendChild(li);
    var thisDate =  new Date(date);
    li.innerHTML =  thisDate.toDateString() + " " +vision;
    li.style.backgroundImage="url("+path+")";*/
 }

 function connectToSocket(){
	var str = "" + window.location;
	var extra = str.lastIndexOf("/");
	socketLoc = str.substring(0, extra);
	socket = io.connect(socketLoc);
}