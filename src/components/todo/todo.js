import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Setting from '../setting'
import useForm from '../../hooks/form.js';
import Displaycontext from '../context'
import Header from '../header'
import Form from '../form'
import List from '../list'

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
      <Displaycontext>
        <BrowserRouter>
              <Header  />
          <Switch>
            <Route exact path="/">
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              incomplete={incomplete}
            />
            <List
              list={list}
              toggleComplete={toggleComplete}
            />
            </Route>
            <Route exact path="/setting">
              <Setting/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Displaycontext>

    </>
  );
};

export default ToDo;
