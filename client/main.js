import { h, render } from 'preact';

import Applications from './components/applications';
import Header from './components/header';
import Notifications from './components/notifications';

import processDelta from './store';

function renderApp(data = {}) {
  render((
    <div>
      <Header />
      <Notifications />
      <Applications data={data.applications}/>
    </div>
  ), document.querySelector('.wrapper .app'));
}

function connectWebsocket() {
  const socket = new WebSocket('ws://192.168.64.6:8080');
  socket.addEventListener('open', e => socket.send('start'));

  socket.addEventListener('message', e => {
    const data = JSON.parse(e.data);
    renderApp(processDelta(data.deltas));
  });
}

renderApp();
connectWebsocket();
