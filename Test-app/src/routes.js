import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './components/auth/login'
import Profile from './components/home/profile'
import UserDetails from './components/home/userdetails';

const Routes = () => {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/profile" component={Profile} />
            <Route path="/userDetails" component={UserDetails} />
          </Switch>
        </Router>
    );
    
}

export default Routes;
