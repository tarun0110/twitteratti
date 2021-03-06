import React, { Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from  './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Profiles from './components/layout/Profiles';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles'; 
import Profile from './components/profile/Profile'; 
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.token){
  setAuthToken(localStorage.token);
}
 
const App = ()=>{ 
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  
  return(
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path ="/register" component={Register} />
              <Route exact path ="/login" component={Login} />
              <Route exact path ='/profiles' component ={Profiles} />
              <Route exact path ='/profile/:id' component ={Profile} />
              <PrivateRoute exact path ='/dashboard' component ={Dashboard} />
              <PrivateRoute exact path ='/posts' component ={Posts} />
              <PrivateRoute exact path ='/posts/:id' component ={Post} />
              <PrivateRoute exact path ='/create-profile' component ={CreateProfile} />
            </Switch>
          </section>
        </Fragment>
        </Router>
      </Provider> 
  )
};

export default App;
