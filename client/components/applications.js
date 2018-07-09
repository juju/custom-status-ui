import classnames from 'classnames';
import {h} from 'preact';

const Application = props =>
  <div class="field is-grouped">
    <a class="button is-text column is-2">{props.application.name}</a>
    <div class="buttons has-addons">
      {props.units}
    </div>
  </div>;

const Unit = data => {
  const agentStatus = data.data['agent-status'].current;
  const classes = classnames(
    'button',
    'is-selected', {
      'is-danger': agentStatus === 'error',
      'is-warning': agentStatus !== 'error' && agentStatus !== 'idle',
      'is-success': agentStatus === 'idle'
    });
  return <span class={classes}>0</span>;
};

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

const Applications = props =>
  <div class="applications">
    <h2 class="title is-4">Applications</h2>
    {listApplications(props.applications, props.units)}
  </div>;

export default Applications;
