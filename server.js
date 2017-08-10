//GO TO PORT 8888 and type socket.send('derp') in the console




const ws = require('ws');
// const server = new ws.Server({port: 8080});
const fs = require('fs');
const http = require('http');



// server.on('connection', (socket)=>{
//     console.log('someone connected!');
//     socket.on('message', (msg)=>{
//         console.log("They said: " + msg);
//         server.clients.forEach((client)=> {
//             socket.send("I know you are but what am I?");
//             //this sends it to every website that has this open
//         })
//     });
// });


const HTTPserver = http.createServer((req, res) => {
    console.log(req.url);
    let urlPath = "index.html";
    if(req.url != '/'){
        urlPath = req.url.slice(1);
    }
    fs.readFile(urlPath, (err, buffer)=>{
        if(err){
            res.end();
            return;
            
        }
        
        res.end(buffer.toString());
    })
});

HTTPserver.listen(8888, () =>{
    console.log('server.js');
});
