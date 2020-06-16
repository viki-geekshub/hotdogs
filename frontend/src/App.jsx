import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './containers/home/Home';
import Profile from './containers/profile/Profile';
import EditProfile from './containers/profile/EditProfile';
import Dogs from './containers/dogs/Dogs';
import Matchs from './containers/matchs/Matchs';
import Register from './containers/user/register/Register';
import Login from './containers/user/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/profile' component={Profile} exact />
          <Route path='/editprofile' component={EditProfile} exact />
          <Route path='/dogs' component={Dogs} exact />
          <Route path='/matchs' component={Matchs} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={Login} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
