import classnames from 'classnames';
import {h} from 'preact';

function generateHardwareCharacteristics(data = {}) {
  return Object
    .keys(data)
    .map(key => `${key}: ${data[key]}, `)
    .reduce((final, current) => final += current);
}

function listMachines(machines = {}) {
  return Object
    .keys(machines)
    .map(key => {
      const machineData = machines[key];
      const agentStatus = machineData['agent-status'].current;
      const classes = classnames(
        'button',
        'is-selected', {
          'is-danger': agentStatus === 'error',
          'is-warning': agentStatus !== 'error' && agentStatus !== 'started',
          'is-success': agentStatus === 'started'
        });
      return <div class="buttons has-addons">
        <span class="button is-selected">{key}</span>
        <span class={classes}>{agentStatus}</span>
        <span class="button is-selected">{generateHardwareCharacteristics(machineData['hardware-characteristics'])}</span>
      </div>;
    });
}

const Machines = props =>
  <div class="machines">
    <h2 class="title is-4">Machines</h2>
    {listMachines(props.machines)}
  </div>;

export default Machines;
