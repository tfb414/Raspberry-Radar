// let socket = new WebSocket('ws://localhost:8080');
let socket = new WebSocket('ws://timlikespi.local:8080');
// console.log(socket);
// socket.onmessage = (msg) => console.log(msg.data);
// console.log('client.js')
// socket.send('hi there! I am so friendly!');
socket.onmessage = (temp) => {
    console.log('temp');
    console.log(temp);
    $("[data-target = 'temp-display']").html(temp.data + "&deg")
};
// socket.onmessage = (humid) => {
//     console.log('humid');
//     console.log(humid);
//     $("[data-target = 'humid-display']").html(humid.data + "%")
// };


//from the server send out an object that has humid and temp
//parse the data here. and get rid of one of these things.

//ask chris if there are two 

