import { h, render } from 'preact';

import Applications from './components/applications';
import Header from './components/header';
import Machines from './components/machines';

import processDelta from './store';

function renderApp(data = {}) {
  const container = document.querySelector('.wrapper');
  const existingNode = container.querySelector('.app');
  render(
    <div class="app">
      <Header />
      <Applications applications={data.applications} units={data.units}/>
      <Machines machines={data.machines}/>
    </div>, container, existingNode);
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
