const notifier = require('./notifier');
const sensor = require('./sensorJS');
const server = require('./server.js');

function main() {
  notifier.init();
  console.log("main.js")
  
  sensor.addHotListener((temp)=>{
    console.log("It should be broadcasting temp");
    notifier.broadcast(temp);
  });
  sensor.addHumidListener((humid)=>{
    console.log("It should be broadcasting humid");
    notifier.broadcast(humid);
  });

  //function to use that sensor information
}
main();