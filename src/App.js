import './App.css';
import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import AdminAdd from './Components/AdminAdd'
import AdminUpdate from './Components/AdminUpdate'
import User from './Components/User'
import Admin from './Components/Admin';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className="App">          
             <Switch>
             <Route exact path='/admin/add' component={AdminAdd}/>            
             <Route exact path='/admin/update' component={AdminUpdate}/> 
             <Route exact path='/admin' component={Admin}/> 
             <Route exact path='/' component={User}/>           
             </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
