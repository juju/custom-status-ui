import {h} from 'preact';

const Application = props =>
  <div class="field is-grouped">
    <a class="button is-text column is-2">{props.application.name}</a>
    <div class="buttons has-addons">
      {props.units}
    </div>
  </div>;

export default Application;
