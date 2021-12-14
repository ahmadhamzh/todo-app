import { When } from 'react-if';
import React, { useState, useContext } from 'react';

import { LoginContext } from './auth-context';

export default function Login(props) {

  const context = useContext(LoginContext);
  const [state, setState] = useState({ username: '', password: '' });


  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    console.log(state);
    e.preventDefault();
    context.login(state.username, state.password);
  };


  return (
    <>
      <When condition={context.loggedIn}>
        <button onClick={context.logout}>Log Out</button>
      </When>

      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button type='submit'>Login</button>
        </form>
      </When>
    </>
  );
}

// export default Login;
