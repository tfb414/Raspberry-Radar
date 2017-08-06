
var util = require("util");
// const ws = require('ws');
var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var url = require('url')
var fs = require('fs')

io = require('socket.io')(app)




//This will open a server at localhost:5000. Navigate to this in your browser.
app.listen(8080);

// Http handler function
function handler (req, res) {

    // Using URL to parse the requested URL
    var path = url.parse(req.url).pathname;

    // Managing the root route
    if (path == '/') {
        index = fs.readFile('/home/pi/thingspeak/servertest/index.html', 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load index.html");
                }

                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(data);
            });
    // Managing the route for the javascript files
    } else if( /\.(js)$/.test(path) ) {
        index = fs.readFile('/home/pi/thingspeak/servertest'+path, 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/plain'});
                res.end(data);
            });
    } else {
        res.writeHead(404);
        res.end("Error: 404 - File not found.");
    }

}


io.sockets.on('connection', function (socket) {

  // If we recieved a command from a client to start watering lets do so
  socket.on('example-ping', function(data) {
      console.log("ping");

      delay = data["duration"];

      // Set a timer for when we should stop watering
      setTimeout(function(){
          socket.emit("example-pong");
      }, delay*1000);

  });

});


// var spawn = require("child_process").spawn;

// util.log('Working...')

// var tempData = {}
// var currentTemp;

// function runFile(){
    
//     var processSensor = spawn('python',["sensor.py"]);
//     processSensor.stdout.on('data',function(chunk){
//         var textChunk = chunk.toString('utf8');
//         var numbers = textChunk.split("\n");
//         var temp = convertToFahrenheit(Number(numbers[0])).toFixed(2);
//         var humid = Number(numbers[1]).toFixed(2);
//         var date = Date.now()
//         addToData(date, temp, humid);
//         currentTemp = temp;
//         console.log(currentTemp);
//     });
// ;};


// function convertToFahrenheit(number){
//     return number * 1.8 + 32;
// }

// function addToData(date, temp, humid){
//     tempData[date] = {};
//     tempData[date]['Temperature'] = temp
//     tempData[date]['Humidity'] = humid
//     console.log(tempData);
// }

// setInterval(runFile, 5000);



//how to do promises with the .on
//why can't i use finder to see these files