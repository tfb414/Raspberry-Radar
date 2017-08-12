
const EventEmitter = require('events').EventEmitter;
const myEE = new EventEmitter();
var spawn = require("child_process").spawn;
const util = require('util');
var Twitter = require('twitter');
require('dotenv').config();

util.log('Working...')

var tempData = {}
var currentTemp;



function runFile(){
    var processSensor = spawn('python',["sensor.py"]);
    processSensor.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');
        var numbers = textChunk.split("\n");
        var temp = convertToFahrenheit(Number(numbers[1])).toFixed(1);
        var humid = Number(numbers[0]).toFixed(0);
        var dataToSendToClient = dataToSendToClientFn(temp, humid);
        console.log(dataToSendToClient);
        var event = 'send-sensor-info';
        
       
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
    myEE.on('send-sensor-info', callback)
}

function addHumidListener(callback){
    myEE.on('it-humid', callback)
}

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
   //  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
   });
   
   
   client.post('statuses/update', {status: 'I Love Twitter'})
   .then(function (tweet) {
     console.log(tweet);
   })
   .catch(function (error) {
     throw error;
   })
   

module.exports = {
  addHotListener: addHotListener,
  addHumidListener: addHumidListener,
 
  //export the server info
};