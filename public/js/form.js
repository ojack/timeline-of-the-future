var image = null;
var isNew = false;
var newImage = false;
var visionData;
var params = "parm default";
var socketLoc;
var admin_fields = ["vision", "year", "inspiration", "tags", "adminTags", "name", "_id", "notes"];
var admin_checkboxes = ["show_rating", "show_timeline", "museum", "show_projection"];
/*Dropzone.options.dropzone = {
  paramName: "file", // The name that will be used to transfer the file
  init: function() {
    this.on("addedfile", function(file) { alert("Added file."); });
  },
  maxFilesize: 2, // MB
  autoProcessQueue: false
};*/

$(document).ready(function(){
  var myDropzone = new Dropzone("form#bg", { 
  thumbnailWidth: 800,
  thumbnailHeight: 600,
   init: function() {

    this.on("addedfile", function(file) { 
     var files = this.getQueuedFiles();
     $('#bg').css('background-image', 'none');
     if(files.length > 0){
       console.log("removing file");
       this.removeFile(files[0]);
     }
     console.log(this.getQueuedFiles());
         
     //alert("Added file." );
     });
  },
  maxFilesize: 10, // MB
  uploadMultiple:false,
  autoProcessQueue: false

});

  myDropzone.on("sending", function(file, xhr, formData) {
    var paramString = JSON.stringify(params);
  formData.append("filesize", paramString); // Will send the filesize along with the file as POST data.
});

  /*get socket address based on current url*/
  var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  socketLoc = str.substring(0, extra);
 
  //var socket = io.connect('http://10.10.16.43');
  var socket = io.connect(socketLoc);
   //var socket = io.connect('http://10.161.2.13');
//socket.join('room');
//var treeId = 'room';
var visionParams = $('#visionData').val();
console.log(visionParams);

if(visionParams == 'new' || visionParams== 'null') {
  isNew = true;
  $( "#delete" ).hide();
   $( "#newVision" ).hide();
  //creating new vision
} else {
  visionData = jQuery.parseJSON(visionParams);
  for(var i = 0; i < admin_fields.length; i++){
    if(visionData[admin_fields[i]]){
      $( "#"+admin_fields[i] ).val(visionData[admin_fields[i]]);
    }

}
  for(var i = 0; i < admin_checkboxes.length; i++){
    if(visionData[admin_checkboxes[i]]){
        $( "#"+ admin_checkboxes[i]).prop( "checked", visionData[admin_checkboxes[i]] );
      }
    }
  console.log( "select items are" + $("#year").children);
  if(visionData.imgPath!=null) $('#bg').css('background-image', 'url(' + visionData.imgPath + ')');
  
  //alert(visionParams);
}

var myselect = document.getElementById('year'), year = new Date().getFullYear()-1;
var gen = function(max){do{
  year++; 
  var selected = false; 
  if(visionData!=null){
    if(year==visionData.year) selected = true; 
  }
    myselect.add(new Option(year,max--, false, selected),null);}while(max>0);}(100);

//var visionData = jQuery.parseJSON($('#visionData').val());
//alert(visionData);
socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   console.log("connected to " + 'visions');
   //socket.emit('room', 'visions');
 });
socket.on('update', updateHandler);
  //$("#popup").draggable();

$('#restart-drawing').click(function(){socket.emit("restart drawing", "")});
$('#restart-projection').click(function(){socket.emit("restart projection", "")});

  $('#Submit').click(function(e) {
    params = {};
     for(var i = 0; i < admin_fields.length; i++){
       //$( "#"+admin_fields[i] ).val(visionData[admin_fields[i]]);
        params[admin_fields[i]] =  $( "#"+admin_fields[i] ).val();

    }
     var year = $("#year").children(':selected').text();
    
    if(year=="Tomorrow"){
      params["year"] = 2014;
    } else {
      params["year"] = year;
    }
    
    if(!isNew)params["_id"] = visionData._id;
    if(!isNew)params["imgPath"] = visionData.imgPath;
    if(isNew){
      params['date'] = new Date();
      params['newVision']= "true";
      delete params["_id"];
    }
    for(var i = 0; i < admin_checkboxes.length; i++){
      params[admin_checkboxes[i]] = $( "#"+admin_checkboxes[i]).is(':checked');
    }
    /*if($( "#show_timeline").is(':checked')){
      console.log(" checked ");
  } else {
    console.log(" NOT checked ");
  }*/
  //alert(document.URL);
    console.log("submit button clicked, id is " + JSON.stringify(params));
   /* var vision = $( "#vision" ).val();
    var year = $("#year").children(':selected').text();
    var inspiration = $( "#inspiration" ).val();
    var notes = $( "#notes" ).val();
      var name = $( "#name" ).val();
      var adminTags = $( "#adminTags" ).val();
     if(year=="Tomorrow") year = 2014;
    if(!isNew) year = visionData.date;
    var tags = $('#tags').val();
    var id = "";
    var imgPath = "";
    if(!isNew) id = visionData._id;
    if(!isNew) imgPath = visionData.imgPath;
    globalParams = {'_id':id, 'vision': vision, 'year': year, 'tags': tags, 'date': year, 'adminTags': adminTags, 'name': name, 'imgPath':imgPath, 'inspiration': inspiration, 'notes' : notes, 'newVision':isNew};
    //if(isNew) 

    if(isNew){
      //var params = {"image": image, "vision": vision, "year": year, "tags": tags, "inspiration": inspiration, "location" : location, "notes" : notes};
      socket.emit('addNewVision', params);
    } else {
     // var params = {"_id": visionData._id, "image": image, "imgPath": visionData.imgPath, "vision": vision, "year": year, "tags": tags, "inspiration": inspiration, "location" : location, "notes" : notes};
      console.log("updating vision");
      socket.emit('updateVision', params);

    }*/
            // broadcastToSocket(str);
              //alert("submit called" + year +prediction + type + notes);*/
     var files = myDropzone.getQueuedFiles();
     if(files.length > 0){
       myDropzone.processQueue();
     } else {
      console.log("updating without image");
      if(isNew){
         socket.emit('addNewVision', params);
      } else {
        socket.emit('updateVision', params);
      }
     }
     
              
  });

$('#delete').click(function(e) {
  $( "#dialog-confirm" ).dialog("open");

});

$('#newVision').click(function(e) {
 var url = socketLoc + "/harmony-gallery?id="+visionData._id;
window.open(url);
});




/*var filedrag = document.getElementById('bg');


    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {

      // file drop
      filedrag.addEventListener("dragover", FileDragHover, false);
      filedrag.addEventListener("dragleave", FileDragHover, false);
      filedrag.addEventListener("drop", FileSelectHandler, false);
     // filedrag.style.display = "block";

      // remove submit button
      
    }*/

    var sampleTags = ['climate change', 'water', 'population', 'fires', 'food', 'agriculture', 'weather', 'drought', 'flood', 'technology', 'dystopia', 'utopia', 'Oakland', 'urban', 'apocalypse', 'sustainability', 'revolution', 'energy', 'CO2'];
    var adminTags = ['oseed'];
            //-------------------------------
            // Minimal
            //-------------------------------

            // singleFieldTags2 is an INPUT element, rather than a UL as in the other 
            // examples, so it automatically defaults to singleField.
            $('#tags').tagit({
              availableTags: sampleTags,
                //removeConfirmation: true
              });

             $('#adminTags').tagit({
              availableTags: adminTags
                //removeConfirmation: true
              });

            $( "#dialog-confirm" ).dialog({
              resizable: false,
              height:140,
              modal: true,
              stack: false,
              zIndex: 80,
              width: 300,
              height: 200,
              buttons: {
                "Delete": function() {
                 socket.emit('deleteVision', visionData._id);
                 $( this ).dialog( "close" );
               },
               Cancel: function() {
                $( this ).dialog( "close" );
              }
            },

          });
            $( "#dialog-confirm" ).dialog("close");

          });


function updateHandler(data){
  // window.location.href = "visions";
  location.reload();
}

/*function Output(msg) {
    //var m = $id("messages");
    
   //$("#bg").innerHTML = msg;//+ m.innerHTML;
   //alert(msg);
   image = msg;
   $('#bg').css('background-image', 'url(' + msg + ')');
 }


  // file drag hover
  function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
    //alert(e.target.className);
  }


  // file selection
  function FileSelectHandler(e) {

    // cancel event and hover styling
    FileDragHover(e);

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      ParseFile(f);
    }

  }


  // output file information
  function ParseFile(file) {
    // display an image'
    alert(JSON.stringify(file));
    if (file.type.indexOf("image") == 0) {
      var reader = new FileReader();
      reader.onload = function(e) {
        //alert(e.target.result);
      /*  Output(
          //"<p><strong>" + file.name + ":</strong><br />" +
          '<img src="' + e.target.result + '" />'//</p>'
          );
Output(e.target.result);
}
reader.readAsDataURL(file);
}
newImage = true;


}*/