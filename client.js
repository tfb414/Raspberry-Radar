// let socket = new WebSocket('ws://localhost:8080');
let socket = new WebSocket('ws://timlikespi.local:8080');
// console.log(socket);
// socket.onmessage = (msg) => console.log(msg.data);
// console.log('client.js')
// socket.send('hi there! I am so friendly!');
socket.onmessage = (msg) => {
    var data = JSON.parse(msg.data);
    console.log(data)
    $("[data-target = 'temp-display']").html(data.temp + "&deg");
    $("[data-target = 'humid-display']").html(data.humid + "%")
};
// socket.onmessage = (humid) => {
//     console.log('humid');
//     console.log(humid);
//     $("[data-target = 'humid-display']").html(humid.data + "%")
// };



//from the server send out an object that has humid and temp
//parse the data here. and get rid of one of these things.

//ask chris if there are two 

