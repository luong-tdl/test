
import api from "./api"


const list =() => {
    return api.get(api.url.instructors);
};

const get = id => api.get(`${api.url.instructors}/${id}`);

const add=data => api.post(api.url.instructors,data);

const update = (id,data) =>api.put(`${api.url.instructors}/${id}`,data);

const remove = id =>api.delete(`${api.url.instructors}/${id}`);

export default {

    list:list,
    get: get,
    add:add,
    update:update,
    delete:remove
};


// const post=()=>{
//     return api.post(api.url.majors)};