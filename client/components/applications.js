import {h} from 'preact';

import Application from './application';

function listApplications(applications = {}) {
  return Object
    .keys(applications)
    .map(key => <Application data={applications[key]}/>);
}

const Applications = props =>
  <div class="applications">
    <h2 class="title is-4">Applications</h2>
    {listApplications(props.data)}
  </div>;

export default Applications;
