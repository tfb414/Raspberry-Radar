const ws = require('ws');
// const server = require("./server")

const PORT = 8080; // Put in a real port number
let wsServer;

function broadcast (message) {
  wsServer.clients.forEach((client)=>{
    client.send(message);
  });
}



function init(callback) {
  wsServer =  new ws.Server({ port: PORT });
  // Whatever callback gets passed in
  // It has access to the socket
  wsServer.on('connection', (socket) => {
    console.log("socket connection made");
  })
}




module.exports = {
  broadcast: broadcast,
  init: init
 
};

