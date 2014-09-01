
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , http = require('http')
 , path = require('path')
 , io = require('socket.io');


 var app = express();
 
 var VisionProvider = require('./db_scripts/visionProvider').VisionProvider;
 var FileSystem = require('./db_scripts/fileSystem').FileSystem;


var tempStorage = "./uploads"; //folder location where http requests are posted
var imageStorage = "../TEST_STORAGE"; //file path to image stoage location
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(express.methodOverride());
console.log("basename is "+ path.basename(imageStorage));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/"+path.basename(imageStorage), express.static(imageStorage));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var visionProvider = new VisionProvider('localhost', 27017);
var fileSystem = new FileSystem(tempStorage, imageStorage);


/*Initial submit// add a vision*/
app.post('/file-upload', function(req, res){
  console.log("POSTED TO FORM");
  console.log(JSON.stringify(req.files));
  console.log(req.body.filesize);
  var data = JSON.parse(req.body.filesize);
  fileSystem.saveVision(data, req.files.file, visionProvider);
  });

app.get('/rating', function(req, res){
  visionProvider.getRandom(function(error, result){
    if(error) console.log(error);
    var visionJson = JSON.stringify(result);
  console.log("the result is " + visionJson);
    res.render('rating.jade', {visionData: visionJson});
  });
  
});


app.get('/projection', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
     visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('timeline.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayTimeline(req, res, visionProvider, 'projection.jade');
  }
  
});

app.get('/comments', function(req, res) {
  if(req.query.id){
  var dataJson = "new";
   console.log("ID is : " + req.query.id);
   visionProvider.getComments(req.query.id, function(error, comments){
    var commentData = JSON.stringify(comments);
         console.log("comments are "+ JSON.stringify(comments));
  res.render('comment.jade', {
   visionData: commentData
 });
   });
 } else {
  console.log("no id was added");
 }
});

app.get('/timeline', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
    visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('timeline.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayTimeline(req, res, visionProvider, 'timeline.jade');
  }
  
 
});


app.get('/gallery', function(req, res) {

  visionProvider.findGallery(function(err, result){
        //console.log("result is "+ nodes.length);
        if(err){console.log(err);
      } else {
        var dataJson = JSON.stringify(result);
  //console.log(" the data from the provider is " +dataJson);
  
        //console.log("found "+ dataJson);
       visionProvider.findAllGallery(function(err, visions){
        //console.log("result is "+ nodes.length);
       
        var dataJson = JSON.stringify(result);
          if(err){console.log(err);
          } else {
             var visionJson = JSON.stringify(visions);
             console.log("all image "+ visionJson);
        res.render('gallery.jade', {
          visionData: visionJson,
          imageData: dataJson,
         });
      }
    });
      }
  });
});

app.get('/gallery_admin', function(req, res) {
  visionProvider.findGallery(function(err, result){
        if(err){console.log(err);
      } else {
        var dataJson = JSON.stringify(result);
       visionProvider.findAllGalleryAdmin(function(err, visions){
        var dataJson = JSON.stringify(result);
          if(err){console.log(err);
          } else {
             var visionJson = JSON.stringify(visions);
        res.render('gallery_admin.jade', {
          visionData: visionJson,
          imageData: dataJson,
         });
      }
    });
      }
  });
});

app.get('/drawing', function(req, res) {
  var visionJson = 'new';
 
  if(req.query.id) {
    visionProvider.findById(req.query.id, function(error, vision){
      if(error){
        console.log("cannot find id") 
      } else {
        visionJson = JSON.stringify(vision);
        console.log("found "+ dataJson);
        res.render('drawing-server.jade', {
          visionData: visionJson,
         });
      }
    });
 } else {
    console.log("COULDN'T render id");
    res.render('drawing-server.jade', {
      visionData: visionJson,
    });
  }

});

app.get('/form', function(req, res) {
  var dataJson = "new";
  res.render('form_vision.jade', {
   visionData: 'new'
 });

});


/*loads into popup indow of iframe*/
app.get('/:id', function(req, res) {
  if(req.params.id.length == 24){
  visionProvider.findAdmin(req.params.id, function(error, vision){
   if(error){
    console.log("cannot find id")
  } else {
   var dataJson = JSON.stringify(vision);
   console.log("found "+ dataJson);
   res.render('form_vision.jade', {
     visionData: dataJson
   });
 }
});
}
});

function displayTimeline(req, res, visionProvider, jadeTemplate) {
  visionProvider.findTimelineCollection(100, function(err, result){
         visionProvider.findGallery(function(err, data){
        if(err){console.log(err);
      } else {
        var dataJson = JSON.stringify(data);
        var visionJson = JSON.stringify(result);
      res.render(jadeTemplate, {
             visionData: visionJson,
             imageData: dataJson
             });
    }
  });

    });
}


var canvasArray = new Array();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  // once a client has connected, we expect to get a ping from them saying what room they want to join

  socket.emit('news', { hello: 'world' });
  socket.join(socket.id);
  socket.on('room', function (roomId){
   console.log("room is" + roomId);
   socket.join(roomId);
 });

 socket.on('update from gallery admin', function(data){
        for(var i = 0; i < data.length; i++){
          console.log(JSON.stringify(data[i].update));
         visionProvider.updateTimelineVisibility(data[i]._id, data[i].update, function(error, vision){
            if(error) console.log(error);
            if(i==(data.length-1)){
               io.sockets.in(socket.id).emit('refresh gallery admin', "");
            }
          });
        }
 });

/* A new vision is created and added to the server */
  socket.on('addNewDrawing', function (data){
    /*upload file and add to database*/
    fileSystem.addNewDrawing(data, visionProvider, function(error, id){
     if(error)console.log(error);
     console.log("CALLBACK HOLLLA "+id);
     /*Find newly created file from database. Add new vision to client*/
      visionProvider.findForTimeline(id, function(error, vision){
   //   console.log("looking for id ");
   
   if(error){
    console.log("cannot find id")
  } else {
   var visionJson = JSON.stringify(vision);
   console.log("found "+ visionJson);
   io.sockets.emit('addToTimeline', visionJson);
 }
});
   });
   
  });


/*add a vision with no image*/
 /* socket.on('addNewVision', function (data){
   console.log("new vision added in socket!!!!!!!!!!HEYYYYY!!!!!  "+JSON.stringify(data));
    fileSystem.saveVision(data, null, visionProvider);
  
});*/


/*sends a new random vision to the rating station*/
socket.on('newRandom', function (data) {
    console.log("received from socket" + socket.id);
    if(data!=null){
      console.log(JSON.stringify(data));
    visionProvider.addLike(data._id, data.like, function(error, result){
      if(error) console.log(error);
    });
    } 
    visionProvider.getRandom(function(error, result){
    if(error) console.log(error);
    var visionJson = JSON.stringify(result);
  console.log("the result is " + visionJson);
    io.sockets.in(socket.id).emit('newVision', visionJson);
  });
    
});

socket.on('findById', function (data) {
    console.log("received from socket" + socket.id + " data "+ data);
    visionProvider.findById(data, function(error, vision){
   if(error){
    console.log("cannot find id")
  } else {
    console.log("parent is" + vision.parent);
     if(vision.children) {
      visionProvider.findChildren(vision.children, function(error, children){
        vision.children = children;
         if(vision.parent) {
            visionProvider.findParent(vision.parent, function(error, parent){
              if(error){
                console.log(error);
              } else {
                vision.parent = parent;
                console.log("found children & parent"+ visionJson);
               
              }
               var visionJson = JSON.stringify(vision);
                
                io.sockets.in(socket.id).emit('showPopupData', visionJson);
            });
          } else {
             var visionJson = JSON.stringify(vision);
                console.log("found children NO parent"+ visionJson);
            io.sockets.in(socket.id).emit('showPopupData', visionJson);
          }
      });
     } else {
         if(vision.parent) {
            visionProvider.findParent(vision.parent, function(error, parent){
              if(error){
                console.log(error);
              } else {
                vision.parent = parent;
                console.log("found just parent"+ visionJson);
              }
              var visionJson = JSON.stringify(vision);
                
                 io.sockets.in(socket.id).emit('showPopupData', visionJson);
            });
          } else {
              var visionJson = JSON.stringify(vision);
     console.log("found "+ visionJson);
     io.sockets.in(socket.id).emit('showPopupData', visionJson);
          }
    
   }
   }
  });
  });

socket.on('filterCollection', function(data){
    console.log("filter is "+ data);
     visionProvider.findTaggedCollection(data, 100, function(err, result){
      if(err){
        console.log(err);
      } else {
        var visionJson = JSON.stringify(result);
          io.sockets.in(socket.id).emit('newVisionCollection', visionJson);
      }
     });
     });

socket.on('filterShowAll', function(data){
    console.log("filter is "+ data);
     visionProvider.findTimelineCollection(100, function(err, result){
      if(err){
        console.log(err);
      } else {
        var visionJson = JSON.stringify(result);
          io.sockets.in(socket.id).emit('newVisionCollection', visionJson);
      }
     });
      
});

socket.on("get next page", function(data){
    console.log("data is "+ JSON.stringify(data));
    var startIndex = data.page*data.numberPerPage;
    visionProvider.findRangeGalleryAdmin(startIndex, data.numberPerPage, function(err, visions){
      //console.log(visions);
       io.sockets.in(socket.id).emit('next page', visions);
    });
  });

socket.on('restart projection', function(data){
  console.log("PROJECTION RESTART");
  io.sockets.emit('restart projection', "");
});

socket.on('restart drawing', function(data){
  console.log("DRAWING RESTART");
  io.sockets.emit('restart drawing', "");
});

socket.on('restart rating', function(data){
  console.log("DRAWING RESTART");
  io.sockets.emit('restart rating', "");
});

socket.on('update gallery', function(data){
  console.log(data);
   visionProvider.saveGallery({
  _id: "gallery",
   images: data }, function (error, visions) {
    if(error) console.log(error);
   });
});



socket.on('addVoteResults', function (data) {
  visionProvider.addVoteResults(data, function(err){
    if(err){ console.log(err);
    }else {
  }
});
});

socket.on('addVote', function (data) {
  console.log("received from socket" + JSON.stringify(data));
  var results = "";
      if(data.vote != ""){
       if(data.vote != null){
        console.log("updating vote");
        visionProvider.addVote(data._id, data.vote, function(err, result){
          if(err) console.log(err);
          results = result;
          console.log("VOTE RESULTS ARE "+JSON.stringify(result));
          if(data.like != null){
            visionProvider.addLike(data._id, data.like, function(error, likes){
            if(error) console.log(error);
            console.log("NUMBER OF LIKES IS "+ likes);
            visionProvider.getRandom(function(error, vision){
              if(error) console.log(error);
              var result = {};
              result["rating"] = results;
              result["likes"] = likes;
              var visionJson = JSON.stringify(vision);

            io.sockets.in(socket.id).emit('newVision', vision);
          });
          });
         } 


       });
      }
    }

    
  });

socket.on('updateVision', function (data){
 fileSystem.updateVision(data, null, visionProvider);
 io.sockets.in(socket.id).emit('update', '');
});

socket.on('addComment', function (data){
 visionProvider.addComment(data.id, data.comment, function(error){
    if(error) console.log(error);
     io.sockets.in(socket.id).emit('newComment', '');
 });
});

socket.on('deleteVision', function(data){
 console.log(" deleting "+ JSON.stringify(data));
 fileSystem.remove(data, visionProvider);
 io.sockets.emit('restart drawing', "");
 
});



});

