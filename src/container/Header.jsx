import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container">
                        <a class="navbar-brand" href="#">TMS </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav mr-auto">
                                {/* <li class="nav-item active">
                                    <Link class="nav-link" to="/Home">Home <span class="sr-only">(current)</span></Link>
                                </li> */}
                                <li class="nav-item">
                                    <Link class="nav-link" to="/admin/instructor">Instructor</Link>
                                </li>
                                {/* <li class="nav-item">
                                    <Link class="nav-link"to="/student">student</Link>
                                </li> */}
                            </ul>
                            
                        </div>
                    </div>
                    </nav>
            </div>
        );
    }
}
export default Header;