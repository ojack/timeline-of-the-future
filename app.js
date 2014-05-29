
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , http = require('http')
 , path = require('path')
 //, pen = require('./public/js/harmony/brushes/pen')
 //, expose = require('express-expose')
 , io = require('socket.io');


 var app = express();
 
 var VisionProvider = require('./db_scripts/visionProvider').VisionProvider;
 //var ImageProvider = require('./db_scripts/imageProvider').ImageProvider;
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
//app.use('/TEST_STORAGE',express.directory('../TEST_STORAGE'));
console.log("basename is "+ path.basename(imageStorage));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/"+path.basename(imageStorage), express.static(imageStorage));
app.use(app.router);
//app.expose()
//app.exposeRequire();
//app.exposeModule(__dirname + '/expose', 'utils/color');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var visionProvider = new VisionProvider('localhost', 27017);
//var imageProvider = new ImageProvider('localhost', 27017);
var fileSystem = new FileSystem(tempStorage, imageStorage);



//app.get('/', routes.index);

/*Initial submit// add a vision*/
app.post('/file-upload', function(req, res){
  //add new root node*/
  console.log("POSTED TO FORM");
  console.log(JSON.stringify(req.files));
  console.log(req.body.filesize);
  var data = JSON.parse(req.body.filesize);
  fileSystem.saveVision(data, req.files.file, visionProvider);
 /* if(JSON.parse(req.body.filesize).newVision == true){
    
    fileSystem.addNewVision(data, req.files.file, visionProvider);
  } else {
    console.log("UPDATE");
    fileSystem.updateVision(data, req.files.file, visionProvider);
  }*/
  });

//* add image to gallery*/
/*
app.post('/image-upload', function(req, res){
  //add new root node*
  console.log("POSTED TO FORM");
  console.log(JSON.stringify(req.files));
  console.log(req.body.filesize);
   var data = JSON.parse(req.body.filesize);
   var file = req.files.file;
  fileSystem.addToGallery(data, file, visionProvider);
  });

*/
app.get('/rating', function(req, res){
 //visionProvider.addRandom(function(error){
  visionProvider.getRandom(function(error, result){
    if(error) console.log(error);
    var visionJson = JSON.stringify(result);
  console.log("the result is " + visionJson);
    res.render('rating.jade', {visionData: visionJson});
  });
  
});

/*app.get('/prototype', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
     visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('prototype.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayVisions(req, res, visionProvider, 'prototype.jade');
  }
  
 
});*/

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
/*
app.get('/optimize', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
     visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('optimize.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayVisions(req, res, visionProvider, 'optimize.jade');
  }
  
 
});*/

/*


/*show drawing app by itself
app.get('/children', function(req, res){
  visionProvider.addAllChildren(function(error){
    if(error)console.log(error);
  });
});

*/
/*
app.get('/harmony-gallery', function(req, res) {
 imageProvider.findAllThumbs(function(err, result){
  if(err) throw(err);
  var visionJson = 'new';
  var dataJson = JSON.stringify(result);
  //console.log(" the data from the provider is " +dataJson);
  visionProvider.getDrawings(function(error, drawings){
    if(error) {console.log(error)} else {
      var drawingJson = JSON.stringify(drawings);
      console.log("drawings are "  + drawingJson);
  if(req.query.id) {
    visionProvider.findById(req.query.id, function(error, vision){
      if(error){
        console.log("cannot find id") ///NEED better error handling
      } else {
        visionJson = JSON.stringify(vision);
        console.log("found "+ dataJson);
        res.render('drawing.jade', {
          visionData: visionJson,
           imageData: dataJson,
           drawingData: drawingJson
         });
      }
    });
 } else {
    console.log("COULDN'T render id");
    res.render('drawing.jade', {
      visionData: visionJson,
      imageData: dataJson,
      drawingData: drawingJson
    });
  }
}
});
});
});
*/
app.get('/gallery', function(req, res) {
 /* imageProvider.findAllThumbs(function(err, result){
  if(err) throw(err);
  var visionJson = 'new';
  var dataJson = JSON.stringify(result);
  console.log("result is "+ dataJson);*/
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
 /* imageProvider.findAllThumbs(function(err, result){
  if(err) throw(err);
  var visionJson = 'new';
  var dataJson = JSON.stringify(result);
  console.log("result is "+ dataJson);*/
  visionProvider.findGallery(function(err, result){
        //console.log("result is "+ nodes.length);
        if(err){console.log(err);
      } else {
        var dataJson = JSON.stringify(result);
  //console.log(" the data from the provider is " +dataJson);
  
        //console.log("found "+ dataJson);
       visionProvider.findAllGalleryAdmin(function(err, visions){
        //console.log("result is "+ nodes.length);
       
        var dataJson = JSON.stringify(result);
          if(err){console.log(err);
          } else {
             var visionJson = JSON.stringify(visions);
            // console.log("all image "+ visionJson);
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
 // imageProvider.findAllThumbs(function(err, result){
  //if(err) throw(err);
  var visionJson = 'new';
 // var dataJson = JSON.stringify(result);
  //console.log(" the data from the provider is " +dataJson);
  /*visionProvider.getDrawings(function(error, drawings){
    if(error) {console.log(error)} else {
      var drawingJson = JSON.stringify(drawings);
      console.log("drawings are "  + drawingJson);*/
  if(req.query.id) {
    visionProvider.findById(req.query.id, function(error, vision){
      if(error){
        console.log("cannot find id") ///NEED better error handling
      } else {
        visionJson = JSON.stringify(vision);
        console.log("found "+ dataJson);
        res.render('drawing-server.jade', {
          visionData: visionJson,
          // imageData: dataJson,
         //  drawingData: drawingJson
         });
      }
    });
 } else {
    console.log("COULDN'T render id");
    res.render('drawing-server.jade', {
      visionData: visionJson,
      //imageData: dataJson,
     // drawingData: drawingJson
    });
  }
//}
});
//});
//});
/*
app.get('/drawing-record', function(req, res) {
 imageProvider.findAllThumbs(function(err, result){
  if(err) throw(err);
  var visionJson = 'new';
  var dataJson = JSON.stringify(result);
  //console.log(" the data from the provider is " +dataJson);
  visionProvider.getDrawings(function(error, drawings){
    if(error) {console.log(error)} else {
      var drawingJson = JSON.stringify(drawings);
      console.log("drawings are "  + drawingJson);
  if(req.query.id) {
    visionProvider.findById(req.query.id, function(error, vision){
      if(error){
        console.log("cannot find id") ///NEED better error handling
      } else {
        visionJson = JSON.stringify(vision);
        console.log("found "+ dataJson);
        res.render('drawing-record.jade', {
          visionData: visionJson,
           imageData: dataJson,
           drawingData: drawingJson
         });
      }
    });
 } else {
    console.log("COULDN'T render id");
    res.render('drawing-record.jade', {
      visionData: visionJson,
      imageData: dataJson,
      drawingData: drawingJson
    });
  }
}
});
});
});
*/
/*
app.get('/visions', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
     visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('prototype.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayVisions(req, res, visionProvider, 'prototype.jade');
  }
  
 
});

*/

app.get('/form', function(req, res) {
  var dataJson = "new";
  res.render('form_vision.jade', {
   visionData: 'new'
 });

});


/*app.get('/image-upload', function(req, res) {
  res.render('form_image.jade', {
   visionData: 'new'
 });

});*/





app.get('/admin', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  visionProvider.findAllAdmin(function(error, visions){
     if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('visions.jade', {
       visionData: dataJson
     });
    }
  });
 /* if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
     visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('visions.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayVisions(req, res, visionProvider, 'visions.jade');
  }*/
  
});
/*
app.get('/dynamic', function(req, res){
  console.log(req.query.tag);
  var tag = "";
  if(req.query.tag) {
    console.log("finding tag "+req.query.tag);
     visionProvider.findByTag(req.query.tag, function(error, visions){
    if(error) {
      console.log(error);
    } else {
      var dataJson = JSON.stringify(visions);
      res.render('visions-dynamic.jade', {
       visionData: dataJson
     });
    }
  });
  } else {
    displayVisions(req, res, visionProvider, 'visions-dynamic.jade');
  }
  
 
});*/
 /*
 app.get('/three', function(req, res){
   displayVisions(req, res, visionProvider, 'three.jade');
 });
*/
/*loads into popup indow of iframe*/
app.get('/:id', function(req, res) {
  if(req.params.id.length == 24){
  visionProvider.findAdmin(req.params.id, function(error, vision){
   //   console.log("looking for id ");
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
    visionProvider.findTimeline(function(err, result){
        //console.log("result is "+ nodes.length);
      /*  for(var i = 0; i < result.length; i++){
          process.stdout.write(result[i] + " ");
        }*/
         visionProvider.findGallery(function(err, data){
        //console.log("result is "+ nodes.length);
        if(err){console.log(err);
      } else {
        var dataJson = JSON.stringify(data);
        var visionJson = JSON.stringify(result);

       // console.log(" the data from the provider is " +dataJson);

      res.render(jadeTemplate, {
             visionData: visionJson,
             imageData: dataJson
             });
    }
  });

    });
}

/*
function displayVisions(req, res, visionProvider, jadeTemplate) {
    visionProvider.findAll(function(err, result){
        //console.log("result is "+ nodes.length);
      /*  for(var i = 0; i < result.length; i++){
          process.stdout.write(result[i] + " ");
        }
         visionProvider.findGallery(function(err, data){
        //console.log("result is "+ nodes.length);
        if(err){console.log(err);
      } else {
        var dataJson = JSON.stringify(data);
        var visionJson = JSON.stringify(result);

       // console.log(" the data from the provider is " +dataJson);

      res.render(jadeTemplate, {
             visionData: visionJson,
             imageData: dataJson
             });
    }
  });

    });
}
*/


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
          console.log(JSON.stringify(data[i]));
          visionProvider.updateTimelineVisibility(data[i]._id, data[i].show_timeline, function(error, vision){
            if(error) console.log(error);
            io.sockets.in(socket.id).emit('refresh gallery admin', "");
          });
        }
 });

  socket.on('addNewDrawing', function (data){
    fileSystem.addNewDrawing(data, visionProvider, function(error, id){
     if(error)console.log(error);
     console.log("CALLBACK HOLLLA "+id);
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
  socket.on('addNewVision', function (data){
   console.log("new vision added in socket!!!!!!!!!!HEYYYYY!!!!!  "+JSON.stringify(data));
    fileSystem.saveVision(data, null, visionProvider);
  /* fileSystem.addNewVision(data, null, visionProvider, function(error, id){
     if(error)console.log(error);
     console.log("CALLBACK HOLLLA "+id);

   });*/
  
});

 /* socket.on('New Animation Frame', function(data){
    fileSystem.addFrame(data.frameURL, data.frame, function(error){
      if(error)console.log(error);
    });
    //console.log("new animation frame ! "+ JSON.stringify(data));
  });


  socket.on('Canvas Frame', function(data){
    console.log(JSON.stringify(data));
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
    //res.render('rating.jade', {visionData: visionJson});
    io.sockets.in(socket.id).emit('newVision', visionJson);
  });
    
});

socket.on('findById', function (data) {
    console.log("received from socket" + socket.id + " data "+ data);

    visionProvider.findById(data, function(error, vision){
   //   console.log("looking for id ");
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

socket.on('update gallery', function(data){
  console.log(data);
   visionProvider.saveGallery({
  _id: "gallery",
   images: data }, function (error, visions) {
    if(error) console.log(error);
   });
});

/*socket.on('init drawing', function(data){
    var identifier = canvasArray.length;
    console.log("nick name is "+ identifier);
    socket.set('nickname', identifier);//each time a new drawing is created, the canvas is added to the canvasArray object
   // var canvas = new Canvas(identifier);
   // canvasArray.push(canvas);
});

socket.on('update draw', function(drawData){
    socket.get('nickname', function(err, nickname) {
        if(nickname){
     //   console.log("socket nickname: " + nickname + " socket id: "+ socket.id);
     //    console.log(JSON.stringify(drawData));
        // canvasArray[nickname].updateDrawing(drawData);
       }
    });
        
       

 });

socket.on("make video", function(){
      socket.get('nickname', function(err, nickname) {
        if(nickname){
        console.log("socket nickname: " + nickname + " socket id: "+ socket.id);
         //console.log(JSON.stringify(drawData));
        // canvasArray[nickname].makeVideo();
         socket.set('nickname', null);
       }
    });
});
*/
socket.on('addVote', function (data) {
    console.log("received from socket" + JSON.stringify(data));
    //visionProvider.addVote(function(error){
    if(data.vote != ""){
       if(data.vote != null){
      console.log("updating vote");
      visionProvider.addVote(data._id, data.vote, function(err, result){
        if(err) console.log(err);
        console.log("VOTE RESULTS ARE "+JSON.stringify(result));
      });
    }
    }
    if(data.like != null){
     visionProvider.addLike(data._id, data.like, function(error, result){
      if(error) console.log(error);
    });
    } 
     visionProvider.getRandom(function(error, result){
    if(error) console.log(error);
    var visionJson = JSON.stringify(result);
 // console.log("the result is " + visionJson);
    //res.render('rating.jade', {visionData: visionJson});
    io.sockets.in(socket.id).emit('newVision', visionJson);
  //});
  });
    
});

socket.on('updateVision', function (data){
 console.log("updated added in socket!!!!!!!!!!HEYYYYY!!!!!  "+JSON.stringify(data));
 //fileSystem.saveVision(data, null, visionProvider);
 fileSystem.updateVision(data, null, visionProvider);
 io.sockets.in(socket.id).emit('update', '');
});

socket.on('deleteVision', function(data){
 console.log(" deleting "+ JSON.stringify(data));
 //if(data.parent && data.parent.length == 24) visionProvider.removeFromParent(data.parent, data._id, data.children);
 //if(data.children && data.children.length == 24) visionProvider.removeParent(data.parent, data._id);
 visionProvider.removeVision(data);

});

});

