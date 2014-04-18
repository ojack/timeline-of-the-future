 var galleryList; 
 var otherImages;
 var socket;

 $(function() {
 	connectToSocket();
 	galleryList = document.getElementById("sortable1");
 	otherImages = document.getElementById("sortable2");
    $( "#sortable1, #sortable2" ).sortable({
connectWith: ".connectedSortable"
}).disableSelection();
     $( "#save" ).click(function(){
        var sortedIDs = $( "#sortable1" ).sortable( "toArray" );
        socket.emit("update gallery", sortedIDs);
         console.log(JSON.stringify(sortedIDs));
     });
  /* 	var visionData = jQuery.parseJSON($('#visionData').val());*/
   
   	var visionData = jQuery.parseJSON($('#visionData').val());
   	console.log(" vision data is " + JSON.stringify(visionData));
   	var imageData = jQuery.parseJSON($('#imageData').val());
   	console.log(" image data is " + JSON.stringify(imageData));
   	addGalleryThumbs(imageData);
   	addOtherThumbs(visionData);
});

 function addGalleryThumbs(imageData){
 	for(var i = 0; i < imageData.length; i++){
 			addThumb(imageData[i].smallPath, imageData[i]._id);
 	}
 }

 function addOtherThumbs(data){
 	for(var i = 0; i < data.length; i++){
 			addOtherThumb(data[i].smallPath, data[i]._id);
 	}
 }

 function addThumb(path, id){
 	
 	 var li=document.createElement('li');
 	li.setAttribute("id", id);
    galleryList.appendChild(li);
    li.style.backgroundImage="url("+path+")";
 }

  function addOtherThumb(path, id){
 	
 	 var li=document.createElement('li');
 	li.setAttribute("id", id);
    otherImages.appendChild(li);
    li.style.backgroundImage="url("+path+")";
 }

 function connectToSocket(){
	var str = "" + window.location;
	var extra = str.lastIndexOf("/");
	socketLoc = str.substring(0, extra);
	socket = io.connect(socketLoc);
}