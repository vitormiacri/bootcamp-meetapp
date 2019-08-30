import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SigIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Meetup from '../pages/Meetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SigIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup/edit" component={Meetup} isPrivate />
      <Route path="/meetup/create" component={Meetup} isPrivate />
      <Route path="/meetup/detail" component={Meetup} isPrivate />
    </Switch>
  );
}
