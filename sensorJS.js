
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
        // var date = Date.now()
        var dataToSendToClient = dataToSendToClientFn(temp, humid);
        console.log(dataToSendToClient);
        var event = 'it-hot';
        
       
        myEE.emit(event, dataToSendToClient);

        //json stringfy the object and send it
    });
    
};

function dataToSendToClientFn(temp, humid){
    var data = {
        "temp": temp,
        "humid": humid
    };
    return JSON.stringify(data);
}

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