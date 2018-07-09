'use strict';

import { h, render } from 'preact';

import Applications from './components/applications';
import Header from './components/header';
import Notifications from './components/notifications';

function renderApp() {
  render((
    <div>
      <Header />
      <Notifications />
      <Applications />
    </div>
  ), document.querySelector('.wrapper .app'));
}

function connectWebsocket() {
  const socket = new WebSocket('ws://192.168.64.6:8080');
  socket.addEventListener('open', e => socket.send('start'));

  socket.addEventListener('message', e => {
    console.log('Message from server ', e.data);
  });
}

renderApp();
