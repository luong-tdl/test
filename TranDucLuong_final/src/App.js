import React from 'react';

import Defaultlayout from './container/defaultLayout.jsx';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import Login from './pages/login.jsx';



function App() {
  return(
    
    <Switch>
      <Route path='/' exact component={Login}/>
      <Route path='/admin/' component ={Defaultlayout}/>
    </Switch>
    
    
    
  );
}

export default App;
