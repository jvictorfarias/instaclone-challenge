import { Switch, Route } from "react-router-dom";
import React from "react";

import Feed from "./pages/Feed/Feed";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/feed" component={Feed} />
      <Route path="/post" component={Post} />
    </Switch>
  );
}

export default Routes;
