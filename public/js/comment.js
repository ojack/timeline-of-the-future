var comment_fields = ['name', 'comment'];

 $(function() {
 	connectToSocket();
$('.keyboard').onScreenKeyboard();
   
  	var visionData = jQuery.parseJSON($('#visionData').val());
  	console.log(" vision data is " + JSON.stringify($('#visionData').val()));
   	 if(visionData.comments){ 
      showComments(visionData.comments);
      } else {
         var msg = $('<div></div>').text("No comments yet.").addClass('no-comment');
          $('#comments').append(msg);
      }
     $('#submit').click(function(){
     var params = {};
     for(var i = 0; i < comment_fields.length; i++){
       //$( "#"+admin_fields[i] ).val(visionData[admin_fields[i]]);
        params[comment_fields[i]] =  $( "#"+comment_fields[i] ).val();

    }
     params['date'] = new Date();
     var commentObject = {};
     commentObject['id'] = visionData['_id'];
     commentObject['comment'] = params;
     //  alert("submit clicked! " + JSON.stringify(commentObject));
     for(var i = 0; i < comment_fields.length; i++){
       //$( "#"+admin_fields[i] ).val(visionData[admin_fields[i]]);
       $( "#"+comment_fields[i] ).val("");
       // params[comment_fields[i]] =  $( "#"+comment_fields[i] ).val();

    }
        socket.emit('addComment', commentObject);
        location.reload();
       });
               

     
});

 function showComments(comments){
  for(var i = comments.length-1; i>=0; i--){
    addComment(comments[i], i);
  }
 }
  function addComment(comment, index){
    console.log(JSON.stringify(comment));
     var thisDate =  new Date(comment.date);
     var row = $('<tr></tr>').addClass('row').data('index', index); /*.click(function(){
      console.log($(this).data('id'));
      var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  socketLoc = str.substring(0, extra);
      var url = socketLoc+"/"+ $(this).data('id');
      window.open(url);
    });*/
    var date = $('<div></div>').text(thisDate.toLocaleString()).addClass('date');
    var name = $('<div></div>').text(comment.name).addClass('name');
    
    var comment = $('<div></div>').text(comment.comment).addClass('name');
     row.append(date).append(name).append(comment);
     $('#comments').append(row);
  }

 function connectToSocket(){
	var str = "" + window.location;
	var extra = str.lastIndexOf("/");
	socketLoc = str.substring(0, extra);
	socket = io.connect(socketLoc);
 
}