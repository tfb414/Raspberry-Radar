
var util = require("util");
var tempData = {}
var spawn = require("child_process").spawn;
var Promise = require('es6-promise').Promise;

util.log('Working...')

function runFile(){
    var processSensor = spawn('python',["sensor.py"]);
    processSensor.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');
        var numbers = textChunk.split("\n");
        var temp = convertToFahrenheit(Number(numbers[0])).toFixed(2);
        var humid = Number(numbers[1]).toFixed(2);
        var date = Date.now()
        addToData(date, temp, humid);
        return tempData;
    });
    console.log(tempData)
;};


function convertToFahrenheit(number){
    return number * 1.8 + 32;
}

function addToData(date, temp, humid){
    tempData[date] = {};
    tempData[date]['Temperature'] = temp
    tempData[date]['Humidity'] = humid
    
    
}


setInterval(runFile, 5000);

