import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Feed from './pages/Feed/Feed';
import Post from './pages/Post/Post';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/feed" exact component={Feed} />
      <Route path="/post" exact component={Post} />
    </Switch>
  );
}

export default Routes;
