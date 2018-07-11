import classnames from 'classnames';
import {h} from 'preact';

/**
  Individual application component.
  @param {Object} props - An object containing {application: 'modelname'}.
  @return {Function} The rendered application component.
*/
const Application = props =>
  <div class="field is-grouped">
    <a class="button is-text column is-2">{props.application.name}</a>
    <div class="buttons has-addons">
      {props.units}
    </div>
  </div>;

/**
  Individual unit component.
  @param {data} The unit data in the format {data: {'agent-status': {current: 'idle'}}.
  @return {Function} The rendered unit component.
*/
const Unit = props => {
  const data = props.data;
  const agentStatus = data['agent-status'].current;
  const classes = classnames(
    'button',
    'is-selected', {
      'is-danger': agentStatus === 'error',
      'is-warning': agentStatus !== 'error' && agentStatus !== 'idle',
      'is-success': agentStatus === 'idle'
    });
  return <span class={classes}>{data.name.split('/')[1]}</span>;
};

/**
  Applications list component.
  @param {Object} props - An object containing {application: {}, units: {}}.
  @return {Function} The rendered application list component.
*/
const Applications = props =>
  <div class="applications">
    <h2 class="title is-4">Applications</h2>
    {listApplications(props.applications, props.units)}
  </div>;

/**
  Generate the list of applications
  @param {Object} applications - A list of application objects.
  @param {Object} units - A list of unit objects.
*/
function listApplications(applications = {}, units = {}) {
  return Object
    .keys(applications)
    .map(applicationKey => {
      // Filter the units by application.
      const unitElements =
        <div class="buttons has-addons">
          {Object
            .keys(units)
            .filter(id => id.split('/')[0] === applicationKey)
            .map(unitKey => <Unit data={units[unitKey]}/>)}
        </div>;
      return <Application application={applications[applicationKey]} units={unitElements}/>;
    });
}

export default Applications;
