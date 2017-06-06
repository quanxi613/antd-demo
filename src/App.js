import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Login from './login'
import Home from './home'


const BasicExample = () => (
  <Router>
    <div>     
      <Route exact path="/" component={Login}/>
      <Route path="/home" component={Home}/>      
    </div>
  </Router>
)



export default BasicExample