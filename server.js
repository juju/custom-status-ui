const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end();
});
server.listen(8080, () => console.log('Server is listening on port 8080'));

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', request => {
  const conn = request.accept('', request.origin);
  conn.on('message', msg => {
    if (msg.utf8Data === 'start') {
      // start sending juju status data.
      conn.sendUTF(message.utf8Data);
    }
  });
  conn.on('close', (reasonCode, description) => {
    // Stop sending data.
  });
});
