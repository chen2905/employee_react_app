import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import { Home } from './components/Home'
import { Department } from './components/Department'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Employee } from './components/Employee'
import {Navigation} from  './components/Navigation'
function App() {
  
  return (
    <BrowserRouter>



      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          React JS with Web api Demo
        </h3>
        <h5 className="m-3 d-flex justify-content-center">
          Employee Management Portal
        </h5>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/department' component={Department} exact />
          <Route path='/employee' component={Employee} exact />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
