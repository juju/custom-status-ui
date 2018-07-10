import { h, render } from 'preact';

import Applications from './components/applications';
import Header from './components/header';
import Machines from './components/machines';

import processDelta from './store';

/**
  Renders the application using the supplied data object.
  @param {Object} data - The data to render, in the format:
    {applications: {}, units: {}, machines: {}}
*/
function renderApp(data = {}) {
  const container = document.querySelector('.wrapper');
  const existingNode = container.querySelector('.app');
  const modelName = Object.keys(data.models || {})[0];
  render(
    <div class="app">
      <Header modelName={modelName}/>
      <Applications applications={data.applications} units={data.units}/>
      <Machines machines={data.machines}/>
    </div>, container, existingNode);
}

/**
  Connect to the websocket server.
*/
function connectWebsocket() {
  const socket = new WebSocket(`ws://${window.location.hostname}:8080`);
  socket.addEventListener('open', e => socket.send('start'));

  socket.addEventListener('message', e => {
    const data = JSON.parse(e.data);
    renderApp(processDelta(data.deltas));
  });
}

renderApp();
connectWebsocket();
