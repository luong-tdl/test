
import { data } from "jquery";
import api from "./api"

const list =() => {
    return api.get(api.url.majors);
};

const get = id => api.get(`${api.url.majors}/${id}`);

const add=data => api.post(api.url.majors,data);

const update = (id,data) =>api.put(`${api.url.majors}/${id}`,data);

const remove = id =>api.delete(`${api.url.majors}/${id}`);

export default {

    list:list,
    get: get,
    add:add,
    update:update,
    delete:remove
};


// const post=()=>{
//     return api.post(api.url.majors)};