# xstatewebinar
This document describes the sample React application built for the XState webinar.

## Installation
Install dependencies:

    npm install

Start the development server (available @ _localhost:3000_):

    npm start

## Overview
The state machine definition, in `taskMachine.js`, can be rendered by copying and pasting it into the "Definition" panel in the XState Visualizer (https://xstate.js.org/viz/).

The _taskExecutor_ service, referenced in the state machine definition, is provided as part of invoking the `useMachine` hook in the `App` component.

The service is invoked by the state machine upon transitioning to the _pending_ state, and it uses RxJS to fetch a user from a remote endpoint.

*   Upon receiving a response, it sends a "done" event (created via `doneInvoke`) to the state machine, leading to a transition to the _success_ state. 

*   Upon an request error a matching event is implicitly sent to the machine, leading to a transition to the _failure_ state.

### Guarded transitions
In the state machine definition, it's possible to trigger an _EXECUTE_ event while in the _pending_ state, i.e. a new task may commence while a current task is running, whereby the latter will be cancelled. 

The state machine will exit and then _reenter_ the same _pending_ state, but __only__ if the following condition is fulfilled: "the new task id differs from the current task id" (the task id is stored in the context; here, the task id equals the API URL used for fetching a user).
## References

*   [XState](https://xstate.js.org/)

*   [XState guarded transitions](https://xstate.js.org/docs/guides/guards.html)

*   [XState React binding](https://xstate.js.org/docs/recipes/react.html)

*   [No, disabling a button is not app logic](https://dev.to/davidkpiano/no-disabling-a-button-is-not-app-logic-598i)

    Great introduction to XState from the creator of the library.

*   [XState explained (video)](https://www.youtube.com/watch?v=Ras7QG9kxUk)