 var galleryList; 
 var otherImages;
 var socket;
 var table; 
 var numberPerPage = 20;
 var currPage = 0;
 var currData = null;

 $(function() {
 	connectToSocket();

 
  
   
   	var visionData = jQuery.parseJSON($('#visionData').val());
   	console.log(" vision data is " + JSON.stringify(visionData));
   	var imageData = jQuery.parseJSON($('#imageData').val());
   	console.log(" image data is " + JSON.stringify(imageData));
    currData = visionData;
   //	addGalleryThumbs(imageData);
   	addOtherThumbs(visionData);
   $("#next").click(function(){
        currPage++;
        socket.emit("get next page", {"page": currPage, "numberPerPage": numberPerPage});
         var rangeStart = currPage*numberPerPage+1;
        var rangeEnd = (currPage+1)*(numberPerPage)+1
        $("#showing").text("Showing "+ rangeStart + " - " + rangeEnd);
    });
     $("#previous").click(function(){
        if(currPage > 0){
        currPage--;
        socket.emit("get next page", {"page": currPage, "numberPerPage": numberPerPage});
        var rangeStart = currPage*numberPerPage+1;
        var rangeEnd = (currPage+1)*(numberPerPage)+1
        $("#showing").text("Showing "+ rangeStart + " - " + rangeEnd);
      }
    });
     $('#restart-drawing').click(function(){socket.emit("restart drawing", "")});
$('#restart-projection').click(function(){socket.emit("restart projection", "")});
     $('#submit').click(function(){
        var index = 0;
        var updates = [];
          $("#table tr").each(function () {
              var checkbox =  $(this).find('td:eq(3)').find('input').prop('checked');
               var checkbox2 =  $(this).find('td:eq(4)').find('input').prop('checked');
               console.log("checking " + index);
              if(checkbox!=undefined){
                 console.log("checkbox " + checkbox);
             // console.log(checkbox+ " : " + currData[index].show_timeline + " : " + currData[index].vision);
              if(checkbox!=currData[index].show_timeline) {
                // console.log("checkbox " + checkbox);
              console.log("CHANGED " + currData[index].vision);
                var thisUpdate = {"_id": currData[index]._id, "update": {"show_timeline": checkbox}};
                updates.push(thisUpdate);
               
              }
            }
                if(checkbox2!=undefined){
                   console.log("checkbox2 " + checkbox2);
             // console.log(checkbox+ " : " + currData[index].show_timeline + " : " + currData[index].vision);
              if(checkbox2!=currData[index].always_visible) {
                console.log("CHANGED " + currData[index].vision);
                var thisUpdate = {"_id": currData[index]._id, "update": {"always_visible": checkbox}};
                updates.push(thisUpdate);
               
              }
            }
              index++;
            
          });
                /*  $('td', this).each(function () {
                      var value = $(this).find(":input").val();
                      var values = 100 - value + ', ' + value;

                      if (value > 0) {
                          $(this).append(htmlPre + values + htmlPost);
                      }
                   })

            });*/

           if(updates.length > 0){
                  console.log("UPDATING " + JSON.stringify(updates));
                  socket.emit("update from gallery admin", updates);
                }
     });
});

 
 function addOtherThumbs(data){
  var max = (numberPerPage < data.length) ? numberPerPage : data.length;
  for(var i = 0; i < max; i++){
 	//for(var i = 0; i < data.length; i++){
 			addOtherThumb(data[i].smallPath, data[i].date, data[i].vision, data[i]._id, data[i].show_timeline, data[i].always_visible);
      console.log("adding "+ i);
 	}
 }


  function addOtherThumb(path, date, vision, id, show_timeline, always_visible){
     var thisDate =  new Date(date);
 	  var row = $('<tr></tr>').addClass('row').data('id', id); /*.click(function(){
      console.log($(this).data('id'));
      var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  socketLoc = str.substring(0, extra);
      var url = socketLoc+"/"+ $(this).data('id');
      window.open(url);
    });*/
    var date = $('<td></td>').text(thisDate.toLocaleString()).addClass('date');
    var thumb = $('<td></td>').css('background-image', "url("+path+")").addClass('thumb').data('id', id).click(function(){
      console.log($(this).data('id'));
      var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  socketLoc = str.substring(0, extra);
      var url = socketLoc+"/"+ $(this).data('id');
      window.open(url);
    });
    var vision = $('<td></td>').text(vision).addClass('vision').data('id', id).click(function(){
      console.log($(this).data('id'));
      var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  socketLoc = str.substring(0, extra);
      var url = socketLoc+"/"+ $(this).data('id');
      window.open(url);
    });
    var checkbox = $('<td></td>');
    $('<input />', { type: 'checkbox' }).prop('checked', show_timeline).appendTo(checkbox);
    var checkbox2 = $('<td></td>').addClass('curator');
    $('<input />', { type: 'checkbox' }).prop('checked', always_visible).appendTo(checkbox2);
    row.append(date).append(thumb).append(vision).append(checkbox).append(checkbox2);
    $('#table').append(row);
 //	 var li=document.createElement('li');
 /* var li=document.createElement('div');
 	li.setAttribute("id", id);
    otherImages.appendChild(li);
    var thisDate =  new Date(date);
    li.innerHTML =  thisDate.toDateString() + " " +vision;
    li.style.backgroundImage="url("+path+")";*/
 }

 function updateTable(data){
     $('#table').empty();
     currData = data;
    for(var i = 0; i < data.length; i++){
      addOtherThumb(data[i].smallPath, data[i].date, data[i].vision, data[i]._id, data[i].show_timeline);
    }
 }

 function connectToSocket(){
	var str = "" + window.location;
	var extra = str.lastIndexOf("/");
	socketLoc = str.substring(0, extra);
	socket = io.connect(socketLoc);
  socket.on("next page", function(data){
    console.log("next page is "+ JSON.stringify(data));
    updateTable(data);
  });
  socket.on("refresh gallery admin", function(data){
    location.reload();
  });
}