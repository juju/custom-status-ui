'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const WebSocket = require('websocket').w3cwebsocket;

const jujulib = require('./api/client.js');
const facades = [
  require('./api/facades/all-watcher-v1.js'),
  require('./api/facades/client-v1.js')
];

const connectOptions = {debug: true, facades: facades, wsclass: WebSocket};

/**
  Connect to the Juju model login, then return the current model status and watch for changes.
  @param {Object} options - The options for connecting and logging into the Juju model.
  @param {String} options.controllerIP - The IP of the controller that manages the model.
  @param {String} options.modelUUID - The UUID of the model to connect to.
  @param {String} options.userName - A user name for a user who has access to watch changes on a model.
  @param {String} options.password - The password for the user name.
  @param {Function} onMessage - Called with any messages from the watcher.
  @param {Function} callback - Called with an error, or null, and the watch handler.
*/
function connectAndWatch({controllerIP, modelUUID, userName, password}, onMessage, callback) {
  const url = `wss://${controllerIP}:17070/model/${modelUUID}/api`;

  jujulib.connect(url, connectOptions, (err, juju) => {
    if (err) {
      console.log('cannot connect:', err);
      callback(err);
      return;
    }

    juju.login({user: `user-${userName}`, password}, (err, conn) => {
      if (err) {
        console.log('cannot login:', err);
        callback(err);
        return;
      }

      const client = conn.facades.client;
      const handle = client.watch((err, result) => {
        if (err) {
          console.log('cannot watch model:', err);
          callback(err);
          return;
        }
        onMessage(result);
      });
      callback(null, handle);
    });
  });
}

/**
  Cancels the watcher handler.
  @param {Object} handle - The handle from the jujulib client.watch call.
*/
function cancelWatch(handle) {
  handle.stop(err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('watcher stopped');
  });
}


module.exports = {
  connectAndWatch,
  cancelWatch
};
