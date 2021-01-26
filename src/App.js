import {
  useState
} from 'react';

import {
  doneInvoke
} from 'xstate';

import {
  useMachine
} from '@xstate/react';

import {
  ajax
} from 'rxjs/ajax';

import {
  map
} from 'rxjs/operators';

import {
  taskMachine
} from './taskMachine';

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

export const App = () => {
  const [state, send] = useMachine(taskMachine, {
    services: {
      taskExecutor: (_context, event) => ajax.getJSON(event.taskId).pipe(
        map(response => doneInvoke('taskExecutor', response))
      )
    },

    devTools: true
  });

  const [userId, setUserId] = useState(1);

  // ...

  const handleSubmit = e => {
    // trigger a transition to the "pending" state. Note that a "fetch error" may randomly occur.
    send('EXECUTE', {
      taskId: `https://jsonplaceholder.typicode${Math.random() > 0.5 ? '.com' : ''}/users/${userId}`
    });
  };

  const handleCancel = () => {
    // if current state is "pending", trigger a transition to the "idle" state.
    send('CANCEL');
  };

  const handleChange = e => {
    setUserId(+e.target.value);
  };

  // ...

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Fetch User</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>

      <div style={baseStyle}>
        {/* match ("switch") on the state the state machine is currently in, and render accordingly. */}
        {state.matches('pending') && 'Loading...'}
        {state.matches('failure') && `Could not fetch user ${userId} (${state.context.error.message})`}
        {state.matches('success') && (
          <p>Name: {state.context.value.name}</p>
        )}
      </div>
    </>
  )
}