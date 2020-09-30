import Home from './pages/home';
import Major from './pages/Major';
import { Component } from 'react';
import Login from './pages/login';
import student from './pages/student';


const routes = [
    
    {path:"/home", exact : true , name :"Home", component:Home}, 
    {path:"/admin/instructor", exact : true , name :"Major", component:Major},
    {path:"/student", exact : true , name :"Major", component:student},
    

]

   
export default routes;