import React from 'react';
import { displaySettings } from './components/context.js';

import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <displaySettings>
        <ToDo />
      </displaySettings>
    );
  }
}
