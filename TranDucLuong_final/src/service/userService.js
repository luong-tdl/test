
import { data } from "jquery";
import api from "./api"

const login =(username,password) => {
    var data={
        username,password
    };
    return api.post(api.url.login,data);

}


export default {

    login:login
};