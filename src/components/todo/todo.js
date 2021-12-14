import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Setting from '../setting'
import useForm from '../../hooks/form.js';
import Displaycontext from '../context'
import AuthContext from '../auth-context'
import Header from '../header'
import Form from '../form'
import List from '../list'
import Login from '../login'
import Auth from '../auth'

import { v4 as uuid } from 'uuid';

const ToDo = () => {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    // let incomplete = list.filter(item => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount}`;
  }, [list]);

  return (
    <>
      <AuthContext>
        <Displaycontext>
          <BrowserRouter>
            <Auth>
              <Header />
            </Auth>

            <Switch>
              <Route exact path="/">
                <Auth capability="create">
                  <Form
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    incomplete={incomplete}
                  />
                </Auth>

                <Auth>
                  <List
                    list={list}
                    toggleComplete={toggleComplete}
                  />
                </Auth>
                
              </Route>

              <Route exact path="/setting">

              <Auth>
                <Setting />
              </Auth>

              </Route>
            </Switch>
          </BrowserRouter>
          <Login />
        </Displaycontext>
      </AuthContext>

      {/* <Auth>
        <div>Any valid user can see this</div>
      </Auth> */}

      {/* <Auth capability="create">
          <div>Users with create access can see this</div>
        </Auth> */}

      {/* <Auth capability="update">
          <div>Users with update access can see this</div>
        </Auth> */}

      {/* <Auth capability="delete">
          <div>Users with delete access can see this</div>
        </Auth> */}
    </>
  );
};

export default ToDo;
