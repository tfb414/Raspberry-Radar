
const EventEmitter = require('events').EventEmitter;
const myEE = new EventEmitter();
var spawn = require("child_process").spawn;
const util = require('util');

util.log('Working...')

var tempData = {}
var currentTemp;



function runFile(){
    console.log('were in runFile');
    var processSensor = spawn('python',["sensor.py"]);
    processSensor.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');
        var numbers = textChunk.split("\n");
        var temp = convertToFahrenheit(Number(numbers[1])).toFixed(1);
        var humid = Number(numbers[0]).toFixed(0);
        var date = Date.now()
        // console.log("this is in the sensor.js file " + temp);
        // var data = addToData(date, temp, humid);
        var event = 'it-hot';
        var event2 = 'it-humid';
        myEE.emit(event, temp);

        //json stringfy the object and send it
        myEE.emit(event, humid)
    });
    
};

runFile;

function convertToFahrenheit(number){
    return number * 1.8 + 32;
}

setInterval(runFile, 5000);

function addHotListener(callback){
    myEE.on('it-hot', callback)
}

function addHumidListener(callback){
    myEE.on('it-humid', callback)
}

module.exports = {
  addHotListener: addHotListener,
  addHumidListener: addHumidListener,
 
  //export the server info
};