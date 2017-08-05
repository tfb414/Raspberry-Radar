
var util = require("util");
const ws = require('ws');

var spawn = require("child_process").spawn;
var Promise = require('es6-promise').Promise;

const server = new ws.Server({port: 8080});

server.on('connection', (socket)=>{
    console.log('someone connected!');
    console.log(temp);
    socket.on('message', (msg)=>{
        console.log("They said: " + msg);
        server.clients.forEach((client)=> {
            socket.send("I know you are but what am I?");
            //this sends it to every website that has this open
        })
        
    });
});

// const http = require('http');
// const server = http.createServer((req, res) => {
//     //do stuff
//     res.end('<h1>' + currentTemp + '</h1>');
//     //this is a method and it ends the convo and send it off
// });

// server.listen(8080);


util.log('Working...')

var tempData = {}
var currentTemp;

function runFile(){
    
    var processSensor = spawn('python',["sensor.py"]);
    processSensor.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');
        var numbers = textChunk.split("\n");
        var temp = convertToFahrenheit(Number(numbers[0])).toFixed(2);
        var humid = Number(numbers[1]).toFixed(2);
        var date = Date.now()
        addToData(date, temp, humid);
        currentTemp = temp;
        console.log(currentTemp);
    });
;};


function convertToFahrenheit(number){
    return number * 1.8 + 32;
}

function addToData(date, temp, humid){
    tempData[date] = {};
    tempData[date]['Temperature'] = temp
    tempData[date]['Humidity'] = humid
    console.log(tempData);
}

setInterval(runFile, 5000);



//how to do promises with the .on
//why can't i use finder to see these files