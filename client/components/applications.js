import {h} from 'preact';

import Application from './application';
import Unit from './unit';

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
