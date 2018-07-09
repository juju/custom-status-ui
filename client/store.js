import merge from 'deepmerge';

const modelState = {
  applications: {},
  machines: {},
  units: {}
};

/**
  Processes the delta objects from the Juju websocket messages.
  @param {Object} deltas The delta objects from the Juju megawatcher messages.
  @return {Object} The new model state object.
*/
function processDelta(deltas) {
  deltas.forEach(delta => {
    // If there is a handler for the delta type then pass the data to it.
    // delta[0] will be one of 'relation', 'application', 'machine', 'relation',
    // 'unit'.
    // For this application we're only concerned with the 'application',
    // 'machine', and 'unit' deltas.
    if (['application', 'machine', 'unit'].includes(delta[0])) {
      const data = delta[2];
      const section = modelState[delta[0] + 's'];
      // The key value differs depending on the delta.
      const key = delta[0] === 'machine' ? 'id' : 'name';
      if (delta[1] === 'change') {
        if (!section[data[key]]) {
          section[data[key]] = {};
        }
        section[data[key]] = merge(section[data[key]], data);
      }
    }
  });
  return modelState;
}

export default processDelta;
