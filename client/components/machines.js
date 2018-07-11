import classnames from 'classnames';
import {h} from 'preact';

/**
  A list of machines component.
  @param {Object} props - In the format {machines: {}}.
  @return {Function} A rendered list of machines component.
*/
const Machines = props =>
  <div class="machines">
    <h2 class="title is-4">Machines</h2>
    {listMachines(props.machines)}
  </div>;

/**
  Generates a string of hardware characteristics from an object of key/value
  pairs of characteristics.
  @param {Object} data - The list of characteristics in the format {mem: 6, ...}.
  @return {String} The list of characteristics.
*/
function generateHardwareCharacteristics(data = {}) {
  return Object
    .keys(data)
    .map(key => `${key}: ${data[key]}, `)
    .reduce((final, current) => final += current, '');
}

/**
  Generate a list of machines component.
  @param {Object} machines - The list of machines object.
  @return {Function} The rendered machines list component.
*/
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

export default Machines;
