import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import axios from 'axios';
import base64 from 'base-64'
require('dotenv').config();
// const testUsers = {
//   admin: {password:'password', name:'Administrator', role:'admin', capabilities:['create','read','update','delete']},
//   editor: { password: 'password', name: 'Editor', role: 'editor', capabilities: ['read', 'update']},
//   writer: { password: 'password', name: 'Writer', role: 'writer', capabilities: ['create']},
// };
const PORT = process.env.PORT
export const LoginContext = React.createContext();

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      login: this.login,
      logout: this.logout,
      user: { capabilities: [] },
    };
  }

  can = (capability) => {
    return this?.state?.capabilities?.includes(capability);
  }

  login = async (username, password) => {
    try {
      const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
      const authorization = `Basic ${encodedBase64Token}`;
      var data = '';
      var config = {
        method: 'post',
        url: PORT,
        headers: {
          'Authorization': authorization
        },
        data: data
      };

      const response = await axios(config)
      console.log(response.data);
      this.setState({
        token : response.data.token,
        loggedIn : true,
        user : response.data.username,
        capabilities : response.data.capabilities
      });
      console.log(this.state);
      

    } catch (error) {
      console.log(error.message);
    }

  }

  logout = () => {
    this.setLoginState(false, null, {});
  };

  validateToken = token => {
    console.log(token);
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      console.log(user, '======');
      console.log(token, '++++++++');
      this.setLoginState(true, token, user);
    }
    catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token Validation Error', e);
    }
  };

  setLoginState = (loggedIn, token, user) => {
    this.setState({ token, loggedIn, user });
    cookie.save('auth', token);
  };

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
