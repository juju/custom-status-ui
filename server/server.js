'use strict';

const http = require('http');
const WebSocketServer = require('websocket').server;

const {connectAndWatch, cancelWatch} = require('./juju');

const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end();
});
server.listen(8080, () => console.log('Server is listening on port 8080'));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

let watchHandle = null;

const connectionOptions = {
  controllerIP: process.env.CONTROLLERIP,
  modelUUID: process.env.MODELUUID,
  userName: process.env.USERNAME,
  password: process.env.PASSWORD
};

wsServer.on('request', request => {
  const conn = request.accept('', request.origin);
  conn.on('message', msg => {
    if (msg.utf8Data === 'start') {
      connectAndWatch(connectionOptions, msg => conn.sendUTF(JSON.stringify(msg)),
        (err, handle) => {
          if (err) {
            conn.sendUTF({error: err});
            if (handle) {
              cancelWatch(handle);
            }
            return;
          }
          watchHandle = handle;
        });
    }
  });
  conn.on('close', (reasonCode, description) => {
    if (watchHandle) {
      cancelWatch(watchHandle);
    }
  });
});
