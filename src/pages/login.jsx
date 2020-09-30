import React, { Component } from 'react';
import userService from '../service/userService';
import  Cookies  from 'js-cookie';
import "./login.css"


class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            message:"",
        }
        

        
    }
        usernameRef=React.createRef();
        passwordRef=React.createRef();
    login =() => {
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;

        userService.login(username,password).then(res=>{
            if(res.data.errorCode>0)
                {
                        this.setState({message:res.data.message})
                        
                }
                else{
                    this.setState({message:""})
                     Cookies.set("loginInfo",JSON.stringify(res.data.data),{expires: 1});
                    this.props.history.push("/admin/instructor")
                }
        })
    }

  
    render() { 
        return ( 
            <div className="bg-danger h-100">
    <div class="container h-100 ">
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-sm-8 col-lg-5">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title mb-0">Login</h3>
                    </div>
                    <div class="card-body">
                        <form>
                        <div className="text-center text-danger">{this.state.message}</div>
                            <div class="form-group">
                                <span id="errorname"></span>
                                <label class="sr-only">Username</label>
                                <div class="input-group input-group-lg">
                                <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
                                    <input type="text" ref={this.usernameRef} class="form-control" placeholder="Username" id="username"  required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="errorname1"></span>
                                <label class="sr-only">Password</label>
                                <div class="input-group input-group-lg">
                                <label for="inputPassword3" class="col-sm-3 col-form-label">Password</label>
                                    <input type="password"ref={this.passwordRef} class="form-control" placeholder="Password" id="password" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="errorname1"></span>
                                {/* <label class="sr-only">Login</label> */}
                                <div class="input-group input-group-lg">
                                <label for="inputPassword3" class="col-sm-3 col-form-label"></label>
                                    <button type="button" onClick={this.login} class="form-control btn-info  col-sm-3">Login</button>
                                </div>
                            </div>
                           
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="plugins/jquery/jquery-3.5.1.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
            </div>
         );
    }
}
 
export default Login;
