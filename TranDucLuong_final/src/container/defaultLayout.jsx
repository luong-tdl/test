


import React, { Component } from 'react';
import App from './../App';
import Header from './Header';
import Major from './../pages/Major';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home';
import routes from '../routes';


class Defaultlayout extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Header/>
                <Switch>
                    {
                        routes.map((route,idx)=>{
                            return route.component ? (
                                <Route 
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                component={route.component}/>
                            ):null;
                        })
                    }
                </Switch>
            </div>
         );
    }
}
 
export default Defaultlayout;
 



