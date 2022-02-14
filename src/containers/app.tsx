import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About } from './about';
import { Main } from './main';

export const App = () => {
  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  )
};
