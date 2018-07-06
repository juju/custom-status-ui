
const socket = new WebSocket('ws://192.168.64.6:8080');
socket.addEventListener('open', e => {
  socket.send('start');
});

socket.addEventListener('message', e => {
  console.log('Message from server ', e.data);
});
