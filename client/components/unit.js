import classnames from 'classnames';
import {h} from 'preact';

const Units = data => {
  console.log(data);
  const agentStatus = data['agent-status'];
  const classes = classnames(
    'button',
    'is-selected', {
      'is-danger': agentStatus === 'error',
      'is-warning': agentStatus === 'pending',
      'is-success': agentStatus !== 'error' && agentStatus !== 'pending'
    });
  return <span class={classes}>0</span>;
};

export default Units;
